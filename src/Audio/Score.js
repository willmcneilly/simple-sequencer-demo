export class Score {
  constructor(tempo = 120.0, timeSignature = [4, 4]) {
    this.tempo = tempo;
    this.timeSignature = timeSignature;
    this._scoreQueue = [];
  }

  secondsPerBeat = () => 60.0 / this.tempo;
  secondsPerMeasure = () => this.secondsPerBeat() * 4.0;

  noteLengths = {
    whole: this.secondsPerMeasure,
    half: () => this.secondsPerMeasure() * 0.5,
    quarter: () => this.secondsPerMeasure() * 0.25,
    eighth: () => this.secondsPerMeasure() / 8.0,
    sixteenth: () => this.secondsPerMeasure() / 16.0
  };

  getNoteLength(note) {
    if (!this.noteLengths[note]) {
      throw new Error(`${note} is not a valid note length`);
    }
    return this.noteLengths[note]();
  }

  // getNoteLength(note) {
  //   switch (note) {
  //     case 'whole':
  //       return this.secondsPerMeasure();
  //     case 'half':
  //       return this.secondsPerMeasure() * 0.5;
  //     case 'quarter':
  //       return this.secondsPerMeasure() * 0.25;
  //     case 'eighth':
  //       return this.secondsPerMeasure() / 8.0;
  //     case 'sixteenth':
  //       return this.secondsPerMeasure() / 16.0;
  //     default:
  //       throw new Error(`${note} is not a valid note length`);
  //   }
  // }

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

    return baseFreq * Math.pow(Math.pow(2, 1 / 12), halfSteps);
  }

  lastNote() {
    return this._scoreQueue.length
      ? this._scoreQueue[this._scoreQueue.length - 1]
      : undefined;
  }

  getLengthMeta(length) {
    const lengthInSeconds = this.getNoteLength(length);
    const lastNote = this.lastNote();
    const relativeStartTime = lastNote ? lastNote.relativeEndTime : 0.0;
    const relativeEndTime = relativeStartTime + lengthInSeconds;

    return {
      lengthInSeconds,
      relativeStartTime,
      relativeEndTime
    };
  }

  addNote(length, name) {
    const meta = this.getLengthMeta(length);
    const note = {
      name,
      length,
      type: 'note',
      frequency: this.getFrequencyForNote(name),
      ...meta
    };

    this._scoreQueue.push(note);

    return this;
  }

  addRest(length) {
    const meta = this.getLengthMeta(length);
    const rest = {
      length,
      type: 'rest',
      ...meta
    };

    this._scoreQueue.push(rest);

    return this;
  }

  getScore() {
    return this._scoreQueue;
  }

  getNotes() {
    return this._scoreQueue.filter(item => item.type === 'note');
  }
}

export default Score;
