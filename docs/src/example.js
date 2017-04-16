import React from 'react';
import Resizable from '../../src';

export default () => (
  <div style={{width: '400px',margin: '100px'}}>
    <Resizable
      className="item"
      width="280"
      height="300"
      minWidth="240"
      minHeight="120"
      maxWidth="800"
      maxHeight="600"    
      bounds="parent"  
    >
      <span>
        Resize me!!<br />
        <span style={{ fontSize: '11px', fontFamily: 'Arial' }}>
          max 800 * 600 / min 240 * 120
          </span>
      </span>
    </Resizable>
  </div>
);
