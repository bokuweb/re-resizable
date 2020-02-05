import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('flex', module)
  .add('default', () => (
    <div style={{ display: 'flex' }}>
      <Resizable style={style}>001</Resizable>
      <Resizable style={style}>002</Resizable>
    </div>
  ))
  .add('flex row', () => (
    <div style={{ display: 'flex' }}>
      <Resizable style={{ ...style, flexBasis: '100px' }}>001</Resizable>
      <Resizable style={{ ...style, flexBasis: '100px' }}>002</Resizable>
    </div>
  ))
  .add('flex column', () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Resizable style={{ ...style, flexBasis: '100px' }}>001</Resizable>
      <Resizable style={{ ...style, flexBasis: '100px' }}>002</Resizable>
    </div>
  ));
