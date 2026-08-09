import { ChordMap, VibeGroup } from './types';

// Extended mapping of common and exotic chords to their MIDI note names (using 4th/5th octave as base)
export const CHORD_LIBRARY: ChordMap = {
  // C
  "C Maj": ["C4", "E4", "G4"],
  "C Min": ["C4", "Eb4", "G4"],
  "C 7": ["C4", "E4", "G4", "Bb4"],
  "C Maj7": ["C4", "E4", "G4", "B4"],
  "C Min7": ["C4", "Eb4", "G4", "Bb4"],
  "C Sus2": ["C4", "D4", "G4"],
  "C Sus4": ["C4", "F4", "G4"],
  "C Add9": ["C4", "E4", "G4", "D5"],
  "C Maj9": ["C4", "E4", "G4", "B4", "D5"],
  "C Min9": ["C4", "Eb4", "G4", "Bb4", "D5"],
  "C 9": ["C4", "E4", "G4", "Bb4", "D5"],
  "C 7b9": ["C4", "E4", "G4", "Bb4", "Db5"],
  "C 7alt": ["C4", "E4", "Ab4", "Bb4", "Db5"],
  "C Maj6": ["C4", "E4", "G4", "A4"],
  "C Min6": ["C4", "Eb4", "G4", "A4"],
  "C Aug": ["C4", "E4", "G#4"],
  "C Dim7": ["C4", "Eb4", "Gb4", "A4"],

  // Db / C#
  "Db Maj": ["Db4", "F4", "Ab4"],
  "Db Min": ["Db4", "E4", "Ab4"],
  "Db 7": ["Db4", "F4", "Ab4", "B4"],
  "Db Maj7": ["Db4", "F4", "Ab4", "C5"],
  "Db Maj6": ["Db4", "F4", "Ab4", "Bb4"],
  "C# Min": ["C#4", "E4", "G#4"],
  "C# Dim7": ["C#4", "E4", "G4", "Bb4"],
  "C# m7b5": ["C#4", "E4", "G4", "B4"],

  // D
  "D Maj": ["D4", "F#4", "A4"],
  "D Min": ["D4", "F4", "A4"],
  "D 7": ["D4", "F#4", "A4", "C5"],
  "D Min7": ["D4", "F4", "A4", "C5"],
  "D Dim": ["D4", "F4", "Ab4"],
  "D Sus2": ["D4", "E4", "A4"],
  "D Sus4": ["D4", "G4", "A4"],
  "D Add9": ["D4", "F#4", "A4", "E5"],
  "D Maj9": ["D4", "F#4", "A4", "C#5", "E5"],
  "D Min9": ["D4", "F4", "A4", "C5", "E5"],
  "D 9": ["D4", "F#4", "A4", "C5", "E5"],
  "D 7b9": ["D4", "F#4", "A4", "C5", "Eb5"],
  "D 7alt": ["D4", "F#4", "Bb4", "C5", "Eb5"],
  "D m7b5": ["D4", "F4", "Ab4", "C5"],
  "D Dim7": ["D4", "F4", "Ab4", "B4"],
  "D Aug": ["D4", "F#4", "A#4"],

  // Eb
  "Eb Maj": ["Eb4", "G4", "Bb4"],
  "Eb Min": ["Eb4", "Gb4", "Bb4"],
  "Eb 7": ["Eb4", "G4", "Bb4", "Db5"],
  "Eb Maj7": ["Eb4", "G4", "Bb4", "D5"],
  "Eb Add9": ["Eb4", "G4", "Bb4", "F5"],
  "Eb Maj9": ["Eb4", "G4", "Bb4", "D5", "F5"],
  "Eb Min9": ["Eb4", "Gb4", "Bb4", "Db5", "F5"],
  "Eb 9": ["Eb4", "G4", "Bb4", "Db5", "F5"],
  "Eb 7b9": ["Eb4", "G4", "Bb4", "Db5", "E5"],

  // E
  "E Maj": ["E4", "G#4", "B4"],
  "E Min": ["E4", "G4", "B4"],
  "E 7": ["E4", "G#4", "B4", "D5"],
  "E Min7": ["E4", "G4", "B4", "D5"],
  "E Sus4": ["E4", "A4", "B4"],
  "E Add9": ["E4", "G#4", "B4", "F#5"],
  "E Maj9": ["E4", "G#4", "B4", "D#5", "F#5"],
  "E Min9": ["E4", "G4", "B4", "D5", "F#5"],
  "E 7b9": ["E4", "G#4", "B4", "D5", "F5"],
  "E 7#9": ["E4", "G#4", "B4", "D5", "G5"],
  "E 7alt": ["E4", "G#4", "C5", "D5", "F5"],
  "E m7b5": ["E4", "G4", "Bb4", "D5"],
  "E Aug": ["E4", "G#4", "C5"],

  // F
  "F Maj": ["F4", "A4", "C5"],
  "F Min": ["F4", "Ab4", "C5"],
  "F 7": ["F4", "A4", "C5", "Eb5"],
  "F Maj7": ["F4", "A4", "C5", "E5"],
  "F Min7": ["F4", "Ab4", "C5", "Eb5"],
  "F Sus2": ["F4", "G4", "C5"],
  "F Sus4": ["F4", "Bb4", "C5"],
  "F 7sus4": ["F4", "Bb4", "C5", "Eb5"],
  "F Add9": ["F4", "A4", "C5", "G5"],
  "F Maj9": ["F4", "A4", "C5", "E5", "G5"],
  "F Min9": ["F4", "Ab4", "C5", "Eb5", "G5"],
  "F 9": ["F4", "A4", "C5", "Eb5", "G5"],
  "F Maj6": ["F4", "A4", "C5", "D5"],

  // F# / Gb
  "F# Maj": ["F#4", "A#4", "C#5"],
  "F# Min": ["F#4", "A4", "C#5"],
  "F# Maj9": ["F#4", "A#4", "C#5", "F5", "G#5"],
  "F# 7b9": ["F#4", "A#4", "C#5", "E5", "G5"],
  "F# 7alt": ["F#4", "A#4", "D5", "E5", "G5"],
  "F# m7b5": ["F#4", "A4", "C5", "E5"],
  "F# Dim7": ["F#4", "A4", "C5", "Eb5"],
  "F# Aug": ["F#4", "A#4", "D5"],

  // G
  "G Maj": ["G4", "B4", "D5"],
  "G Min": ["G4", "Bb4", "D5"],
  "G 7": ["G4", "B4", "D5", "F5"],
  "G Maj7": ["G4", "B4", "D5", "F#5"],
  "G Min7": ["G4", "Bb4", "D5", "F5"],
  "G Sus2": ["G4", "A4", "D5"],
  "G Sus4": ["G4", "C5", "D5"],
  "G 7sus4": ["G4", "C5", "D5", "F5"],
  "G Add9": ["G4", "B4", "D5", "A5"],
  "G Maj9": ["G4", "B4", "D5", "F#5", "A5"],
  "G Min9": ["G4", "Bb4", "D5", "F5", "A5"],
  "G 9": ["G4", "B4", "D5", "F5", "A5"],
  "G 7b9": ["G4", "B4", "D5", "F5", "Ab5"],
  "G 7#9": ["G4", "B4", "D5", "F5", "Bb5"],
  "G 7alt": ["G4", "B4", "Eb5", "F5", "Ab5"],
  "G Maj6": ["G4", "B4", "D5", "E5"],
  "G Aug": ["G4", "B4", "D#5"],

  // Ab / G#
  "Ab Maj": ["Ab4", "C5", "Eb5"],
  "Ab Min": ["Ab4", "B4", "Eb5"],
  "Ab Maj7": ["Ab4", "C5", "Eb5", "G5"],
  "Ab Maj9": ["Ab4", "C5", "Eb5", "G5", "Bb5"],
  "Ab Maj6": ["Ab4", "C5", "Eb5", "F5"],
  "G# m7b5": ["G#4", "B4", "D5", "F#5"],

  // A
  "A Maj": ["A4", "C#5", "E5"],
  "A Min": ["A4", "C5", "E5"],
  "A 7": ["A4", "C#5", "E5", "G5"],
  "A Min7": ["A4", "C5", "E5", "G5"],
  "A Dim": ["A4", "C5", "Eb5"],
  "A Sus2": ["A4", "B4", "E5"],
  "A Sus4": ["A4", "D5", "E5"],
  "A 7sus4": ["A4", "D5", "E5", "G5"],
  "A Add9": ["A4", "C#5", "E5", "B5"],
  "A Maj9": ["A4", "C#5", "E5", "G#5", "B5"],
  "A Min9": ["A4", "C5", "E5", "G5", "B5"],
  "A 7b9": ["A4", "C#5", "E5", "G5", "Bb5"],
  "A 7#9": ["A4", "C#5", "E5", "G5", "C6"],
  "A 7alt": ["A4", "C#5", "F5", "G5", "Bb5"],
  "A m7b5": ["A4", "C5", "Eb5", "G5"],
  "A Aug": ["A4", "C#5", "F5"],

  // Bb
  "Bb Maj": ["Bb4", "D5", "F5"],
  "Bb Min": ["Bb4", "Db5", "F5"],
  "Bb 7": ["Bb4", "D5", "F5", "Ab5"],
  "Bb Maj7": ["Bb4", "D5", "F5", "A5"],
  "Bb 7sus4": ["Bb4", "Eb5", "F5", "Ab5"],
  "Bb Maj9": ["Bb4", "D5", "F5", "A5", "C6"],
  "Bb Min9": ["Bb4", "Db5", "F5", "Ab5", "C6"],
  "Bb 9": ["Bb4", "D5", "F5", "Ab5", "C6"],
  "Bb m7b5": ["Bb4", "Db5", "E5", "Ab5"],

  // B
  "B Maj": ["B4", "D#5", "F#5"],
  "B Min": ["B4", "D5", "F#5"],
  "B 7": ["B4", "D#5", "F#5", "A5"],
  "B Maj7": ["B4", "D#5", "F#5", "A#5"],
  "B Min7": ["B4", "D5", "F#5", "A5"],
  "B Dim": ["B4", "D5", "F5"],
  "B Min9": ["B4", "D5", "F#5", "A5", "C#6"],
  "B 7b9": ["B4", "D#5", "F#5", "A5", "C6"],
  "B 7alt": ["B4", "D#5", "G5", "A5", "C6"],
  "B m7b5": ["B4", "D5", "F5", "A5"],
  "B Dim7": ["B4", "D5", "F5", "Ab5"],
  "B Aug": ["B4", "D#5", "G5"],
};

