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
    isResizable: PropTypes.object,
    customClass: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
  };

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
    if (direction.indexOf('x') !== -1) {
      const newWidth = original.width + clientX - original.x;
      const min = (minWidth < 0 || minWidth === undefined) ? 0 : minWidth;
      const max = (maxWidth < 0 || maxWidth === undefined) ? newWidth : maxWidth;
      this.setState({ width: clamp(newWidth, min, max) });
    }
    if (direction.indexOf('y') !== -1) {
      const newHeight = original.height + clientY - original.y;
      const min = (minHeight < 0 || minHeight === undefined) ? 0 : minHeight;
      const max = (maxHeight < 0 || maxHeight === undefined) ? newHeight : maxHeight;
      this.setState({ height: clamp(newHeight, min, max) });
    }
    if (this.props.onResize) {
      this.props.onResize({ width: this.state.width, height: this.state.height });
    }
  }

  onMouseUp() {
    const { width, height } = this.state;
    if (!this.state.isActive) return;
    if (this.props.onResizeStop) {
      this.props.onResizeStop({ width, height });
    }
    this.setState({ isActive: false });
  }

  onResizeStart(direction, e) {
    if (this.props.onResizeStart) this.props.onResizeStart(direction, e);
    if (typeof window.getComputedStyle === 'undefined') {
      throw new Error('This browser not support window.getComputedStyle');
    }
    const style = window.getComputedStyle(this.refs.resizable, null);
    const width = ~~style.getPropertyValue('width').replace('px', '');
    const height = ~~style.getPropertyValue('height').replace('px', '');
    this.setState({
      original: {
        x: e.clientX,
        y: e.clientY,
        width,
        height,
      },
      isActive: true,
      direction,
    });
  }

  render() {
    const style = {
      width: (this.state.width) ? `${this.state.width}px` : '',
      height: (this.state.height) ? `${this.state.height}px` : '',
    };
    const isResizable = (this.props.isResizable === undefined)
            ? { x: true, y: true, xy: true }
          : this.props.isResizable;
    const onResizeStartX = this.onResizeStart.bind(this, 'x');
    const onResizeStartY = this.onResizeStart.bind(this, 'y');
    const onResizeStartXY = this.onResizeStart.bind(this, 'xy');
    return (
      <div ref="resizable"
        style={Object.assign({ position: 'relative' }, this.props.customStyle, style)}
        className={this.props.customClass}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
        onTouchStart={this.props.onTouchStart}
      >
        {this.props.children}
        {
          (isResizable.x !== false)
            ? <Resizer type={'x'} onResizeStart={onResizeStartX} />
            : null
        }
        {
          (isResizable.y !== false)
            ? <Resizer type={'y'} onResizeStart={onResizeStartY} />
            : null
        }
        {
          (isResizable.xy !== false)
            ? <Resizer type={'xy'} onResizeStart={onResizeStartXY} />
            : null
        }
      </div>
    );
  }
}

