// Type definitions for react-resizable-box 1.8
// Project: https://github.com/bokuweb/react-resizable-box
// Definitions by: Kalle Ott <https://github.com/kaoDev>
// Definitions: https://github.com/kaoDev/react-resizable-box
// TypeScript Version: 2.2

import * as React from 'react';

export interface ResizableState {
  width?: number | string;
  height?: number | string;
  direction?: string;
  original?: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  isActive?: boolean;
}

export type Size = {
  width: number;
  height: number;
}

export type CSSSize = {
  width: string;
  height: string;
}

export type ResizeHandler = (direction: string, styleSize: Size, clientSize: Size, delta: Size) => any;
export type ResizeStartHandler = (direction: string, styleSize: Size, clientSize: Size, event: React.MouseEvent<any> | React.TouchEvent<any>) => any;

export interface ResizableProps {
  children?: React.ReactChildren;
  onClick?: React.MouseEventHandler<any>;
  onDoubleClick?: React.MouseEventHandler<any>;
  onMouseDown?: React.MouseEventHandler<any>;
  onResizeStop?: ResizeHandler;
  onResizeStart?: ResizeStartHandler;
  onTouchStart?: React.TouchEventHandler<any>;
  onResize?: ResizeHandler;
  customStyle?: React.CSSProperties;
  handleStyle?: {
    top?: React.CSSProperties,
    right?: React.CSSProperties,
    bottom?: React.CSSProperties,
    left?: React.CSSProperties,
    topRight?: React.CSSProperties,
    bottomRight?: React.CSSProperties,
    bottomLeft?: React.CSSProperties,
    topLeft?: React.CSSProperties,
  },
  handleClass?: {
    top?: string,
    right?: string,
    bottom?: string,
    left?: string,
    topRight?: string,
    bottomRight?: string,
    bottomLeft?: string,
    topLeft?: string,
  },
  isResizable?: {
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean,
    topRight: boolean,
    bottomRight: boolean,
    bottomLeft: boolean,
    topLeft: boolean,
  },
  customClass?: string,
  width?: string | number,
  height?: string | number,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
  grid?: number[],
  lockAspectRatio?: boolean,
  extendsProps?: object,
}

export default class Resizable extends React.Component<ResizableProps, ResizableState> {

  onResizeStartWithDirection: object;

  onTouchMove(event: React.TouchEvent<any>): void;

  onMouseMove(params: { clientX: number, clientY: number }): void;

  onMouseUp(): void;

  onResizeStart(direction: string, e: React.TouchEvent<any> | React.MouseEvent<any>): void

  getBoxSize(): Size;

  setSize(size: Size): void;

  getBoxStyle(): CSSSize;

  updateSize({ width, height }: Size): void;
}
