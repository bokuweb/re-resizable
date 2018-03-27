import React from 'react';
import Resizable from '../../src';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  padding: '10px',
};

export default () => (
  <div style={{ width: '100%', height: '100%' }}>
    <Resizable defaultSize={{ width: '80%', height: '80%' }} style={style}>
      <Resizable defaultSize={{ width: '80%', height: '80%' }} style={style}>
        Nested
      </Resizable>
    </Resizable>
  </div>
);
