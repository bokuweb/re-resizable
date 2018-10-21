/* eslint-disable */

import React from 'react';
import Resizable from '../../src';
import style from './default-style';

export default () => (
  <Resizable
    style={style}
    defaultSize={{
      width: '50vw',
      height: '50vh',
    }}
  >
    001
  </Resizable>
);
