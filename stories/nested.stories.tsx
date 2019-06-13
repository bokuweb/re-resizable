import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  padding: '10px',
};

storiesOf('nested', module).add('default', () => (
  <div style={{ width: '100%', height: '100%' }}>
    <Resizable defaultSize={{ width: '80%', height: '80%' }} style={style}>
      <Resizable defaultSize={{ width: '80%', height: '80%' }} style={style}>
        Nested
      </Resizable>
    </Resizable>
  </div>
));
