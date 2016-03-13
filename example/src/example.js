import React, { Component } from 'react';
import Resizable from '../../src';

export default class Example extends Component {

  onResizeStart(i, dir) {
    console.log(`Box${i} resize start!!! direction=${dir}`);
  }

  onResize(i, dir, size, rect) {
    console.log(`Box${i} resize!!! direction=${dir} box.style.width=${size.width}, box.syle.height=${size.height} boundingClientRect.width=${rect.width} boundingClientRect.height=${rect.height}`);
  }

  onResizeStop(i, dir, size, rect) {
    console.log(`Box${i} resize stop!!! direction=${dir} box.style.width=${size.width}, box.syle.height=${size.height}  boundingClientRect.width=${rect.width} boundingClientRect.height=${rect.height}`);
  }

  render() {
    return (
      <div>
        <Resizable customClass="item"
          width={320}
          height={100}
          onResizeStart={this.onResizeStart.bind(this, 1) }
          onResize={this.onResize.bind(this, 1) }
          onResizeStop={this.onResizeStop.bind(this, 1) }
        >
          <p>This is Simplest example.</p>
          <p>Start 320px x 100px.</p>
        </Resizable>
        <Resizable customClass="item"
          width={160}
          height={240}
          minWidth={160}
          minHeight={160}
          maxWidth={480}
          maxHeight={480}
          onResizeStart={this.onResizeStart.bind(this, 2) }
          onResize={this.onResize.bind(this, 2) }
          onResizeStop={this.onResizeStop.bind(this, 2) }
        >
          <p>Start 160px x 240px.</p>
          <p>Min size is 160x160, max size is 480px x 480px box</p>
        </Resizable>
        <Resizable customClass="item"
          width={120}
          height={180}
          isResizable={{ x: true, y: false, xy: false }}
          onResizeStart={this.onResizeStart.bind(this, 3) }
          onResize={this.onResize.bind(this, 3) }
          onResizeStop={this.onResizeStop.bind(this, 3) }
        >
          <p>Start 120px x 180px.</p>
          <p>Only x-direction is resizable</p>
        </Resizable>
        <Resizable customClass="item"
          width={120}
          height={200}
          isResizable={{ x: false, y: true, xy: false }}
          onResizeStart={this.onResizeStart.bind(this, 4) }
          onResize={this.onResize.bind(this, 4) }
          onResizeStop={this.onResizeStop.bind(this, 4) }
        >
          <p>Start 120px x 200px.</p>
          <p>Only y-directions is resizable</p>
        </Resizable>
        <Resizable customClass="item"
          width={200}
          height={100}
          isResizable={{x:false, y:false, xy: true}}
          onResizeStart={this.onResizeStart.bind(this, 5) }
          onResize={this.onResize.bind(this, 5) }
          onResizeStop={this.onResizeStop.bind(this, 5) }
        >
          <p>Start 200px x 100px.</p>
          <p>Only xy-directions is resizable</p>
        </Resizable>
      </div>
    );
  }
}
