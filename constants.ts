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
  "C 7#9": ["C4", "E4", "G4", "Bb4", "Eb5"],
  "C 7sus4": ["C4", "F4", "G4", "Bb4"],
  "C m7b5": ["C4", "Eb4", "Gb4", "Bb4"],
  "C Aug": ["C4", "E4", "G#4"],
  "C Dim7": ["C4", "Eb4", "Gb4", "A4"],

  // Db / C#
  "Db Maj": ["Db4", "F4", "Ab4"],
  "Db Min": ["Db4", "E4", "Ab4"],
  "Db 7": ["Db4", "F4", "Ab4", "B4"],
  "Db Maj7": ["Db4", "F4", "Ab4", "C5"],
  "Db Maj9": ["Db4", "F4", "Ab4", "C5", "Eb5"],
  "Db 9": ["Db4", "F4", "Ab4", "B4", "Eb5"],
  "Db 7sus4": ["Db4", "Gb4", "Ab4", "B4"],
  "Db Maj6": ["Db4", "F4", "Ab4", "Bb4"],
  "C# Min": ["C#4", "E4", "G#4"],
  "C# Min7": ["C#4", "E4", "G#4", "B4"],
  "C# Min9": ["C#4", "E4", "G#4", "B4", "D#5"],
  "C# 7": ["C#4", "F4", "G#4", "B4"],
  "C# 7b9": ["C#4", "F4", "G#4", "B4", "D5"],
  "C# Dim7": ["C#4", "E4", "G4", "Bb4"],
  "C# m7b5": ["C#4", "E4", "G4", "B4"],

  // D
  "D Maj": ["D4", "F#4", "A4"],
  "D Min": ["D4", "F4", "A4"],
  "D 7": ["D4", "F#4", "A4", "C5"],
  "D Maj7": ["D4", "F#4", "A4", "C#5"],
  "D Min7": ["D4", "F4", "A4", "C5"],
  "D Dim": ["D4", "F4", "Ab4"],
  "D Sus2": ["D4", "E4", "A4"],
  "D Sus4": ["D4", "G4", "A4"],
  "D 7sus4": ["D4", "G4", "A4", "C5"],
  "D Add9": ["D4", "F#4", "A4", "E5"],
  "D Maj9": ["D4", "F#4", "A4", "C#5", "E5"],
  "D Min9": ["D4", "F4", "A4", "C5", "E5"],
  "D 9": ["D4", "F#4", "A4", "C5", "E5"],
  "D 7b9": ["D4", "F#4", "A4", "C5", "Eb5"],
  "D 7#9": ["D4", "F#4", "A4", "C5", "F5"],
  "D 7alt": ["D4", "F#4", "Bb4", "C5", "Eb5"],
  "D m7b5": ["D4", "F4", "Ab4", "C5"],
  "D Dim7": ["D4", "F4", "Ab4", "B4"],
  "D Aug": ["D4", "F#4", "A#4"],

  // Eb
  "Eb Maj": ["Eb4", "G4", "Bb4"],
  "Eb Min": ["Eb4", "Gb4", "Bb4"],
  "Eb 7": ["Eb4", "G4", "Bb4", "Db5"],
  "Eb Maj7": ["Eb4", "G4", "Bb4", "D5"],
  "Eb Min7": ["Eb4", "Gb4", "Bb4", "Db5"],
  "Eb Sus4": ["Eb4", "Ab4", "Bb4"],
  "Eb 7sus4": ["Eb4", "Ab4", "Bb4", "Db5"],
  "Eb Add9": ["Eb4", "G4", "Bb4", "F5"],
  "Eb Maj9": ["Eb4", "G4", "Bb4", "D5", "F5"],
  "Eb Min9": ["Eb4", "Gb4", "Bb4", "Db5", "F5"],
  "Eb 9": ["Eb4", "G4", "Bb4", "Db5", "F5"],
  "Eb 7b9": ["Eb4", "G4", "Bb4", "Db5", "E5"],
  "Eb 7alt": ["Eb4", "G4", "B4", "Db5", "E5"],
  "Eb m7b5": ["Eb4", "Gb4", "A4", "Db5"],

  // E
  "E Maj": ["E4", "G#4", "B4"],
  "E Min": ["E4", "G4", "B4"],
  "E 7": ["E4", "G#4", "B4", "D5"],
  "E Maj7": ["E4", "G#4", "B4", "D#5"],
  "E Min7": ["E4", "G4", "B4", "D5"],
  "E Sus2": ["E4", "F#4", "B4"],
  "E Sus4": ["E4", "A4", "B4"],
  "E 7sus4": ["E4", "A4", "B4", "D5"],
  "E Add9": ["E4", "G#4", "B4", "F#5"],
  "E Maj9": ["E4", "G#4", "B4", "D#5", "F#5"],
  "E Min9": ["E4", "G4", "B4", "D5", "F#5"],
  "E 9": ["E4", "G#4", "B4", "D5", "F#5"],
  "E 7b9": ["E4", "G#4", "B4", "D5", "F5"],
  "E 7#9": ["E4", "G#4", "B4", "D5", "G5"],
  "E 7alt": ["E4", "G#4", "C5", "D5", "F5"],
  "E Maj6": ["E4", "G#4", "B4", "C#5"],
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
  "F 7b9": ["F4", "A4", "C5", "Eb5", "Gb5"],
  "F 7#9": ["F4", "A4", "C5", "Eb5", "Ab5"],
  "F 7alt": ["F4", "A4", "Db5", "Eb5", "Gb5"],
  "F Maj6": ["F4", "A4", "C5", "D5"],
  "F m7b5": ["F4", "Ab4", "B4", "Eb5"],
  "F Dim7": ["F4", "Ab4", "B4", "D5"],

  // F# / Gb
  "F# Maj": ["F#4", "A#4", "C#5"],
  "F# Min": ["F#4", "A4", "C#5"],
  "F# 7": ["F#4", "A#4", "C#5", "E5"],
  "F# Maj7": ["F#4", "A#4", "C#5", "F5"],
  "F# Min7": ["F#4", "A4", "C#5", "E5"],
  "F# Sus4": ["F#4", "B4", "C#5"],
  "F# Maj9": ["F#4", "A#4", "C#5", "F5", "G#5"],
  "F# Min9": ["F#4", "A4", "C#5", "E5", "G#5"],
  "F# 7b9": ["F#4", "A#4", "C#5", "E5", "G5"],
  "F# 7#9": ["F#4", "A#4", "C#5", "E5", "A5"],
  "F# 7alt": ["F#4", "A#4", "D5", "E5", "G5"],
  "F# m7b5": ["F#4", "A4", "C5", "E5"],
  "F# Dim7": ["F#4", "A4", "C5", "Eb5"],
  "F# Aug": ["F#4", "A#4", "D5"],
  "Gb Maj7": ["Gb4", "Bb4", "Db5", "F5"],

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
  "Ab Min7": ["Ab4", "B4", "Eb5", "Gb5"],
  "Ab 7": ["Ab4", "C5", "Eb5", "Gb5"],
  "Ab Maj7": ["Ab4", "C5", "Eb5", "G5"],
  "Ab Maj9": ["Ab4", "C5", "Eb5", "G5", "Bb5"],
  "Ab 9": ["Ab4", "C5", "Eb5", "Gb5", "Bb5"],
  "Ab 7b9": ["Ab4", "C5", "Eb5", "Gb5", "A5"],
  "Ab 7alt": ["Ab4", "C5", "E5", "Gb5", "A5"],
  "Ab 7sus4": ["Ab4", "Db5", "Eb5", "Gb5"],
  "Ab Sus4": ["Ab4", "Db5", "Eb5"],
  "Ab Add9": ["Ab4", "C5", "Eb5", "Bb5"],
  "Ab Maj6": ["Ab4", "C5", "Eb5", "F5"],
  "G# Min9": ["G#4", "B4", "D#5", "F#5", "A#5"],
  "G# 7alt": ["G#4", "C5", "E5", "F#5", "A5"],
  "G# m7b5": ["G#4", "B4", "D5", "F#5"],

  // A
  "A Maj": ["A4", "C#5", "E5"],
  "A Min": ["A4", "C5", "E5"],
  "A 7": ["A4", "C#5", "E5", "G5"],
  "A Maj7": ["A4", "C#5", "E5", "G#5"],
  "A Min7": ["A4", "C5", "E5", "G5"],
  "A Dim": ["A4", "C5", "Eb5"],
  "A Sus2": ["A4", "B4", "E5"],
  "A Sus4": ["A4", "D5", "E5"],
  "A 7sus4": ["A4", "D5", "E5", "G5"],
  "A Add9": ["A4", "C#5", "E5", "B5"],
  "A Maj9": ["A4", "C#5", "E5", "G#5", "B5"],
  "A Min9": ["A4", "C5", "E5", "G5", "B5"],
  "A 9": ["A4", "C#5", "E5", "G5", "B5"],
  "A 7b9": ["A4", "C#5", "E5", "G5", "Bb5"],
  "A 7#9": ["A4", "C#5", "E5", "G5", "C6"],
  "A 7alt": ["A4", "C#5", "F5", "G5", "Bb5"],
  "A Maj6": ["A4", "C#5", "E5", "F#5"],
  "A m7b5": ["A4", "C5", "Eb5", "G5"],
  "A# m7b5": ["A#4", "C#5", "E5", "G#5"],
  "A Aug": ["A4", "C#5", "F5"],

  // Bb
  "Bb Maj": ["Bb4", "D5", "F5"],
  "Bb Min": ["Bb4", "Db5", "F5"],
  "Bb 7": ["Bb4", "D5", "F5", "Ab5"],
  "Bb Maj7": ["Bb4", "D5", "F5", "A5"],
  "Bb Min7": ["Bb4", "Db5", "F5", "Ab5"],
  "Bb Sus4": ["Bb4", "Eb5", "F5"],
  "Bb 7sus4": ["Bb4", "Eb5", "F5", "Ab5"],
  "Bb Add9": ["Bb4", "D5", "F5", "C6"],
  "Bb Maj9": ["Bb4", "D5", "F5", "A5", "C6"],
  "Bb Min9": ["Bb4", "Db5", "F5", "Ab5", "C6"],
  "Bb 9": ["Bb4", "D5", "F5", "Ab5", "C6"],
  "Bb 7b9": ["Bb4", "D5", "F5", "Ab5", "B5"],
  "Bb 7alt": ["Bb4", "D5", "F#5", "Ab5", "B5"],
  "Bb Maj6": ["Bb4", "D5", "F5", "G5"],
  "Bb m7b5": ["Bb4", "Db5", "E5", "Ab5"],

  // B
  "B Maj": ["B4", "D#5", "F#5"],
  "B Min": ["B4", "D5", "F#5"],
  "B 7": ["B4", "D#5", "F#5", "A5"],
  "B Maj7": ["B4", "D#5", "F#5", "A#5"],
  "B Min7": ["B4", "D5", "F#5", "A5"],
  "B Dim": ["B4", "D5", "F5"],
  "B Sus4": ["B4", "E5", "F#5"],
  "B Add9": ["B4", "D#5", "F#5", "C#6"],
  "B Maj9": ["B4", "D#5", "F#5", "A#5", "C#6"],
  "B Min9": ["B4", "D5", "F#5", "A5", "C#6"],
  "B 9": ["B4", "D#5", "F#5", "A5", "C#6"],
  "B 7b9": ["B4", "D#5", "F#5", "A5", "C6"],
  "B 7#9": ["B4", "D#5", "F#5", "A5", "D6"],
  "B 7alt": ["B4", "D#5", "G5", "A5", "C6"],
  "B Maj6": ["B4", "D#5", "F#5", "G#5"],
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
        chords: ["A Min9", "D 9", "F Maj7", "G 7sus4", "A Min9", "E Min7", "F Maj9", "E 7#9"]
      },
      {
        id: "house-3",
        name: "French Touch Filter",
        chords: ["F Maj7", "G 9", "E Min7", "A Min7", "D Min9", "G 7sus4", "C Maj9", "C 7"]
      },
      {
        id: "house-4",
        name: "Ibiza Sunset Terrace",
        chords: ["Eb Maj9", "Bb 9", "C Min9", "Ab Maj9", "Eb Maj9", "F Min9", "G Min7", "Bb 7sus4"]
      },
      {
        id: "house-5",
        name: "Soulful Garage Gospel",
        chords: ["Db Maj9", "Eb 9", "C Min7", "F Min9", "Bb Min9", "Eb 7sus4", "Ab Maj9", "Ab 7"]
      },
      {
        id: "house-6",
        name: "Acid Horizon",
        chords: ["G Min", "F Maj", "Eb Maj7", "D 7alt", "G Min9", "Bb Maj", "C Min7", "D 7b9"]
      },
      {
        id: "house-7",
        name: "Progressive Peak",
        chords: ["B Min", "G Maj9", "D Maj", "A Sus4", "E Min9", "G Maj7", "A 9", "F# 7alt"]
      },
      {
        id: "house-8",
        name: "Amapiano Lounge",
        chords: ["F Maj9", "E 7alt", "A Min9", "G 7sus4", "C Maj9", "F Maj9", "D Min9", "E 7b9"]
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
        chords: ["E Min", "G Maj", "D Sus4", "A Sus2", "C Add9", "G Maj", "B 7", "E Min"]
      },
      {
        id: "rock-2",
        name: "Psychedelic Echo",
        chords: ["A Min", "D Maj", "F Maj7", "C Maj", "G Sus4", "D Sus2", "F Maj7", "E Aug"]
      },
      {
        id: "rock-3",
        name: "Post-Rock Crescendo",
        chords: ["C Add9", "E Min7", "D Sus4", "G Maj", "C Add9", "G Maj", "D Sus4", "D Maj"]
      },
      {
        id: "rock-4",
        name: "Grunge Distortion",
        chords: ["D Min", "F Maj", "Ab Maj", "G Maj", "Bb Maj", "F Maj", "A 7", "D Min"]
      },
      {
        id: "rock-5",
        name: "Midwest Emo Sparkle",
        chords: ["D Maj7", "G Maj7", "B Min7", "A Sus4", "D Add9", "F# Min7", "G Maj9", "A Sus2"]
      },
      {
        id: "rock-6",
        name: "Stadium Power",
        chords: ["A Min", "F Maj", "C Maj", "G Maj", "D Min", "F Maj", "G Sus4", "E 7#9"]
      },
      {
        id: "rock-7",
        name: "Progressive Odyssey",
        chords: ["B Min", "D Maj", "A Sus4", "E Maj", "G Maj7", "F# Aug", "E Min7", "B Min"]
      },
      {
        id: "rock-8",
        name: "Desert Rock Sunset",
        chords: ["G Min", "Bb Maj", "F Maj", "Eb Maj7", "C Min", "D 7b9", "Eb Maj", "D Aug"]
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
        name: "Royal Road Anthem",
        chords: ["F Maj7", "G 9", "E Min7", "A Min9", "D Min9", "G 7sus4", "C Maj9", "C Add9"]
      },
      {
        id: "pop-2",
        name: "Dark Pop Nocturne",
        chords: ["A Min", "F Maj7", "D Min7", "E 7alt", "A Min9", "F Maj9", "B m7b5", "E 7b9"]
      },
      {
        id: "pop-3",
        name: "K-Pop Chroma",
        chords: ["Db Maj9", "C 7alt", "F Min9", "Bb 9", "Eb Min9", "Ab 7sus4", "Db Maj9", "Ab 7b9"]
      },
      {
        id: "pop-4",
        name: "Bedroom Dream",
        chords: ["D Maj9", "B Min9", "G Maj9", "A 7sus4", "F# Min7", "B 7b9", "E Min9", "A 9"]
      },
      {
        id: "pop-5",
        name: "Glitter Disco",
        chords: ["B Min7", "E 9", "A Maj7", "D Maj7", "G Maj7", "C# m7b5", "F# 7alt", "B Min"]
      },
      {
        id: "pop-6",
        name: "Summer Festival",
        chords: ["G Maj", "D Sus4", "E Min7", "C Add9", "G Add9", "D 9", "C Maj9", "D 7sus4"]
      },
      {
        id: "pop-7",
        name: "Synth-Pop Pulse",
        chords: ["C Maj9", "A Min9", "F Maj9", "G Sus4", "E Min7", "A Min7", "F Maj7", "G 9"]
      },
      {
        id: "pop-8",
        name: "Neon Euphoria",
        chords: ["F Min", "Eb Maj", "Db Maj", "Ab Maj", "Bb Min7", "C 7", "Db Maj7", "Eb 7sus4"]
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
        chords: ["G Maj", "C Add9", "G Add9", "D Sus4", "E Min7", "C Maj", "G Maj", "D 7"]
      },
      {
        id: "country-2",
        name: "Alt-Country Dusk",
        chords: ["C Maj", "E Min", "F Maj", "C Maj", "A Min7", "F Maj", "C Add9", "G Sus4"]
      },
      {
        id: "country-3",
        name: "Outlaw Sunset",
        chords: ["E Min", "G Maj", "A Maj", "C Maj", "E Min", "B 7", "A Sus2", "E Min"]
      },
      {
        id: "country-4",
        name: "Bluegrass Breakdown",
        chords: ["G Maj", "G 7", "C Maj", "G Maj", "D 7", "C Maj", "G Maj", "D Sus4"]
      },
      {
        id: "country-5",
        name: "Southern Twilight",
        chords: ["A Maj", "F# Min", "D Add9", "E Sus4", "A Add9", "C# Min", "D Maj", "E 7"]
      },
      {
        id: "country-6",
        name: "Gospel Valley Cadence",
        chords: ["D Maj", "D 7", "G Maj", "G Min", "D Maj", "B Min7", "E 7", "A 7"]
      },
      {
        id: "country-7",
        name: "Honky Tonk Shrewd",
        chords: ["C Maj", "C 7", "F Maj", "F# Dim7", "C Maj", "A 7", "D 7", "G 7"]
      },
      {
        id: "country-8",
        name: "Nashville Ballad",
        chords: ["Bb Maj", "F Sus4", "G Min7", "Eb Add9", "Bb Add9", "F 7", "Eb Maj", "F 7sus4"]
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
        chords: ["F Maj9", "G 9", "A Min9", "C Maj7", "F Maj9", "D Min9", "G 7sus4", "C Maj9"]
      },
      {
        id: "indie-2",
        name: "Shoegaze Wall",
        chords: ["D Maj9", "G Maj7", "B Min9", "A Sus4", "D Sus2", "G Maj9", "E Min9", "A Sus4"]
      },
      {
        id: "indie-3",
        name: "Jangle Pop Sunlight",
        chords: ["A Maj7", "D Maj7", "C# Min7", "F# Min7", "B Min7", "E 7", "A Add9", "E Sus4"]
      },
      {
        id: "indie-4",
        name: "Math Indie Shift",
        chords: ["E Maj9", "C# Min9", "A Maj9", "B Sus4", "G# m7b5", "C# 7b9", "F# Min9", "B 9"]
      },
      {
        id: "indie-5",
        name: "Lo-Fi Bedroom Basement",
        chords: ["C Maj7", "E 7", "A Min9", "F Maj7", "D Min7", "G 7", "C Maj7", "G 7sus4"]
      },
      {
        id: "indie-6",
        name: "Melancholy Autumn",
        chords: ["C Add9", "G Sus4", "A Min7", "F Maj7", "C Add9", "E Min7", "F Maj9", "G Sus4"]
      },
      {
        id: "indie-7",
        name: "Midnight Transit",
        chords: ["A Min", "F Maj9", "C Add9", "G 9", "D Min9", "F Maj7", "C Add9", "G Sus4"]
      },
      {
        id: "indie-8",
        name: "Celestial Canopy",
        chords: ["Eb Maj9", "Bb Sus4", "C Min7", "Ab Maj7", "Eb Add9", "G Min7", "Ab Maj9", "Bb 7sus4"]
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
        chords: ["A Min9", "F# m7b5", "F Maj9", "E 7alt", "C# Min", "D Min9", "Eb 7alt", "A Min9"]
      },
      {
        id: "idm-3",
        name: "Boards Nostalgia",
        chords: ["G Maj7", "Eb Maj7", "C Min9", "Bb Maj7", "Ab Maj7", "F Min9", "D 7alt", "G Min9"]
      },
      {
        id: "idm-4",
        name: "Squarepusher Drill",
        chords: ["F Min9", "Gb Maj7", "Eb Min9", "Ab 7alt", "Db Maj9", "C 7#9", "F Min9", "C 7alt"]
      },
      {
        id: "idm-5",
        name: "Venetian Breakcore",
        chords: ["D Min", "Bb Maj7", "C# Dim7", "D Min", "G Min9", "Eb Maj9", "A 7b9", "D Min"]
      },
      {
        id: "idm-6",
        name: "Quantum Shift",
        chords: ["Eb Maj9", "F# Maj9", "A Maj9", "C Maj9", "Eb Maj9", "F# m7b5", "B 7alt", "E Maj9"]
      },
      {
        id: "idm-7",
        name: "Modular Polyphony",
        chords: ["B Min9", "G Maj7", "C Maj9", "F# 7alt", "D Maj9", "Bb Maj7", "E m7b5", "A 7b9"]
      },
      {
        id: "idm-8",
        name: "Deconstructed Grid",
        chords: ["E Min9", "F Maj7", "Ab Maj9", "G 7alt", "C# m7b5", "C Maj9", "B 7#9", "E Min9"]
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
        name: "Miles So What Modal",
        chords: ["D Min9", "D Min9", "Eb Min9", "Eb Min9", "D Min9", "G 9", "C Maj9", "A 7alt"]
      },
      {
        id: "jazz-3",
        name: "Bill Evans Autumn",
        chords: ["C Min7", "F 9", "Bb Maj7", "Eb Maj7", "A m7b5", "D 7b9", "G Min9", "G 7alt"]
      },
      {
        id: "jazz-4",
        name: "Bebop Rhythm Changes",
        chords: ["C Maj9", "A 7b9", "D Min9", "G 7b9", "E Min7", "A 7#9", "D Min9", "G 7alt"]
      },
      {
        id: "jazz-5",
        name: "Wayne Shorter Blue Note",
        chords: ["Eb Maj9", "A 7alt", "Ab Maj7", "Db 9", "G Min9", "C 7alt", "F Min9", "Bb 7b9"]
      },
      {
        id: "jazz-6",
        name: "Weather Report Fusion",
        chords: ["F Maj9", "G 9", "A Min9", "D 9", "Bb Maj9", "C 9", "D Min9", "E 7#9"]
      },
      {
        id: "jazz-7",
        name: "Spanish Flamenco Mood",
        chords: ["B Min7", "A Maj", "G Maj7", "F# 7b9", "E Min9", "A 9", "D Maj7", "F# 7alt"]
      },
      {
        id: "jazz-8",
        name: "Bossa Nova Girl",
        chords: ["F Maj7", "G 7", "G Min7", "C 7b9", "A Min7", "D 7b9", "G Min9", "C 7alt"]
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
        name: "D'Angelo Brown Sugar",
        chords: ["E Min9", "A 9", "D Maj9", "B 7alt", "G Maj7", "F# 7#9", "B Min9", "E 7b9"]
      },
      {
        id: "rnb-2",
        name: "Erykah Badu Lounge",
        chords: ["Eb Maj9", "D 7#9", "G Min9", "C 9", "F Min9", "Bb 7sus4", "Eb Maj9", "Bb 7b9"]
      },
      {
        id: "rnb-3",
        name: "Silk Candlelight",
        chords: ["Db Maj9", "F Min7", "Gb Maj7", "Ab 7sus4", "Bb Min9", "Eb 9", "Ab 7sus4", "Ab 7b9"]
      },
      {
        id: "rnb-4",
        name: "Glasper Reharmonization",
        chords: ["Ab Maj9", "G 7alt", "C Min9", "F 9", "Db Maj9", "C 7#9", "F Min9", "Bb 7alt"]
      },
      {
        id: "rnb-5",
        name: "Modern Soul Guitar",
        chords: ["F Maj9", "E 7#9", "A Min9", "D 9", "D Min9", "G 7sus4", "C Maj9", "A 7b9"]
      },
      {
        id: "rnb-6",
        name: "Moody Trap-Soul Loop",
        chords: ["A Min9", "D 9", "G Maj9", "C Maj7", "F# m7b5", "B 7b9", "E Min9", "E 7#9"]
      },
      {
        id: "rnb-7",
        name: "Quiet Storm Velvet",
        chords: ["Bb Maj9", "D Min7", "Eb Maj9", "F 7sus4", "G Min9", "C 9", "C Min9", "F 7b9"]
      },
      {
        id: "rnb-8",
        name: "Gospel Sunday Praise",
        chords: ["C Maj9", "E 7#9", "F Maj9", "F# Dim7", "C Maj9", "A 7b9", "D Min9", "G 7sus4"]
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
        name: "Aruarian Bossa",
        chords: ["A Min9", "D 9", "G Maj7", "C Maj7", "F# m7b5", "B 7b9", "E Min9", "E 7alt"]
      },
      {
        id: "hiphop-2",
        name: "Dilla Swing Chops",
        chords: ["F Maj9", "Ab Maj9", "Db Maj9", "C 7#9", "F Min9", "Bb 9", "Eb Maj9", "A 7alt"]
      },
      {
        id: "hiphop-3",
        name: "Rainy Attic Tape",
        chords: ["D Min9", "G 7sus4", "C Maj9", "A Min7", "F Maj9", "E Min7", "D Min9", "G 7b9"]
      },
      {
        id: "hiphop-4",
        name: "Boom Bap 90s Soul",
        chords: ["C Min9", "F 9", "Bb Maj7", "Eb Maj9", "Ab Maj7", "D m7b5", "G 7#9", "G 7b9"]
      },
      {
        id: "hiphop-5",
        name: "Coffee Shop Beats",
        chords: ["G Maj9", "B 7b9", "E Min9", "D Min7", "C Maj9", "B Min7", "A Min9", "D 7sus4"]
      },
      {
        id: "hiphop-6",
        name: "Midnight Vinyl Dust",
        chords: ["Eb Maj9", "C 7alt", "F Min9", "Bb 9", "Db Maj9", "C 7b9", "F Min9", "Bb 7sus4"]
      },
      {
        id: "hiphop-7",
        name: "Madlib Abstract Loop",
        chords: ["B Min9", "E 9", "A Maj7", "F# 7alt", "G Maj7", "C# m7b5", "F# 7b9", "B Min9"]
      },
      {
        id: "hiphop-8",
        name: "Chilled Sunset Hop",
        chords: ["F Maj9", "G 9", "E Min9", "A Min9", "D Min9", "G 7b9", "C Maj9", "C 7"]
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
        name: "Interstellar Time",
        chords: ["A Min", "F Maj", "C Maj", "G Sus4", "D Min", "F Maj7", "A Min", "E Min"]
      },
      {
        id: "ambient-2",
        name: "Blade Runner 2049",
        chords: ["C Min", "Ab Maj7", "Eb Maj", "Bb Sus4", "F Min", "Db Maj7", "G 7alt", "C Min"]
      },
      {
        id: "ambient-3",
        name: "Deep Space Floating",
        chords: ["C Maj9", "F Maj9", "C Sus2", "G Sus4", "A Min9", "F Maj9", "D Sus2", "G 9"]
      },
      {
        id: "ambient-4",
        name: "Solar Flare Nebula",
        chords: ["G Maj9", "C Maj9", "E Min9", "D Sus4", "G Sus2", "C Maj9", "B Min7", "D 9"]
      },
      {
        id: "ambient-5",
        name: "Subterranean World",
        chords: ["D Min9", "Bb Maj7", "G Min", "A 7alt", "Eb Maj7", "D Min", "C# Dim7", "D Min"]
      },
      {
        id: "ambient-6",
        name: "Aurora Borealis",
        chords: ["Bb Maj9", "Eb Maj9", "G Min9", "F Sus4", "Eb Add9", "Bb Maj7", "C Min9", "F 7sus4"]
      },
      {
        id: "ambient-7",
        name: "Arrival Monolith",
        chords: ["E Min", "C Maj7", "F# m7b5", "B 7alt", "G Min", "Eb Maj7", "A m7b5", "D 7b9"]
      },
      {
        id: "ambient-8",
        name: "Endless Abyss Drift",
        chords: ["D Maj9", "G Maj9", "B Min9", "A Sus4", "D Add9", "F# Min7", "G Maj9", "A Sus2"]
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
        chords: ["A Min", "F Maj", "C Maj", "G Maj", "D Min", "F Maj", "G Sus4", "E 7"]
      },
      {
        id: "techno-2",
        name: "Berghain Dark Basement",
        chords: ["C Min", "Db Maj", "C Min", "Eb Min", "C Min", "Db Maj", "F Min", "G Aug"]
      },
      {
        id: "techno-3",
        name: "Cyberpunk Overdrive",
        chords: ["D Min", "Bb Maj", "F Maj", "C Maj", "G Min", "Bb Maj", "A Aug", "A 7b9"]
      },
      {
        id: "techno-4",
        name: "Retrowave Sunset Drive",
        chords: ["E Min", "C Maj7", "G Maj", "D Sus4", "A Min7", "C Maj7", "D Maj", "E Min"]
      },
      {
        id: "techno-5",
        name: "Melodic Peak Time",
        chords: ["G Min", "Eb Maj", "Bb Maj", "F Maj", "C Min", "Eb Maj", "D 7sus4", "D 7b9"]
      },
      {
        id: "techno-6",
        name: "Detroit Warehouse Stabs",
        chords: ["F Min7", "Bb 9", "Eb Min7", "Ab 9", "Db Maj7", "C 7alt", "F Min9", "C 7#9"]
      },
      {
        id: "techno-7",
        name: "Neon Grid Pulse",
        chords: ["B Min", "G Maj", "D Maj", "A Maj", "E Min", "G Maj", "F# Aug", "F# 7"]
      },
      {
        id: "techno-8",
        name: "Acid Techno Bunker",
        chords: ["A Min", "Bb Maj", "A Min", "D Min", "F Maj", "E 7#9", "F Maj7", "E Aug"]
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