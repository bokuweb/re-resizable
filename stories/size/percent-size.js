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
      width: '30%',
      height: '20%',
    }
  }

  render() {
    return (
      <Resizable
        style={style}
        size={this.state}
        onResizeStop={(e, direction, ref, d) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
          });
        }}
      >
        001
     </Resizable >
    )
  }
}
