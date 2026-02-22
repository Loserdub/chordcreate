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

  return (
    <div 
      className={`
        relative flex flex-col gap-3 p-4 rounded-xl border transition-all duration-300
        ${isActive || isPlaying 
            ? 'bg-neutral-900 border-orange-500/80 shadow-[0_0_25px_rgba(249,115,22,0.15)] scale-[1.02]' 
            : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
        }
      `}
    >
      {/* Header with Number and Play Button */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
            Slot {id + 1}
        </span>
        <button
          onClick={onPlay}
          className={`
            p-2 rounded-full transition-all active:scale-95
            ${isPlaying 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' 
                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-orange-400'
            }
          `}
        >
          {isPlaying ? <Volume2 size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Chord Selector */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            <Music size={14} />
        </div>
        <select
          value={selectedChord}
          onChange={(e) => onSelect(e.target.value)}
          className="appearance-none w-full bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-lg py-2 pl-9 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-semibold cursor-pointer hover:bg-neutral-900 transition-colors"
        >
          {AVAILABLE_CHORDS.map((chord) => (
            <option key={chord} value={chord}>
              {chord}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Chord Description */}
      <div className="px-1 min-h-[1.5rem] flex items-start">
        <p className="text-[11px] leading-tight text-neutral-500 font-medium italic">
            {getChordDescription(selectedChord)}
        </p>
      </div>

      {/* Mini Visualizer / Keyboard in the box as requested */}
      <div className="mt-auto pt-2 border-t border-neutral-800">
        <div className="text-[10px] text-neutral-600 mb-1 font-medium text-center uppercase tracking-wider">
            Voice Leading
        </div>
        <PianoKeyboard activeNotes={activeNotes} height={40} interactive={false} />
      </div>
    </div>
  );
};