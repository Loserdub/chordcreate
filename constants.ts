import { ChordMap, VibeGroup } from './types';

// Extended mapping of common chords to their MIDI note names (using 4th/5th octave as base)
export const CHORD_LIBRARY: ChordMap = {
  // C
  "C Maj": ["C4", "E4", "G4"],
  "C Min": ["C4", "Eb4", "G4"],
  "C 7": ["C4", "E4", "G4", "Bb4"],
  "C Maj7": ["C4", "E4", "G4", "B4"],
  "C Min7": ["C4", "Eb4", "G4", "Bb4"],
  // Db / C#
  "Db Maj": ["Db4", "F4", "Ab4"],
  "Db Min": ["Db4", "E4", "Ab4"],
  "Db 7": ["Db4", "F4", "Ab4", "B4"],
  "Db Maj7": ["Db4", "F4", "Ab4", "C5"],
  "C# Min": ["C#4", "E4", "G#4"],
  // D
  "D Maj": ["D4", "F#4", "A4"],
  "D Min": ["D4", "F4", "A4"],
  "D 7": ["D4", "F#4", "A4", "C5"],
  "D Min7": ["D4", "F4", "A4", "C5"],
  "D Dim": ["D4", "F4", "Ab4"],
  // Eb
  "Eb Maj": ["Eb4", "G4", "Bb4"],
  "Eb Min": ["Eb4", "Gb4", "Bb4"],
  "Eb Maj7": ["Eb4", "G4", "Bb4", "D5"],
  // E
  "E Maj": ["E4", "G#4", "B4"],
  "E Min": ["E4", "G4", "B4"],
  "E 7": ["E4", "G#4", "B4", "D5"],
  "E Min7": ["E4", "G4", "B4", "D5"],
  // F
  "F Maj": ["F4", "A4", "C5"],
  "F Min": ["F4", "Ab4", "C5"],
  "F 7": ["F4", "A4", "C5", "Eb5"],
  "F Maj7": ["F4", "A4", "C5", "E5"],
  "F Min7": ["F4", "Ab4", "C5", "Eb5"],
  // F# / Gb
  "F# Maj": ["F#4", "A#4", "C#5"],
  "F# Min": ["F#4", "A4", "C#5"],
  // G
  "G Maj": ["G4", "B4", "D5"],
  "G Min": ["G4", "Bb4", "D5"],
  "G 7": ["G4", "B4", "D5", "F5"],
  "G Maj7": ["G4", "B4", "D5", "F#5"],
  "G Min7": ["G4", "Bb4", "D5", "F5"],
  // Ab
  "Ab Maj": ["Ab4", "C5", "Eb5"],
  "Ab Min": ["Ab4", "B4", "Eb5"],
  "Ab Maj7": ["Ab4", "C5", "Eb5", "G5"],
  // A
  "A Maj": ["A4", "C#5", "E5"],
  "A Min": ["A4", "C5", "E5"],
  "A 7": ["A4", "C#5", "E5", "G5"],
  "A Min7": ["A4", "C5", "E5", "G5"],
  "A Dim": ["A4", "C5", "Eb5"],
  // Bb
  "Bb Maj": ["Bb4", "D5", "F5"],
  "Bb Min": ["Bb4", "Db5", "F5"],
  "Bb 7": ["Bb4", "D5", "F5", "Ab5"],
  "Bb Maj7": ["Bb4", "D5", "F5", "A5"],
  // B
  "B Maj": ["B4", "D#5", "F#5"],
  "B Min": ["B4", "D5", "F#5"],
  "B 7": ["B4", "D#5", "F#5", "A5"],
  "B Min7": ["B4", "D5", "F#5", "A5"],
  "B Dim": ["B4", "D5", "F5"],
};

export const AVAILABLE_CHORDS = Object.keys(CHORD_LIBRARY).sort();

export const DEFAULT_PROGRESSION = [
  "C Maj", "A Min", "F Maj", "G Maj",
  "E Min", "A Min", "D Min", "G 7"
];