export const AVAILABLE_CHORDS = Object.keys(CHORD_LIBRARY).sort();

export const DEFAULT_PROGRESSION = [
  "C Min9", "F Min9", "Ab Maj9", "G 7sus4",
  "C Min9", "Eb Maj9", "F Min9", "G 7b9"
];

export const VIBE_GROUPS: VibeGroup[] = [
  {
    id: "house",
    name: "House Music",
    description: "Deep, soulful, and progressive club grooves with rich 9ths and suspended chords",
    icon: "🎧",
    progressions: [
      {
        id: "house-1",
        name: "Deep House Groove",
        chords: ["C Min9", "F Min9", "Ab Maj9", "G 7sus4", "C Min9", "Eb Maj9", "F Min9", "G 7b9"]
      },
      {
        id: "house-2",
        name: "Chicago Classic",
        chords: ["A Min9", "D 9", "F Maj9", "G 7sus4", "A Min9", "C Maj9", "F Maj9", "E 7#9"]
      },
      {
        id: "house-3",
        name: "Soulful Club",
        chords: ["F Maj9", "E 7b9", "A Min9", "D 9", "D Min9", "G 9", "C Maj9", "C 7b9"]
      },
      {
        id: "house-4",
        name: "Sunset Ibiza",
        chords: ["Eb Maj9", "C Min9", "F Min9", "Bb 9", "G Min9", "C 7alt", "F Min9", "Bb 7sus4"]
      },
      {
        id: "house-5",
        name: "French Touch",
        chords: ["D Min9", "G 9", "C Maj9", "A 7b9", "F Maj9", "E 7alt", "A Min9", "D 9"]
      },
      {
        id: "house-6",
        name: "Acid Horizon",
        chords: ["G Min9", "Eb Maj9", "C Min9", "D 7b9", "G Min9", "Bb Maj9", "C Min9", "D 7#9"]
      },
      {
        id: "house-7",
        name: "Progressive Peak",
        chords: ["B Min9", "G Maj9", "D Maj9", "A 9", "E Min9", "G Maj9", "A Sus4", "F# 7alt"]
      },
      {
        id: "house-8",
        name: "Vocal Anthem",
        chords: ["C Maj9", "G 7sus4", "A Min9", "F Maj9", "C Add9", "G 9", "D Min9", "G 7b9"]
      }
    ]
  },
  {
    id: "rock",
    name: "Rock & Alternative",
    description: "Driven power suspensions, augmented tension, and atmospheric alternative chords",
    icon: "🎸",
    progressions: [
      {
        id: "rock-1",
        name: "Alternative Anthem",
        chords: ["E Min", "C Add9", "G Maj", "D Sus4", "E Min", "C Maj7", "A Sus2", "B Aug"]
      },
      {
        id: "rock-2",
        name: "Psychedelic Echo",
        chords: ["A Min", "G Sus4", "F Maj7", "E Aug", "A Min", "D Sus2", "F Maj9", "E 7b9"]
      },
      {
        id: "rock-3",
        name: "Post-Rock Crescendo",
        chords: ["C Add9", "G Sus4", "A Min9", "F Maj6", "C Sus2", "G 9", "F Maj7", "G 7sus4"]
      },
      {
        id: "rock-4",
        name: "Grunge Distortion",
        chords: ["D Min", "F Maj", "C Maj", "G Sus4", "Bb Maj", "F Maj", "A Aug", "D Min"]
      },
      {
        id: "rock-5",
        name: "Math Rock Geometry",
        chords: ["E Min9", "C# m7b5", "C Maj9", "B 7alt", "A Min9", "F# m7b5", "B 7b9", "E Min"]
      },
      {
        id: "rock-6",
        name: "Stadium Power",
        chords: ["A Min", "F Maj7", "C Add9", "G Sus4", "D Min9", "F Maj7", "G 9", "E 7#9"]
      },
      {
        id: "rock-7",
        name: "Progressive Odyssey",
        chords: ["B Min", "G Maj7", "D Maj9", "A Sus4", "E Min9", "C Maj9", "F# Aug", "B Min"]
      },
      {
        id: "rock-8",
        name: "Desert Rock Sunset",
        chords: ["G Min", "Eb Maj7", "F Maj", "D Aug", "G Min", "C Min9", "D 7b9", "G Min"]
      }
    ]
  },
  {
    id: "pop",
    name: "Pop & Synth-Pop",
    description: "Catchy, lush modern pop voicings with bright add9 and major 9 extensions",
    icon: "✨",
    progressions: [
      {
        id: "pop-1",
        name: "Modern Synthpop",
        chords: ["C Maj9", "G 7sus4", "A Min9", "F Maj9", "C Add9", "G 9", "D Min9", "G 7b9"]
      },
      {
        id: "pop-2",
        name: "Dark Pop Nocturne",
        chords: ["A Min9", "F Maj9", "C Maj9", "E 7b9", "D Min9", "F Maj7", "B m7b5", "E 7#9"]
      },
      {
        id: "pop-3",
        name: "K-Pop Chroma",
        chords: ["D Maj9", "F# 7b9", "B Min9", "E 9", "G Maj9", "C 9", "F# Min7", "B 7alt"]
      },
      {
        id: "pop-4",
        name: "Bedroom Dream",
        chords: ["F Maj9", "C Add9", "G Sus4", "A Min9", "F Maj9", "E Min7", "D Min9", "G 7sus4"]
      },
      {
        id: "pop-5",
        name: "Glitter Disco",
        chords: ["Eb Maj9", "C Min9", "F Min9", "Bb 9", "G Min9", "C 7b9", "F Min9", "Bb 7sus4"]
      },
      {
        id: "pop-6",
        name: "Summer Festival",
        chords: ["G Maj9", "D Sus4", "E Min9", "C Maj9", "G Add9", "D 9", "C Maj9", "D 7sus4"]
      },
      {
        id: "pop-7",
        name: "Electro-Pop Rush",
        chords: ["A Min9", "F Maj9", "D Min9", "G 7sus4", "C Maj9", "F Maj9", "B m7b5", "E 7b9"]
      },
      {
        id: "pop-8",
        name: "Neon Euphoria",
        chords: ["Bb Maj9", "F 7sus4", "G Min9", "Eb Maj9", "Bb Add9", "F 9", "C Min9", "F 7b9"]
      }
    ]
  },
  {
    id: "country",
    name: "Country & Americana",
    description: "Acoustic resonance, open add9 sparkle, and warm sus2 country storytelling",
    icon: "🤠",
    progressions: [
      {
        id: "country-1",
        name: "Americana Porch",
        chords: ["G Add9", "C Add9", "G Add9", "D Sus4", "E Min7", "C Add9", "G Add9", "D 9"]
      },
      {
        id: "country-2",
        name: "Alt-Country Dusk",
        chords: ["C Add9", "F Maj6", "C Add9", "G Sus4", "A Min7", "F Maj9", "C Add9", "G 7"]
      },
      {
        id: "country-3",
        name: "Outlaw Sunset",
        chords: ["A Min", "F Maj", "C Add9", "G Sus4", "D Min7", "F Maj6", "G 9", "E 7"]
      },
      {
        id: "country-4",
        name: "Bluegrass Horizon",
        chords: ["D Add9", "G Add9", "D Add9", "A Sus4", "B Min7", "G Add9", "E Min7", "A 9"]
      },
      {
        id: "country-5",
        name: "Southern Twilight",
        chords: ["E Min7", "C Add9", "G Add9", "D Sus4", "E Min9", "C Maj6", "A Sus2", "D 9"]
      },
      {
        id: "country-6",
        name: "Prairie Wind",
        chords: ["Eb Add9", "Ab Maj6", "Eb Add9", "Bb Sus4", "C Min7", "Ab Add9", "F Min7", "Bb 9"]
      },
      {
        id: "country-7",
        name: "Honky Tonk Color",
        chords: ["G 9", "C Add9", "G 9", "D 7", "C Maj6", "G Add9", "A 9", "D 7b9"]
      },
      {
        id: "country-8",
        name: "Acoustic Valley",
        chords: ["F Maj6", "C Add9", "G Sus4", "A Min7", "F Maj9", "G 9", "C Add9", "C Maj6"]
      }
    ]
  },
  {
    id: "indie",
    name: "Indie & Dream Pop",
    description: "Atmospheric, floating suspensions, maj9 colors, and math-indie shifts",
    icon: "🌿",
    progressions: [
      {
        id: "indie-1",
        name: "Dream Pop Cascade",
        chords: ["C Sus2", "F Maj9", "A Min9", "G 7sus4", "D Sus2", "F Maj9", "G 9", "C Add9"]
      },
      {
        id: "indie-2",
        name: "Indie Folk Dawn",
        chords: ["G Add9", "D Sus4", "E Min9", "C Maj6", "G Add9", "D 9", "C Maj9", "G Add9"]
      },
      {
        id: "indie-3",
        name: "Shoegaze Wall",
        chords: ["F Maj9", "C Maj9", "G Sus4", "A Min9", "F Maj9", "E Min9", "D Min9", "G 7sus4"]
      },
      {
        id: "indie-4",
        name: "Math Indie Shift",
        chords: ["D Maj9", "B Min9", "G Maj9", "A Sus4", "F# m7b5", "B 7b9", "E Min9", "A 9"]
      },
      {
        id: "indie-5",
        name: "Lo-Fi Indie Basement",
        chords: ["A Min9", "D Sus2", "F Maj9", "G 7sus4", "C Maj9", "E Min7", "D Min9", "E 7b9"]
      },
      {
        id: "indie-6",
        name: "Coastal Sunlight",
        chords: ["Eb Maj9", "Ab Maj6", "C Min9", "Bb Sus4", "Eb Add9", "Ab Maj9", "F Min9", "Bb 9"]
      },
      {
        id: "indie-7",
        name: "Midnight Transit",
        chords: ["D Min9", "Bb Maj7", "G Min9", "A Aug", "D Min9", "F Maj9", "E m7b5", "A 7b9"]
      },
      {
        id: "indie-8",
        name: "Celestial Canopy",
        chords: ["B Min9", "G Maj9", "D Maj9", "A Sus4", "E Min9", "G Maj6", "A 9", "F# 7alt"]
      }
    ]
  },
  {
    id: "idm",
    name: "IDM & Braindance",
    description: "Complex algorithmic modulations, half-diminished steps, and glitch harmonies",
    icon: "🤖",
    progressions: [
      {
        id: "idm-1",
        name: "Braindance Matrix",
        chords: ["C Maj9", "Eb Maj9", "F# m7b5", "B 7b9", "E Maj9", "G Maj9", "Bb m7b5", "Eb 7b9"]
      },
      {
        id: "idm-2",
        name: "Warp Algorithmic",
        chords: ["A Min9", "F# m7b5", "F Maj9", "E 7alt", "D Min9", "B m7b5", "E 7b9", "A Min9"]
      },
      {
        id: "idm-3",
        name: "Glitch Polyrhythm",
        chords: ["D Min9", "B m7b5", "Bb Maj9", "A 7alt", "G Min9", "E m7b5", "A 7b9", "D Min9"]
      },
      {
        id: "idm-4",
        name: "Microhouse Glitch",
        chords: ["F Maj9", "Ab Maj9", "B m7b5", "E 7b9", "A Min9", "C Maj9", "D m7b5", "G 7alt"]
      },
      {
        id: "idm-5",
        name: "Experimental Drone",
        chords: ["G Min9", "E m7b5", "Eb Maj9", "D 7alt", "C Min9", "A m7b5", "D 7b9", "G Min9"]
      },
      {
        id: "idm-6",
        name: "Quantum Shift",
        chords: ["Eb Maj9", "F# Maj9", "A m7b5", "D 7b9", "G Min9", "Bb Maj9", "C# Dim7", "D 7alt"]
      },
      {
        id: "idm-7",
        name: "Modular Synthesis",
        chords: ["B Min9", "G# m7b5", "G Maj9", "F# 7alt", "E Min9", "C# m7b5", "F# 7b9", "B Min9"]
      },
      {
        id: "idm-8",
        name: "Deconstructed Grid",
        chords: ["E Min9", "C# m7b5", "C Maj9", "B 7alt", "A Min9", "F# m7b5", "B 7b9", "E Min9"]
      }
    ]
  },
  {
    id: "jazz",
    name: "Jazz & Fusion",
    description: "Sophisticated Coltrane shifts, altered dominants, and rich 2-5-1 turnarounds",
    icon: "🎷",
    progressions: [
      {
        id: "jazz-1",
        name: "Coltrane Giant Steps",
        chords: ["B Maj7", "D 7", "G Maj7", "Bb 7", "Eb Maj7", "A m7b5", "D 7b9", "G Maj9"]
      },
      {
        id: "jazz-2",
        name: "Miles Davis Modal",
        chords: ["D Min9", "G 9", "E Min9", "A 7b9", "D Min9", "G 7alt", "C Maj9", "A 7#9"]
      },
      {
        id: "jazz-3",
        name: "Fusion Expressway",
        chords: ["F Maj9", "E 7alt", "A Min9", "D 9", "D Min9", "G 7b9", "C Maj9", "C 7alt"]
      },
      {
        id: "jazz-4",
        name: "Bebop Turnaround",
        chords: ["C Maj9", "A 7b9", "D Min9", "G 9", "E Min9", "A 7#9", "D Min9", "G 7b9"]
      },
      {
        id: "jazz-5",
        name: "Midnight Blue",
        chords: ["C Min9", "F 9", "Bb Maj9", "Eb Maj9", "A m7b5", "D 7b9", "G Min9", "G 7alt"]
      },
      {
        id: "jazz-6",
        name: "Birdland Groove",
        chords: ["Eb Maj9", "C 7b9", "F Min9", "Bb 9", "G Min9", "C 7alt", "F Min9", "Bb 7b9"]
      },
      {
        id: "jazz-7",
        name: "Spanish Key",
        chords: ["A Min9", "Bb Maj9", "A Min9", "D 9", "F Maj9", "E 7b9", "A Min9", "E 7#9"]
      },
      {
        id: "jazz-8",
        name: "Weather Report",
        chords: ["G Min9", "C 9", "F Maj9", "D 7b9", "G Min9", "C 7b9", "F Maj9", "A 7alt"]
      }
    ]
  },
  {
    id: "rnb",
    name: "R&B & Neo-Soul",
    description: "Warm, velvety minor 9ths, altered dominants, and smooth sensual voicings",
    icon: "🎤",
    progressions: [
      {
        id: "rnb-1",
        name: "Velvet Groove",
        chords: ["D Min9", "G 9", "C Maj9", "A 7b9", "F Maj9", "E 7#9", "A Min9", "D 9"]
      },
      {
        id: "rnb-2",
        name: "Slow Jam Rain",
        chords: ["F Maj9", "E 7b9", "A Min9", "D 9", "D Min9", "G 7sus4", "C Maj9", "C 7b9"]
      },
      {
        id: "rnb-3",
        name: "Silk Candlelight",
        chords: ["C Maj9", "A 7b9", "D Min9", "G 9", "E Min9", "A 7#9", "D Min9", "G 7b9"]
      },
      {
        id: "rnb-4",
        name: "Honey & Wine",
        chords: ["Eb Maj9", "C 7b9", "F Min9", "Bb 9", "G Min9", "C 7alt", "F Min9", "Bb 7b9"]
      },
      {
        id: "rnb-5",
        name: "Midnight Lounge",
        chords: ["A Min9", "D 9", "F Maj9", "E 7b9", "A Min9", "C 9", "F Maj9", "E 7#9"]
      },
      {
        id: "rnb-6",
        name: "Soulful Dusk",
        chords: ["G Min9", "C 9", "F Maj9", "D 7b9", "G Min9", "C 7b9", "F Maj9", "A 7b9"]
      },
      {
        id: "rnb-7",
        name: "Quiet Storm",
        chords: ["D Min9", "G 7b9", "E Min9", "A 7b9", "D Min9", "G 9", "C Maj9", "A 7#9"]
      },
      {
        id: "rnb-8",
        name: "Urban Serenade",
        chords: ["F Maj9", "E Min9", "A Min9", "D 9", "F Maj9", "G 7sus4", "C Maj9", "E 7b9"]
      }
    ]
  },
  {
    id: "hiphop",
    name: "Hip-Hop & Lo-Fi",
    description: "Vinyl boom-bap, mellow chillhop 7ths, and relaxed sample-style progressions",
    icon: "🌊",
    progressions: [
      {
        id: "hiphop-1",
        name: "Vinyl Scratch",
        chords: ["C Maj7", "A Min9", "D Min9", "G 7b9", "E Min9", "A Min9", "F Maj9", "G 7sus4"]
      },
      {
        id: "hiphop-2",
        name: "Rainy Attic",
        chords: ["F Maj9", "G 9", "E Min9", "A Min9", "D Min9", "G 7b9", "C Maj9", "C Maj9"]
      },
      {
        id: "hiphop-3",
        name: "Midnight Tape",
        chords: ["D Min9", "G 7b9", "C Maj9", "A Min9", "D Min9", "E Min9", "F Maj9", "G 7alt"]
      },
      {
        id: "hiphop-4",
        name: "Sunset Chillhop",
        chords: ["Eb Maj9", "C Min9", "F Min9", "Bb 9", "G Min9", "C Min9", "F Min9", "Bb 7b9"]
      },
      {
        id: "hiphop-5",
        name: "Coffee Shop Beat",
        chords: ["A Min9", "D Min9", "G 7b9", "C Maj9", "F Maj9", "B m7b5", "E 7b9", "A Min9"]
      },
      {
        id: "hiphop-6",
        name: "Mellow Dust",
        chords: ["F Maj9", "E Min9", "D Min9", "C Maj9", "F Maj9", "E Min9", "D Min9", "G 7sus4"]
      },
      {
        id: "hiphop-7",
        name: "Lo-Fi Horizons",
        chords: ["C Maj9", "E Min9", "F Maj9", "G 9", "A Min9", "D Min9", "F Maj9", "G 7b9"]
      },
      {
        id: "hiphop-8",
        name: "Cozy Room Tape",
        chords: ["G Maj9", "E Min9", "A Min9", "D 9", "B Min9", "E Min9", "C Maj9", "D 7b9"]
      }
    ]
  },
  {
    id: "ambient",
    name: "Ambient & Cinematic",
    description: "Expansive film scoring, cosmic floating intervals, and deep space textures",
    icon: "🌌",
    progressions: [
      {
        id: "ambient-1",
        name: "Interstellar Drift",
        chords: ["C Maj9", "F Maj9", "A Min9", "G 7sus4", "C Sus2", "F Maj9", "D Min9", "G 9"]
      },
      {
        id: "ambient-2",
        name: "Event Horizon",
        chords: ["A Min", "F# m7b5", "F Maj7", "E 7b9", "D Min9", "B m7b5", "E 7#9", "A Min"]
      },
      {
        id: "ambient-3",
        name: "Deep Cosmos",
        chords: ["C Min9", "Ab Maj7", "D m7b5", "G 7b9", "Eb Maj7", "F Min9", "D Dim7", "G 7alt"]
      },
      {
        id: "ambient-4",
        name: "Solar Flare",
        chords: ["G Maj9", "C Maj9", "E Min9", "D Sus4", "G Sus2", "C Maj9", "A Min9", "D 9"]
      },
      {
        id: "ambient-5",
        name: "Subterranean World",
        chords: ["D Min9", "Bb Maj7", "E m7b5", "A 7b9", "G Min9", "Eb Maj7", "C# Dim7", "A 7#9"]
      },
      {
        id: "ambient-6",
        name: "Starlight Canopy",
        chords: ["D Maj9", "G Maj9", "B Min9", "A Sus4", "D Add9", "G Maj9", "E Min9", "A 7sus4"]
      },
      {
        id: "ambient-7",
        name: "Endless Abyss",
        chords: ["E Min9", "C Maj7", "F# m7b5", "B 7b9", "A Min9", "D 9", "C Maj7", "B 7alt"]
      },
      {
        id: "ambient-8",
        name: "Aurora Borealis",
        chords: ["Bb Maj9", "Eb Maj9", "G Min9", "F 7sus4", "Bb Add9", "Eb Maj9", "C Min9", "F 9"]
      }
    ]
  },
  {
    id: "techno",
    name: "Techno & Synthwave",
    description: "Industrial synth pulse, retrowave highways, and dark electronic progressions",
    icon: "🏎️",
    progressions: [
      {
        id: "techno-1",
        name: "Outrun Highway",
        chords: ["A Min", "F Maj", "D Sus4", "E Aug", "A Min", "C Maj", "D Min9", "E 7b9"]
      },
      {
        id: "techno-2",
        name: "Berghain Basement",
        chords: ["C Min", "Ab Maj", "F Min", "G Aug", "C Min", "Eb Maj", "F Min9", "G 7#9"]
      },
      {
        id: "techno-3",
        name: "Cyberpunk Overdrive",
        chords: ["D Min", "Bb Maj", "G Min", "A Aug", "D Min", "F Maj", "G 9", "A 7b9"]
      },
      {
        id: "techno-4",
        name: "Retrowave Sunset",
        chords: ["E Min", "C Maj", "A Min", "B Aug", "E Min", "G Maj", "A Min9", "B 7b9"]
      },
      {
        id: "techno-5",
        name: "Melodic Techno Sunrise",
        chords: ["G Min", "Eb Maj", "C Min", "D Aug", "G Min", "Bb Maj", "C Min9", "D 7#9"]
      },
      {
        id: "techno-6",
        name: "Neon Grid",
        chords: ["B Min", "G Maj", "E Min", "F# Aug", "B Min", "D Maj", "E Min9", "F# 7b9"]
      },
      {
        id: "techno-7",
        name: "Industrial Darkness",
        chords: ["F Min", "Db Maj", "Bb Min", "C Aug", "F Min", "Ab Maj", "Bb Min9", "C 7b9"]
      },
      {
        id: "techno-8",
        name: "Velocity Pulse",
        chords: ["A Min", "G Sus4", "F Maj9", "E 7b9", "A Min", "D Sus2", "F Maj9", "E Aug"]
      }
    ]
  }
];

