/* eslint-disable */

import React from 'react';
import Resizable from '../../src';
import style from './default-style';

export default () => (
  <Resizable
    style={style}
    defaultSize={{
      width: '30%',
      height: '20%',
    }}
  >
    001
  </Resizable>
);
