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
  // Improved Render Strategy: Absolute positioning for black keys on top of a flex row of white keys
  const renderKeyboard = () => {
    const startOctave = 4;
    const endOctave = 5;
    const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackNotes = ['C#', 'D#', null, 'F#', 'G#', 'A#', null]; // Spacing map

    const keys: React.ReactNode[] = [];
    let whiteKeyIndex = 0;

    for (let oct = startOctave; oct <= endOctave; oct++) {
      whiteNotes.forEach((note, idx) => {
        const fullNote = `${note}${oct}`;
        // Logic to determine if a white key is effectively active (handling enharmonics crudely for display)
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
              relative flex-1 border-b-[3px] border-l border-r border-neutral-300 rounded-[3px] cursor-pointer select-none 
              transition-all duration-75 ease-out origin-top
              ${isActive 
                ? 'bg-gradient-to-b from-orange-400 to-orange-600 border-orange-700 shadow-[inset_0_3px_5px_rgba(0,0,0,0.3)] z-0 translate-y-[2px] scale-y-[0.98]' 
                : 'bg-neutral-200 hover:bg-neutral-100 shadow-sm'
              }
            `}
            style={{ height: height }}
          >
             {/* Key Label */}
             {isActive && (
               <div className="absolute bottom-3 inset-x-0 text-center text-xs font-bold text-white pointer-events-none shadow-black drop-shadow-md">
                 {note}
               </div>
             )}
          </div>
        );

        // Black Key (if exists after this white key)
        const blackNote = blackNotes[idx];
        if (blackNote) {
            // Find if active. Check both Sharp and Flat names
            const sharpName = `${blackNote}${oct}`;
            // Quick enhance mapping
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
                        absolute z-10 w-[8%] h-[60%] rounded-b-[4px] rounded-t-[2px] cursor-pointer select-none 
                        transition-all duration-75 ease-out origin-top
                        border-x border-b border-black ring-1 ring-white/10
                        ${isBlackActive 
                            ? 'bg-gradient-to-b from-orange-600 to-orange-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] translate-y-[1px] scale-[0.96]' 
                            : 'bg-gradient-to-b from-neutral-800 to-black shadow-lg'
                        }
                    `}
                    style={{
                        left: `${(whiteKeyIndex + 1) * (100 / 14) - 4}%`, // 14 white keys total (2 octaves)
                    }}
                >
                   {/* Optional: subtle line detail for tactile look */}
                   {!isBlackActive && <div className="absolute inset-x-1 bottom-2 h-[1px] bg-neutral-800/30"></div>}
                </div>
            );
        }
        whiteKeyIndex++;
      });
    }

    return (
        <div className="relative flex gap-[2px] w-full h-full bg-neutral-900 p-1.5 rounded-lg shadow-inner overflow-hidden border border-neutral-800">
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