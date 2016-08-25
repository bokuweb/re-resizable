import React, { Component } from 'react';
import Resizable from '../../src';

export default class Example extends Component {

  onResizeStart(dir, size, rect) {
    console.log('onResizeStart');
    console.log(dir);
    console.log(size);
    console.log(rect);
  }

  onResize(dir, size, rect, delta) {
    console.log('onResize');
    console.log(dir);
    console.log(size);
    console.log(rect);
    console.log(delta);
  }

  onResizeStop(dir, size, rect, delta) {
    console.log('onResizeStop');
    console.log(dir);
    console.log(size);
    console.log(rect);
    console.log(delta);
  }

  render() {
    return (
      <Resizable
        ref={c => { this.resizable = c; }}
        customClass="item"
        width={'30%'}
        height={200}
        minHeight={200}
        minWidth={200}
        maxHeight={400}
        maxWidth={800}
        handleClass={{
          bottomRight: 'bottom-right-classname',
        }}
        onResizeStart={this.onResizeStart.bind(this)}
        onResize={this.onResize.bind(this) }
        onResizeStop={this.onResizeStop.bind(this)}
      >
        <span>Resize me!!</span>
      </Resizable>
    );
  }
}
