import * as React from 'react';
import { Resizer, Direction } from './resizer';
import memoize from 'fast-memoize';

const DEFAULT_SIZE = {
  width: 'auto',
  height: 'auto',
};

export type ResizeDirection = Direction;

export type Enable = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  topRight?: boolean;
  bottomRight?: boolean;
  bottomLeft?: boolean;
  topLeft?: boolean;
};

export type HandleStyles = {
  top?: React.CSSProperties;
  right?: React.CSSProperties;
  bottom?: React.CSSProperties;
  left?: React.CSSProperties;
  topRight?: React.CSSProperties;
  bottomRight?: React.CSSProperties;
  bottomLeft?: React.CSSProperties;
  topLeft?: React.CSSProperties;
};

export type HandleClassName = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  topRight?: string;
  bottomRight?: string;
  bottomLeft?: string;
  topLeft?: string;
};

export type Size = {
  width: string | number;
  height: string | number;
};

type NumberSize = {
  width: number;
  height: number;
};

export interface HandleComponent {
  top?: React.ReactElement<any>;
  right?: React.ReactElement<any>;
  bottom?: React.ReactElement<any>;
  left?: React.ReactElement<any>;
  topRight?: React.ReactElement<any>;
  bottomRight?: React.ReactElement<any>;
  bottomLeft?: React.ReactElement<any>;
  topLeft?: React.ReactElement<any>;
}

export type ResizeCallback = (
  event: MouseEvent | TouchEvent,
  direction: Direction,
  elementRef: HTMLDivElement,
  delta: NumberSize,
) => void;

export type ResizeStartCallback = (
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  dir: Direction,
  elementRef: HTMLDivElement,
) => void;

export interface ResizableProps {
  style?: React.CSSProperties;
  className?: string;
  grid?: [number, number];
  snap?: {
    x?: Array<number>;
    y?: Array<number>;
  };
  bounds?: 'parent' | 'window' | HTMLElement;
  size?: Size;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  lockAspectRatio?: boolean | number;
  lockAspectRatioExtraWidth: number;
  lockAspectRatioExtraHeight: number;
  enable?: Enable;
  handleStyles?: HandleStyles;
  handleClasses?: HandleClassName;
  handleWrapperStyle?: React.CSSProperties;
  handleWrapperClass?: string;
  handleComponent?: HandleComponent;
  children?: React.ReactNode;
  onResizeStart?: ResizeStartCallback;
  onResize?: ResizeCallback;
  onResizeStop?: ResizeCallback;
  defaultSize?: Size;
  scale?: number;
  resizeRatio?: number;
}

type State = {
  isResizing: boolean;
  resizeCursor: string;
  direction: Direction;
  original: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  width: number | string;
  height: number | string;
};

const clamp = memoize((n: number, min: number, max: number): number => Math.max(Math.min(n, max), min));
const snap = memoize((n: number, size: number): number => Math.round(n / size) * size);
const hasDirection = memoize(
  (dir: 'top' | 'right' | 'bottom' | 'left', target: string): boolean => new RegExp(dir, 'i').test(target),
);

const findClosestSnap = memoize(
  (n: number, snapArray: Array<number>): number =>
    snapArray.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev)),
);

const endsWith = memoize(
  (str: string, searchStr: string): boolean =>
    str.substr(str.length - searchStr.length, searchStr.length) === searchStr,
);

const getStringSize = memoize(
  (n: number | string): string => {
    n = n.toString();
    if (n === 'auto') return n;
    if (endsWith(n, 'px')) return n;
    if (endsWith(n, '%')) return n;
    if (endsWith(n, 'vh')) return n;
    if (endsWith(n, 'vw')) return n;
    if (endsWith(n, 'vmax')) return n;
    if (endsWith(n, 'vmin')) return n;
    return `${n}px`;
  },
);

