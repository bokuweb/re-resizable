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
    handleStyle: PropTypes.shape({
      x: PropTypes.object,
      y: PropTypes.object,
      xy: PropTypes.object,
    }),
    isResizable: PropTypes.shape({
      x: PropTypes.bool,
      y: PropTypes.bool,
      xy: PropTypes.bool,
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
  };

  static defaultProps = {
    onResizeStart: () => null,
    onResize: () => null,
    onResizeStop: () => null,
    isResizable: { x: true, y: true, xy: true },
    customStyle: {},
    handleStyle: {},
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

  componentWillReceiveProps({ width, height }) {
    if (width !== this.props.width) this.setState({ width });
    if (height !== this.props.height) this.setState({ height });
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
    const resizable = this.refs.resizable;
    this.props.onResize(direction, {
      width: newWidth || this.state.width,
      height: newHeight || this.state.height,
    }, {
      width: resizable.clientWidth,
      height: resizable.clientHeight,
    });
  }

  onMouseUp() {
    const { width, height, isActive, direction } = this.state;
    if (!isActive) return;
    const resizable = this.refs.resizable;
    this.props.onResizeStop(direction, {
      width,
      height,
    }, {
      width: resizable.clientWidth,
      height: resizable.clientHeight,
    });
    this.setState({ isActive: false });
  }

  onResizeStart(direction, e) {
    this.props.onResizeStart(direction, e);
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

  getBoxStyle() {
    const getSize = key => {
      if (typeof this.state[key] === 'undefined') return 'auto';
      else if (/px$/.test(this.state[key].toString())) return this.state[key];
      else if (/%$/.test(this.state[key].toString())) return this.state[key];
      return `${this.state[key]}px`;
    };
    return {
      width: getSize('width'),
      height: getSize('height'),
    };
  }

  render() {
    const style = this.getBoxStyle();
    const { isResizable, onClick, customStyle, handleStyle, customClass,
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
            ? <Resizer type={'x'} onResizeStart={onResizeStartX} replaceStyles={handleStyle.x} />
            : null
        }
        {
          isResizable.y !== false
            ? <Resizer type={'y'} onResizeStart={onResizeStartY} replaceStyles={handleStyle.y} />
            : null
        }
        {
          isResizable.xy !== false
            ? <Resizer type={'xy'} onResizeStart={onResizeStartXY} replaceStyles={handleStyle.xy} />
            : null
        }
      </div>
    );
  }
}
