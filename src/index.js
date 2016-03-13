import React, { Component, PropTypes } from 'react';
import Resizer from './resizer';

const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

export default class Risizable extends Component {
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
    isResizable: PropTypes.shape({
      x: PropTypes.bool,
      y: PropTypes.bool,
      xy: PropTypes.bool,
    }),
    customClass: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
  };

  static defaultProps = {
    onResizeStart: () => null,
    onResize: () => null,
    onResizeStop: () => null,
    isResizable: { x: true, y: true, xy: true },
    customStyle: {},
  }

  constructor(props) {
    super(props);
    const { width, height } = props;
    this.state = {
      isActive: false,
      width,
      height,
    };

    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onMouseUp);
  }

  componentDidMount() {
    const size = this.getBoxSize();
    this.setSize(size);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onMouseUp);
  }

  onTouchMove(event) {
    this.onMouseMove(event.touches[0]);
  }

  onMouseMove({ clientX, clientY }) {
    const { direction, original, isActive } = this.state;
    const { minWidth, maxWidth, minHeight, maxHeight } = this.props;
    let newWidth;
    let newHeight;
    if (!isActive) return;
    if (direction.indexOf('x') !== -1) {
      newWidth = original.width + clientX - original.x;
      const min = (minWidth < 0 || typeof minWidth === 'undefined') ? 0 : minWidth;
      const max = (maxWidth < 0 || typeof maxWidth === 'undefined') ? newWidth : maxWidth;
      newWidth = clamp(newWidth, min, max);
      this.setState({ width: newWidth });
    }
    if (direction.indexOf('y') !== -1) {
      newHeight = original.height + clientY - original.y;
      const min = (minHeight < 0 || typeof minHeight === 'undefined') ? 0 : minHeight;
      const max = (maxHeight < 0 || typeof maxHeight === 'undefined') ? newHeight : maxHeight;
      newHeight = clamp(newHeight, min, max);
      this.setState({ height: newHeight });
    }
    const rect = this.refs.resizable.getBoundingClientRect();
    this.props.onResize(direction, {
      width: newWidth || this.state.width,
      height: newHeight || this.state.height,
    }, {
      width: rect.width,
      height: rect.height,
    });
  }

  onMouseUp() {
    const { width, height, isActive, direction } = this.state;
    if (!isActive) return;
    const rect = this.refs.resizable.getBoundingClientRect();
    this.props.onResizeStop(direction, {
      width,
      height,
    }, {
      width: rect.width,
      height: rect.height,
    });
    this.setState({ isActive: false });
  }

  onResizeStart(direction, e) {
    this.props.onResizeStart(direction);
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
    if (typeof window.getComputedStyle === 'undefined') {
      throw new Error('This browser not support window.getComputedStyle');
    }
    const style = window.getComputedStyle(this.refs.resizable, null);
    const width = ~~style.getPropertyValue('width').replace('px', '');
    const height = ~~style.getPropertyValue('height').replace('px', '');
    return { width, height };
  }

  setSize(size) {
    this.setState({
      width: this.state.width || size.width,
      height: this.state.height || size.height,
    });
  }

  render() {
    const style = {
      width: this.state.width ? `${this.state.width}px` : '',
      height: this.state.height ? `${this.state.height}px` : '',
    };
    const { isResizable, onClick, customStyle, customClass,
            onMouseDown, onDoubleClick, onTouchStart } = this.props;
    const onResizeStartX = this.onResizeStart.bind(this, 'x');
    const onResizeStartY = this.onResizeStart.bind(this, 'y');
    const onResizeStartXY = this.onResizeStart.bind(this, 'xy');
    return (
      <div
        ref="resizable"
        style={Object.assign({ position: 'relative' }, customStyle, style)}
        className={customClass}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        onTouchStart={onTouchStart}
      >
        {this.props.children}
        {
          isResizable.x !== false
            ? <Resizer type={'x'} onResizeStart={onResizeStartX} />
            : null
        }
        {
          isResizable.y !== false
            ? <Resizer type={'y'} onResizeStart={onResizeStartY} />
            : null
        }
        {
          isResizable.xy !== false
            ? <Resizer type={'xy'} onResizeStart={onResizeStartXY} />
            : null
        }
      </div>
    );
  }
}

