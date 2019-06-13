import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('aspect', module).add('default', () => (
  <Resizable
    style={style}
    defaultSize={{
      width: 200,
      height: 300,
    }}
    lockAspectRatio
  >
    001
  </Resizable>
));
