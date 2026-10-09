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
              ? 'bg-stone-900/90 border border-amber-500/80 shadow-[0_0_20px_rgba(249,115,22,0.2)] scale-[1.01]' 
              : 'bg-stone-900/40 border border-amber-100/[0.08] hover:border-amber-100/[0.18] hover:bg-stone-900/60'
          }
        `}
      >
        {/* Dynamic Playhead Background Animation */}
        {(isPlaying || isActive) && (
          <div 
            className="absolute left-0 top-0 bottom-0 bg-amber-500/10 z-0"
            style={{ 
                animation: `sweep ${beatDuration}s linear forwards` 
            }}
          />
        )}

        <div className="relative z-10 flex flex-col h-full gap-3">
            {/* Header with Drag Handle, Number Badge and Play Button */}
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1.5">
                <button 
                  {...attributes} 
                  {...listeners}
                  className="text-stone-600 hover:text-amber-400 cursor-grab active:cursor-grabbing transition-colors -ml-1"
                  title="Drag to reorder"
                >
                  <GripVertical size={14} />
                </button>
                <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-stone-950 px-2 py-0.5 rounded border border-amber-100/[0.06]">
                  SLOT {formattedSlotNumber}
                </span>
              </div>
              <button
                onClick={onPlay}
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-95 border
                  ${isPlaying 
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/30' 
                      : 'bg-stone-800/80 text-stone-400 border-amber-100/[0.08] hover:border-amber-500/50 hover:text-amber-400 hover:bg-stone-800'
                  }
                `}
                title={`Play slot ${id + 1}`}
              >
                {isPlaying ? <Volume2 size={13} /> : <Play size={13} className="ml-0.5" />}
              </button>
            </div>

            {/* Custom Chord Selector Button */}
            <button
              onClick={() => setIsPickerOpen(true)}
              className="group relative w-full flex items-center bg-stone-950 text-stone-100 border border-amber-100/[0.08] rounded-lg py-2 pl-3 pr-3 text-left focus:outline-none focus:ring-1 focus:ring-amber-500 hover:border-amber-100/[0.2] hover:bg-stone-900 transition-all"
            >
              <Music size={13} className="text-stone-500 group-hover:text-amber-400 transition-colors mr-2 flex-shrink-0" />
              <span className="flex-1 text-xs font-mono font-bold truncate">
                {selectedChord}
              </span>
              <svg className="h-3.5 w-3.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Chord Description */}
            <div className="px-0.5 min-h-[1.5rem] flex items-start">
              <p className="text-[10px] leading-tight text-stone-400 font-sans italic">
                {getChordDescription(selectedChord)}
              </p>
            </div>

            {/* Mini Visualizer / Keyboard */}
            <div className="mt-auto pt-2 border-t border-amber-100/[0.06]">
              <div className="text-[9px] font-mono text-stone-500 mb-1.5 font-bold text-center uppercase tracking-widest">
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