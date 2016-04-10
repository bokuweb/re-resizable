import React, { Component } from 'react';
import Resizable from '../../src';

export default class Example extends Component {
  onResizeStart(i, dir, size, rect) {
    console.log(
      `onResizeStart direction=${dir} box.style.width=${size.width}, box.syle.height=${size.height} client.width=${rect.width}, client.height=${rect.height}`);
  }

  onResize(i, dir, size, rect, delta) {
    console.log(
      `onResize direction=${dir} box.style.width=${size.width}, box.syle.height=${size.height} client.width=${rect.width}, client.height=${rect.height}, delta.width=${delta.width}, delta.height=${delta.height}`);
  }

  onResizeStop(i, dir, size, rect, delta) {
    console.log(
      `onResizeStop direction=${dir} box.style.width=${size.width}, box.syle.height=${size.height} client.width=${rect.width}, client.height=${rect.height}, delta.width=${delta.width}, delta.height=${delta.height}`);
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
        <span>react-resizable-box example.</span>
      </Resizable>
    );
  }
}
