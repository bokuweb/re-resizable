import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('auto', module)
  .add('default', () => (
    <Resizable style={style} onResize={e => console.log(e)}>
      001
    </Resizable>
  ))
  .add('height', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 200,
        height: 'auto',
      }}
    >
      001
    </Resizable>
  ))
  .add('width', () => (
    <Resizable
      style={style}
      defaultSize={{
        width: 'auto',
        height: 200,
      }}
    >
      001
    </Resizable>
  ));
