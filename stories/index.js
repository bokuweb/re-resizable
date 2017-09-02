import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Resizable from '../src';

storiesOf('react-resizable-box', module)
  .add('with text', () => <Resizable>A</Resizable>);
