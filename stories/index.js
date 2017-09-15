/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';

import Auto from './auto';

import DefaultSizeBasic from './default-size/basic';
import DefaultSizeMinWidth from './default-size/min-width';
import DefaultSizeMinHeight from './default-size/min-height';
import DefaultSizeMaxWidth from './default-size/max-width';
import DefaultSizeMaxHeight from './default-size/max-height';
import DefaultSizeAutoWidth from './default-size/auto-width';
import DefaultSizeAutoHeight from './default-size/auto-height';
import DefaultSizeGrid from './default-size/grid';
import DefaultSizeLockAspect from './default-size/lock-aspect';
import DefaultSizeBoundsParent from './default-size/bounds-parent';
import DefaultSizeMaxSizePercent from './default-size/max-size-percent';
import DefaultSizeMinSizePercent from './default-size/min-size-percent';
import DefaultSizePercent from './default-size/percent-size';

import SizeBasic from './size/basic';
import SizePercent from './size/percent-size';

storiesOf('omit size', module)
  .add('auto.', () => <Auto />)

storiesOf('defaultSize', module)
  .add('basic.', () => <DefaultSizeBasic />)
  .add('set auto as default if size omitted.', () => <DefaultSizeAuto />)
  .add('set auto only width.', () => <DefaultSizeAutoWidth />)
  .add('set auto only height.', () => <DefaultSizeAutoHeight />)
  .add('min width 100px.', () => <DefaultSizeMinWidth />)
  .add('min height 100px.', () => <DefaultSizeMinHeight />)
  .add('max width 400px.', () => <DefaultSizeMaxWidth />)
  .add('max height 400px.', () => <DefaultSizeMaxHeight />)
  .add('grid [10, 20].', () => <DefaultSizeGrid />)
  .add('lock aspect ratio w:h = 2:3', () => <DefaultSizeLockAspect />)
  .add('bounds parent', () => <DefaultSizeBoundsParent />)
  .add('max size percent', () => <DefaultSizeMaxSizePercent />)
  .add('min size percent', () => <DefaultSizeMinSizePercent />)
  .add('percent size', () => <DefaultSizePercent />);

storiesOf('size', module)
  .add('basic.', () => <SizeBasic />)
  .add('percent size', () => <SizePercent />);