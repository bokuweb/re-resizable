import React, {Component, PropTypes} from 'react';
import assign from 'react/lib/Object.assign';
import Resizer from './resizer';

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

export default class Risizable extends Component{
  constructor(props) {
    super(props);
    const {width, height} = props;
    this.state = {
      isActive: false,
      width,
      height
    };

    const onTouchMove = (event) => this.onMouseMove(event.touches[0]);

    const onMouseMove = ({clientX, clientY}) => {
      const {direction, original, isActive} = this.state;
      const {minWidth, maxWidth, minHeight, maxHeight} = this.props;
      if (!isActive) return;
      if (direction.indexOf('x') !== -1) {
        const newWidth = original.width + clientX - original.x;
        const min = (minWidth < 0 || minWidth === undefined) ? 0 : minWidth;
        const max = (maxWidth < 0 || maxWidth === undefined) ? newWidth : maxWidth;
        this.setState({width : clamp(newWidth, min, max)});
      }
      if (direction.indexOf('y') !== -1) {
        const newHeight = original.height + clientY - original.y;
        const min = (minHeight < 0 || minHeight === undefined)? 0 : minHeight;
        const max = (maxHeight < 0 || maxHeight === undefined)? newHeight : maxHeight;
        this.setState({height : clamp(newHeight, min, max)});
      }
      if (this.props.onResize)
        this.props.onResize({width: this.state.width, height: this.state.height});
    };

    const onMouseUp = () => {
      if (!this.state.isActive) return;
      if (this.props.onResizeStop) {
        this.props.onResizeStop({width: this.state.width, height: this.state.height});
      }
      this.setState({isActive:false});
    };

    this.onTouchMove = onTouchMove.bind(this);
    this.onMouseMove = onMouseMove.bind(this);
    this.onMouseUp = onMouseUp.bind(this);

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

  onResizeStart(direction, {clientX, clientY}) {
    if (this.props.onResizeStart) this.props.onResizeStart(direction);
    if (window.getComputedStyle === undefined) {
      console.warn("This browser not support window.getComputedStyle, react-resizable-box need it");
      return;
    }
    const style = window.getComputedStyle(this.refs.resizable, null);
    const width = ~~style.getPropertyValue("width").replace('px', '');
    const height = ~~style.getPropertyValue("height").replace('px', '');
    this.setState({
      original : {
        x : clientX,
        y : clientY,
        width,
        height
      },
      isActive : true,
      direction
    });
  }

  render() {
    const style = {
      width: (this.state.width) ? `${this.state.width}px` : '',
      height: (this.state.height) ? `${this.state.height}px` : ''
    };
    const isResizable = (this.props.isResizable === undefined)
            ? {x: true, y: true, xy: true }
            : this.props.isResizable;
    return (
      <div ref='resizable'
           style={assign({position:"relative"}, this.props.customStyle, style)}
           className={this.props.customClass}
           onClick={this.props.onClick}
           onDoubleClick={this.props.onDoubleClick}
           onTouchStart={this.props.onTouchStart} >
        {this.props.children}
        {(isResizable.x  !== false) ? <Resizer type={'x'}  onResizeStart={this.onResizeStart.bind(this, 'x')} /> : ''}
        {(isResizable.y  !== false) ? <Resizer type={'y'}  onResizeStart={this.onResizeStart.bind(this, 'y')} /> : ''}
        {(isResizable.xy !== false) ? <Resizer type={'xy'} onResizeStart={this.onResizeStart.bind(this, 'xy')} /> : ''}
      </div>
    );
  }
}

Risizable.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
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
  maxHeight: PropTypes.number
};
