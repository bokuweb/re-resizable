import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('bounds', module)
  .add('parent', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 200,
        height: 200,
      }}
      bounds="parent"
    >
      001
    </Resizable>
  ))
  .add('window', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 200,
        height: 200,
      }}
      bounds="window"
    >
      001
    </Resizable>
  ));
