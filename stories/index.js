/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';

import Basic from './basic';

storiesOf('react-resizable-box', module)
  .add('basic', () => <Basic />);
