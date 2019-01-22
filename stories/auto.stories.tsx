/* eslint-disable */

import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

storiesOf('auto', module).add('default', () => <Resizable style={style}>001</Resizable>);
