import React, { useState } from 'react';
import { getChordDescription } from '../constants';
import { Play, Music, Volume2, GripVertical } from 'lucide-react';
import { audioService } from '../services/audioService';
import { PianoKeyboard } from './PianoKeyboard';
import { ChordPicker } from './ChordPicker';

interface ChordSlotProps {
  id: number;
  selectedChord: string;
  isActive: boolean;
  onSelect: (chord: string) => void;
  onPlay: () => void;
  isPlaying: boolean;
  bpm: number;
  // Drag props provided by Sortable wrapper
  attributes?: any;
  listeners?: any;
  setNodeRef?: (node: HTMLElement | null) => void;
  style?: React.CSSProperties;
  isDragging?: boolean;
}

export const ChordSlot: React.FC<ChordSlotProps> = ({
  id,
  selectedChord,
  isActive,
  onSelect,
  onPlay,
  isPlaying,
  bpm,
  attributes,
  listeners,
  setNodeRef,
  style,
  isDragging
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const activeNotes = audioService.getNotesForChord(selectedChord);
  const formattedSlotNumber = String(id + 1).padStart(2, '0');

  // Calculate animation duration based on BPM (1 beat = 60/BPM seconds)
  const beatDuration = 60 / bpm;

  return (
    <>
      <div 
        ref={setNodeRef}
        style={style}
        className={`
          relative flex flex-col gap-3 p-4 rounded-xl transition-all duration-200 backdrop-blur-sm overflow-hidden
          ${isDragging ? 'opacity-50 z-50 shadow-2xl scale-105 rotate-1' : ''}
          ${isActive || isPlaying 
              ? 'bg-gradient-to-b from-[#1C222E] to-[#141822] border border-cyan-400 shadow-[0_0_24px_rgba(0,229,255,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] scale-[1.01]' 
              : 'bg-gradient-to-b from-[#181C24] to-[#12151B] border border-white/[0.08] hover:border-cyan-500/35 hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_12px_rgba(0,0,0,0.5)]'
          }
        `}
      >
        {/* Dynamic Laser Playhead Sweep */}
        {(isPlaying || isActive) && (
          <div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-400/25 border-r border-cyan-300 z-0 pointer-events-none"
            style={{ 
                animation: `sweep ${beatDuration}s linear forwards` 
            }}
          />
        )}

        <div className="relative z-10 flex flex-col h-full gap-3">
            {/* Header with Drag Handle, Number Badge with LED Jewel, and Play Button */}
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1.5">
                <button 
                  {...attributes} 
                  {...listeners}
                  className="text-slate-500 hover:text-cyan-400 cursor-grab active:cursor-grabbing transition-colors -ml-1"
                  title="Drag to reorder"
                >
                  <GripVertical size={14} />
                </button>
                <div className="flex items-center gap-1.5 bg-[#090B0F] px-2 py-0.5 rounded border border-white/[0.07]">
                  <span className={`daw-led ${isPlaying || isActive ? 'daw-led-active' : 'daw-led-off'}`} />
                  <span className="font-mono text-[9px] font-bold text-slate-300 uppercase tracking-[0.16em]">
                    SLOT {formattedSlotNumber}
                  </span>
                </div>
              </div>
              <button
                onClick={onPlay}
                className={`
                  w-7 h-7 rounded flex items-center justify-center transition-all active:scale-95 border
                  ${isPlaying 
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]' 
                      : 'bg-[#0D1015] text-slate-400 border-white/[0.08] hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-[#161B24]'
                  }
                `}
                title={`Play slot ${id + 1}`}
              >
                {isPlaying ? <Volume2 size={13} /> : <Play size={13} className="ml-0.5" />}
              </button>
            </div>

            {/* Recessed OLED Chord Display Button */}
            <button
              onClick={() => setIsPickerOpen(true)}
              className="group relative w-full flex items-center bg-[#090B0F] text-slate-100 border border-white/[0.09] rounded-md py-2.5 px-3 text-left shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] hover:border-cyan-400/40 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.7),0_0_12px_rgba(0,229,255,0.15)] transition-all"
            >
              <Music size={13} className="text-cyan-500/70 group-hover:text-cyan-400 transition-colors mr-2 flex-shrink-0" />
              <span className="flex-1 text-xs font-mono font-bold tracking-wide text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                {selectedChord}
              </span>
              <svg className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Chord Description */}
            <div className="px-0.5 min-h-[1.5rem] flex items-start">
              <p className="text-[10px] leading-tight text-slate-400 font-sans">
                {getChordDescription(selectedChord)}
              </p>
            </div>

            {/* Mini Visualizer / Keyboard */}
            <div className="mt-auto pt-2 border-t border-white/[0.07]">
              <div className="text-[9px] font-mono text-slate-500 mb-1.5 font-bold text-center uppercase tracking-[0.18em]">
                Voice Leading
              </div>
              <PianoKeyboard activeNotes={activeNotes} height={36} interactive={false} />
            </div>
        </div>
      </div>

      {isPickerOpen && (
        <ChordPicker
          selectedChord={selectedChord}
          onSelect={onSelect}
          onClose={() => setIsPickerOpen(false)}
        />
      )}
    </>
  );
};