const calculateNewMax = memoize(
  (
    parentSize: { width: number; height: number },
    maxWidth?: string | number,
    maxHeight?: string | number,
    minWidth?: string | number,
    minHeight?: string | number,
  ) => {
    if (maxWidth && typeof maxWidth === 'string' && endsWith(maxWidth, '%')) {
      const ratio = Number(maxWidth.replace('%', '')) / 100;
      maxWidth = parentSize.width * ratio;
    }
    if (maxHeight && typeof maxHeight === 'string' && endsWith(maxHeight, '%')) {
      const ratio = Number(maxHeight.replace('%', '')) / 100;
      maxHeight = parentSize.height * ratio;
    }
    if (minWidth && typeof minWidth === 'string' && endsWith(minWidth, '%')) {
      const ratio = Number(minWidth.replace('%', '')) / 100;
      minWidth = parentSize.width * ratio;
    }
    if (minHeight && typeof minHeight === 'string' && endsWith(minHeight, '%')) {
      const ratio = Number(minHeight.replace('%', '')) / 100;
      minHeight = parentSize.height * ratio;
    }
    return {
      maxWidth: typeof maxWidth === 'undefined' ? undefined : Number(maxWidth),
      maxHeight: typeof maxHeight === 'undefined' ? undefined : Number(maxHeight),
      minWidth: typeof minWidth === 'undefined' ? undefined : Number(minWidth),
      minHeight: typeof minHeight === 'undefined' ? undefined : Number(minHeight),
    };
  },
);

const definedProps = [
  'style',
  'className',
  'grid',
  'snap',
  'bounds',
  'size',
  'defaultSize',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'lockAspectRatio',
  'lockAspectRatioExtraWidth',
  'lockAspectRatioExtraHeight',
  'enable',
  'handleStyles',
  'handleClasses',
  'handleWrapperStyle',
  'handleWrapperClass',
  'children',
  'onResizeStart',
  'onResize',
  'onResizeStop',
  'handleComponent',
  'scale',
  'resizeRatio',
];

// HACK: This class is used to calculate % size.
const baseClassName = '__resizable_base__';

type NewSize = { newHeight: number | string; newWidth: number | string };
export class Resizable extends React.Component<ResizableProps, State> {
  ratio = 1;
  resizable: HTMLDivElement | null = null;
  extendsProps: { [key: string]: React.HTMLProps<'div'> } = {};
  // For parent boundary
  parentLeft = 0;
  parentTop = 0;
  // For boundary
  resizableLeft = 0;
  resizableTop = 0;
  // For target boundary
  targetLeft = 0;
  targetTop = 0;

  static defaultProps = {
    onResizeStart: () => {},
    onResize: () => {},
    onResizeStop: () => {},
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
    lockAspectRatioExtraWidth: 0,
    lockAspectRatioExtraHeight: 0,
    scale: 1,
    resizeRatio: 1,
  };

  constructor(props: ResizableProps) {
    super(props);
    this.state = {
      isResizing: false,
      resizeCursor: 'auto',
      width:
        typeof (this.propsSize && this.propsSize.width) === 'undefined'
          ? 'auto'
          : this.propsSize && this.propsSize.width,
      height:
        typeof (this.propsSize && this.propsSize.height) === 'undefined'
          ? 'auto'
          : this.propsSize && this.propsSize.height,
      direction: 'right',
      original: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    };

    this.updateExtendsProps(props);
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    if (typeof window !== 'undefined') {
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseleave', this.onMouseUp);
      window.addEventListener('touchmove', this.onMouseMove);
      window.addEventListener('touchend', this.onMouseUp);
    }
  }

  get parentNode(): HTMLElement | null {
    if (!this.resizable) return null;
    return this.resizable.parentNode as HTMLElement;
  }

  get propsSize(): Size {
    return this.props.size || this.props.defaultSize || DEFAULT_SIZE;
  }

  updateExtendsProps(props: ResizableProps) {
    this.extendsProps = Object.keys(props).reduce(
      (acc, key) => {
        if (definedProps.indexOf(key) !== -1) return acc;
        acc[key] = props[key as keyof ResizableProps];
        return acc;
      },
      {} as { [key: string]: any },
    );
  }

