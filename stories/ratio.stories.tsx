import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('ratio', module).add('double', () => (
  <Resizable
    style={style}
    resizeRatio={2}
    defaultSize={{
      width: 200,
      height: 200,
    }}
  >
    001
  </Resizable>
));
