import React, { Component } from 'react';
import Resizable from '../../src';

export default class Example extends Component {
  onResizeStart(i, dir) {
    console.log(`Box${i} resize start!!! direction=${dir}`);
  }

  onResize(i, dir, size, rect) {
    console.log(
      `Box${i} resize!!! direction=${dir} box.style.width=${size.width},
box.syle.height=${size.height} boundingClientRect.width=${rect.width}
boundingClientRect.height=${rect.height}`);
  }

  onResizeStop(i, dir, size, rect) {
    console.log(
      `Box${i} resize stop!!! direction=${dir} box.style.width=${size.width},
box.syle.height=${size.height}  boundingClientRect.width=${rect.width}
boundingClientRect.height=${rect.height}`);
  }

  render() {
    return (
      <Resizable
        customClass="item"
        width={'50%'}
        height={200}
        minHeight={200}
        minWidth={200}
        maxHeight={400}
        maxWidth={800}
        onResizeStart={this.onResizeStart.bind(this, 1)}
        onResize={this.onResize.bind(this, 1) }
        onResizeStop={this.onResizeStop.bind(this, 1) }
      >
        react-resizable-box example.
      </Resizable>
    );
  }
}
