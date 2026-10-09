import React, { useState } from 'react';
import { AVAILABLE_CHORDS, getChordDescription } from '../constants';
import { audioService } from '../services/audioService';
import { X, Music } from 'lucide-react';

interface ChordPickerProps {
  selectedChord: string;
  onSelect: (chord: string) => void;
  onClose: () => void;
}

const ROOT_NOTES = ['C', 'C#', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'Ab', 'A', 'Bb', 'B'];

export const ChordPicker: React.FC<ChordPickerProps> = ({ selectedChord, onSelect, onClose }) => {
  const [selectedRoot, setSelectedRoot] = useState<string>(selectedChord.split(' ')[0] || 'C');
  const [hoveredChord, setHoveredChord] = useState<string | null>(null);

  // Use a timeout so we don't spam chords when hovering too quickly across many
  const [previewTimeout, setPreviewTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const rootChords = AVAILABLE_CHORDS.filter(c => c.split(' ')[0] === selectedRoot);

  const handleHover = (chord: string) => {
    setHoveredChord(chord);
    if (previewTimeout) clearTimeout(previewTimeout);
    
    const timeout = setTimeout(() => {
      audioService.playChord(chord, "8n");
    }, 150); // small delay to prevent preview spam
    setPreviewTimeout(timeout);
  };

  const handleMouseLeave = () => {
    setHoveredChord(null);
    if (previewTimeout) clearTimeout(previewTimeout);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-amber-100/[0.08] flex justify-between items-center bg-stone-950">
          <div className="flex items-center gap-2 text-amber-400">
            <Music size={18} />
            <h3 className="font-mono font-bold tracking-wider">CHORD LIBRARY</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-amber-50 transition-colors bg-stone-800 p-1 rounded-md">
            <X size={18} />
          </button>
        </div>
        
        <div className="flex flex-1 overflow-hidden min-h-[400px]">
          {/* Sidebar - Roots */}
          <div className="w-20 sm:w-24 border-r border-amber-100/[0.08] bg-stone-950/80 overflow-y-auto">
            {ROOT_NOTES.map(root => (
              <button
                key={root}
                onClick={() => setSelectedRoot(root)}
                className={`w-full py-3.5 px-2 font-mono font-bold text-sm text-center transition-all ${
                  selectedRoot === root 
                    ? 'bg-amber-500/20 text-amber-400 border-l-2 border-amber-500 shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]' 
                    : 'text-stone-500 hover:bg-stone-800 hover:text-stone-300 border-l-2 border-transparent'
                }`}
              >
                {root}
              </button>
            ))}
          </div>
          
          {/* Content - Chords */}
          <div className="flex-1 p-4 overflow-y-auto bg-stone-900/50">
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
               {rootChords.length > 0 ? rootChords.map(chord => (
                 <button
                   key={chord}
                   onMouseEnter={() => handleHover(chord)}
                   onMouseLeave={handleMouseLeave}
                   onClick={() => {
                       onSelect(chord);
                       onClose();
                   }}
                   className={`
                     p-3.5 rounded-xl border text-left flex flex-col gap-1.5 transition-all
                     ${selectedChord === chord 
                        ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)] scale-[1.02]' 
                        : 'border-amber-100/[0.06] bg-stone-950/80 hover:border-amber-500/40 hover:bg-stone-800 hover:-translate-y-0.5'}
                   `}
                 >
                   <span className={`font-bold font-mono text-base ${selectedChord === chord ? 'text-amber-400' : 'text-stone-200'}`}>
                     {chord}
                   </span>
                   <span className="text-[11px] text-stone-500 italic leading-snug line-clamp-2">
                     {getChordDescription(chord)}
                   </span>
                 </button>
               )) : (
                 <div className="col-span-full flex items-center justify-center h-full text-stone-500 font-mono text-sm">
                   No chords found for root {selectedRoot}
                 </div>
               )}
             </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="p-3 bg-stone-950 border-t border-amber-100/[0.08] flex justify-between items-center font-mono text-[10px] text-stone-500">
          <div>{hoveredChord ? `Previewing: ${hoveredChord}` : 'Hover to preview • Click to select'}</div>
          <div>ROOT: <span className="text-amber-400 font-bold">{selectedRoot}</span></div>
        </div>
      </div>
    </div>
  );
};
