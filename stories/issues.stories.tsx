/* eslint-disable */

import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';

const parentStyle = {
  display: 'flex',
  textAlign: 'center',
  flex: 1,
  height: '100%',
} as const;

const secondParentStyle = {
  flexGrow: 3,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
} as const;

const first = {
  flexGrow: 1,
  border: '1px solid silver',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '1px',
};

const second = {
  flexGrow: 2,
  border: '1px solid silver',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1px',
};

const third = {
  flexGrow: 1,
  border: '1px solid silver',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

storiesOf('issues', module).add('#518', () => (
  <div style={parentStyle}>
    <Resizable
      style={first}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <h1>First</h1>
    </Resizable>
    <Resizable
      style={secondParentStyle}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div style={second}>
        <h1>Second</h1>
      </div>
      <Resizable
        style={third}
        enable={{
          top: true,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <h1>Content</h1>
      </Resizable>
    </Resizable>
    <div style={secondParentStyle}>
      <div style={second}>
        <h1>Third</h1>
      </div>
    </div>
  </div>
));
