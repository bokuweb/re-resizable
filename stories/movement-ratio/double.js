/* eslint-disable */

import React from 'react';
import Resizable from '../../src';

const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

export default () => (
  <div style={container}>
    <Resizable
      style={style}
      movementRatio={2}
      defaultSize={{
        width: 200,
        height: 200,
      }}
    >
      001
    </Resizable>
  </div>
);
