import React from 'react';

export default class Risizer extends React.Component{
  constructor(props) {
    super(props);
  }

  onTouchStart(event) {
    this.props.onResizeStart(event.touches[0]);
  }

  render() {
    let style;
    if (this.props.type === 'x') {
      style = {
        width: '10px',
        height: '100%',
        position: 'absolute',
        top: '0',
        right: '-5px',
        cursor: 'col-resize'
      };
    }
    else if (this.props.type === 'y') {
      style = {
        width: '100%',
        height: '10px',
        position: 'absolute',
        bottom : '-5px',
        cursor: 'row-resize'
      };
    } else {
      style = {
        width: '10px',
        height: '10px',
        position: 'absolute',
        right : '-5px',
        bottom: '-5px',
        cursor: 'nw-resize'
      }
    }
    return (
      <div style={style}
           onMouseDown={this.props.onResizeStart}
           onTouchStart={this.onTouchStart.bind(this)} />
    );
  }
}
