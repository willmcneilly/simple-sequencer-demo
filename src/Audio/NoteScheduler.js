import Clock from './Clock';

class NoteScheduler {
  constructor(score) {
    if (score === undefined) {
      throw new Error('NoteScheduler requires a score on initialization');
    }
    this.tempo = 80.0;
    this.ctx = new AudioContext();
    this.isPlaying = false;
    this.clock = Clock();
    this.clock.setTimeInterval(25);
    this.current16thNote = 0;
    this.nextNoteTime = 0.0;
    this.scheduleAheadTime = 0.05;
    this.loopNumber = 0;
    this.loop = true;
    this.beginning = null;
    this.score = score;
    this.currentNoteIndex = null;
  }

  scheduler = () => {
    while (
      this.score[this.nextNoteIndex].relativeStartTime + this.playBegan <
      this.ctx.currentTime + this.scheduleAheadTime
    ) {
      this.scheduleNote(this.score[this.nextNoteIndex]);
      this.nextNote();
    }
  };

  scheduleNote(note) {
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const absoluteStartTime = note.relativeStartTime + this.playBegan;
    const absoluteEndTime = absoluteStartTime + note.lengthInSeconds;
    osc.frequency.value = note.frequency;
    osc.connect(gainNode);
    osc.start(absoluteStartTime);
    osc.stop(absoluteEndTime + 0.05);
    gainNode.gain.setValueAtTime(gainNode.gain.value, absoluteEndTime - 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, absoluteEndTime + 0.03);
    gainNode.connect(this.ctx.destination);
  }

  nextNote() {
    if (this.nextNoteIndex === this.score.length - 1) {
      this.nextNoteIndex = 0;
      this.playBegan =
        this.score[this.score.length - 1].relativeEndTime + this.playBegan;
    } else {
      this.nextNoteIndex = this.nextNoteIndex + 1;
    }
  }

  play() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.current16thNote = 0;
      this.nextNoteTime = this.ctx.currentTime;
      this.nextNoteIndex = 0;
      this.playBegan = this.ctx.currentTime;
      this.clock.start(this.scheduler);
    } else {
      this.clock.stop();
    }
  }
}

export default NoteScheduler;
