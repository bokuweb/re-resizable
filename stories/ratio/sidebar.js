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

const wrapper = {
  flex: 1,
  display: 'flex'
}

const content = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const header = {
  background: '#666666',
  color: 'white',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const sidebar = {
  background: '#999999',
  color: 'white',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const aspectRatio = 16 / 9;

export default () => (
  <Resizable
    style={style}
    defaultSize={{
      width: 400 + 50,
      height: (400 / aspectRatio) + 50,
    }}
    lockAspectRatio={aspectRatio}
    lockAspectRatioExtraHeight={50}
    lockAspectRatioExtraWidth={50}
  >
    <div style={header}>Header</div>
    <div style={wrapper}>
      <div style={sidebar}>Nav</div>
      <div style={content}>001</div>
    </div>
  </Resizable>
);