  getParentSize(): { width: number; height: number } {
    const { base } = this;
    if (!base || !this.parentNode) return { width: window.innerWidth, height: window.innerHeight };
    // INFO: To calculate parent width with flex layout
    let wrapChanged = false;
    const wrap = this.parentNode.style.flexWrap;
    const minWidth = base.style.minWidth;
    if (wrap !== 'wrap') {
      wrapChanged = true;
      this.parentNode.style.flexWrap = 'wrap';
      // HACK: Use relative to get parent padding size
    }
    base.style.position = 'relative';
    base.style.minWidth = '100%';
    const size = {
      width: base.offsetWidth,
      height: base.offsetHeight,
    };
    base.style.position = 'absolute';
    if (wrapChanged) this.parentNode.style.flexWrap = wrap;
    base.style.minWidth = minWidth;
    return size;
  }

  componentDidMount() {
    const { size } = this;
    this.setState({
      width: this.state.width || size.width,
      height: this.state.height || size.height,
    });
    const parent = this.parentNode;
    if (!(parent instanceof HTMLElement)) return;
    if (this.base) return;
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.position = 'absolute';
    element.style.transform = 'scale(0, 0)';
    element.style.left = '0';
    element.style.flex = '0';
    if (element.classList) {
      element.classList.add(baseClassName);
    } else {
      element.className += baseClassName;
    }
    parent.appendChild(element);
  }

