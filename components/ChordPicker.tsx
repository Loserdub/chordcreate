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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <div 
        className="bg-[#12151B] border border-cyan-500/30 rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,255,0.15)] w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-3.5 border-b border-white/[0.08] flex justify-between items-center bg-gradient-to-r from-[#181C24] to-[#12151B]">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <span className="daw-led daw-led-active" />
            <Music size={16} />
            <h3 className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-slate-200">AUDIOSUITE // CHORD BROWSER</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100 hover:bg-[#252C3A] transition-colors p-1.5 rounded border border-white/[0.06]">
            <X size={15} />
          </button>
        </div>
        
        <div className="flex flex-1 overflow-hidden min-h-[400px]">
          {/* Sidebar - Roots */}
          <div className="w-20 sm:w-24 border-r border-white/[0.08] bg-[#0A0C10] overflow-y-auto">
            {ROOT_NOTES.map(root => (
              <button
                key={root}
                onClick={() => setSelectedRoot(root)}
                className={`w-full py-3 px-2 font-mono text-xs text-center transition-all ${
                  selectedRoot === root 
                    ? 'bg-cyan-500/15 text-cyan-300 border-l-2 border-cyan-400 font-bold shadow-[inset_0_0_12px_rgba(0,229,255,0.1)]' 
                    : 'text-slate-500 hover:bg-[#161A22] hover:text-slate-200 border-l-2 border-transparent font-medium'
                }`}
              >
                {root}
              </button>
            ))}
          </div>
          
          {/* Content - Chords */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#0E1117]">
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
                     p-3.5 rounded-lg border text-left flex flex-col gap-1.5 transition-all
                     ${selectedChord === chord 
                        ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/40 to-slate-900/90 shadow-[0_0_18px_rgba(0,229,255,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] scale-[1.02]' 
                        : 'border-white/[0.07] bg-gradient-to-b from-[#181C24] to-[#13161D] hover:border-cyan-500/40 hover:bg-[#1E232E] hover:-translate-y-0.5 shadow-sm'}
                   `}
                 >
                   <span className={`font-bold font-mono text-base ${selectedChord === chord ? 'text-cyan-300' : 'text-slate-100'}`}>
                     {chord}
                   </span>
                   <span className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                     {getChordDescription(chord)}
                   </span>
                 </button>
               )) : (
                 <div className="col-span-full flex items-center justify-center h-full text-slate-500 font-mono text-sm">
                   No chords found for root {selectedRoot}
                 </div>
               )}
             </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="p-3 bg-[#0A0C10] border-t border-white/[0.08] flex justify-between items-center font-mono text-[10px] text-slate-400">
          <div>{hoveredChord ? <span className="text-cyan-400 font-semibold">PREVIEW: {hoveredChord}</span> : 'HOVER TO AUDITION • CLICK TO ASSIGN'}</div>
          <div>ROOT: <span className="text-cyan-400 font-bold">{selectedRoot}</span></div>
        </div>
      </div>
    </div>
  );
};
