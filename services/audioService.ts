import * as Tone from 'tone';
import { CHORD_LIBRARY } from '../constants';

class AudioService {
  private synth: Tone.PolySynth | null = null;
  private isInitialized = false;

  private async init() {
    if (this.isInitialized) return;
    
    await Tone.start();
    
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "triangle" // Softer sound than square/sawtooth
      },
      envelope: {
        attack: 0.1, // Slower attack for less percussive start
        decay: 0.3,
        sustain: 0.4,
        release: 1.2 // Longer release to bridge gaps between chords
      },
      voice: Tone.Synth
    }).toDestination();
    
    // Add a bit of reverb and chorus for a nicer "electric piano" feel
    const reverb = new Tone.Reverb(2.0).toDestination(); // Increased reverb slightly
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();
    this.synth.connect(reverb);
    this.synth.connect(chorus);
    
    this.synth.volume.value = -10; // Lower volume to prevent clipping with overlaps

    this.isInitialized = true;
  }

  public async playChord(chordName: string, duration: string = "2n") {
    await this.init();
    const notes = CHORD_LIBRARY[chordName];
    if (notes && this.synth) {
      this.synth.triggerAttackRelease(notes, duration);
    }
  }

  public async playNote(note: string, duration: string = "8n") {
    await this.init();
    if (this.synth) {
      this.synth.triggerAttackRelease(note, duration);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.releaseAll();
    }
  }

  public getNotesForChord(chordName: string): string[] {
    return CHORD_LIBRARY[chordName] || [];
  }
}

export const audioService = new AudioService();
