import React, { Component } from 'react';
import Keyboard from './Keyboard';
import Grid from './Grid';
import { flatten, constant, times } from 'lodash';
import Metronome from '../Audio/Metronome';
import Score from '../Audio/Score';

class Sequencer extends Component {
  notes = [
    'C',
    'C#/Db',
    'D',
    'D#/Eb',
    'E',
    'F',
    'F#/Gb',
    'G',
    'G#/Ab',
    'A',
    'A#/Bb',
    'B'
  ];

  static defaultProps = {
    bars: 4,
    meterFraction: 16,
    bpm: 120,
    rowHeight: 18,
    registers: 6,
    segmentSize: 60,
    keyWidth: 60
  };

  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  state = {
    gridWidth: 0,
    metOn: false
  };

  componentDidMount() {
    this.met = new Metronome();

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
      .addRest('quarter')
      .getScore();

    console.log(myScore);

    this.setState({
      gridWidth: this.wrapper.current.offsetWidth - this.props.keyWidth
    });
  }

  keys() {
    return flatten(times(this.props.registers, constant(this.notes)));
  }

  toggleMet = () => {
    if (!this.met) {
      return;
    }
    const { metOn } = this.state;
    if (metOn) {
      this.setState({ metOn: false }, () => {
        this.met.play();
      });
    } else {
      this.setState({ metOn: true }, () => {
        this.met.play();
      });
    }
  };

  render() {
    const keys = this.keys();

    return (
      <div>
        <span>Metronome:</span>
        <button onClick={this.toggleMet}>
          {this.state.metOn ? 'OFF' : 'ON'}
        </button>
        <div
          style={{
            height: '600px',
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'row'
          }}
          ref={this.wrapper}
        >
          <Keyboard {...this.props} keys={keys} />
          <Grid {...this.props} keys={keys} gridWidth={this.state.gridWidth} />
        </div>
      </div>
    );
  }
}

export default Sequencer;
