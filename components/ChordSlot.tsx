import React from 'react';
import { AVAILABLE_CHORDS, getChordDescription } from '../constants';
import { Play, Music, Volume2 } from 'lucide-react';
import { audioService } from '../services/audioService';
import { PianoKeyboard } from './PianoKeyboard';

interface ChordSlotProps {
  id: number;
  selectedChord: string;
  isActive: boolean;
  onSelect: (chord: string) => void;
  onPlay: () => void;
  isPlaying: boolean;
}

export const ChordSlot: React.FC<ChordSlotProps> = ({
  id,
  selectedChord,
  isActive,
  onSelect,
  onPlay,
  isPlaying
}) => {
  const activeNotes = audioService.getNotesForChord(selectedChord);
  const formattedSlotNumber = String(id + 1).padStart(2, '0');

  return (
    <div 
      className={`
        relative flex flex-col gap-3 p-4 rounded-xl transition-all duration-200 backdrop-blur-sm
        ${isActive || isPlaying 
            ? 'bg-neutral-900/90 border border-orange-500/80 shadow-[0_0_20px_rgba(249,115,22,0.2)] scale-[1.01]' 
            : 'bg-neutral-900/40 border border-white/[0.08] hover:border-white/[0.18] hover:bg-neutral-900/60'
        }
      `}
    >
      {/* Header with Number Badge and Play Button */}
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-950 px-2 py-0.5 rounded border border-white/[0.06]">
          SLOT {formattedSlotNumber}
        </span>
        <button
          onClick={onPlay}
          className={`
            w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-95 border
            ${isPlaying 
                ? 'bg-orange-500 text-neutral-950 border-orange-400 shadow-md shadow-orange-500/30' 
                : 'bg-neutral-800/80 text-neutral-400 border-white/[0.08] hover:border-orange-500/50 hover:text-orange-400 hover:bg-neutral-800'
            }
          `}
          title={`Play slot ${id + 1}`}
        >
          {isPlaying ? <Volume2 size={13} /> : <Play size={13} className="ml-0.5" />}
        </button>
      </div>

      {/* Chord Selector */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 group-hover:text-orange-400 transition-colors">
          <Music size={13} />
        </div>
        <select
          value={selectedChord}
          onChange={(e) => onSelect(e.target.value)}
          className="appearance-none w-full bg-neutral-950 text-neutral-100 border border-white/[0.08] rounded-lg py-2 pl-8 pr-8 text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 cursor-pointer hover:border-white/[0.2] transition-colors"
        >
          {AVAILABLE_CHORDS.map((chord) => (
            <option key={chord} value={chord} className="bg-neutral-900 text-neutral-200">
              {chord}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-neutral-500">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Chord Description */}
      <div className="px-0.5 min-h-[1.5rem] flex items-start">
        <p className="text-[10px] leading-tight text-neutral-400 font-sans italic">
          {getChordDescription(selectedChord)}
        </p>
      </div>

      {/* Mini Visualizer / Keyboard */}
      <div className="mt-auto pt-2 border-t border-white/[0.06]">
        <div className="text-[9px] font-mono text-neutral-500 mb-1.5 font-bold text-center uppercase tracking-widest">
          Voice Leading
        </div>
        <PianoKeyboard activeNotes={activeNotes} height={36} interactive={false} />
      </div>
    </div>
  );
};