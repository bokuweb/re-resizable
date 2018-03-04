import React from 'react';
import Resizable from '../../src';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  marginBottom: '20px',
};

export default () => (
  <div style={{ width: '100%', height: '100%' }}>
    <Resizable
      defaultSize={{ width: 'auto', height: 120 }}
      style={style}
    >
      001
    </Resizable>
    <Resizable
      defaultSize={{ width: 'auto', height: 120 }}
      style={style}
    >
      002
    </Resizable>    
    <Resizable
      defaultSize={{ width: 'auto', height: 120 }}
      style={style}
    >
      003
    </Resizable>    
  </div>
);
