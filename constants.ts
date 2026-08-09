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
  "C Maj9", "F Maj9", "A Min9", "G 7sus4",
  "C Sus2", "F Maj9", "D Min9", "G 9"
];

export const VIBE_GROUPS: VibeGroup[] = [
  {
    id: "ether",
    name: "Ether & Nostalgia",
    description: "Weightless ambient pads, lush maj9 extensions, and open suspended intervals",
    icon: "🌌",
    progressions: [
      {
        id: "ether-1",
        name: "Cosmic Drift",
        chords: ["C Maj9", "F Maj9", "A Min9", "G 7sus4", "C Sus2", "F Maj9", "D Min9", "G 9"]
      },
      {
        id: "ether-2",
        name: "Bioluminescence",
        chords: ["F Maj9", "C Add9", "G Sus4", "A Min9", "F Maj9", "E Min7", "D Min9", "G 7sus4"]
      },
      {
        id: "ether-3",
        name: "Solar Flare",
        chords: ["Eb Maj9", "Ab Maj9", "C Min9", "F 9", "Eb Maj9", "Bb 7sus4", "F Min9", "G 7b9"]
      },
      {
        id: "ether-4",
        name: "Stargazing",
        chords: ["G Maj9", "C Maj9", "E Min9", "D Sus4", "G Sus2", "C Maj9", "A Min9", "D 9"]
      },
      {
        id: "ether-5",
        name: "Velvet Horizon",
        chords: ["D Maj9", "G Maj9", "B Min9", "A Sus4", "D Add9", "G Maj9", "E Min9", "A 7sus4"]
      },
      {
        id: "ether-6",
        name: "Subterranean Light",
        chords: ["A Min9", "F Maj9", "C Maj9", "G 7sus4", "D Min9", "A Min9", "F Maj9", "G 9"]
      },
      {
        id: "ether-7",
        name: "Floating In Ether",
        chords: ["C Sus2", "G 7sus4", "F Maj9", "A Min9", "D Sus2", "F Maj9", "G 9", "C Add9"]
      },
      {
        id: "ether-8",
        name: "Infinite Echoes",
        chords: ["Bb Maj9", "Eb Maj9", "G Min9", "F 7sus4", "Bb Add9", "Eb Maj9", "C Min9", "F 9"]
      }
    ]
  },
  {
    id: "cinematic",
    name: "Dark Tension & Noir",
    description: "Dramatic film scoring with half-diminished, altered dominants, and b9 dissonances",
    icon: "🔥",
    progressions: [
      {
        id: "cinematic-1",
        name: "Neon Noir",
        chords: ["A Min", "F# m7b5", "F Maj7", "E 7b9", "D Min9", "B m7b5", "E 7#9", "A Min"]
      },
      {
        id: "cinematic-2",
        name: "Abyssal Descent",
        chords: ["C Min9", "Ab Maj7", "D m7b5", "G 7b9", "Eb Maj7", "F Min9", "D Dim7", "G 7alt"]
      },
      {
        id: "cinematic-3",
        name: "Gotham Syndicate",
        chords: ["D Min9", "Bb Maj7", "E m7b5", "A 7b9", "G Min9", "Eb Maj7", "C# Dim7", "A 7#9"]
      },
      {
        id: "cinematic-4",
        name: "Blood Moon",
        chords: ["E Min9", "C Maj7", "F# m7b5", "B 7b9", "A Min9", "D 9", "C Maj7", "B 7alt"]
      },
      {
        id: "cinematic-5",
        name: "Shadow Syndicate",
        chords: ["G Min9", "Eb Maj7", "A m7b5", "D 7b9", "C Min9", "F 9", "D Dim7", "D 7b9"]
      },
      {
        id: "cinematic-6",
        name: "Obsidian Citadel",
        chords: ["B Min", "G Maj7", "C# m7b5", "F# 7b9", "E Min9", "A 9", "G Maj7", "F# 7alt"]
      },
      {
        id: "cinematic-7",
        name: "Vampiric Waltz",
        chords: ["C Min", "G 7b9", "Ab Maj7", "Eb Maj9", "F Min9", "D m7b5", "G 7#9", "C Min"]
      },
      {
        id: "cinematic-8",
        name: "Eclipse Event",
        chords: ["F Min9", "Db Maj7", "G m7b5", "C 7b9", "Bb Min9", "Eb 9", "Db Maj7", "C 7alt"]
      }
    ]
  },
  {
    id: "neosoul",
    name: "Neo-Soul & Velvet Silk",
    description: "Warm, rich, buttery chromatic movements with lush minor 9 and dominant 7b9 colors",
    icon: "🔮",
    progressions: [
      {
        id: "neosoul-1",
        name: "Late Night Vinyl",
        chords: ["D Min9", "G 9", "C Maj9", "A 7b9", "F Maj9", "E 7#9", "A Min9", "D 9"]
      },
      {
        id: "neosoul-2",
        name: "Velvet Cigarette",
        chords: ["F Maj9", "E 7b9", "A Min9", "D 9", "D Min9", "G 7sus4", "C Maj9", "C 7b9"]
      },
      {
        id: "neosoul-3",
        name: "Rooftop Rain",
        chords: ["C Maj9", "A 7b9", "D Min9", "G 9", "E Min9", "A 7#9", "D Min9", "G 7b9"]
      },
      {
        id: "neosoul-4",
        name: "Silk & Espresso",
        chords: ["Eb Maj9", "C 7b9", "F Min9", "Bb 9", "G Min9", "C 7alt", "F Min9", "Bb 7b9"]
      },
      {
        id: "neosoul-5",
        name: "Midnight Bourbon",
        chords: ["A Min9", "D 9", "F Maj9", "E 7b9", "A Min9", "C 9", "F Maj9", "E 7#9"]
      },
      {
        id: "neosoul-6",
        name: "Smoke & Honey",
        chords: ["G Min9", "C 9", "F Maj9", "D 7b9", "G Min9", "C 7b9", "F Maj9", "A 7b9"]
      },
      {
        id: "neosoul-7",
        name: "Satin Sheets",
        chords: ["D Min9", "G 7b9", "E Min9", "A 7b9", "D Min9", "G 9", "C Maj9", "A 7#9"]
      },
      {
        id: "neosoul-8",
        name: "Urban Solitude",
        chords: ["F Maj9", "E Min9", "A Min9", "D 9", "F Maj9", "G 7sus4", "C Maj9", "E 7b9"]
      }
    ]
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Synthwave",
    description: "High-octane synth dystopia with augmented chords, power suspensions, and minor shifts",
    icon: "⚡",
    progressions: [
      {
        id: "cyberpunk-1",
        name: "Blade Runner Dusk",
        chords: ["A Min", "F Maj", "D Sus4", "E Aug", "A Min", "C Maj", "D Min9", "E 7b9"]
      },
      {
        id: "cyberpunk-2",
        name: "Neon Overdrive",
        chords: ["C Min", "Ab Maj", "F Min", "G Aug", "C Min", "Eb Maj", "F Min9", "G 7#9"]
      },
      {
        id: "cyberpunk-3",
        name: "Chrome Citadel",
        chords: ["D Min", "Bb Maj", "G Min", "A Aug", "D Min", "F Maj", "G 9", "A 7b9"]
      },
      {
        id: "cyberpunk-4",
        name: "Synthetic Dreamer",
        chords: ["E Min", "C Maj", "A Min", "B Aug", "E Min", "G Maj", "A Min9", "B 7b9"]
      },
      {
        id: "cyberpunk-5",
        name: "Dystopian Highway",
        chords: ["G Min", "Eb Maj", "C Min", "D Aug", "G Min", "Bb Maj", "C Min9", "D 7#9"]
      },
      {
        id: "cyberpunk-6",
        name: "Neural Interface",
        chords: ["B Min", "G Maj", "E Min", "F# Aug", "B Min", "D Maj", "E Min9", "F# 7b9"]
      },
      {
        id: "cyberpunk-7",
        name: "Tokyo After Dark",
        chords: ["F Min", "Db Maj", "Bb Min", "C Aug", "F Min", "Ab Maj", "Bb Min9", "C 7b9"]
      },
      {
        id: "cyberpunk-8",
        name: "Hyperdrive",
        chords: ["A Min", "G Sus4", "F Maj9", "E 7b9", "A Min", "D Sus2", "F Maj9", "E Aug"]
      }
    ]
  },
  {
    id: "euphoric",
    name: "Euphoric Sunshine",
    description: "Uplifting, warm acoustic resonance with open add9 and major 6th sparkle",
    icon: "🌿",
    progressions: [
      {
        id: "euphoric-1",
        name: "Golden Meadow",
        chords: ["C Add9", "G Sus4", "A Min9", "F Maj6", "C Add9", "G 9", "D Min9", "G 7sus4"]
      },
      {
        id: "euphoric-2",
        name: "Wildflower Hill",
        chords: ["G Add9", "D Sus4", "E Min9", "C Maj6", "G Add9", "D 9", "C Maj9", "G Add9"]
      },
      {
        id: "euphoric-3",
        name: "Ocean Breeze",
        chords: ["D Add9", "A Sus4", "B Min9", "G Maj6", "D Add9", "A 9", "G Maj9", "D Add9"]
      },
      {
        id: "euphoric-4",
        name: "Sunrise Festival",
        chords: ["F Maj6", "C Add9", "G Sus4", "A Min7", "F Maj9", "G 9", "C Add9", "C Maj6"]
      },
      {
        id: "euphoric-5",
        name: "Mountain Stream",
        chords: ["A Min7", "F Maj6", "C Add9", "G Sus4", "A Min9", "F Maj9", "D Sus2", "G 9"]
      },
      {
        id: "euphoric-6",
        name: "Spring Awakening",
        chords: ["Eb Add9", "Bb Sus4", "C Min9", "Ab Maj6", "Eb Add9", "Bb 9", "Ab Maj9", "Eb Add9"]
      },
      {
        id: "euphoric-7",
        name: "Highland Dawn",
        chords: ["E Min7", "C Maj6", "G Add9", "D Sus4", "E Min9", "C Maj9", "A Sus2", "D 9"]
      },
      {
        id: "euphoric-8",
        name: "Coastal Sunset",
        chords: ["C Maj6", "F Maj9", "A Min9", "G Sus4", "C Add9", "F Maj6", "D Min9", "G 7sus4"]
      }
    ]
  },
  {
    id: "spiritual",
    name: "Modal Jazz & Spiritual",
    description: "Transcendent modal harmonies, half-diminished movement, and mystical altered cadences",
    icon: "🌌",
    progressions: [
      {
        id: "spiritual-1",
        name: "Astral Awakening",
        chords: ["C Maj9", "Eb Maj9", "F# m7b5", "B 7b9", "E Maj9", "G Maj9", "Bb m7b5", "Eb 7b9"]
      },
      {
        id: "spiritual-2",
        name: "Celestial Gate",
        chords: ["A Min9", "F# m7b5", "F Maj9", "E 7alt", "D Min9", "B m7b5", "E 7b9", "A Min9"]
      },
      {
        id: "spiritual-3",
        name: "Mystic Horizon",
        chords: ["D Min9", "B m7b5", "Bb Maj9", "A 7alt", "G Min9", "E m7b5", "A 7b9", "D Min9"]
      },
      {
        id: "spiritual-4",
        name: "Sacred Geometry",
        chords: ["F Maj9", "Ab Maj9", "B m7b5", "E 7b9", "A Min9", "C Maj9", "D m7b5", "G 7alt"]
      },
      {
        id: "spiritual-5",
        name: "Etheric Portal",
        chords: ["G Min9", "E m7b5", "Eb Maj9", "D 7alt", "C Min9", "A m7b5", "D 7b9", "G Min9"]
      },
      {
        id: "spiritual-6",
        name: "Transcendence",
        chords: ["Eb Maj9", "F# Maj9", "A m7b5", "D 7b9", "G Min9", "Bb Maj9", "C# Dim7", "D 7alt"]
      },
      {
        id: "spiritual-7",
        name: "Cosmic Balance",
        chords: ["B Min9", "G# m7b5", "G Maj9", "F# 7alt", "E Min9", "C# m7b5", "F# 7b9", "B Min9"]
      },
      {
        id: "spiritual-8",
        name: "Dimensional Shift",
        chords: ["E Min9", "C# m7b5", "C Maj9", "B 7alt", "A Min9", "F# m7b5", "B 7b9", "E Min9"]
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