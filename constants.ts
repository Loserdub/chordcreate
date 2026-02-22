import { ChordMap } from './types';

// Simple mapping of common chords to their MIDI note names (using 4th octave as base)
export const CHORD_LIBRARY: ChordMap = {
  // C
  "C Maj": ["C4", "E4", "G4"],
  "C Min": ["C4", "Eb4", "G4"],
  "C 7": ["C4", "E4", "G4", "Bb4"],
  "C Maj7": ["C4", "E4", "G4", "B4"],
  // Db / C#
  "Db Maj": ["Db4", "F4", "Ab4"],
  "Db Min": ["Db4", "E4", "Ab4"],
  // D
  "D Maj": ["D4", "F#4", "A4"],
  "D Min": ["D4", "F4", "A4"],
  "D 7": ["D4", "F#4", "A4", "C5"],
  "D Min7": ["D4", "F4", "A4", "C5"],
  // Eb
  "Eb Maj": ["Eb4", "G4", "Bb4"],
  "Eb Min": ["Eb4", "Gb4", "Bb4"],
  // E
  "E Maj": ["E4", "G#4", "B4"],
  "E Min": ["E4", "G4", "B4"],
  "E 7": ["E4", "G#4", "B4", "D5"],
  // F
  "F Maj": ["F4", "A4", "C5"],
  "F Min": ["F4", "Ab4", "C5"],
  "F Maj7": ["F4", "A4", "C5", "E5"],
  // F# / Gb
  "F# Maj": ["F#4", "A#4", "C#5"],
  "F# Min": ["F#4", "A4", "C#5"],
  // G
  "G Maj": ["G4", "B4", "D5"],
  "G Min": ["G4", "Bb4", "D5"],
  "G 7": ["G4", "B4", "D5", "F5"],
  // Ab
  "Ab Maj": ["Ab4", "C5", "Eb5"],
  "Ab Min": ["Ab4", "B4", "Eb5"],
  // A
  "A Maj": ["A4", "C#5", "E5"],
  "A Min": ["A4", "C5", "E5"],
  "A Min7": ["A4", "C5", "E5", "G5"],
  // Bb
  "Bb Maj": ["Bb4", "D5", "F5"],
  "Bb Min": ["Bb4", "Db5", "F5"],
  // B
  "B Maj": ["B4", "D#5", "F#5"],
  "B Min": ["B4", "D5", "F#5"],
  "B Dim": ["B4", "D5", "F5"],
};

export const AVAILABLE_CHORDS = Object.keys(CHORD_LIBRARY).sort();

export const DEFAULT_PROGRESSION = [
  "C Maj", "A Min", "F Maj", "G Maj",
  "E Min", "A Min", "D Min", "G 7"
];

export const getChordDescription = (name: string): string => {
  if (name.includes("Maj7")) return "Dreamy, nostalgic, jazz color";
  if (name.includes("Min7")) return "Mellow, smooth, soulful";
  if (name.includes("Min")) return "Sad, serious, emotional";
  if (name.includes("Maj")) return "Happy, bright, stable";
  if (name.includes("Dim")) return "Tense, dissonant, suspenseful";
  if (name.includes("7")) return "Unstable, bluesy, wants resolution";
  return "Harmonic chord structure";
};