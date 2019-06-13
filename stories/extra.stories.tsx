import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';

const wrapper = {
  flex: 1,
  display: 'flex',
};

const style = {
  display: 'flex',
  flexDirection: 'column' as 'column',
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
};

const sidebar = {
  background: '#999999',
  color: 'white',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const aspectRatio = 16 / 9;

storiesOf('extra', module)
  .add('header', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 400,
        height: 400 / aspectRatio + 50,
      }}
      lockAspectRatio={aspectRatio}
      lockAspectRatioExtraHeight={50}
    >
      <div style={header}>Header</div>
      <div style={content}>001</div>
    </Resizable>
  ))
  .add('sidebar', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 400 + 50,
        height: 400 / aspectRatio + 50,
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
  ));
