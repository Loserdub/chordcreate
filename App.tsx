import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SortableChordSlot } from './components/SortableChordSlot';
import { PianoKeyboard } from './components/PianoKeyboard';
import { audioService, SYNTH_TONE_OPTIONS } from './services/audioService';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';

const generateId = () => `slot-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
import { DEFAULT_PROGRESSION, VIBE_GROUPS, AVAILABLE_CHORDS } from './constants';
import { SynthToneId } from './types';
import { Play, Square, Download, Music2, Shuffle, SlidersHorizontal, ChevronRight } from 'lucide-react';
import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

type PlaybackMode = 'ALL' | 'ROW1' | 'ROW2' | null;

const App: React.FC = () => {
  // Ensure we have 8 chords
  const [progression, setProgression] = useState<{id: string, chord: string}[]>(() => {
    let chords = DEFAULT_PROGRESSION;
    if (chords.length < 8) {
      chords = [...DEFAULT_PROGRESSION, ...DEFAULT_PROGRESSION].slice(0, 8);
    }
    return chords.map(chord => ({ id: generateId(), chord }));
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setProgression((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(null);
  const [bpm, setBpm] = useState(90);
  const [selectedVibeId, setSelectedVibeId] = useState<string>('house');
  const [selectedProgressionId, setSelectedProgressionId] = useState<string>('house-1');
  const [vibeIndices, setVibeIndices] = useState<Record<string, number>>({ house: 0 });
  const [selectedToneId, setSelectedToneId] = useState<SynthToneId>('rhodes');

  
  // Refs for transport loop and timeouts
  const stepRef = useRef<number>(0);
  const loopRef = useRef<Tone.Loop | null>(null);
  const playbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChordChange = (index: number, newChord: string) => {
    // Stop previous sound immediately
    audioService.stop();

    const newProgression = [...progression];
    newProgression[index] = { ...newProgression[index], chord: newChord };
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
        setProgression(prog.chords.map(chord => ({ id: generateId(), chord })));
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
          setProgression(prog.chords.map(chord => ({ id: generateId(), chord })));
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
    audioService.playChord(progression[0].chord, "8n");
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
    setProgression(nextProg.chords.map(chord => ({ id: generateId(), chord })));
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
    await audioService.playChord(progression[index].chord, "4n");
    
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

      const chord = progression[actualIndex].chord;
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

    slice.forEach((slot, i) => {
      const notes = audioService.getNotesForChord(slot.chord);
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
    <div className="flex flex-col md:flex-row gap-4 items-stretch bg-[#12151B] p-4 rounded-xl border border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
            {progression.slice(startIndex, startIndex + 4).map((slot, i) => {
                const globalIndex = startIndex + i;
                return (
                    <SortableChordSlot
                        key={slot.id}
                        slotId={slot.id}
                        globalIndex={globalIndex}
                        selectedChord={slot.chord}
                        isActive={playingIndex === globalIndex}
                        onSelect={(c) => handleChordChange(globalIndex, c)}
                        onPlay={() => playSingleChord(globalIndex)}
                        isPlaying={playingIndex === globalIndex}
                        bpm={bpm}
                    />
                );
            })}
        </div>
        
        {/* Row Controls Sidebar */}
        <div className="flex flex-row md:flex-col justify-center gap-2.5 min-w-[125px] bg-[#090B0F] p-3 rounded-lg border border-white/[0.07] shadow-inner">
             <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center mb-0.5">
                 <span className={`daw-led ${(rowId === 1 && playbackMode === 'ROW1') || (rowId === 2 && playbackMode === 'ROW2') ? 'daw-led-green' : 'daw-led-off'}`} />
                 <span>BANK {rowId === 1 ? 'A' : 'B'}</span>
             </div>
             
             <button
                onClick={() => togglePlayback(rowId === 1 ? 'ROW1' : 'ROW2')}
                className={`
                    flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-mono text-xs font-bold transition-all border
                    ${(rowId === 1 && playbackMode === 'ROW1') || (rowId === 2 && playbackMode === 'ROW2')
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 hover:bg-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                        : 'bg-[#161B24] text-slate-300 border-white/[0.08] hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-[#1E2430]'
                    }
                `}
             >
                {(rowId === 1 && playbackMode === 'ROW1') || (rowId === 2 && playbackMode === 'ROW2') ? (
                    <><Square size={12} fill="currentColor"/> STOP</>
                ) : (
                    <><Play size={12} fill="currentColor"/> PLAY</>
                )}
             </button>

             <button
                onClick={() => exportMidi(startIndex, 4, `row-${rowId}.mid`)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#161B24] hover:bg-[#1E2430] text-slate-400 hover:text-cyan-300 rounded-lg border border-white/[0.08] hover:border-cyan-400/40 transition-all font-mono text-[11px] font-semibold"
             >
                <Download size={12} />
                MIDI
             </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0C10] text-slate-100 flex flex-col items-center py-8 px-4 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Header */}
      <header className="w-full max-w-6xl mb-8 flex flex-col lg:flex-row justify-between items-center gap-6 pb-6 border-b border-white/[0.08]">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded bg-[#12151B] border border-white/[0.07] shadow-inner">
            <span className="daw-led daw-led-active" />
            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">trustnodelogic.com</span>
            <ChevronRight size={10} className="text-slate-600" />
            <span className="font-mono text-[9px] font-bold text-cyan-400 uppercase tracking-[0.2em]">chordcreate</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center lg:justify-start gap-3">
            <span>ChordFlow</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 tracking-widest uppercase">HDX ENGINE</span>
          </h1>
          <p className="text-slate-400 text-[11px] font-mono mt-1.5 tracking-wider">
            8-step chord sequencer &nbsp;·&nbsp; voice leading visualizer &nbsp;·&nbsp; MIDI export
          </p>
        </div>

        {/* Global Controls / Master Transport Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 bg-[#12151B] p-2.5 rounded-xl border border-white/[0.08] shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]">
             {/* Vibe & Progression Selector */}
             <div className="flex items-center gap-1.5">
               <div className="relative">
                 <select
                   value={selectedProgressionId ? `preset:${selectedProgressionId}` : (selectedVibeId ? `vibe:${selectedVibeId}` : '')}
                   onChange={(e) => handleVibeSelect(e.target.value)}
                   className="appearance-none bg-[#090B0F] text-slate-200 border border-white/[0.09] hover:border-cyan-400/40 rounded-lg py-2 pl-8 pr-7 text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer transition-colors max-w-[220px] sm:max-w-none truncate shadow-inner"
                   title="Select a harmonic vibe or progression"
                 >
                   <option value="" disabled>GENRE / MOOD</option>
                   {VIBE_GROUPS.map(vibe => (
                     <optgroup key={vibe.id} label={`${vibe.icon} ${vibe.name}`} className="bg-[#12151B] text-cyan-400 font-bold">
                       <option value={`vibe:${vibe.id}`} className="bg-[#12151B] text-slate-100 font-semibold">
                         {vibe.icon} All {vibe.name} (Cycle 1-{vibe.progressions.length})
                       </option>
                       {vibe.progressions.map((p, idx) => (
                         <option key={p.id} value={`preset:${p.id}`} className="bg-[#090B0F] text-slate-300 font-normal">
                           &nbsp;&nbsp;{idx + 1}. {p.name}
                         </option>
                       ))}
                     </optgroup>
                   ))}
                 </select>
                 <Music2 size={13} className="absolute left-2.5 top-2.5 text-cyan-400 pointer-events-none" />
                 <div className="absolute right-2.5 top-3 pointer-events-none text-slate-500">
                   <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
               </div>
               <button
                 onClick={randomizeVibeProgression}
                 className="p-2 rounded-lg bg-[#090B0F] hover:bg-[#161B24] text-slate-400 hover:text-cyan-300 border border-white/[0.09] hover:border-cyan-400/40 transition-all flex items-center justify-center shadow-inner"
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
                 className="appearance-none bg-[#090B0F] text-slate-200 border border-white/[0.09] hover:border-cyan-400/40 rounded-lg py-2 pl-8 pr-7 text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer transition-colors shadow-inner"
                 title="Select synth sound model"
               >
                 {SYNTH_TONE_OPTIONS.map(t => (
                   <option key={t.id} value={t.id} className="bg-[#12151B] text-slate-200">
                     🎹 {t.name}
                   </option>
                 ))}
               </select>
               <SlidersHorizontal size={13} className="absolute left-2.5 top-2.5 text-cyan-400 pointer-events-none" />
               <div className="absolute right-2.5 top-3 pointer-events-none text-slate-500">
                 <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                 </svg>
               </div>
             </div>

             <div className="w-[1px] h-6 bg-white/[0.08] hidden md:block"></div>

             <button
                onClick={() => exportMidi(0, 8, 'full-progression.mid')}
                className="flex items-center gap-2 px-3.5 py-2 bg-[#090B0F] hover:bg-[#161B24] text-slate-200 rounded-lg border border-white/[0.09] hover:border-cyan-400/40 transition-all font-mono text-xs font-semibold shadow-inner"
             >
                <Download size={14} className="text-cyan-400" />
                EXPORT MIDI
             </button>

            <div className="w-[1px] h-6 bg-white/[0.08] hidden md:block"></div>

            <div className="flex items-center gap-2.5 px-2 py-1 bg-[#090B0F] rounded-lg border border-white/[0.08] shadow-inner">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-0.5">BPM</span>
                <input 
                    type="range" 
                    min="60" 
                    max="160" 
                    value={bpm} 
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-20 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-cyan-300 w-7 text-right tabular-nums">{bpm}</span>
            </div>

            <div className="w-[1px] h-6 bg-white/[0.08] hidden md:block"></div>

            <button
                onClick={() => togglePlayback('ALL')}
                className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all min-w-[110px] justify-center border
                    ${playbackMode === 'ALL'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-[0_0_16px_rgba(244,63,94,0.35)] hover:bg-rose-500/30' 
                        : 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.35)] hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    }
                `}
            >
                {playbackMode === 'ALL' ? (
                    <><Square size={13} fill="currentColor" /> STOP ALL</>
                ) : (
                    <><Play size={13} fill="currentColor" /> PLAY ALL</>
                )}
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={progression.map(p => p.id)} strategy={rectSortingStrategy}>
          <main className="w-full max-w-6xl flex flex-col gap-6 mb-8">
            {renderRow(1, 0)}
            {renderRow(2, 4)}
          </main>
        </SortableContext>
      </DndContext>

      {/* Master Keyboard Visualizer */}
      <div className="w-full max-w-6xl mb-8">
        <div className="bg-[#12151B] border border-white/[0.08] rounded-xl p-5 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                    <span className="daw-led daw-led-active" />
                    <Music2 size={15} className="text-cyan-400" />
                    <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-[0.2em]">MASTER KEYBED MONITOR</h3>
                </div>
                <div className="font-mono text-[10px] text-slate-400 bg-[#090B0F] px-2.5 py-1 rounded border border-white/[0.06]">
                    {playingIndex !== null 
                        ? <span className="text-cyan-400 font-semibold">{progression[playingIndex].chord} &nbsp;·&nbsp; SLOT {String(playingIndex + 1).padStart(2, '0')}</span> 
                        : 'CLICK A SLOT OR KEY TO AUDITION'}
                </div>
            </div>
            
            <PianoKeyboard 
                activeNotes={playingIndex !== null ? audioService.getNotesForChord(progression[playingIndex].chord) : []} 
                height={170} 
                interactive={true}
            />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-slate-500 text-xs font-mono border-t border-white/[0.08] w-full max-w-6xl text-center flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          © 2026 <a href="https://trustnodelogic.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">Trust Node Logic</a> · Justin Ray (JRAY / loserdub)
        </div>
        <div className="flex items-center gap-4">
          <a href="https://trustnodelogic.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">trustnodelogic.com</a>
          <span>·</span>
          <a href="https://www.reddit.com/r/hybridproduction/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">r/hybridproduction</a>
        </div>
      </footer>

    </div>
  );
};

export default App;