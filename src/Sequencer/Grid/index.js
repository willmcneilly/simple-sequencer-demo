import React, { Component } from 'react';
import styled from 'styled-components';
import { fill } from 'lodash';

const GridWrapper = styled.div`
  height: ${({height}) => `${height}px`}};
  width: ${({width}) => `${width}px`}};
  display: flex;
  flex-direction: column-reverse;
  overflow-x: scroll;
`

const Row = styled.div`
  height: ${({rowHeight}) => `${rowHeight}px`}};
  width: ${({rowWidth}) => `${rowWidth}px`}};
  display: flex;
`;

const BlackRow = Row.extend`
  background-color: #eee;
`;

const WhiteRow = Row.extend`
  background-color: #fff;
  border-top: 1px solid #eee;
`;

const Segment = styled.div`
  box-sizing: border-box;
  width: ${({segWidth}) => `${segWidth}px`}}
  border-left: 1px solid #ddd;
  border-right: 0;
`;

const SegmentFirst = Segment.extend`
  border-left: 1px solid #aaa;
  border-right: 0;
`;

const SegmentLast = Segment.extend`
  border-left: 1px solid #ddd;
  border-right: 1px solid #aaa;
`;

const BarWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

class Bar extends Component {
  renderSegments() {
    const { meterFraction, segmentSize } = this.props;

    return fill(Array(meterFraction), null).map((_, i, arr) => {
      const key = i;
      if(i === 0) {
        return <SegmentFirst segWidth={segmentSize} key={key} />
      } else if (i === arr.length - 1) {
        return <SegmentLast segWidth={segmentSize} key={key} />
      } else {
        return <Segment segWidth={segmentSize} key={key} />
      }
    });
  }

  render() {
    const { segmentSize, meterFraction } = this.props;
    return (
      <BarWrapper>
        {this.renderSegments()}
      </BarWrapper>
    );
  }
}

class Grid extends Component {
  renderBars(register) {
    const { rowHeight, bars, meterFraction, segmentSize } = this.props;
    return fill(Array(bars)).map((_, i) => {
      return <Bar meterFraction={meterFraction} segmentSize={segmentSize} key={`bar-${i}-${register}`}/>
    })
  }

  renderRows() {
    const { rowHeight, bars, meterFraction, segmentSize } = this.props;
    const rowWidth = bars * meterFraction * segmentSize;
    return this.props.keys.map((key, i) => {
      const register = Math.floor(i / 12);
      return key.includes('/') ?
        (
          <BlackRow
            key={`${key}-${register}`}
            note={key}
            register={register}
            rowHeight={rowHeight}
            rowWidth={rowWidth}
          >
            {this.renderBars(register)}
          </BlackRow>
        ) : (
          <WhiteRow
            key={`${key}-${register}`}
            note={key}
            register={register}
            rowHeight={rowHeight}
            rowWidth={rowWidth}
          >
            {this.renderBars(register)}
          </WhiteRow>
        );
    });
  }

  render() {
    const { registers, gridWidth, rowHeight} = this.props;
    return (
      <GridWrapper height={registers * 12 * rowHeight} width={gridWidth} >
        {this.renderRows()}
      </GridWrapper>
    );
  }
}



export default Grid;
