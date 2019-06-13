import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('scaled', module).add('half', () => (
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
));
