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
      top: PropTypes.object,
      right: PropTypes.object,
      bottom: PropTypes.object,
      left: PropTypes.object,
      topRight: PropTypes.object,
      bottomRight: PropTypes.object,
      bottomLeft: PropTypes.object,
      topLeft: PropTypes.object,
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
    if (!isActive) return;
    let newWidth = original.width;
    let newHeight = original.height;
    if (/right/i.test(direction)) {
      newWidth = original.width + clientX - original.x;
      const min = (minWidth < 0 || typeof minWidth === 'undefined') ? 0 : minWidth;
      const max = (maxWidth < 0 || typeof maxWidth === 'undefined') ? newWidth : maxWidth;
      newWidth = clamp(newWidth, min, max);
    }
    if (/left/i.test(direction)) {
      newWidth = original.width - clientX + original.x;
      const min = (minWidth < 0 || typeof minWidth === 'undefined') ? 0 : minWidth;
      const max = (maxWidth < 0 || typeof maxWidth === 'undefined') ? newWidth : maxWidth;
      newWidth = clamp(newWidth, min, max);
    }
    if (/bottom/i.test(direction)) {
      newHeight = original.height + clientY - original.y;
      const min = (minHeight < 0 || typeof minHeight === 'undefined') ? 0 : minHeight;
      const max = (maxHeight < 0 || typeof maxHeight === 'undefined') ? newHeight : maxHeight;
      newHeight = clamp(newHeight, min, max);
    }
    if (/top/i.test(direction)) {
      newHeight = original.height - clientY + original.y;
      const min = (minHeight < 0 || typeof minHeight === 'undefined') ? 0 : minHeight;
      const max = (maxHeight < 0 || typeof maxHeight === 'undefined') ? newHeight : maxHeight;
      newHeight = clamp(newHeight, min, max);
    }
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
      width: original.width - newWidth,
      height: original.height - newHeight,
    };
    this.setState({ width: newWidth, height: newHeight });
    this.props.onResize(direction, styleSize, clientSize, delta);
  }

  onMouseUp() {
    const { width, height, isActive, direction, original } = this.state;
    if (!isActive) return;
    const resizable = this.refs.resizable;
    const styleSize = { width, height };
    const clientSize = {
      width: resizable.clientWidth,
      height: resizable.clientHeight,
    };
    const delta = {
      width: original.width - width,
      height: original.height - height,
    };
    this.props.onResizeStop(direction, styleSize, clientSize, delta);
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

  renderResizer() {
    const { isResizable, handleStyle } = this.props;
    return Object.keys(isResizable).map(dir => {
      const onResizeStart = this.onResizeStart.bind(this, dir);
      if (isResizable[dir] !== false) {
        return (
          <Resizer
            key={dir}
            type={dir}
            onResizeStart={onResizeStart}
            replaceStyles={handleStyle[dir]}
          />
        );
      }
      return null;
    });
  }

  render() {
    const style = this.getBoxStyle();
    const { onClick, customStyle, customClass,
            onMouseDown, onDoubleClick, onTouchStart } = this.props;
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
        {this.renderResizer()}
      </div>
    );
  }
}
