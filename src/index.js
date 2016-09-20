import React, { Component, PropTypes } from 'react';
import Resizer from './resizer';
import isEqual from 'lodash.isequal';

const clamp = (n, min, max) => Math.max(Math.min(n, max), min);
const snap = (n, size) => Math.round(n / size) * size;
const directions = [
  'top', 'right', 'bottom', 'left', 'topRight', 'bottomRight', 'bottomLeft', 'topLeft',
];

export default class Resizable extends Component {
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onResizeStop: PropTypes.func,
    onResizeStart: PropTypes.func,
    onTouchStart: PropTypes.func,
    onResize: PropTypes.func,
    customStyle: PropTypes.object,
    handleStyle: PropTypes.shape({
      top: PropTypes.object,
      right: PropTypes.object,
      bottom: PropTypes.object,
      left: PropTypes.object,
      topRight: PropTypes.object,
      bottomRight: PropTypes.object,
      bottomLeft: PropTypes.object,
      topLeft: PropTypes.object,
    }),
    handleClass: PropTypes.shape({
      top: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
      left: PropTypes.string,
      topRight: PropTypes.string,
      bottomRight: PropTypes.string,
      bottomLeft: PropTypes.string,
      topLeft: PropTypes.string,
    }),
    isResizable: PropTypes.shape({
      top: PropTypes.bool,
      right: PropTypes.bool,
      bottom: PropTypes.bool,
      left: PropTypes.bool,
      topRight: PropTypes.bool,
      bottomRight: PropTypes.bool,
      bottomLeft: PropTypes.bool,
      topLeft: PropTypes.bool,
    }),
    customClass: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    grid: PropTypes.arrayOf(PropTypes.number),
    lockAspectRatio: PropTypes.bool.isRequired,
    extendsProps: PropTypes.object,
  };

  static defaultProps = {
    onResizeStart: () => null,
    onResize: () => null,
    onResizeStop: () => null,
    isResizable: {
      top: true, right: true, bottom: true, left: true,
      topRight: true, bottomRight: true, bottomLeft: true, topLeft: true,
    },
    customStyle: {},
    handleStyle: {},
    handleClass: {},
    grid: [1, 1],
    lockAspectRatio: false,
  }

  constructor(props) {
    super(props);
    const { width, height } = props;
    this.state = {
      isActive: false,
      width,
      height,
    };

    this.onResizeStartWithDirection = {};
    directions.forEach(d => {
      this.onResizeStartWithDirection[d] = this.onResizeStart.bind(this, d);
    });
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    if (typeof window !== 'undefined') {
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('touchmove', this.onTouchMove);
      window.addEventListener('touchend', this.onMouseUp);
    }
  }

  componentDidMount() {
    const size = this.getBoxSize();
    this.setSize(size);
  }

  componentWillReceiveProps({ width, height }) {
    if (width !== this.props.width) this.setState({ width });
    if (height !== this.props.height) this.setState({ height });
  }

  shouldComponentUpdate(nextProps, nextState) {
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

  onTouchMove(event) {
    this.onMouseMove(event.touches[0]);
  }

  onMouseMove({ clientX, clientY }) {
    if (!this.state.isActive) return;
    const { direction, original, width, height } = this.state;
    const { minWidth, maxWidth, minHeight, maxHeight, lockAspectRatio } = this.props;
    const ratio = original.height / original.width;
    let newWidth = original.width;
    let newHeight = original.height;
    if (/right/i.test(direction)) {
      newWidth = original.width + clientX - original.x;
      const min = (minWidth < 0 || typeof minWidth === 'undefined') ? 0 : minWidth;
      const max = (maxWidth < 0 || typeof maxWidth === 'undefined') ? newWidth : maxWidth;
      newWidth = clamp(newWidth, min, max);
      newWidth = snap(newWidth, this.props.grid[0]);
    }
    if (/left/i.test(direction)) {
      newWidth = original.width - clientX + original.x;
      const min = (minWidth < 0 || typeof minWidth === 'undefined') ? 0 : minWidth;
      const max = (maxWidth < 0 || typeof maxWidth === 'undefined') ? newWidth : maxWidth;
      newWidth = clamp(newWidth, min, max);
      newWidth = snap(newWidth, this.props.grid[0]);
    }
    if (/bottom/i.test(direction)) {
      newHeight = original.height + clientY - original.y;
      const min = (minHeight < 0 || typeof minHeight === 'undefined') ? 0 : minHeight;
      const max = (maxHeight < 0 || typeof maxHeight === 'undefined') ? newHeight : maxHeight;
      newHeight = clamp(newHeight, min, max);
      newHeight = snap(newHeight, this.props.grid[1]);
    }
    if (/top/i.test(direction)) {
      newHeight = original.height - clientY + original.y;
      const min = (minHeight < 0 || typeof minHeight === 'undefined') ? 0 : minHeight;
      const max = (maxHeight < 0 || typeof maxHeight === 'undefined') ? newHeight : maxHeight;
      newHeight = clamp(newHeight, min, max);
      newHeight = snap(newHeight, this.props.grid[1]);
    }
    if (lockAspectRatio) {
      const deltaWidth = Math.abs(newWidth - original.width);
      const deltaHeight = Math.abs(newHeight - original.height);
      if (deltaWidth < deltaHeight) {
        newWidth = newHeight / ratio;
      } else {
        newHeight = newWidth * ratio;
      }
    }
    this.setState({
      width: width !== 'auto' ? newWidth : 'auto',
      height: height !== 'auto' ? newHeight : 'auto',
    });
    const resizable = this.refs.resizable;
    const styleSize = {
      width: newWidth || this.state.width,
      height: newHeight || this.state.height,
    };
    const clientSize = {
      width: resizable.clientWidth,
      height: resizable.clientHeight,
    };
    const delta = {
      width: newWidth - original.width,
      height: newHeight - original.height,
    };
    this.props.onResize(direction, styleSize, clientSize, delta);
  }

  onMouseUp() {
    const { isActive, direction, original } = this.state;
    if (!isActive) return;
    const resizable = this.refs.resizable;
    const styleSize = this.getBoxSize();
    const clientSize = {
      width: resizable.clientWidth,
      height: resizable.clientHeight,
    };
    const delta = {
      width: styleSize.width - original.width,
      height: styleSize.height - original.height,
    };
    this.props.onResizeStop(direction, styleSize, clientSize, delta);
    this.setState({ isActive: false });
  }

  onResizeStart(direction, e) {
    const clientSize = {
      width: this.refs.resizable.clientWidth,
      height: this.refs.resizable.clientHeight,
    };
    this.props.onResizeStart(direction, this.getBoxSize(), clientSize, e);
    const size = this.getBoxSize();
    this.setState({
      original: {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      },
      isActive: true,
      direction,
    });
  }

  getBoxSize() {
    let width = '0';
    let height = '0';
    if (typeof window !== 'undefined') {
      const style = window.getComputedStyle(this.refs.resizable, null);
      width = ~~style.getPropertyValue('width').replace('px', '');
      height = ~~style.getPropertyValue('height').replace('px', '');
    }
    return { width, height };
  }

  setSize(size) {
    this.setState({
      width: this.state.width || size.width,
      height: this.state.height || size.height,
    });
  }

  getBoxStyle() {
    const getSize = key => {
      if (typeof this.state[key] === 'undefined' || this.state[key] === 'auto') return 'auto';
      else if (/px$/.test(this.state[key].toString())) return this.state[key];
      else if (/%$/.test(this.state[key].toString())) return this.state[key];
      return `${this.state[key]}px`;
    };
    return {
      width: getSize('width'),
      height: getSize('height'),
    };
  }

  updateSize({ width, height }) {
    this.setState({ width, height });
  }

  renderResizer() {
    const { isResizable, handleStyle, handleClass } = this.props;
    return Object.keys(isResizable).map(dir => {
      if (isResizable[dir] !== false) {
        return (
          <Resizer
            key={dir}
            type={dir}
            onResizeStart={this.onResizeStartWithDirection[dir]}
            replaceStyles={handleStyle[dir]}
            className={handleClass[dir]}
          />
        );
      }
      return null;
    });
  }

  render() {
    const userSelect = this.state.isActive
      ? {
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        MsUserSelect: 'none',
      }
      : {
        userSelect: 'auto',
        MozUserSelect: 'auto',
        WebkitUserSelect: 'auto',
        MsUserSelect: 'auto',
      };
    const style = this.getBoxStyle();
    const { onClick, customStyle, customClass,
            onMouseDown, onDoubleClick, onTouchStart } = this.props;
    return (
      <div
        ref="resizable"
        style={{
          position: 'relative',
          ...userSelect,
          ...customStyle,
          ...style,
        }}
        className={customClass}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        onTouchStart={onTouchStart}
        {...this.props.extendsProps}
      >
        {this.props.children}
        {this.renderResizer()}
      </div>
    );
  }
}
