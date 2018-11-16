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

export default () => (
  <div style={{ transform: 'scale(0.5)', transformOrigin: '0 0' }}>
    <Resizable
      scale={0.5}
      style={style}
      defaultSize={{
        width: 200,
        height: 200,
      }}
    >
      transform: scale(0.5)
    </Resizable>
  </div>
);
