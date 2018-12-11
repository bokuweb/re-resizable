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
import DefaultSizeAbsoluteSnap from './default-size/absolute-snap';
import DefaultSizeLockAspect from './default-size/lock-aspect';
import DefaultSizeBoundsParent from './default-size/bounds-parent';
import DefaultSizeMaxSizePercent from './default-size/max-size-percent';
import DefaultSizeMinSizePercent from './default-size/min-size-percent';
import DefaultSizePercent from './default-size/percent-size';
import DefaultSizeRelative from './default-size/relative-units';

import SizeBasic from './size/basic';
import SizePercent from './size/percent-size';

import RatioBasic from './ratio/basic';
import RatioFixed from './ratio/fixed';
import RatioHeader from './ratio/header';
import RatioSidebar from './ratio/sidebar';

import HandleComponentBottomRight from './handle-component/bottom-right';

import MultipleVertical from './multiple/vertical';
import MultipleHorizontal from './multiple/horizontal';

import Nested from './nested/nested';

import Scaled from './scaled/scaled';

import ResizeRatioSingle from './resize-ratio/single';
import ResizeRatioDouble from './resize-ratio/double';

storiesOf('omit size', module)
  .add('auto.', () => <Auto />)

storiesOf('defaultSize', module)
  .add('basic.', () => <DefaultSizeBasic />)
  .add('set auto only width.', () => <DefaultSizeAutoWidth />)
  .add('set auto only height.', () => <DefaultSizeAutoHeight />)
  .add('min width 100px.', () => <DefaultSizeMinWidth />)
  .add('min height 100px.', () => <DefaultSizeMinHeight />)
  .add('max width 400px.', () => <DefaultSizeMaxWidth />)
  .add('max height 400px.', () => <DefaultSizeMaxHeight />)
  .add('grid [10, 20].', () => <DefaultSizeGrid />)
  .add('absolute snap {x y}.', () => <DefaultSizeAbsoluteSnap />)
  .add('lock aspect ratio w:h = 2:3', () => <DefaultSizeLockAspect />)
  .add('bounds parent', () => <DefaultSizeBoundsParent />)
  .add('max size percent', () => <DefaultSizeMaxSizePercent />)
  .add('min size percent', () => <DefaultSizeMinSizePercent />)
  .add('percent size', () => <DefaultSizePercent />)
  .add('relative units', () => <DefaultSizeRelative />);

storiesOf('size', module)
  .add('basic.', () => <SizeBasic />)
  .add('percent size', () => <SizePercent />);

storiesOf('lockAspectRatio', module)
  .add('basic h:w is 2:1', () => <RatioBasic />)
  .add('ratio is 16:9', () => <RatioFixed />)
  .add('ratio is 16:9 with 50px header', () => <RatioHeader />)
  .add('ratio is 16:9 with 50px header and sidebar', () => <RatioSidebar />);

storiesOf('handleComponent', module)
  .add('bottom right', () => <HandleComponentBottomRight />);

storiesOf('multiple', module)
  .add('vertical', () => <MultipleVertical />)
  .add('horizontal (with flex layout)', () => <MultipleHorizontal />);

storiesOf('nested', module)
  .add('nested', () => <Nested />)

storiesOf('scaled', module)
  .add('scaled', () => <Scaled />)

storiesOf('resize ratio', module)
  .add('single ratio', () => <ResizeRatioSingle />)
  .add('double ratio', () => <ResizeRatioDouble />)