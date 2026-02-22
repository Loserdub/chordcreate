import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChordSlot } from './components/ChordSlot';
import { PianoKeyboard } from './components/PianoKeyboard';
import { audioService } from './services/audioService';
import { DEFAULT_PROGRESSION } from './constants';
import { Play, Square, Download } from 'lucide-react';
import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

type PlaybackMode = 'ALL' | 'ROW1' | 'ROW2' | null;

const App: React.FC = () => {
  // Ensure we have 8 chords
  const [progression, setProgression] = useState<string[]>(() => {
    if (DEFAULT_PROGRESSION.length < 8) {
      return [...DEFAULT_PROGRESSION, ...DEFAULT_PROGRESSION].slice(0, 8);
    }
    return DEFAULT_PROGRESSION;
  });
  
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(null);
  const [bpm, setBpm] = useState(90);
  
  // Refs for transport loop and timeouts
  const stepRef = useRef<number>(0);
  const loopRef = useRef<Tone.Loop | null>(null);
  const playbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChordChange = (index: number, newChord: string) => {
    // Stop previous sound immediately
    audioService.stop();

    const newProgression = [...progression];
    newProgression[index] = newChord;
    setProgression(newProgression);
    
    // Play preview on change (short)
    audioService.playChord(newChord, "8n");
  };

  const playSingleChord = async (index: number) => {
    // Stop playback if running
    if (playbackMode) {
        stopAll();
    } else {
        audioService.stop();
    }
    
    // Clear any existing timeout
    if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
        playbackTimeoutRef.current = null;
    }

    setPlayingIndex(index);
    
    // Play chord for quarter note
    await audioService.playChord(progression[index], "4n");
    
    // Visual highlight off after 500ms
    playbackTimeoutRef.current = setTimeout(() => {
        setPlayingIndex(null);
    }, 500); 
  };

  const stopAll = useCallback(() => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    if (loopRef.current) {
        loopRef.current.dispose();
        loopRef.current = null;
    }
    audioService.stop();
    setPlaybackMode(null);
    setPlayingIndex(null);
    stepRef.current = 0;
    
    if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
    }
  }, []);

  const togglePlayback = async (mode: PlaybackMode) => {
    if (!mode) return;

    if (playbackMode === mode) {
      stopAll();
      return;
    }

    // Stop existing playback if switching modes
    stopAll();

    // Ensure audio context is ready
    await audioService.playNote("C0", "32n"); 
    await Tone.start();

    setPlaybackMode(mode);
    Tone.Transport.bpm.value = bpm;
    stepRef.current = 0;

    let startIndex = 0;
    let steps = 4;
    
    if (mode === 'ALL') {
        startIndex = 0;
        steps = 8;
    } else if (mode === 'ROW1') {
        startIndex = 0;
        steps = 4;
    } else if (mode === 'ROW2') {
        startIndex = 4;
        steps = 4;
    }

    // Loop interval is quarter note (one beat) per chord
    const loop = new Tone.Loop((time) => {
      const step = stepRef.current % steps;
      const actualIndex = startIndex + step;
      
      Tone.Draw.schedule(() => {
        setPlayingIndex(actualIndex);
      }, time);

      const chord = progression[actualIndex];
      // Play for a full beat (quarter note)
      audioService.playChord(chord, "4n");

      stepRef.current++;
    }, "4n").start(0);

    loopRef.current = loop;
    Tone.Transport.start();
  };

  const exportMidi = (startIndex: number, count: number, filename: string) => {
    const midi = new Midi();
    const track = midi.addTrack();
    midi.header.setTempo(bpm);

    const slice = progression.slice(startIndex, startIndex + count);

    slice.forEach((chordName, i) => {
      const notes = audioService.getNotesForChord(chordName);
      // 1 chord = 1 beat
      const beatDuration = 60 / bpm;
      const startTime = i * beatDuration;

      notes.forEach((note) => {
        track.addNote({
          name: note,
          time: startTime,
          duration: beatDuration,
          velocity: 0.75
        });
      });
    });

    const blob = new Blob([midi.toArray()], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Cleanup
  useEffect(() => {
    return () => {
        stopAll();
    };
  }, [stopAll]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const renderRow = (rowId: number, startIndex: number) => (
    <div className="flex flex-col md:flex-row gap-4 items-stretch bg-neutral-900/20 p-4 rounded-2xl border border-neutral-800/50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
            {progression.slice(startIndex, startIndex + 4).map((chord, i) => {
                const globalIndex = startIndex + i;
                return (
                    <ChordSlot
                        key={globalIndex}
                        id={globalIndex}
                        selectedChord={chord}
                        isActive={playingIndex === globalIndex}
                        onSelect={(c) => handleChordChange(globalIndex, c)}
                        onPlay={() => playSingleChord(globalIndex)}
                        isPlaying={playingIndex === globalIndex}
                    />
                );
            })}
        </div>
        
        {/* Row Controls Sidebar */}
        <div className="flex flex-row md:flex-col justify-center gap-3 min-w-[140px] bg-neutral-900 p-4 rounded-xl border border-neutral-800">
             <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest text-center mb-1">
                 Row {rowId}
             </div>
             
             <button
                onClick={() => togglePlayback(rowId === 1 ? 'ROW1' : 'ROW2')}
                className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all
                    ${(rowId === 1 && playbackMode === 'ROW1') || (rowId === 2 && playbackMode === 'ROW2')
                        ? 'bg-red-900/80 text-red-100 hover:bg-red-800' 
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                    }
                `}
             >
                {(rowId === 1 && playbackMode === 'ROW1') || (rowId === 2 && playbackMode === 'ROW2') ? (
                    <><Square size={16} fill="currentColor"/> Stop</>
                ) : (
                    <><Play size={16} fill="currentColor"/> Play</>
                )}
             </button>

             <button
                onClick={() => exportMidi(startIndex, 4, `row-${rowId}.mid`)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-orange-500 rounded-lg border border-neutral-800 transition-colors font-semibold text-xs"
             >
                <Download size={16} />
                MIDI
             </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center py-10 px-4 font-sans">
      
      {/* Header */}
      <div className="w-full max-w-6xl mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-neutral-200">
            ChordFlow AI
            </h1>
            <p className="text-neutral-500 mt-2">8-Step Sequence Arranger</p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap justify-center gap-4 bg-neutral-900 p-3 rounded-xl border border-neutral-800 shadow-xl">
             <button
                onClick={() => exportMidi(0, 8, 'full-progression.mid')}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg border border-neutral-700 transition-colors font-semibold text-sm shadow-sm"
             >
                <Download size={16} className="text-orange-500" />
                Export Full MIDI
             </button>

            <div className="w-[1px] h-8 bg-neutral-800 hidden md:block"></div>

            <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-neutral-500 uppercase">BPM</span>
                <input 
                    type="range" 
                    min="60" 
                    max="160" 
                    value={bpm} 
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-24 accent-orange-600 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-mono text-orange-500 w-8">{bpm}</span>
            </div>

            <div className="w-[1px] h-8 bg-neutral-800 hidden md:block"></div>

            <button
                onClick={() => togglePlayback('ALL')}
                className={`
                    flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all shadow-lg min-w-[120px] justify-center
                    ${playbackMode === 'ALL'
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20' 
                        : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20'
                    }
                `}
            >
                {playbackMode === 'ALL' ? (
                    <><Square size={18} fill="currentColor" /> Stop All</>
                ) : (
                    <><Play size={18} fill="currentColor" /> Play All</>
                )}
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl flex flex-col gap-6 mb-10">
        {renderRow(1, 0)}
        {renderRow(2, 4)}
      </div>

      {/* Large Global Keyboard */}
      <div className="w-full max-w-6xl mb-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-lg font-bold text-neutral-200">Master Keyboard</h3>
                    <p className="text-sm text-neutral-500">
                        {playingIndex !== null 
                            ? `Playing: ${progression[playingIndex]} (Slot ${playingIndex + 1})` 
                            : 'Interactive Mode - Click keys to play'}
                    </p>
                </div>
            </div>
            
            <PianoKeyboard 
                activeNotes={playingIndex !== null ? audioService.getNotesForChord(progression[playingIndex]) : []} 
                height={180} 
                interactive={true}
            />
        </div>
      </div>

      {/* Footer / Instructions */}
      <div className="mt-8 text-neutral-600 text-sm max-w-2xl text-center pb-8">
        <p>
          2026 loserworks / hybridproduction , for more visit <a href="https://www.jray.me" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline decoration-orange-500/30 transition-colors">https://www.jray.me</a>
        </p>
      </div>

    </div>
  );
};

export default App;