export const PRESET_PROGRESSIONS = VIBE_GROUPS.flatMap(group => 
  group.progressions.map(p => ({
    name: p.name,
    vibe: group.name,
    chords: p.chords,
    vibeId: group.id,
    id: p.id
  }))
);

export const getChordDescription = (name: string): string => {
  if (name.includes("7alt")) return "Altered dominant, mysterious tension";
  if (name.includes("7b9") || name.includes("7#9")) return "Dark tension, chromatic resolution";
  if (name.includes("m7b5")) return "Half-diminished, emotional drama";
  if (name.includes("Dim7")) return "Fully diminished, suspenseful dissonance";
  if (name.includes("Maj9")) return "Lush, dreamy, sophisticated color";
  if (name.includes("Min9")) return "Deep, velvety, soulful mood";
  if (name.includes("7sus4")) return "Open floating suspended dominant";
  if (name.includes("Sus2") || name.includes("Sus4")) return "Open, unresolved, airy suspension";
  if (name.includes("Add9")) return "Bright acoustic sparkle";
  if (name.includes("Aug")) return "Augmented, whole-tone mystery";
  if (name.includes("Maj7")) return "Dreamy, nostalgic, jazz color";
  if (name.includes("Min7")) return "Mellow, smooth, soulful";
  if (name.includes("Min")) return "Sad, serious, emotional";
  if (name.includes("Maj")) return "Happy, bright, stable";
  if (name.includes("Dim")) return "Tense, dissonant, suspenseful";
  if (name.includes("7")) return "Unstable, bluesy, wants resolution";
  return "Harmonic chord structure";
};