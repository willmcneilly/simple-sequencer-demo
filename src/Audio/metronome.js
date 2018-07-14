import Clock from './Clock';

class Metronome {
  constructor() {
    this.tempo = 80.0;
    this.ctx = new AudioContext();
    this.isPlaying = false;
    this.clock = Clock();
    this.clock.setTimeInterval(25);
    this.current16thNote = 0;
    this.nextNoteTime = 0.0;
    this.scheduleAheadTime = 0.1;
    this.notesQueue = [];
    this.noteLength = 0.05;
  }

  scheduler = () => {
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
      this.nextNote();
    }
  };

  scheduleNote(note, time) {
    this.notesQueue.push({ note, time });
    const osc = this.ctx.createOscillator();
    if (note % 16 === 0)
      // beat 0 == high pitch
      osc.frequency.value = 880.0;
    else if (note % 4 === 0)
      // quarter notes = medium pitch
      osc.frequency.value = 440.0;
    // other 16th notes = low pitch
    else osc.frequency.value = 220.0;
    osc.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + this.noteLength);
  }

  nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime = this.nextNoteTime + 0.25 * secondsPerBeat;
    this.current16thNote = this.current16thNote + 1;
    if (this.current16thNote === 16) {
      this.current16thNote = 0;
    }
  }

  play() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.current16thNote = 0;
      this.nextNoteTime = this.ctx.currentTime;
      this.clock.start(this.scheduler);
    } else {
      this.clock.stop();
    }
  }
}

export default Metronome;
