import React, { Component } from 'react';
import Resizable from '../../src';

export default class Example extends Component {

constructor(props) {
  super(props);
  this.state = {b: null}

}
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

  componentDidMount() {
    this.setState({b: this.b})
    console.log('aaa', this.b)
  }

  render() {

    return (
      <div ref={c => this.b = c} style={{width: '400px', height: '300px'}}>
        <div>
      <Resizable
        ref={c => { this.resizable = c; }}
        className="item"
        bounds={this.state.b}

        handleClasses={{
          bottomRight: 'bottom-right-classname',
        }}
        onResizeStart={this.onResizeStart.bind(this)}
        onResize={this.onResize.bind(this)}
        onResizeStop={this.onResizeStop.bind(this)}
      >
        <span>
          Resize me!!<br />
          <span style={{ fontSize: '11px', fontFamily: 'Arial' }}>
            react-resizable-box v2.0
          </span>
        </span>
      </Resizable>
      </div>
      </div>
    );
  }
}
