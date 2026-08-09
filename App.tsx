import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChordSlot } from './components/ChordSlot';
import { PianoKeyboard } from './components/PianoKeyboard';
import { audioService, SYNTH_TONE_OPTIONS } from './services/audioService';
import { DEFAULT_PROGRESSION, VIBE_GROUPS, AVAILABLE_CHORDS } from './constants';
import { SynthToneId } from './types';
import { Play, Square, Download, Activity, Music2, Sparkles, Shuffle, SlidersHorizontal } from 'lucide-react';
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
  const [selectedVibeId, setSelectedVibeId] = useState<string>('pop');
  const [selectedProgressionId, setSelectedProgressionId] = useState<string>('pop-1');
  const [vibeIndices, setVibeIndices] = useState<Record<string, number>>({ pop: 0 });
  const [selectedToneId, setSelectedToneId] = useState<SynthToneId>('rhodes');

  
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

  const handleVibeSelect = (val: string) => {
    if (!val) return;
    stopAll();

    if (val.startsWith('vibe:')) {
      const vibeId = val.replace('vibe:', '');
      const vibeGroup = VIBE_GROUPS.find(v => v.id === vibeId);
      if (vibeGroup) {
        setSelectedVibeId(vibeId);
        const currentIndex = vibeIndices[vibeId] ?? 0;
        const prog = vibeGroup.progressions[currentIndex];
        setSelectedProgressionId(prog.id);
        setProgression([...prog.chords]);
        audioService.playChord(prog.chords[0], "4n");
      }
    } else if (val.startsWith('preset:')) {
      const progId = val.replace('preset:', '');
      for (const vibe of VIBE_GROUPS) {
        const idx = vibe.progressions.findIndex(p => p.id === progId);
        if (idx !== -1) {
          const prog = vibe.progressions[idx];
          setSelectedVibeId(vibe.id);
          setSelectedProgressionId(prog.id);
          setVibeIndices(prev => ({ ...prev, [vibe.id]: idx }));
          setProgression([...prog.chords]);
          audioService.playChord(prog.chords[0], "4n");
          break;
        }
      }
    }
  };

  const handleToneChange = (toneId: SynthToneId) => {
    setSelectedToneId(toneId);
    audioService.setSynthTone(toneId);
    // Play quick preview note/chord with new synth tone
    audioService.playChord(progression[0], "8n");
  };

  const randomizeVibeProgression = () => {
    stopAll();
    
    let targetVibeId = selectedVibeId;
    if (!targetVibeId) {
      targetVibeId = VIBE_GROUPS[0].id;
      setSelectedVibeId(targetVibeId);
    }

    const vibeGroup = VIBE_GROUPS.find(v => v.id === targetVibeId) || VIBE_GROUPS[0];
    const currentIndex = vibeIndices[targetVibeId] ?? 0;
    const nextIndex = (currentIndex + 1) % vibeGroup.progressions.length;

    setVibeIndices(prev => ({ ...prev, [targetVibeId]: nextIndex }));
    
    const nextProg = vibeGroup.progressions[nextIndex];
    setSelectedProgressionId(nextProg.id);
    setProgression([...nextProg.chords]);
    audioService.playChord(nextProg.chords[0], "4n");
  };

  const activeVibeGroup = VIBE_GROUPS.find(v => v.id === selectedVibeId);
  const activeProgression = activeVibeGroup?.progressions.find(p => p.id === selectedProgressionId);
  const activeProgressionIndex = activeVibeGroup && activeProgression 
    ? activeVibeGroup.progressions.findIndex(p => p.id === activeProgression.id)
    : 0;

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
    <div className="flex flex-col md:flex-row gap-4 items-stretch bg-neutral-900/40 p-4 rounded-2xl border border-white/[0.08] backdrop-blur-sm shadow-xl">
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
        <div className="flex flex-row md:flex-col justify-center gap-3 min-w-[140px] bg-neutral-950/80 p-4 rounded-xl border border-white/[0.08]">
             <div className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center mb-0.5">
                 ROW 0{rowId}
             </div>
             
             <button
                onClick={() => togglePlayback(rowId === 1 ? 'ROW1' : 'ROW2')}
                className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all border
                    ${(rowId === 1 && playbackMode === 'ROW1') || (rowId === 2 && playbackMode === 'ROW2')
                        ? 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30' 
                        : 'bg-neutral-900 text-neutral-300 border-white/[0.08] hover:border-orange-500/40 hover:text-orange-400 hover:bg-neutral-850'
                    }
                `}
             >
                {(rowId === 1 && playbackMode === 'ROW1') || (rowId === 2 && playbackMode === 'ROW2') ? (
                    <><Square size={13} fill="currentColor"/> STOP</>
                ) : (
                    <><Play size={13} fill="currentColor"/> PLAY</>
                )}
             </button>

             <button
                onClick={() => exportMidi(startIndex, 4, `row-${rowId}.mid`)}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-orange-400 rounded-lg border border-white/[0.08] transition-all font-mono text-[11px] font-semibold"
             >
                <Download size={13} />
                MIDI
             </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col items-center py-8 px-4 font-sans selection:bg-orange-500 selection:text-black">
      
      {/* Header */}
      <header className="w-full max-w-6xl mb-8 flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-white/[0.08]">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
            <Activity size={12} className="animate-pulse" />
            HPS-1.0 Certified Audio Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-neutral-200">
            ChordFlow AI
          </h1>
          <p className="text-neutral-400 text-xs font-mono mt-1 tracking-wide">
            8-Step Sequential Chord Arranger & Voice Leading Engine
          </p>
          {activeVibeGroup && activeProgression && (
            <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-mono text-orange-400 shadow-sm">
              <span className="font-bold">{activeVibeGroup.icon} {activeVibeGroup.name}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-200 font-semibold">{activeProgression.name}</span>
              <span className="bg-orange-500/20 px-1.5 py-0.5 rounded text-[10px] text-orange-300 font-bold ml-1">
                {activeProgressionIndex + 1}/{activeVibeGroup.progressions.length}
              </span>
            </div>
          )}
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-neutral-900/80 p-3 rounded-2xl border border-white/[0.08] shadow-2xl backdrop-blur-md">
             {/* Vibe & Progression Selector */}
             <div className="flex items-center gap-2">
               <div className="relative">
                 <select
                   value={selectedProgressionId ? `preset:${selectedProgressionId}` : (selectedVibeId ? `vibe:${selectedVibeId}` : '')}
                   onChange={(e) => handleVibeSelect(e.target.value)}
                   className="appearance-none bg-neutral-950 text-neutral-200 border border-white/[0.08] hover:border-orange-500/40 rounded-lg py-2 pl-8 pr-7 text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer transition-colors max-w-[220px] sm:max-w-none truncate"
                   title="Select a harmonic vibe or progression"
                 >
                   <option value="" disabled>✨ HARMONIC VIBES</option>
                   {VIBE_GROUPS.map(vibe => (
                     <optgroup key={vibe.id} label={`${vibe.icon} ${vibe.name}`} className="bg-neutral-900 text-orange-400 font-bold">
                       <option value={`vibe:${vibe.id}`} className="bg-neutral-900 text-neutral-100 font-semibold">
                         {vibe.icon} All {vibe.name} (Cycle 1-{vibe.progressions.length})
                       </option>
                       {vibe.progressions.map((p, idx) => (
                         <option key={p.id} value={`preset:${p.id}`} className="bg-neutral-950 text-neutral-300 font-normal">
                           &nbsp;&nbsp;{idx + 1}. {p.name}
                         </option>
                       ))}
                     </optgroup>
                   ))}
                 </select>
                 <Sparkles size={13} className="absolute left-2.5 top-2.5 text-orange-500 pointer-events-none" />
                 <div className="absolute right-2.5 top-3 pointer-events-none text-neutral-500">
                   <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
               </div>
               <button
                 onClick={randomizeVibeProgression}
                 className="p-2 rounded-lg bg-neutral-950 hover:bg-neutral-850 text-neutral-400 hover:text-orange-400 border border-white/[0.08] hover:border-orange-500/40 transition-all flex items-center justify-center"
                 title={activeVibeGroup ? `Cycle next chord progression in "${activeVibeGroup.name}" (${activeProgressionIndex + 1}/${activeVibeGroup.progressions.length})` : "Cycle vibe chord progression"}
               >
                 <Shuffle size={14} />
               </button>
             </div>


             <div className="w-[1px] h-6 bg-white/[0.08] hidden md:block"></div>

             {/* Synth Tone Preset Selector */}
             <div className="relative">
               <select
                 value={selectedToneId}
                 onChange={(e) => handleToneChange(e.target.value as SynthToneId)}
                 className="appearance-none bg-neutral-950 text-neutral-200 border border-white/[0.08] hover:border-orange-500/40 rounded-lg py-2 pl-8 pr-7 text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer transition-colors"
                 title="Select synth sound model"
               >
                 {SYNTH_TONE_OPTIONS.map(t => (
                   <option key={t.id} value={t.id} className="bg-neutral-900 text-neutral-200">
                     🎹 {t.name}
                   </option>
                 ))}
               </select>
               <SlidersHorizontal size={13} className="absolute left-2.5 top-2.5 text-orange-500 pointer-events-none" />
               <div className="absolute right-2.5 top-3 pointer-events-none text-neutral-500">
                 <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                 </svg>
               </div>
             </div>

             <div className="w-[1px] h-6 bg-white/[0.08] hidden md:block"></div>

             <button
                onClick={() => exportMidi(0, 8, 'full-progression.mid')}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-950 hover:bg-neutral-850 text-neutral-200 rounded-lg border border-white/[0.08] hover:border-orange-500/40 transition-all font-mono text-xs font-semibold shadow-sm"
             >
                <Download size={14} className="text-orange-500" />
                EXPORT MIDI
             </button>

            <div className="w-[1px] h-6 bg-white/[0.08] hidden md:block"></div>

            <div className="flex items-center gap-3 px-1">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">BPM</span>
                <input 
                    type="range" 
                    min="60" 
                    max="160" 
                    value={bpm} 
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-24 accent-orange-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-orange-400 w-8">{bpm}</span>
            </div>

            <div className="w-[1px] h-6 bg-white/[0.08] hidden md:block"></div>

            <button
                onClick={() => togglePlayback('ALL')}
                className={`
                    flex items-center gap-2 px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all shadow-lg min-w-[110px] justify-center border
                    ${playbackMode === 'ALL'
                        ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-red-500/10' 
                        : 'bg-orange-500 text-neutral-950 border-orange-400 shadow-orange-500/20 hover:bg-orange-400'
                    }
                `}
            >
                {playbackMode === 'ALL' ? (
                    <><Square size={14} fill="currentColor" /> STOP ALL</>
                ) : (
                    <><Play size={14} fill="currentColor" /> PLAY ALL</>
                )}
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl flex flex-col gap-6 mb-8">
        {renderRow(1, 0)}
        {renderRow(2, 4)}
      </main>

      {/* Master Keyboard Visualizer */}
      <div className="w-full max-w-6xl mb-8">
        <div className="bg-neutral-900/40 border border-white/[0.08] rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Music2 size={16} className="text-orange-500" />
                    <h3 className="text-sm font-mono font-bold text-neutral-200 uppercase tracking-wider">Master Keyboard</h3>
                </div>
                <div className="font-mono text-xs text-neutral-400 bg-neutral-950 px-3 py-1 rounded-md border border-white/[0.06]">
                    {playingIndex !== null 
                        ? `PLAYING: ${progression[playingIndex]} (SLOT 0${playingIndex + 1})` 
                        : 'INTERACTIVE MODE — CLICK KEYS TO PLAY'}
                </div>
            </div>
            
            <PianoKeyboard 
                activeNotes={playingIndex !== null ? audioService.getNotesForChord(progression[playingIndex]) : []} 
                height={170} 
                interactive={true}
            />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-neutral-400 text-xs font-mono border-t border-white/[0.08] w-full max-w-6xl text-center flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          © 2026 <a href="https://trustnodelogic.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-orange-400 transition-colors">Trust Node Logic</a> · Justin Ray (JRAY / loserdub)
        </div>
        <div className="flex items-center gap-4">
          <a href="https://trustnodelogic.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-400 transition-colors">trustnodelogic.com</a>
          <span>·</span>
          <a href="https://www.reddit.com/r/hybridproduction/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-400 transition-colors">r/hybridproduction</a>
        </div>
      </footer>

    </div>
  );
};

export default App;