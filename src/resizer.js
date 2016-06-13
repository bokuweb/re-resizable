import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash.isequal';

const styles = {
  base: {
    position: 'absolute',
  },
  top: {
    width: '100%',
    height: '10px',
    top: '-5px',
    left: '0px',
    cursor: 'row-resize',
  },
  right: {
    width: '10px',
    height: '100%',
    top: '0px',
    right: '-5px',
    cursor: 'col-resize',
  },
  bottom: {
    width: '100%',
    height: '10px',
    bottom: '-5px',
    left: '0px',
    cursor: 'row-resize',
  },
  left: {
    width: '10px',
    height: '100%',
    top: '0px',
    left: '-5px',
    cursor: 'col-resize',
  },
  topRight: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    cursor: 'sw-resize',
  },
  bottomRight: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '-10px',
    bottom: '-10px',
    cursor: 'nw-resize',
  },
  bottomLeft: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    left: '-10px',
    bottom: '-10px',
    cursor: 'ne-resize',
  },
  topLeft: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    left: '-10px',
    top: '-10px',
    cursor: 'se-resize',
  },
};

export default class Resizer extends Component {
  static propTypes = {
    onResizeStart: PropTypes.func,
    type: PropTypes.oneOf([
      'top', 'right', 'bottom', 'left',
      'topRight', 'bottomRight', 'bottomLeft', 'topLeft',
    ]).isRequired,
    replaceStyles: PropTypes.object,
    className: PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  onTouchStart(event) {
    this.props.onResizeStart(event.touches[0]);
  }

  getStyle() {
    if (this.props.replaceStyles) return this.props.replaceStyles;
    return { ...styles.base, ...styles[this.props.type] };
  }

  render() {
    const onTouchStart = this.onTouchStart.bind(this);
    return (
      <div
        className={this.props.className}
        style={this.getStyle()}
        onMouseDown={this.props.onResizeStart}
        onTouchStart={onTouchStart}
      />
    );
  }
}
