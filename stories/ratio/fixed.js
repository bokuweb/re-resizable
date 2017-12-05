/* eslint-disable */

import React from 'react';
import Resizable from '../../src';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 0,
  padding: 0,
  background: '#f0f0f0',
};

const aspectRatio = 16 / 9;

export default () => (
  <Resizable
    style={style}
    defaultSize={{
      width: 400,
      height: (400 / aspectRatio),
    }}
    lockAspectRatio={aspectRatio}
  >
    001
  </Resizable>
);
