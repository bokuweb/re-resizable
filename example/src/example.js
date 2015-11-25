import React, {Component} from 'react';
import Resizable from '../../src';

export default class Example extends Component{
  render() {
    return (
      <div>
        <Resizable customClass="item"
                   width={320}
                   height={200}
                   onResizeStart={() => console.log("resize start!!!")}
                   onResize={size => console.log(`box1 width=${size.width}, height=${size.height}`)}
                   onResizeStop={() => console.log("resize stop!!!")}>
          <p>This is Simplest example.</p>
          <p>Start 320px x 200px.</p>
        </Resizable>
        <Resizable customClass="item"
                   width={320}
                   height={200}
                   minWidth={160}
                   minHeight={160}
                   maxWidth={480}
                   maxHeight={480}
                   onResizeStart={() => console.log("resize start!!!")}
                   onResize={size => console.log(`box2 width=${size.width}, height=${size.height}`)}
                   onResizeStop={() => console.log("resize stop!!!")}>
          <p>Start 320px x 200px.</p>
          <p>Min size is 160x160, max size is 480px x 480px box</p>
        </Resizable>
        <Resizable customClass="item"
                   width={320}
                   height={200}
                   isResizable={{x:true, y:false, xy: false}}
                   onResizeStart={() => console.log("resize start!!!")}
                   onResize={size => console.log(`box3 width=${size.width}, height=${size.height}`)}
                   onResizeStop={() => console.log("resize stop!!!")}>
          <p>Start 320px x 200px.</p>
          <p>x-directions is only resizable</p>
        </Resizable>
        <Resizable customClass="item"
                   width={320}
                   height={200}
                   isResizable={{x:false, y:true, xy: false}}
                   onResizeStart={() => console.log("resize start!!!")}
                   onResize={size => console.log(`box4 width=${size.width}, height=${size.height}`)}
                   onResizeStop={() => console.log("resize stop!!!")}>
          <p>Start 320px x 200px.</p>
          <p>y-directions is only resizable</p>
        </Resizable>
        <Resizable customClass="item"
                   width={320}
                   height={200}
                   isResizable={{x:false, y:false, xy: true}}
                   onResizeStart={() => console.log("resize start!!!")}
                   onResize={size => console.log(`box5 width=${size.width}, height=${size.height}`)}
                   onResizeStop={() => console.log("resize stop!!!")}>
          <p>Start 320px x 200px.</p>
          <p>xy-directions is only resizable</p>
        </Resizable>
      </div>
    );
  }
}
