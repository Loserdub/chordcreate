export interface ChordData {
  name: string;
  notes: string[]; // e.g., ["C4", "E4", "G4"]
  root: string;
  quality: string;
}

export interface SlotState {
  id: number;
  chordName: string;
  isActive: boolean;
}

export type ChordMap = Record<string, string[]>;

export interface GeneratedProgression {
  chords: string[];
  description?: string;
}

export type SynthToneId = 'rhodes' | 'pad' | 'glass' | 'analog';

export interface SynthToneOption {
  id: SynthToneId;
  name: string;
  description: string;
}

export interface ProgressionPreset {
  id: string;
  name: string;
  chords: string[];
  description?: string;
}

export interface VibeGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  progressions: ProgressionPreset[];
}

