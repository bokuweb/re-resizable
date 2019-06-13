import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('basic', module).add('default', () => (
  <Resizable
    style={style}
    defaultSize={{
      width: 200,
      height: 200,
    }}
  >
    001
  </Resizable>
));
