/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';

import Basic from './basic';
import Auto from './auto';
import MinWidth from './min-width';
import MinHeight from './min-height';
import MaxWidth from './max-width';
import MaxHeight from './max-height';
import AutoWidth from './auto-width';
import AutoHeight from './auto-height';
import Grid from './grid';
import LockAspect from './lock-aspect';
import BoundsParent from './bounds-parent';
import MaxSizePercent from './max-size-percent';
import MinSizePercent from './min-size-percent';
import PercentSize from './percent-size';

storiesOf('re-resizable', module)
  .add('basic.', () => <Basic />)
  .add('set auto as default if size omitted.', () => <Auto />)
  .add('set auto only width.', () => <AutoWidth />)
  .add('set auto only height.', () => <AutoHeight />)
  .add('min width 100px.', () => <MinWidth />)
  .add('min height 100px.', () => <MinHeight />)
  .add('max width 400px.', () => <MaxWidth />)
  .add('max height 400px.', () => <MaxHeight />)
  .add('grid [10, 20].', () => <Grid />)
  .add('lock aspect ratio w:h = 2:3', () => <LockAspect />)
  .add('bounds parent', () => <BoundsParent />)
  .add('max size percent', () => <MaxSizePercent />)
  .add('min size percent', () => <MinSizePercent />)
  .add('percent size', () => <PercentSize />);