  componentWillReceiveProps(next: ResizableProps) {
    this.updateExtendsProps(next);
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseleave', this.onMouseUp);
      window.removeEventListener('touchmove', this.onMouseMove);
      window.removeEventListener('touchend', this.onMouseUp);
      const parent = this.parentNode;
      const { base } = this;
      if (!base || !parent) return;
      if (!(parent instanceof HTMLElement) || !(base instanceof Node)) return;
      parent.removeChild(base);
    }
  }

  get base(): HTMLElement | undefined {
    const parent = this.parentNode;
    if (!parent) return undefined;
    const children = [].slice.call(parent.children) as Node[];
    for (let i = 0; i < children.length; i += 1) {
      const n = children[i];
      if (n instanceof HTMLElement) {
        if (n.classList.contains(baseClassName)) {
          return n;
        }
      }
    }
    return undefined;
  }

  createSizeForCssProperty(newSize: number | string, kind: 'width' | 'height'): number | string {
    const propsSize = this.propsSize && this.propsSize[kind];
    return this.state[kind] === 'auto' &&
      this.state.original[kind] === newSize &&
      (typeof propsSize === 'undefined' || propsSize === 'auto')
      ? 'auto'
      : newSize;
  }

  calculateNewMaxFromBoundary(maxWidth?: number, maxHeight?: number) {
    if (this.props.bounds === 'parent') {
      const parent = this.parentNode;
      if (parent instanceof HTMLElement) {
        const boundWidth = parent.offsetWidth + (this.parentLeft - this.resizableLeft);
        const boundHeight = parent.offsetHeight + (this.parentTop - this.resizableTop);
        maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
        maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
      }
    } else if (this.props.bounds === 'window') {
      if (typeof window !== 'undefined') {
        const boundWidth = window.innerWidth - this.resizableLeft;
        const boundHeight = window.innerHeight - this.resizableTop;
        maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
        maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
      }
    } else if (this.props.bounds instanceof HTMLElement) {
      const boundWidth = this.props.bounds.offsetWidth + (this.targetLeft - this.resizableLeft);
      const boundHeight = this.props.bounds.offsetHeight + (this.targetTop - this.resizableTop);
      maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
      maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
    }
    return { maxWidth, maxHeight };
  }

  calculateNewSizeFromDirection(clientX: number, clientY: number) {
    const scale = this.props.scale || 1;
    const resizeRatio = this.props.resizeRatio || 1;
    const { direction, original } = this.state;
    const { lockAspectRatio, lockAspectRatioExtraHeight, lockAspectRatioExtraWidth } = this.props;
    const { ratio } = this;
    let newWidth = original.width;
    let newHeight = original.height;
    if (hasDirection('right', direction)) {
      newWidth = original.width + ((clientX - original.x) * resizeRatio) / scale;
      if (lockAspectRatio) newHeight = (newWidth - lockAspectRatioExtraWidth) / ratio + lockAspectRatioExtraHeight;
    }
    if (hasDirection('left', direction)) {
      newWidth = original.width - ((clientX - original.x) * resizeRatio) / scale;
      if (lockAspectRatio) newHeight = (newWidth - lockAspectRatioExtraWidth) / ratio + lockAspectRatioExtraHeight;
    }
    if (hasDirection('bottom', direction)) {
      newHeight = original.height + ((clientY - original.y) * resizeRatio) / scale;
      if (lockAspectRatio) newWidth = (newHeight - lockAspectRatioExtraHeight) * ratio + lockAspectRatioExtraWidth;
    }
    if (hasDirection('top', direction)) {
      newHeight = original.height - ((clientY - original.y) * resizeRatio) / scale;
      if (lockAspectRatio) newWidth = (newHeight - lockAspectRatioExtraHeight) * ratio + lockAspectRatioExtraWidth;
    }
    return { newWidth, newHeight };
  }

  calculateNewSizeFromAspectRatio(
    newWidth: number,
    newHeight: number,
    max: { width?: number; height?: number },
    min: { width?: number; height?: number },
  ) {
    const { lockAspectRatio, lockAspectRatioExtraHeight, lockAspectRatioExtraWidth } = this.props;
    const { ratio } = this;
    const computedMinWidth = typeof min.width === 'undefined' ? 10 : min.width;
    const computedMaxWidth = typeof max.width === 'undefined' || max.width < 0 ? newWidth : max.width;
    const computedMinHeight = typeof min.height === 'undefined' ? 10 : min.height;
    const computedMaxHeight = typeof max.height === 'undefined' || max.height < 0 ? newHeight : max.height;
    if (lockAspectRatio) {
      const extraMinWidth = (computedMinHeight - lockAspectRatioExtraHeight) * ratio + lockAspectRatioExtraWidth;
      const extraMaxWidth = (computedMaxHeight - lockAspectRatioExtraHeight) * ratio + lockAspectRatioExtraWidth;
      const extraMinHeight = (computedMinWidth - lockAspectRatioExtraWidth) / ratio + lockAspectRatioExtraHeight;
      const extraMaxHeight = (computedMaxWidth - lockAspectRatioExtraWidth) / ratio + lockAspectRatioExtraHeight;
      const lockedMinWidth = Math.max(computedMinWidth, extraMinWidth);
      const lockedMaxWidth = Math.min(computedMaxWidth, extraMaxWidth);
      const lockedMinHeight = Math.max(computedMinHeight, extraMinHeight);
      const lockedMaxHeight = Math.min(computedMaxHeight, extraMaxHeight);
      newWidth = clamp(newWidth, lockedMinWidth, lockedMaxWidth);
      newHeight = clamp(newHeight, lockedMinHeight, lockedMaxHeight);
    } else {
      newWidth = clamp(newWidth, computedMinWidth, computedMaxWidth);
      newHeight = clamp(newHeight, computedMinHeight, computedMaxHeight);
    }
    return { newWidth, newHeight };
  }

  setBoundingClientRect() {
    // For parent boundary
    if (this.props.bounds === 'parent') {
      const parent = this.parentNode;
      if (parent instanceof HTMLElement) {
        const parentRect = parent.getBoundingClientRect();
        this.parentLeft = parentRect.left;
        this.parentTop = parentRect.top;
      }
    }

    // For target(html element) boundary
    if (this.props.bounds instanceof HTMLElement) {
      const targetRect = this.props.bounds.getBoundingClientRect();
      this.targetLeft = targetRect.left;
      this.targetTop = targetRect.top;
    }

    // For boundary
    if (this.resizable) {
      const { left, top } = this.resizable.getBoundingClientRect();
      this.resizableLeft = left;
      this.resizableTop = top;
    }
  }

  onResizeStart(event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, direction: Direction) {
    let clientX = 0;
    let clientY = 0;
    if (event.nativeEvent instanceof MouseEvent) {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;

      // When user click with right button the resize is stuck in resizing mode
      // until users clicks again, dont continue if right click is used.
      // HACK: MouseEvent does not have `which` from flow-bin v0.68.
      if (event.nativeEvent.which === 3) {
        return;
      }
    } else if (event.nativeEvent instanceof TouchEvent) {
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    }
    if (this.props.onResizeStart) {
      if (this.resizable) {
        this.props.onResizeStart(event, direction, this.resizable);
      }
    }

    // Fix #168
    if (this.props.size) {
      if (typeof this.props.size.height !== 'undefined' && this.props.size.height !== this.state.height) {
        this.setState({ height: this.props.size.height });
      }
      if (typeof this.props.size.width !== 'undefined' && this.props.size.width !== this.state.width) {
        this.setState({ width: this.props.size.width });
      }
    }

    // For lockAspectRatio case
    this.ratio =
      typeof this.props.lockAspectRatio === 'number' ? this.props.lockAspectRatio : this.size.width / this.size.height;

    // For boundary
    this.setBoundingClientRect();

    this.setState({
      original: {
        x: clientX,
        y: clientY,
        width: this.size.width,
        height: this.size.height,
      },
      isResizing: true,
      resizeCursor: window.getComputedStyle(event.target as HTMLElement).cursor || 'auto',
      direction,
    });
  }

  onMouseMove(event: MouseEvent | TouchEvent) {
    if (!this.state.isResizing || !this.resizable) return;
    let { maxWidth, maxHeight, minWidth, minHeight } = this.props;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    const { direction, original, width, height } = this.state;
    const parentSize = this.getParentSize();
    const max = calculateNewMax(parentSize, maxWidth, maxHeight, minWidth, minHeight);

    maxWidth = max.maxWidth;
    maxHeight = max.maxHeight;
    minWidth = max.minWidth;
    minHeight = max.minHeight;

    // Calculate new size
    let { newHeight, newWidth }: NewSize = this.calculateNewSizeFromDirection(clientX, clientY);

    // Calculate max size from boundary settings
    const boundaryMax = this.calculateNewMaxFromBoundary(maxWidth, maxHeight);

    // Calculate new size from aspect ratio
    const newSize = this.calculateNewSizeFromAspectRatio(
      newWidth,
      newHeight,
      { width: boundaryMax.maxWidth, height: boundaryMax.maxHeight },
      { width: minWidth, height: minHeight },
    );
    newWidth = newSize.newWidth;
    newHeight = newSize.newHeight;

    if (this.props.grid) {
      newWidth = snap(newWidth, this.props.grid[0]);
      newHeight = snap(newHeight, this.props.grid[1]);
    }

    if (this.props.snap && this.props.snap.x) {
      newWidth = findClosestSnap(newWidth, this.props.snap.x);
    }
    if (this.props.snap && this.props.snap.y) {
      newHeight = findClosestSnap(newHeight, this.props.snap.y);
    }

    const delta = {
      width: newWidth - original.width,
      height: newHeight - original.height,
    };

    if (width && typeof width === 'string') {
      if (endsWith(width, '%')) {
        const percent = (newWidth / parentSize.width) * 100;
        newWidth = `${percent}%`;
      } else if (endsWith(width, 'vw')) {
        const vw = (newWidth / window.innerWidth) * 100;
        newWidth = `${vw}vw`;
      } else if (endsWith(width, 'vh')) {
        const vh = (newWidth / window.innerHeight) * 100;
        newWidth = `${vh}vh`;
      }
    }

    if (height && typeof height === 'string') {
      if (endsWith(height, '%')) {
        const percent = (newHeight / parentSize.height) * 100;
        newHeight = `${percent}%`;
      } else if (endsWith(height, 'vw')) {
        const vw = (newHeight / window.innerWidth) * 100;
        newHeight = `${vw}vw`;
      } else if (endsWith(height, 'vh')) {
        const vh = (newHeight / window.innerHeight) * 100;
        newHeight = `${vh}vh`;
      }
    }

    this.setState({
      width: this.createSizeForCssProperty(newWidth, 'width'),
      height: this.createSizeForCssProperty(newHeight, 'height'),
    });

    if (this.props.onResize) {
      this.props.onResize(event, direction, this.resizable, delta);
    }
  }

  onMouseUp(event: MouseEvent | TouchEvent) {
    const { isResizing, direction, original } = this.state;
    if (!isResizing || !this.resizable) return;
    const delta = {
      width: this.size.width - original.width,
      height: this.size.height - original.height,
    };
    if (this.props.onResizeStop) {
      this.props.onResizeStop(event, direction, this.resizable, delta);
    }
    if (this.props.size) {
      this.setState(this.props.size);
    }
    this.setState({ isResizing: false, resizeCursor: 'auto' });
  }

  get size(): NumberSize {
    let width = 0;
    let height = 0;
    if (typeof window !== 'undefined' && this.resizable) {
      const orgWidth = this.resizable.offsetWidth;
      const orgHeight = this.resizable.offsetHeight;
      // HACK: Set position `relative` to get parent size.
      //       This is because when re-resizable set `absolute`, I can not get base width correctly.
      const orgPosition = this.resizable.style.position;
      if (orgPosition !== 'relative') {
        this.resizable.style.position = 'relative';
      }
      // INFO: Use original width or height if set auto.
      width = this.resizable.style.width !== 'auto' ? this.resizable.offsetWidth : orgWidth;
      height = this.resizable.style.height !== 'auto' ? this.resizable.offsetHeight : orgHeight;
      // Restore original position
      this.resizable.style.position = orgPosition;
    }
    return { width, height };
  }

  get sizeStyle(): { width: string; height: string } {
    const { size } = this.props;
    const getSize = (key: 'width' | 'height'): string => {
      if (typeof this.state[key] === 'undefined' || this.state[key] === 'auto') return 'auto';
      if (this.propsSize && this.propsSize[key] && endsWith(this.propsSize[key].toString(), '%')) {
        if (endsWith(this.state[key].toString(), '%')) return this.state[key].toString();
        const parentSize = this.getParentSize();
        const value = Number(this.state[key].toString().replace('px', ''));
        const percent = (value / parentSize[key]) * 100;
        return `${percent}%`;
      }
      return getStringSize(this.state[key]);
    };
    const width =
      size && typeof size.width !== 'undefined' && !this.state.isResizing
        ? getStringSize(size.width)
        : getSize('width');
    const height =
      size && typeof size.height !== 'undefined' && !this.state.isResizing
        ? getStringSize(size.height)
        : getSize('height');
    return { width, height };
  }

  updateSize(size: Size) {
    this.setState({ width: size.width, height: size.height });
  }

  renderResizer() {
    const { enable, handleStyles, handleClasses, handleWrapperStyle, handleWrapperClass, handleComponent } = this.props;
    if (!enable) return null;
    const resizers = Object.keys(enable).map(dir => {
      if (enable[dir as Direction] !== false) {
        return (
          <Resizer
            key={dir}
            direction={dir as Direction}
            onResizeStart={this.onResizeStart}
            replaceStyles={handleStyles && handleStyles[dir as Direction]}
            className={handleClasses && handleClasses[dir as Direction]}
          >
            {handleComponent && handleComponent[dir as Direction] ? handleComponent[dir as Direction] : null}
          </Resizer>
        );
      }
      return null;
    });
    // #93 Wrap the resize box in span (will not break 100% width/height)
    return (
      <span className={handleWrapperClass} style={handleWrapperStyle}>
        {resizers}
      </span>
    );
  }

  render() {
    return (
      <div
        ref={c => {
          if (c) {
            this.resizable = c;
          }
        }}
        style={{
          position: 'relative',
          userSelect: this.state.isResizing ? 'none' : 'auto',
          ...this.props.style,
          ...this.sizeStyle,
          maxWidth: this.props.maxWidth,
          maxHeight: this.props.maxHeight,
          minWidth: this.props.minWidth,
          minHeight: this.props.minHeight,
          boxSizing: 'border-box',
        }}
        className={this.props.className}
        {...this.extendsProps}
      >
        {this.state.isResizing && (
          <div
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0)',
              cursor: `${this.state.resizeCursor || 'auto'}`,
              opacity: 0,
              position: 'fixed',
              zIndex: 9999,
              top: '0',
              left: '0',
              bottom: '0',
              right: '0',
            }}
          />
        )}

        {this.props.children}
        {this.renderResizer()}
      </div>
    );
  }
}

