import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

const cell: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100px',
  height: '50px',
  backgroundColor: '#f8f8f8',
  border: '1px solid #f0f0f0',
  boxSizing: 'border-box',
};

const container: React.CSSProperties = {
  display: 'flex',
  gap: '3px',
};

const verticalContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
};

storiesOf('grid', module)
  .add('default', () => (
    <Resizable
      style={style}
      grid={[100, 100]}
      defaultSize={{ width: 100, height: 100 }}
      onResize={a => {
        console.log(a);
      }}
    >
      001
    </Resizable>
  ))
  .add('grid gap', () => (
    <div style={container}>
      <div style={verticalContainer}>
        <div style={cell} />
        {Array.from({ length: 3 }, (_, idx) => (
          <div style={cell}>h: 50px</div>
        ))}
      </div>
      <div style={verticalContainer}>
        <div style={container}>
          {Array.from({ length: 3 }, (_, idx) => (
            <div key={idx} style={cell}>
              w: 100px
            </div>
          ))}
        </div>
        <Resizable
          style={style}
          grid={[100, 50]}
          gridGap={[3, 3]}
          defaultSize={{ width: 100, height: 50 }}
          maxWidth={306}
          maxHeight={156}
          enable={{
            top: false,
            topRight: false,
            right: true,
            bottomRight: true,
            bottom: true,
            bottomLeft: false,
            left: false,
            topLeft: false,
          }}
          onResize={a => {
            console.log(a);
          }}
        >
          001
        </Resizable>
      </div>
    </div>
  ));
