/* @flow */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-bitwise */
/* eslint-disable react/no-did-mount-set-state */

import React, { Component } from 'react';
// flow-disable-line
import isEqual from 'lodash.isequal';
import Resizer from './resizer';

import type { Direction, OnStartCallback } from './resizer';

const userSelectNone = {
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  MsUserSelect: 'none',
};

const userSelectAuto = {
  userSelect: 'auto',
  MozUserSelect: 'auto',
  WebkitUserSelect: 'auto',
  MsUserSelect: 'auto',
};

type Enable = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  topRight?: boolean;
  bottomRight?: boolean;
  bottomLeft?: boolean;
  topLeft?: boolean;
}

type HandlerStyles = {
  top?: any;
  right?: any;
  bottom?: any;
  left?: any;
  topRight?: any;
  bottomRight?: any;
  bottomLeft?: any;
  topLeft?: any;
}

type HandlerClassName = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  topRight?: string;
  bottomRight?: string;
  bottomLeft?: string;
  topLeft?: string;
}

type Size = {
  width: string | number;
  height: string | number;
}

type NumberSize = {
  width: number;
  height: number;
}

type Callback = (
  event: MouseEvent | TouchEvent,
  direction: Direction,
  resizableRef: React$Element<*>,
  delta: NumberSize,
) => void;

type ResizeStartCallBack = (
  e: SyntheticMouseEvent | SyntheticTouchEvent,
  dir: Direction,
  resizableRef: React$Element<*>,
) => void;

type Props = {
  style?: any;
  className?: string;
  extendsProps?: any;
  grid: [number, number];
  bounds?: 'parent' | 'window' | HTMLElement;
  width: number | string;
  height: number | string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  lockAspectRatio?: boolean;
  enable: Enable;
  handlerStyles?: HandlerStyles;
  handlerClasses?: HandlerClassName;
  children?: any;
  onResizeStart?: ResizeStartCallBack;
  onResize?: Callback;
  onResizeStop?: Callback;
}

type State = {
  isResizing: boolean;
  direction: Direction;
  original: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  width: number | string;
  height: number | string;
}

const clamp = (n: number, min: number, max: number) => Math.max(Math.min(n, max), min);
const snap = (n: number, size: number) => Math.round(n / size) * size;
// const directions: Array<Direction> = [
//  'top', 'right', 'bottom', 'left', 'topRight', 'bottomRight', 'bottomLeft', 'topLeft',
// ];

export default class Resizable extends Component {

  props: Props;
  state: State;
  resizable: React$Element<*>;
  // onResizeStartWithDirection: any;
  onTouchMove: Callback;
  onMouseMove: Callback;
  onMouseUp: Callback;
  onResizeStart: OnStartCallback;

