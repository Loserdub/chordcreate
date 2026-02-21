import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChordSlot } from './components/ChordSlot';
import { PianoKeyboard } from './components/PianoKeyboard';
import { audioService } from './services/audioService';
import { generateProgression } from './services/geminiService';
import { DEFAULT_PROGRESSION, AVAILABLE_CHORDS } from './constants';
import { Play, Square, Wand2, Loader2, RefreshCw, VolumeX, Download } from 'lucide-react';
import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

const App: React.FC = () => {
  const [progression, setProgression] = useState<string[]>(DEFAULT_PROGRESSION);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [bpm, setBpm] = useState(90);
  
  // AI State
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Refs for transport loop and timeouts
  const stepRef = useRef<number>(0);
  const playAllLoopRef = useRef<Tone.Loop | null>(null);
  const playbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChordChange = (index: number, newChord: string) => {
    // Stop previous sound immediately
    audioService.stop();

    const newProgression = [...progression];
    newProgression[index] = newChord;
    setProgression(newProgression);
    
    // Play preview on change (short)
    audioService.playChord(newChord, "4n");
  };

  const playSingleChord = async (index: number) => {
    // Stop previous sound immediately to prevent mud
    audioService.stop();
    
    // Clear any existing timeout to reset the visual highlight timer
    if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
        playbackTimeoutRef.current = null;
    }

    setPlayingIndex(index);
    
    // Play the chord for a duration shortened by ~25% (dotted half note instead of whole note)
    await audioService.playChord(progression[index], "2n.");
    
    // Schedule the visual highlight to turn off after the sound decays
    playbackTimeoutRef.current = setTimeout(() => {
        setPlayingIndex(null);
    }, 1500); 
  };

  const stopAll = useCallback(() => {
    Tone.Transport.stop();
    Tone.Transport.cancel(); // Clear scheduled events
    if (playAllLoopRef.current) {
        playAllLoopRef.current.dispose();
        playAllLoopRef.current = null;
    }
    audioService.stop(); // Stop any ringing notes (releases envelopes)
    setIsPlayingAll(false);
    setPlayingIndex(null);
    stepRef.current = 0;
    
    if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
    }
  }, []);

  const togglePlayAll = async () => {
    if (isPlayingAll) {
      stopAll();
      return;
    }

    // Ensure audio context is ready
    await audioService.playNote("C0", "32n"); // Dummy trigger to wake audio
    await Tone.start();

    setIsPlayingAll(true);
    Tone.Transport.bpm.value = bpm;
    stepRef.current = 0;

    // Schedule the loop
    const loop = new Tone.Loop((time) => {
      const currentStep = stepRef.current % 4;
      
      // Update visual state (using Tone.Draw to sync with audio thread)
      Tone.Draw.schedule(() => {
        setPlayingIndex(currentStep);
      }, time);

      const chord = progression[currentStep];
      // Play for dotted half note (75% of measure), leaving 25% space
      audioService.playChord(chord, "2n.");

      stepRef.current++;
    }, "1m").start(0);

    playAllLoopRef.current = loop;
    Tone.Transport.start();
  };

  const handleAiGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setAiError(null);
    try {
      const chords = await generateProgression(prompt);
      setProgression(chords);
      // Optional: Play the first chord to announce success
      audioService.stop();
      audioService.playChord(chords[0], "2n");
    } catch (err) {
      setAiError("Failed to generate. Try a different mood.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomize = () => {
    const randomChords = Array(4).fill(null).map(() => 
        AVAILABLE_CHORDS[Math.floor(Math.random() * AVAILABLE_CHORDS.length)]
    );
    setProgression(randomChords);
  };

  const handleExportMidi = () => {
    const midi = new Midi();
    const track = midi.addTrack();
    midi.header.setTempo(bpm);

    progression.forEach((chordName, index) => {
      const notes = audioService.getNotesForChord(chordName);
      // Each chord lasts 1 bar
      const startTime = index * (60 / bpm * 4); // seconds
      const duration = (60 / bpm * 4); // seconds - full bar duration

      notes.forEach((note) => {
        track.addNote({
          name: note,
          time: startTime,
          duration: duration,
          velocity: 0.75
        });
      });
    });

    const blob = new Blob([midi.toArray()], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chord-progression.mid';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
        stopAll();
    };
  }, [stopAll]);

  // Update BPM live
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center py-10 px-4 font-sans">
      
      {/* Header */}
      <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-neutral-200">
            ChordFlow AI
            </h1>
            <p className="text-neutral-500 mt-2">Intelligent Chord Arranger & Sequencer</p>
        </div>

        {/* Export Midi Button (Center-ish) */}
        <div className="flex-shrink-0">
             <button
                onClick={handleExportMidi}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg border border-neutral-700 transition-colors font-semibold text-sm shadow-sm"
             >
                <Download size={16} className="text-orange-500" />
                Export MIDI
             </button>
        </div>
        
        {/* BPM & Main Controls */}
        <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-4 bg-neutral-900 p-3 rounded-xl border border-neutral-800 shadow-xl">
                <div className="flex flex-col items-center mr-2">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">BPM</span>
                    <span className="text-xl font-mono text-orange-500">{bpm}</span>
                </div>
                <input 
                    type="range" 
                    min="60" 
                    max="160" 
                    value={bpm} 
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-24 accent-orange-600 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="w-[1px] h-8 bg-neutral-800 mx-2"></div>
                <button
                    onClick={togglePlayAll}
                    className={`
                        flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all shadow-lg
                        ${isPlayingAll 
                            ? 'bg-red-900 hover:bg-red-800 text-red-100 shadow-red-900/20' 
                            : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20'
                        }
                    `}
                >
                    {isPlayingAll ? (
                        <>
                            <Square size={18} fill="currentColor" /> Stop
                        </>
                    ) : (
                        <>
                            <Play size={18} fill="currentColor" /> Play All
                        </>
                    )}
                </button>
            </div>
        </div>
      </div>

      {/* Main Chord Row */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {progression.map((chord, index) => (
          <ChordSlot
            key={index}
            id={index}
            selectedChord={chord}
            isActive={playingIndex === index}
            onSelect={(c) => handleChordChange(index, c)}
            onPlay={() => playSingleChord(index)}
            isPlaying={playingIndex === index}
          />
        ))}
      </div>

      {/* Large Global Keyboard */}
      <div className="w-full max-w-5xl mb-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-lg font-bold text-neutral-200">Master Keyboard</h3>
                    <p className="text-sm text-neutral-500">
                        {playingIndex !== null 
                            ? `Playing: ${progression[playingIndex]}` 
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

      {/* AI Generator Section */}
      <div className="w-full max-w-5xl">
        <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-2xl p-0.5 border border-neutral-800">
            <div className="bg-neutral-950/80 backdrop-blur-sm rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-neutral-400 mb-2 flex items-center gap-2">
                        <Wand2 size={16} className="text-orange-500" />
                        AI Generator
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe a mood (e.g., 'Dark Industrial', 'Cyberpunk Jazz')"
                            className="flex-1 bg-neutral-900 border border-neutral-700 text-neutral-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 focus:outline-none placeholder-neutral-600"
                            onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
                        />
                        <button
                            onClick={handleAiGenerate}
                            disabled={isGenerating || !prompt.trim()}
                            className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed text-orange-500 border border-neutral-700 px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 min-w-[140px] justify-center"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : 'Generate'}
                        </button>
                    </div>
                    {aiError && <p className="text-red-900 text-sm mt-2">{aiError}</p>}
                </div>

                <div className="h-12 w-[1px] bg-neutral-800 hidden md:block"></div>

                <button
                    onClick={handleRandomize}
                    className="flex items-center gap-2 text-neutral-500 hover:text-orange-500 transition-colors px-4 py-2 hover:bg-neutral-900 rounded-lg"
                >
                    <RefreshCw size={18} />
                    <span>Randomize</span>
                </button>
            </div>
        </div>
      </div>

      {/* Footer / Instructions */}
      <div className="mt-12 text-neutral-600 text-sm max-w-2xl text-center">
        <p>Tip: Click "Play All" to hear the full arrangement. Use the dropdowns to manually tweak chords, or let Gemini AI suggest a vibe.</p>
      </div>

    </div>
  );
};

export default App;