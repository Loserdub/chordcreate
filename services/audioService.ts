import * as Tone from 'tone';
import { CHORD_LIBRARY } from '../constants';
import { SynthToneId, SynthToneOption } from '../types';

export const SYNTH_TONE_OPTIONS: SynthToneOption[] = [
  {
    id: 'rhodes',
    name: 'Rhodes E-Piano',
    description: 'Pristine FM electric piano, warm & crystal clear'
  },
  {
    id: 'pad',
    name: 'Silk Warm Pad',
    description: 'Soft filtered pad with smooth ambient release'
  },
  {
    id: 'glass',
    name: 'Glass Keys',
    description: 'Airy, sparkling chime keys'
  },
  {
    id: 'analog',
    name: 'Analog Soft Keys',
    description: 'Gentle, warm analog synth tone'
  }
];

class AudioService {
  private synth: Tone.PolySynth | null = null;
  private filter: Tone.Filter | null = null;
  private chorus: Tone.Chorus | null = null;
  private reverb: Tone.Reverb | null = null;
  private masterGain: Tone.Volume | null = null;
  private currentToneId: SynthToneId = 'rhodes';
  private isInitialized = false;

  private createSynthForTone(toneId: SynthToneId): Tone.PolySynth {
    switch (toneId) {
      case 'rhodes':
        // Crisp, warm FM Electric Piano
        return new Tone.PolySynth(Tone.FMSynth, {
          harmonicity: 1.0,
          modulationIndex: 0.8,
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.015,
            decay: 0.7,
            sustain: 0.25,
            release: 0.7
          },
          modulation: { type: 'sine' },
          modulationEnvelope: {
            attack: 0.01,
            decay: 0.3,
            sustain: 0.1,
            release: 0.5
          }
        });

      case 'pad':
        // Smooth, silky ambient pad
        return new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.12,
            decay: 0.8,
            sustain: 0.5,
            release: 1.0
          }
        });

      case 'glass':
        // Bright, crystalline glass chime keys
        return new Tone.PolySynth(Tone.AMSynth, {
          harmonicity: 2.0,
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.008,
            decay: 0.5,
            sustain: 0.2,
            release: 0.6
          },
          modulation: { type: 'sine' }
        });

      case 'analog':
      default:
        // Gentle warm analog soft keys
        return new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' },
          envelope: {
            attack: 0.02,
            decay: 0.5,
            sustain: 0.3,
            release: 0.6
          }
        });
    }
  }

  private async init() {
    if (this.isInitialized) return;
    
    await Tone.start();

    // 1. Filter: Smooth out harsh highs and prevent low boomy build-up
    this.filter = new Tone.Filter({
      frequency: 2200,
      type: 'lowpass',
      rolloff: -12
    });

    // 2. Chorus: Subtle width without heavy detuning or mud
    this.chorus = new Tone.Chorus({
      frequency: 0.8,
      delayTime: 2.5,
      depth: 0.2,
      wet: 0.12
    }).start();

    // 3. Reverb: Spacious, smooth tail with modest wet mix
    this.reverb = new Tone.Reverb({
      decay: 2.2,
      wet: 0.18
    });
    await this.reverb.generate();

    // 4. Master Volume output node
    this.masterGain = new Tone.Volume(-12).toDestination();

    // Clean Serial Audio Chain: Filter -> Chorus -> Reverb -> Master Output
    this.filter.connect(this.chorus);
    this.chorus.connect(this.reverb);
    this.reverb.connect(this.masterGain);

    // 5. Create initial PolySynth connected to Filter entry
    this.synth = this.createSynthForTone(this.currentToneId);
    this.synth.connect(this.filter);

    this.isInitialized = true;
  }

  public async setSynthTone(toneId: SynthToneId) {
    this.currentToneId = toneId;
    if (!this.isInitialized || !this.filter) return;

    if (this.synth) {
      this.synth.releaseAll();
      this.synth.disconnect();
      this.synth.dispose();
    }

    this.synth = this.createSynthForTone(toneId);
    this.synth.connect(this.filter);
  }

  public getSynthTone(): SynthToneId {
    return this.currentToneId;
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

