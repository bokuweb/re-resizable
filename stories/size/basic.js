/* eslint-disable */

import React from 'react';
import Resizable from '../../src';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

export default class Size extends React.Component {

  constructor() {
    super();
    this.state = {
      width: 200,
      height: 200,
    }
  }

  render() {
    return (
      <div style={{ transform: 'scale(0.5)' }}>
        <Resizable
          scale={0.5}
          style={style}
          size={this.state}
          onResizeStop={(e, direction, ref, d) => {
            this.setState({
              width: this.state.width + d.width,
              height: this.state.height + d.height,
            });
          }}
        >
          001
       </Resizable>
      </div>
    )
  }
}
