import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('snapping', module)
  .add('absolute', () => (
    <Resizable
      style={style}
      snap={{ x: [100, 300, 450], y: [100, 300, 450] }}
      snapGap={20}
      defaultSize={{ width: 50, height: 50 }}
    >
      001
    </Resizable>
  ))
  .add('grid', () => (
    <Resizable style={style} grid={[100, 100]} snapGap={20} defaultSize={{ width: 50, height: 50 }}>
      001
    </Resizable>
  ));
