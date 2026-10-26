import React from 'react';
import { audioService } from '../services/audioService';

interface PianoKeyboardProps {
  activeNotes: string[];
  height?: number;
  interactive?: boolean;
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ 
  activeNotes, 
  height = 120, 
  interactive = true 
}) => {
  const renderKeyboard = () => {
    const startOctave = 4;
    const endOctave = 5;
    const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackNotes = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];

    const keys: React.ReactNode[] = [];
    let whiteKeyIndex = 0;

    for (let oct = startOctave; oct <= endOctave; oct++) {
      whiteNotes.forEach((note, idx) => {
        const fullNote = `${note}${oct}`;
        const isActive = activeNotes.includes(fullNote) || 
                         (note === 'E' && activeNotes.includes(`Fb${oct}`)) || 
                         (note === 'B' && activeNotes.includes(`Cb${oct}`)) ||
                         (note === 'C' && activeNotes.includes(`B#${oct-1}`)) ||
                         (note === 'F' && activeNotes.includes(`E#${oct}`));

        // White Key
        keys.push(
          <div
            key={fullNote}
            onMouseDown={() => interactive && audioService.playNote(fullNote)}
            className={`
              relative flex-1 border-b-[3px] border-l border-r border-slate-400/50 rounded-b-[3px] cursor-pointer select-none 
              transition-all duration-75 ease-out origin-top
              ${isActive 
                ? 'bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600 border-b-cyan-700 shadow-[inset_0_3px_6px_rgba(0,0,0,0.35),0_0_14px_rgba(0,229,255,0.4)] z-0 translate-y-[2px] scale-y-[0.98]' 
                : 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 hover:from-white hover:to-slate-200 shadow-sm'
              }
            `}
            style={{ height: height }}
          >
             {/* Key Label */}
             {isActive && (
               <div className="absolute bottom-1.5 inset-x-0 text-center font-mono text-[10px] font-bold text-slate-950 pointer-events-none drop-shadow-sm tracking-tight">
                 {note}
               </div>
             )}
          </div>
        );

        // Black Key
        const blackNote = blackNotes[idx];
        if (blackNote) {
            const sharpName = `${blackNote}${oct}`;
            const enharmonicMap: Record<string, string> = {
                'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
            };
            const flatVariant = enharmonicMap[blackNote] ? `${enharmonicMap[blackNote]}${oct}` : '';
            
            const isBlackActive = activeNotes.includes(sharpName) || activeNotes.includes(flatVariant);

            keys.push(
                <div
                    key={sharpName}
                    onMouseDown={(e) => { e.stopPropagation(); interactive && audioService.playNote(sharpName); }}
                    className={`
                        absolute z-10 w-[7.8%] h-[60%] rounded-b-[3px] rounded-t-[1px] cursor-pointer select-none 
                        transition-all duration-75 ease-out origin-top
                        border-x border-b border-black/80 ring-1 ring-white/10
                        ${isBlackActive 
                            ? 'bg-gradient-to-b from-sky-400 via-cyan-600 to-cyan-800 border-cyan-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_0_12px_rgba(0,229,255,0.5)] translate-y-[1px] scale-[0.97]' 
                            : 'bg-gradient-to-b from-slate-800 via-[#151922] to-[#0A0C10] shadow-[0_4px_8px_rgba(0,0,0,0.8)]'
                        }
                    `}
                    style={{
                        left: `${(whiteKeyIndex + 1) * (100 / 14) - 3.9}%`,
                    }}
                >
                   {!isBlackActive && <div className="absolute inset-x-1 bottom-1.5 h-[1px] bg-white/20"></div>}
                </div>
            );
        }
        whiteKeyIndex++;
      });
    }

    return (
        <div className="relative flex gap-[2px] w-full h-full bg-[#080A0E] p-1.5 rounded-lg shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] overflow-hidden border border-white/[0.08]">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-rose-900/60 z-20 pointer-events-none"></div>
            {keys}
        </div>
    );
  };

  return (
    <div className="w-full select-none" style={{ height: height + 12 }}>
      {renderKeyboard()}
    </div>
  );
};