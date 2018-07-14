import Clock from './Clock';

const wholeNote = (tempo, [beatsPerMeasure], from) => tempo / beatsPerMeasure;
const halfNote = (tempo, timeSignature, from) =>
  wholeNote(tempo, timeSignature, from) * 0.5;
const quarterNote = (tempo, timeSignature, from) =>
  wholeNote(tempo, timeSignature, from) * 0.25;
const eighthNote = (tempo, timeSignature, from) =>
  wholeNote(tempo, timeSignature, from) / 8;
const sixteenthNote = (tempo, timeSignature, from) =>
  wholeNote(tempo, timeSignature, from) / 16;
const wholeNoteRest = wholeNote;
const halfNoteRest = halfNote;
const quarterNoteRest = quarterNote;
const eighthNoteRest = eighthNote;
const sixteenthNoteRest = sixteenthNote;

export class Score {
  constructor(tempo = 120.0, timeSignature = [4, 4]) {
    this.tempo = tempo;
    this.timeSignature = timeSignature;
    this._score = [];
  }

  getFrequencyForNote(n) {
    const baseFreq = 440; // A4
    const baseRegister = 4;
    const notes = {
      A: 0,
      'A#': 1,
      Bb: 1,
      B: 2,
      C: -9,
      'C#': -8,
      Db: -8,
      D: -7,
      'D#': -6,
      Eb: -6,
      E: -5,
      F: -4,
      'F#': -3,
      Gb: -3,
      G: -2,
      'G#': -1,
      Ab: -1
    };

    const [note, register] = n.split('-');
    const halfSteps =
      register * 12 + notes[note] - (baseRegister * 12 + notes['A']);

    return (baseFreq * Math.pow(Math.pow(2, 1 / 12), halfSteps)).toFixed(2);
  }

  lastObjectInScore() {}

  addNote(name) {
    const note = {
      name,
      frequency: this.getFrequencyForNote(name)
    };
    return this;
  }

  addRest() {}
}

const myScore = new Score()
  .addNote('quarter', 'C-4')
  .addRest('quarter')
  .addNote('quarter', 'D-4')
  .addRest('quarter')
  .addNote('quarter', 'E-4')
  .addRest('quarter')
  .addNote('quarter', 'F-4')
  .addRest('quarter')
  .addNote('quarter', 'G-4')
  .addRest('quarter')
  .addNote('quarter', 'A-4')
  .addRest('quarter')
  .addNote('quarter', 'B-4')
  .addRest('quarter');

class NoteScheduler {
  constructor() {}
}

export default NoteScheduler;
