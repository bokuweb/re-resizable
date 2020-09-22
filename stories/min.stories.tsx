import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('min', module)
  .add('height', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 200,
        height: 200,
      }}
      minHeight="200px"
    >
      001
    </Resizable>
  ))
  .add('width', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 200,
        height: 200,
      }}
      minWidth="200px"
    >
      001
    </Resizable>
  ))
  .add('percentage', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 200,
        height: 200,
      }}
      minWidth="30%"
      minHeight="50%"
    >
      001
    </Resizable>
  ));
