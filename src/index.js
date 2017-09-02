/* @flow */

import React, { Component } from 'react';
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

type HandleStyles = {
  top?: any;
  right?: any;
  bottom?: any;
  left?: any;
  topRight?: any;
  bottomRight?: any;
  bottomLeft?: any;
  topLeft?: any;
  wrapper?: any;
}

type HandleClassName = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  topRight?: string;
  bottomRight?: string;
  bottomLeft?: string;
  topLeft?: string;
  wrapper?: string;
}

type Size = {
  width?: string | number;
  height?: string | number;
}

type NumberSize = {
  width: number;
  height: number;
}

type Callback = (
  event: MouseEvent | TouchEvent,
  direction: Direction,
  refToElement: HTMLElement,
  delta: NumberSize,
) => void;

type ResizeStartCallBack = (
  e: SyntheticMouseEvent<HTMLDivElement> | SyntheticTouchEvent<HTMLDivElement>,
  dir: Direction,
  refToElement: HTMLElement,
) => void;

type Props = {
  style?: any;
  className?: string;
  extendsProps?: any;
  grid?: [number, number];
  bounds?: 'parent' | 'window' | HTMLElement;
  width?: string | number;
  height?: string | number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  lockAspectRatio?: boolean;
  enable?: Enable;
  handleStyles?: HandleStyles;
  handleClasses?: HandleClassName;
  handleWrapperStyle?: { [key: string]: string };
  handleWrapperClass?: string;
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

const clamp = (n: number, min: number, max: number): number => Math.max(Math.min(n, max), min);
const snap = (n: number, size: number): number => Math.round(n / size) * size;

export default class Resizable extends Component<Props, State> {
  resizable: HTMLElement;
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
    style: {},
    grid: [1, 1],
    lockAspectRatio: false,
  }

  constructor(props: Props) {
    super(props);
    const { width, height } = props;
    this.state = {
      isResizing: false,
      width: typeof width === 'undefined' ? 'auto' : width,
      height: typeof height === 'undefined' ? 'auto' : height,
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

  componentWillReceiveProps({ width, height }: Props) {
    if (width !== this.props.width) {
      this.setState({ width });
    }
    if (height !== this.props.height) {
      this.setState({ height });
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('touchmove', this.onMouseMove);
      window.removeEventListener('touchend', this.onMouseUp);
    }
  }

  onResizeStart(
    event: SyntheticMouseEvent<HTMLDivElement> | SyntheticTouchEvent<HTMLDivElement>,
    direction: Direction,
  ) {
    let clientX = 0;
    let clientY = 0;
    if (event.nativeEvent instanceof MouseEvent) {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;
    } else if (event.nativeEvent instanceof TouchEvent) {
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    }
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
    const { lockAspectRatio, minWidth, minHeight } = this.props;
    let { maxWidth, maxHeight } = this.props;
    const ratio = original.height / original.width;
    let newWidth = original.width;
    let newHeight = original.height;
    if (/right/i.test(direction)) {
      newWidth = original.width + (clientX - original.x);
      if (lockAspectRatio) newHeight = newWidth * ratio;
    }
    if (/left/i.test(direction)) {
      newWidth = original.width - (clientX - original.x);
      if (lockAspectRatio) newHeight = newWidth * ratio;
    }
    if (/bottom/i.test(direction)) {
      newHeight = original.height + (clientY - original.y);
      if (lockAspectRatio) newWidth = newHeight / ratio;
    }
    if (/top/i.test(direction)) {
      newHeight = original.height - (clientY - original.y);
      if (lockAspectRatio) newWidth = newHeight / ratio;
    }

    if (this.props.bounds === 'parent') {
      const parent = this.resizable.parentNode;
      if (parent instanceof HTMLElement) {
        const parentRect = parent.getBoundingClientRect();
        const parentLeft = parentRect.left;
        const parentTop = parentRect.top;
        const { left, top } = this.resizable.getBoundingClientRect();
        const boundWidth = parent.offsetWidth + (parentLeft - left);
        const boundHeight = parent.offsetHeight + (parentTop - top);
        maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
        maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
      }
    } else if (this.props.bounds === 'window') {
      if (typeof window !== 'undefined') {
        const { left, top } = this.resizable.getBoundingClientRect();
        const boundWidth = window.innerWidth - left;
        const boundHeight = window.innerHeight - top;
        maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
        maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
      }
    } else if (this.props.bounds instanceof HTMLElement) {
      const targetRect = this.props.bounds.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const targetTop = targetRect.top;
      const { left, top } = this.resizable.getBoundingClientRect();
      if (!(this.props.bounds instanceof HTMLElement)) return;
      const boundWidth = this.props.bounds.offsetWidth + (targetLeft - left);
      const boundHeight = this.props.bounds.offsetHeight + (targetTop - top);
      maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
      maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
    }

    const computedMinWidth = (typeof minWidth === 'undefined' || minWidth < 0) ? 0 : minWidth;
    const computedMaxWidth = (typeof maxWidth === 'undefined' || maxWidth < 0) ? newWidth : maxWidth;
    const computedMinHeight = (typeof minHeight === 'undefined' || minHeight < 0) ? 0 : minHeight;
    const computedMaxHeight = (typeof maxHeight === 'undefined' || maxHeight < 0) ? newHeight : maxHeight;

    if (lockAspectRatio) {
      const lockedMinWidth = computedMinWidth > computedMinHeight / ratio ? computedMinWidth : computedMinHeight / ratio;
      const lockedMaxWidth = computedMaxWidth < computedMaxHeight / ratio ? computedMaxWidth : computedMaxHeight / ratio;
      const lockedMinHeight = computedMinHeight > computedMinWidth * ratio ? computedMinHeight : computedMinWidth * ratio;
      const lockedMaxHeight = computedMaxHeight < computedMaxWidth * ratio ? computedMaxHeight : computedMaxWidth * ratio;
      newWidth = clamp(newWidth, lockedMinWidth, lockedMaxWidth);
      newHeight = clamp(newHeight, lockedMinHeight, lockedMaxHeight);
    } else {
      newWidth = clamp(newWidth, computedMinWidth, computedMaxWidth);
      newHeight = clamp(newHeight, computedMinHeight, computedMaxHeight);
    }
    if (this.props.grid) {
      newWidth = snap(newWidth, this.props.grid[0]);
    }
    if (this.props.grid) {
      newHeight = snap(newHeight, this.props.grid[1]);
    }

    this.setState({
      width: width !== 'auto' || typeof this.props.width === 'undefined' ? newWidth : 'auto',
      height: height !== 'auto' || typeof this.props.height === 'undefined' ? newHeight : 'auto',
    });
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
    const delta = {
      width: this.size.width - original.width,
      height: this.size.height - original.height,
    };
    if (this.props.onResizeStop) {
      this.props.onResizeStop(event, direction, this.resizable, delta);
    }
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

  renderResizer(): React$Node {
    const { enable, handleStyles, handleClasses, handleWrapperStyle, handleWrapperClass } = this.props;
    if (!enable) return null;
    const resizers = Object.keys(enable).map((dir: Direction): React$Node => {
      if (enable[dir] !== false) {
        return (
          <Resizer
            key={dir}
            direction={dir}
            onResizeStart={this.onResizeStart}
            replaceStyles={handleStyles && handleStyles[dir]}
            className={handleClasses && handleClasses[dir]}
          />
        );
      }
      return null;
    });

    // #93 Wrap the resize box in span (will not break 100% width/height)
    return (
      <span
        className={handleWrapperClass}
        style={handleWrapperStyle}
      >
        {resizers}
      </span>);
  }

  render(): React$Node {
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
          boxSizing: 'border-box',
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
