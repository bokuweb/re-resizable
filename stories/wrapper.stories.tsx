import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('wrapper', module).add('default', () => (
  <Resizable
    as="header"
    style={style}
    defaultSize={{
      width: 200,
      height: 300,
    }}
    lockAspectRatio
  >
    This is a "header" element
  </Resizable>
));