export const VIBE_GROUPS: VibeGroup[] = [
  {
    id: "pop",
    name: "Catchy & Upbeat",
    description: "Bright, energetic pop & dance progressions",
    icon: "⚡",
    progressions: [
      {
        id: "pop-1",
        name: "Pop Mainstay",
        chords: ["C Maj", "G Maj", "A Min", "F Maj", "C Maj", "G Maj", "D Min", "G 7"]
      },
      {
        id: "pop-2",
        name: "Radiant Journey",
        chords: ["F Maj", "C Maj", "G Maj", "A Min", "F Maj", "G Maj", "C Maj", "G 7"]
      },
      {
        id: "pop-3",
        name: "Upbeat Bounce",
        chords: ["C Maj", "A Min", "D Min", "G 7", "E Min", "A Min", "D Min", "G Maj"]
      },
      {
        id: "pop-4",
        name: "Sunset Drive",
        chords: ["G Maj", "D Maj", "E Min", "C Maj", "G Maj", "D Maj", "C Maj", "G Maj"]
      },
      {
        id: "pop-5",
        name: "Festival Anthem",
        chords: ["A Min", "F Maj", "C Maj", "G Maj", "A Min", "F Maj", "D Min", "G Maj"]
      },
      {
        id: "pop-6",
        name: "Golden Hour",
        chords: ["D Maj", "A Maj", "B Min", "G Maj", "D Maj", "A Maj", "G Maj", "A Maj"]
      },
      {
        id: "pop-7",
        name: "Summer Hit",
        chords: ["C Maj", "F Maj", "A Min", "G Maj", "F Maj", "C Maj", "D Min", "G 7"]
      },
      {
        id: "pop-8",
        name: "Energy Sunrise",
        chords: ["G Maj", "C Maj", "E Min", "D Maj", "G Maj", "C Maj", "D Maj", "G Maj"]
      }
    ]
  },
  {
    id: "lofi",
    name: "Smooth & Relaxed",
    description: "Warm, mellow vinyl lo-fi vibes with rich 7ths",
    icon: "☕",
    progressions: [
      {
        id: "lofi-1",
        name: "Lo-Fi Chill",
        chords: ["C Maj7", "A Min7", "D Min7", "G 7", "E Min7", "A Min7", "F Maj7", "G 7"]
      },
      {
        id: "lofi-2",
        name: "Rainy Window",
        chords: ["F Maj7", "G 7", "E Min7", "A Min7", "D Min7", "G 7", "C Maj7", "C Maj7"]
      },
      {
        id: "lofi-3",
        name: "Coffee Shop",
        chords: ["D Min7", "G 7", "C Maj7", "A Min7", "D Min7", "E Min7", "F Maj7", "G 7"]
      },
      {
        id: "lofi-4",
        name: "Soft Sunset",
        chords: ["Eb Maj7", "C Min7", "F Min7", "Bb 7", "G Min7", "C Min7", "F Min7", "Bb 7"]
      },
      {
        id: "lofi-5",
        name: "Chillhop Dream",
        chords: ["A Min7", "D Min7", "G 7", "C Maj7", "F Maj7", "B Dim", "E 7", "A Min7"]
      },
      {
        id: "lofi-6",
        name: "Velvet Dusk",
        chords: ["F Maj7", "E Min7", "D Min7", "C Maj7", "F Maj7", "E Min7", "D Min7", "G 7"]
      },
      {
        id: "lofi-7",
        name: "Cloud Nine",
        chords: ["C Maj7", "E Min7", "F Maj7", "G 7", "A Min7", "D Min7", "F Maj7", "G 7"]
      },
      {
        id: "lofi-8",
        name: "Cozy Room",
        chords: ["G Maj7", "E Min7", "A Min7", "D 7", "B Min7", "E Min7", "C Maj7", "D 7"]
      }
    ]
  },
  {
    id: "neosoul",
    name: "Soulful & Color",
    description: "Sophisticated, jazzy turnarounds and extended harmonies",
    icon: "🎷",
    progressions: [
      {
        id: "neosoul-1",
        name: "Neo-Soul Jazz",
        chords: ["D Min7", "G 7", "C Maj7", "A Min7", "F Maj7", "E 7", "A Min7", "D 7"]
      },
      {
        id: "neosoul-2",
        name: "Urban Groove",
        chords: ["C Maj7", "A 7", "D Min7", "G 7", "E Min7", "A 7", "D Min7", "G 7"]
      },
      {
        id: "neosoul-3",
        name: "Velvet Soul",
        chords: ["F Maj7", "E 7", "A Min7", "D 7", "D Min7", "G 7", "C Maj7", "C 7"]
      },
      {
        id: "neosoul-4",
        name: "Midnight Lounge",
        chords: ["C Min7", "F 7", "Bb Maj7", "Eb Maj7", "A Dim", "D 7", "G Min7", "G 7"]
      },
      {
        id: "neosoul-5",
        name: "Smooth Operator",
        chords: ["A Min7", "D 7", "F Maj7", "E 7", "A Min7", "C 7", "F Maj7", "E 7"]
      },
      {
        id: "neosoul-6",
        name: "Golden Era",
        chords: ["Eb Maj7", "Ab Maj7", "G Min7", "C Min7", "F Min7", "Bb 7", "Eb Maj7", "Bb 7"]
      },
      {
        id: "neosoul-7",
        name: "Silk & Satin",
        chords: ["D Min7", "G 7", "E Min7", "A Min7", "D Min7", "G 7", "C Maj7", "A 7"]
      },
      {
        id: "neosoul-8",
        name: "Soul Serenade",
        chords: ["F Maj7", "E Min7", "A Min7", "D 7", "F Maj7", "G 7", "C Maj7", "E 7"]
      }
    ]
  },
  {
    id: "cinematic",
    name: "Suspenseful & Heavy",
    description: "Dramatic, intense, movie trailer and game soundtrack chords",
    icon: "🎬",
    progressions: [
      {
        id: "cinematic-1",
        name: "Dark & Cinematic",
        chords: ["A Min", "F Min", "C Min", "G Min", "D Min", "Bb Min", "Ab Maj", "E Min"]
      },
      {
        id: "cinematic-2",
        name: "Gotham Night",
        chords: ["C Min", "Ab Maj", "Eb Maj", "Bb Maj", "C Min", "Ab Maj", "F Min", "G 7"]
      },
      {
        id: "cinematic-3",
        name: "Eclipse",
        chords: ["D Min", "Bb Maj", "F Maj", "C Maj", "D Min", "Bb Maj", "G Min", "A 7"]
      },
      {
        id: "cinematic-4",
        name: "Dark Destiny",
        chords: ["E Min", "C Maj", "G Maj", "D Maj", "E Min", "C Maj", "A Min", "B 7"]
      },
      {
        id: "cinematic-5",
        name: "Tension Rise",
        chords: ["A Min", "F Maj", "D Min", "E 7", "F Maj", "D Min", "B Dim", "E 7"]
      },
      {
        id: "cinematic-6",
        name: "Noir Detective",
        chords: ["C Min", "G 7", "Ab Maj", "Eb Maj", "F Min", "C Min", "D Dim", "G 7"]
      },
      {
        id: "cinematic-7",
        name: "Deep Abyss",
        chords: ["G Min", "Eb Maj", "Bb Maj", "F Maj", "G Min", "Eb Maj", "C Min", "D 7"]
      },
      {
        id: "cinematic-8",
        name: "Epic Arrival",
        chords: ["B Min", "G Maj", "D Maj", "A Maj", "B Min", "G Maj", "E Min", "F# Maj"]
      }
    ]
  },
  {
    id: "ballad",
    name: "Emotional & Nostalgic",
    description: "Melancholic, touching, story-driven progression sequences",
    icon: "🥀",
    progressions: [
      {
        id: "ballad-1",
        name: "Sad Ballad",
        chords: ["A Min", "F Maj", "C Maj", "G Maj", "A Min", "D Min", "F Maj", "G 7"]
      },
      {
        id: "ballad-2",
        name: "Heartbreak",
        chords: ["C Maj", "G Maj", "A Min", "F Maj", "C Maj", "E Min", "F Maj", "G Maj"]
      },
      {
        id: "ballad-3",
        name: "Bittersweet",
        chords: ["D Min", "A Min", "Bb Maj", "F Maj", "G Min", "D Min", "C Maj", "G 7"]
      },
      {
        id: "ballad-4",
        name: "Tears in Rain",
        chords: ["E Min", "B Min", "C Maj", "G Maj", "A Min", "E Min", "C Maj", "D Maj"]
      },
      {
        id: "ballad-5",
        name: "Lost Hope",
        chords: ["F Min", "Ab Maj", "Eb Maj", "Bb Maj", "F Min", "Db Maj", "Eb Maj", "F Min"]
      },
      {
        id: "ballad-6",
        name: "Unspoken Words",
        chords: ["C Maj", "E Min", "A Min", "F Maj", "D Min", "C Maj", "F Maj", "G 7"]
      },
      {
        id: "ballad-7",
        name: "Nostalgia",
        chords: ["A Min", "G Maj", "F Maj", "C Maj", "D Min", "A Min", "F Maj", "E 7"]
      },
      {
        id: "ballad-8",
        name: "Silent Reflection",
        chords: ["G Min", "D Min", "Eb Maj", "Bb Maj", "C Min", "G Min", "Eb Maj", "F Maj"]
      }
    ]
  },
  {
    id: "energetic",
    name: "Energetic & Bright",
    description: "High-energy driving chord structures with powerful resolution",
    icon: "🔥",
    progressions: [
      {
        id: "energetic-1",
        name: "Anthem Power",
        chords: ["C Maj", "F Maj", "G Maj", "A Min", "F Maj", "C Maj", "G Maj", "D Min"]
      },
      {
        id: "energetic-2",
        name: "Festival Mainstage",
        chords: ["A Min", "F Maj", "C Maj", "G Maj", "A Min", "F Maj", "G Maj", "G 7"]
      },
      {
        id: "energetic-3",
        name: "Driving Rock",
        chords: ["E Maj", "A Maj", "B Maj", "E Maj", "C# Min", "A Maj", "B Maj", "E Maj"]
      },
      {
        id: "energetic-4",
        name: "High Octane",
        chords: ["G Maj", "D Maj", "E Min", "C Maj", "G Maj", "C Maj", "D Maj", "G Maj"]
      },
      {
        id: "energetic-5",
        name: "Neon Sunrise",
        chords: ["D Maj", "G Maj", "A Maj", "B Min", "G Maj", "D Maj", "A Maj", "D Maj"]
      },
      {
        id: "energetic-6",
        name: "Euphoric Drop",
        chords: ["F Maj", "G Maj", "A Min", "C Maj", "F Maj", "G Maj", "A Min", "E Min"]
      },
      {
        id: "energetic-7",
        name: "Stadium Chords",
        chords: ["C Maj", "Bb Maj", "F Maj", "C Maj", "C Maj", "Bb Maj", "F Maj", "G 7"]
      },
      {
        id: "energetic-8",
        name: "Sunset Festival",
        chords: ["A Min", "G Maj", "F Maj", "G Maj", "A Min", "G Maj", "F Maj", "E 7"]
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
  if (name.includes("Maj7")) return "Dreamy, nostalgic, jazz color";
  if (name.includes("Min7")) return "Mellow, smooth, soulful";
  if (name.includes("Min")) return "Sad, serious, emotional";
  if (name.includes("Maj")) return "Happy, bright, stable";
  if (name.includes("Dim")) return "Tense, dissonant, suspenseful";
  if (name.includes("7")) return "Unstable, bluesy, wants resolution";
  return "Harmonic chord structure";
};