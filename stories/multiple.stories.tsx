import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('multiple', module)
  .add('horizontal', () => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Resizable
        style={style}
        defaultSize={{
          width: '50%',
          height: 200,
        }}
        maxWidth="100%"
        minWidth="1"
      >
        001
      </Resizable>
      <div style={{ ...style, width: '100%', minWidth: '1px' }}>002</div>
    </div>
  ))
  .add('vertical', () => (
    <div
      style={{
        width: '300px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Resizable
        style={style}
        defaultSize={{
          width: '300',
          height: '200',
        }}
        maxHeight="398"
        minHeight="1"
      >
        001
      </Resizable>
      <div style={{ ...style, width: '300px', height: '100%', minHeight: '1px' }}>002</div>
    </div>
  ));
