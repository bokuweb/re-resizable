/* eslint-disable */

import React from 'react';
import Resizable from '../../src';
import style from './default-style';

export default () => (
  <Resizable
    style={style}
    defaultSize={{
      width: 200,
      height: 200,
    }}
    maxHeight={400}
  >
    001
  </Resizable>
);
