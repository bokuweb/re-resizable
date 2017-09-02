import React from 'react';
import Resizable from '../../src';

const handlerClasses = {
  wrapper: 'react-resize-wrapper'
}

export default () => (
  <div>
    <Resizable
      className="item"
      width="280"
      height="300"
      minWidth="240"
      minHeight="120"
      maxWidth="800"
      maxHeight="600"
      handlerClasses={handlerClasses}
    >
      <div className="content">
        Resize me!!<br />
        <span style={{ fontSize: '11px', fontFamily: 'Arial' }}>
          max 800 * 600 / min 240 * 120
          </span>
      </div>
    </Resizable>
  </div>
);
