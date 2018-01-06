/* eslint-disable */

import React from 'react';
import Resizable from '../../src';

const style = {
  display: 'flex',
  flexDirection: 'column',
  background: '#f0f0f0',
  border: 0,
  padding: 0,
};

const content = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const header = {
  background: '#999999',
  color: 'white',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const aspectRatio = 16 / 9;

export default () => (
  <Resizable
    style={style}
    defaultSize={{
      width: 400,
      height: (400 / aspectRatio) + 50,
    }}
    lockAspectRatio={aspectRatio}
    lockAspectRatioExtraHeight={50}
  >
    <div style={header}>Header</div>
    <div style={content}>001</div>
  </Resizable>
);
