import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('auto', module).add('default', () => <Resizable style={style}>001</Resizable>);