  static defaultProps = {
    onResizeStart: () => { },
    onResize: () => { },
    onResizeStop: () => { },
    enable: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true,
    },
    width: 'auto',
    height: 'auto',
    style: {},
    grid: [1, 1],
    lockAspectRatio: false,
  }

  constructor(props: Props) {
    super(props);
    const { width, height } = props;
    this.state = {
      isResizing: false,
      width,
      height,
      direction: 'right',
      original: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    };
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    if (typeof window !== 'undefined') {
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('touchmove', this.onMouseMove);
      window.addEventListener('touchend', this.onMouseUp);
    }
  }

  componentDidMount() {
    const size = this.size;
    // If props.width or height is not defined, set default size when mounted.
    this.setState({
      width: this.state.width || size.width,
      height: this.state.height || size.height,
    });
  }

  componentWillReceiveProps({ width, height }: Size) {
    if (width !== this.props.width) this.setState({ width });
    if (height !== this.props.height) this.setState({ height });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('touchmove', this.onTouchMove);
      window.removeEventListener('touchend', this.onMouseUp);
    }
  }

  onResizeStart(event: SyntheticMouseEvent | SyntheticTouchEvent, direction: Direction) {
    let clientX = 0;
    let clientY = 0;
    if (event.nativeEvent instanceof MouseEvent) {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;
    } else if (event.nativeEvent instanceof TouchEvent) {
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    }
    // const clientSize = {
    //   width: this.resizable.clientWidth,
    //   height: this.resizable.clientHeight,
    // };
    // this.props.onResizeStart(direction, this.size, clientSize, event);
    if (this.props.onResizeStart) {
      this.props.onResizeStart(event, direction, this.resizable);
    }
    const size = this.size;
    this.setState({
      original: {
        x: clientX,
        y: clientY,
        width: size.width,
        height: size.height,
      },
      isResizing: true,
      direction,
    });
  }

  onMouseMove(event: MouseEvent | TouchEvent) {
    if (!this.state.isResizing) return;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    const { direction, original, width, height } = this.state;
    const { minWidth, maxWidth, minHeight, maxHeight, lockAspectRatio } = this.props;
    const ratio = original.height / original.width;
    let newWidth = original.width;
    let newHeight = original.height;
    if (/right/i.test(direction)) {
      newWidth = original.width + (clientX - original.x);
      const min = (typeof minWidth === 'undefined' || minWidth < 0) ? 0 : minWidth;
      const max = (typeof maxWidth === 'undefined' || maxWidth < 0) ? newWidth : maxWidth;
      newWidth = clamp(newWidth, min, max);
      newWidth = snap(newWidth, this.props.grid[0]);
    }
    if (/left/i.test(direction)) {
      newWidth = original.width - (clientX + original.x);
      const min = (typeof minWidth === 'undefined' || minWidth < 0) ? 0 : minWidth;
      const max = (typeof maxWidth === 'undefined' || maxWidth < 0) ? newWidth : maxWidth;
      newWidth = clamp(newWidth, min, max);
      newWidth = snap(newWidth, this.props.grid[0]);
    }
    if (/bottom/i.test(direction)) {
      newHeight = original.height + (clientY - original.y);
      const min = (typeof minHeight === 'undefined' || minHeight < 0) ? 0 : minHeight;
      const max = (typeof maxHeight === 'undefined' || maxHeight < 0) ? newHeight : maxHeight;
      newHeight = clamp(newHeight, min, max);
      newHeight = snap(newHeight, this.props.grid[1]);
    }
    if (/top/i.test(direction)) {
      newHeight = original.height - (clientY + original.y);
      const min = (typeof minHeight === 'undefined' || minHeight < 0) ? 0 : minHeight;
      const max = (typeof maxHeight === 'undefined' || maxHeight < 0) ? newHeight : maxHeight;
      newHeight = clamp(newHeight, min, max);
      newHeight = snap(newHeight, this.props.grid[1]);
    }
    if (lockAspectRatio) {
      newWidth = newHeight / ratio;
      newHeight = newWidth * ratio;
    }
    this.setState({
      width: width !== 'auto' ? newWidth : 'auto',
      height: height !== 'auto' ? newHeight : 'auto',
    });
    // const styleSize = {
    //   width: newWidth || this.state.width,
    //   height: newHeight || this.state.height,
    // };
    // const clientSize = {
    //   width: this.resizable.clientWidth,
    //   height: this.resizable.clientHeight,
    // };
    const delta = {
      width: newWidth - original.width,
      height: newHeight - original.height,
    };
    if (this.props.onResize) {
      this.props.onResize(event, direction, this.resizable, delta);
    }
  }

  onMouseUp(event: MouseEvent | TouchEvent) {
    const { isResizing, direction, original } = this.state;
    if (!isResizing) return;
    // const resizable = this.resizable;
    // const clientSize = {
    //   width: resizable.clientWidth,
    //   height: resizable.clientHeight,
    // };
    const delta = {
      width: this.size.width - original.width,
      height: this.size.height - original.height,
    };
    if (this.props.onResizeStop) {
      this.props.onResizeStop(event, direction, this.resizable, delta);
    }
    // this.props.onResizeStop(direction, clientSize, delta);
    this.setState({ isResizing: false });
  }

  get size(): NumberSize {
    let width = 0;
    let height = 0;
    if (typeof window !== 'undefined') {
      const style = window.getComputedStyle(this.resizable, null);
      width = ~~style.getPropertyValue('width').replace('px', '');
      height = ~~style.getPropertyValue('height').replace('px', '');
    }
    return { width, height };
  }

  setSize(size: Size) {
    this.setState({
      width: this.state.width || size.width,
      height: this.state.height || size.height,
    });
  }

  get style(): { width: string, height: string } {
    const size = (key: 'width' | 'height'): string => {
      if (typeof this.state[key] === 'undefined' || this.state[key] === 'auto') return 'auto';
      else if (/px$/.test(this.state[key].toString())) return this.state[key].toString();
      else if (/%$/.test(this.state[key].toString())) return this.state[key].toString();
      return `${this.state[key]}px`;
    };
    return {
      width: size('width'),
      height: size('height'),
    };
  }

  updateSize(size: Size) {
    this.setState({ width: size.width, height: size.height });
  }

  renderResizer() {
    const { enable, handlerStyles, handlerClasses } = this.props;
    return Object.keys(enable).map((dir: Direction) => {
      if (enable[dir] !== false) {
        return (
          <Resizer
            key={dir}
            direction={dir}
            onResizeStart={this.onResizeStart}
            replaceStyles={handlerStyles && handlerStyles[dir]}
            className={handlerClasses && handlerClasses[dir]}
          />
        );
      }
      return null;
    });
  }

  render() {
    const userSelect = this.state.isResizing ? userSelectNone : userSelectAuto;
    const { style, className } = this.props;
    return (
      <div
        ref={(c: HTMLElement) => { this.resizable = c; }}
        style={{
          position: 'relative',
          ...userSelect,
          ...style,
          ...this.style,
        }}
        className={className}
        {...this.props.extendsProps}
      >
        {this.props.children}
        {this.renderResizer()}
      </div>
    );
  }
}
