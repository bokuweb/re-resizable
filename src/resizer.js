/* @flow */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

const styles = {
  base: {
    position: 'absolute',
  },
  top: {
    width: '100%',
    height: '10px',
    top: '-5px',
    left: '0px',
    cursor: 'row-resize',
  },
  right: {
    width: '10px',
    height: '100%',
    top: '0px',
    right: '-5px',
    cursor: 'col-resize',
  },
  bottom: {
    width: '100%',
    height: '10px',
    bottom: '-5px',
    left: '0px',
    cursor: 'row-resize',
  },
  left: {
    width: '10px',
    height: '100%',
    top: '0px',
    left: '-5px',
    cursor: 'col-resize',
  },
  topRight: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    cursor: 'ne-resize',
  },
  bottomRight: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '-10px',
    bottom: '-10px',
    cursor: 'se-resize',
  },
  bottomLeft: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    left: '-10px',
    bottom: '-10px',
    cursor: 'sw-resize',
  },
  topLeft: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    left: '-10px',
    top: '-10px',
    cursor: 'nw-resize',
  },
};

export type Direction = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';

export type OnStartCallback = (
  e: SyntheticMouseEvent | SyntheticTouchEvent,
  dir: Direction,
) => void;

export type Props = {
  direction: Direction;
  className?: string;
  replaceStyles?: any;
  onResizeStart: OnStartCallback;
}

export default function ResizeHandler(props: Props) {
  return (
    <div
      className={props.className}
      style={{
        ...styles.base,
        ...styles[props.direction],
        ...(props.replaceStyles || {}),
      }}
      onMouseDown={(e: SyntheticMouseEvent) => props.onResizeStart(e, props.direction)}
      onTouchStart={(e: SyntheticTouchEvent) => props.onResizeStart(e, props.direction)}
    />
  );
}
