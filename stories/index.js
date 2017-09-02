/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';

import Basic from './basic';
import Auto from './auto';

storiesOf('re-resizable', module)
  .add('basic.', () => <Basic />)
  .add('set auto if size omitted.', () => <Auto />);
