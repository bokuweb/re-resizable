/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';

import Basic from './basic';

storiesOf('re-resizable', module)
  .add('basic', () => <Basic />);
