// Type definitions for react-resizable-box 2.0
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
  isResizing?: boolean;
}

export type Size = {
  width: number;
  height: number;
}

export type CSSSize = {
  width: string;
  height: string;
}

export type ResizeHandler = (
  event: MouseEvent | TouchEvent,
  direction: string,
  refToElement: HTMLElement,
  delta: Size,
) => void;

export type ResizeStartCallBack = (
  e: React.MouseEvent<any> | React.TouchEvent<any>,
  dir: string,
  refToElement: HTMLElement,
) => void;

export interface ResizableProps {
  onResizeStop?: ResizeHandler;
  onResizeStart?: ResizeStartCallBack;
  onResize?: ResizeHandler;
  style?: React.CSSProperties;
  handleStyles?: {
    top?: React.CSSProperties,
    right?: React.CSSProperties,
    bottom?: React.CSSProperties,
    left?: React.CSSProperties,
    topRight?: React.CSSProperties,
    bottomRight?: React.CSSProperties,
    bottomLeft?: React.CSSProperties,
    topLeft?: React.CSSProperties,
  },
  handleClasses?: {
    top?: string,
    right?: string,
    bottom?: string,
    left?: string,
    topRight?: string,
    bottomRight?: string,
    bottomLeft?: string,
    topLeft?: string,
  },
  enable?: {
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean,
    topRight: boolean,
    bottomRight: boolean,
    bottomLeft: boolean,
    topLeft: boolean,
  },
  className?: string,
  width?: string | number,
  height?: string | number,
  minWidth?: number | string,
  minHeight?: number | string,
  maxWidth?: number | string,
  maxHeight?: number | string,
  grid?: number[],
  bounds?: 'parent' | 'window' | HTMLElement,
  lockAspectRatio?: boolean,
}

export default class Resizable extends React.Component<ResizableProps, ResizableState> {

  resizable: HTMLElement;

  onTouchMove(event: React.TouchEvent<any>): void;

  onMouseMove(event: MouseEvent | TouchEvent): void;

  onMouseUp(event: MouseEvent | TouchEvent): void;

  onResizeStart(event: React.TouchEvent<any> | React.MouseEvent<any>, direction: string): void

  getBoxSize(): Size;

  setSize(size: Size): void;

  getBoxStyle(): CSSSize;

  updateSize({ width, height }: Size): void;
}
