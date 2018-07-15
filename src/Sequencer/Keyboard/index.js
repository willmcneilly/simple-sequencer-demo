import React, { Component } from 'react';
import styled from 'styled-components';

const KeyboardWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: ${({ height }) => `${height}px`}};
  border-left: 1px solid #fff;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const WhiteKey = styled.div`
  width: ${({ keyWidth }) => `${keyWidth}px`}};
  background-color: white;
  height: ${({ rowHeight }) => `${rowHeight}px`}};
  border-top: 1px solid #ddd;
  position: relative;
  box-sizing: border-box;
  &:hover,
  &:active {
    background-color: #eee;
  }
`;

const KeyLabel = styled.span`
  font-size: 8px;
  font-weight: bold;
  position: absolute;
  right: 4px;
  top: 4px;
  color: #999;
`;

const BlackKey = WhiteKey.extend`
  background-color: #222;
  &:hover,
  &:active {
    background-color: #000;
  }
`;

class Keyboard extends Component {
  static defaultProps = {
    registers: 6
  };

  renderKeys = () => {
    const { rowHeight, keys, keyWidth } = this.props;
    return keys.map((key, i) => {
      const register = Math.floor(i / 12);
      return key.includes('/') ? (
        <BlackKey
          key={`${key}-${register}`}
          note={key}
          register={register}
          rowHeight={rowHeight}
          keyWidth={keyWidth}
        />
      ) : (
        <WhiteKey
          key={`${key}-${register}`}
          note={key}
          register={register}
          rowHeight={rowHeight}
          keyWidth={keyWidth}
        >
          {key === 'C' && (
            <KeyLabel>
              {key}-{register}
            </KeyLabel>
          )}
        </WhiteKey>
      );
    });
  };

  render() {
    return (
      <KeyboardWrapper
        height={this.props.registers * 12 * this.props.rowHeight}
      >
        {this.renderKeys()}
      </KeyboardWrapper>
    );
  }
}

export default Keyboard;
