import React, {Component, PropTypes} from 'react';
import Resizer from './resizer';

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

export default class Risizable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      width: this.props.width,
      height: this.props.height
    }
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseUp() {
    if (!this.state.isActive) return;
    if (this.props.onResizeStop) this.props.onResizeStop();
    this.setState({isActive:false});
  }

  onResizerMouseDown(axis, event) {
    if (this.props.onResizeStart) this.props.onResizeStart(axis);
    const style = window.getComputedStyle(this.refs.resizable, null);
    const width = ~~style.getPropertyValue("width").replace('px', '');
    const height = ~~style.getPropertyValue("height").replace('px', '');
    this.setState({
      original : {
        x : event.clientX,
        y : event.clientY,
        width,
        height
      },
      isActive : true,
      resizeAxis : axis
    });
  }

  onMouseDown(event) {
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  }

  onTouchStart(event) {
    if (this.props.onTouchStart) this.props.onTouchStart(event);
  }

  onMouseMove(event) {
    const {resizeAxis, original, isActive} = this.state;
    const {minWidth, maxWidth, minHeight, maxHeight} = this.props;
    if (!isActive) return;
    if (resizeAxis.indexOf('x') !== -1) {
      const newWidth = original.width + event.clientX - original.x;
      const min = (minWidth < 0 || minWidth === undefined) ? 0 : minWidth;
      const max = (maxWidth < 0 || maxWidth === undefined) ? newWidth : maxWidth;
      this.setState({width : clamp(newWidth, min, max)});
    }
    if (resizeAxis.indexOf('y') !== -1) {
      const newHeight = original.height + event.clientY - original.y;
      const min = (minHeight < 0 || minHeight === undefined)? 0 : minHeight;
      const max = (maxHeight < 0 || maxHeight === undefined)? newHeight : maxHeight;
      this.setState({height : clamp(newHeight, min, max)});
    }
    if (this.props.onChange)
      this.props.onChange(event, this.state.width, this.state.height);
  }

  render() {
    const style = {
      width: (this.state.width) ? `${this.state.width}px` : 'auto',
      height: (this.state.height) ? `${this.state.height}px` : 'auto'
    }
    const isResizable = (this.props.isResizable === undefined)
            ? {x: true, y: true, xy: true }
            : this.props.isResizable;
    return (
      <div ref='resizable'
           style={Object.assign({position:"relative"}, this.props.customStyle, style)}
           className={this.props.customClass}
           onMouseDown={this.onMouseDown.bind(this)}
           onTouchStart={this.onTouchStart.bind(this)} >
        {this.props.children}
        {(isResizable.x  !== false) ? <Resizer type={'x'}  onMouseDown={this.onResizerMouseDown.bind(this, 'x')} /> : ''}
        {(isResizable.y  !== false) ? <Resizer type={'y'}  onMouseDown={this.onResizerMouseDown.bind(this, 'y')} /> : ''}
        {(isResizable.xy !== false) ? <Resizer type={'xy'} onMouseDown={this.onResizerMouseDown.bind(this, 'xy')} /> : ''}
      </div>
    );
  }
}

Risizable.propTypes = {
  onResizeStop: PropTypes.func,
  onResizeStart: PropTypes.func,
  onTouchStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  onChange: PropTypes.func,
  isResizable: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number
};
