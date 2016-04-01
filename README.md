# react-resizable-box

Resizable component for React.

[![Build Status](https://travis-ci.org/bokuweb/react-resizable-box.svg)](https://travis-ci.org/bokuweb/react-resizable-box)
[![Code Climate](https://codeclimate.com/github/bokuweb/react-resizable-box/badges/gpa.svg)](https://codeclimate.com/github/bokuweb/react-resizable-box)
[![License](http://img.shields.io/npm/l/object.assign.svg)](https://github.com/bokuweb/react-resizable-box#license)

## Demo

![screenshot](https://github.com/bokuweb/react-resizable-box/blob/master/docs/screenshot.gif?raw=true)
   
See demo: [http://bokuweb.github.io/react-resizable-box/example/](http://bokuweb.github.io/react-resizable-box/example/)


## Installation

```sh
npm i react-resizable-box
```

## Overview

### Basic

``` javascript
<Resizable
  customClass="item"
  width={320}
  height={200}
>
  Basic Sample
</Resizable>
```

### With min/max width and height

``` javascript
<Resizable
  customClass="item"
  width={320}
  height={200}
  minWidth={160}
  minHeight={160}
  maxWidth={480}
  maxHeight={480}
>
  min size is 160px x 160px, max size is 480px x 480px.
</Resizable>
```

## Props

#### `width`: PropTypes.oneOfType([PropTypes.number, PropTypes.string])

The `width` property is used to set the width of a resizable component.   
For example, you can set `300`, `'300px'`, `50%`.     
If ommited, set `'auto'`.    

#### `height`: PropTypes.oneOfType([PropTypes.number, PropTypes.string])

The `height` property is used to set the width of a resizable component.    
For example, you can set `300`, `'300px'`, `50%`.    
If ommited, set `'auto'`.    

#### `minWidth`: PropTypes.number

The `minWidth` property is used to set the minimum width of a resizable component.

#### `minHeight`: PropTypes.number

The `minHeight` property is used to set the minimum height of a resizable component.

#### `maxWidth`: PropTypes.number

The `maxWidth` property is used to set the maximum width of a resizable component.

#### `maxHeight`: PropTypes.number

The `maxheight` property is used to set the maximum height of a resizable component.

#### `customClass`: PropTypes.string

The `customClass` property is used to set the custom `className` of a resizable component.

#### customStyle: Proptypes.object

The `customStyle` property is used to set the custom `classStyle` of a resizable component.

#### handleStyle: PropTypes.shape({ x: PropTypes.object, y: PropTypes.object, xy: PropTypes.object })

The `handleStyle` property is used to override the style of one or more resize handles.
Only the axis you specify will have its handle style replaced.
If you specify a value for `x` it will completely replace the styles for the X resize handle,
but the `y` and `xy` handle will still use the default styles.

#### `isResizable`: Proptypes.shape({ x: PropTypes.bool, y: PropTypes.bool, xy: PropTypes.bool })

The `isResizable` property is used to set the resizable permission of a resizable component.

The permission of `x`, `y`, `xy` direction resizing.
If omitted, `x`, `y`, `xy` direction resizing is enabled.
If you want to permit only x direction resizing, set `{ x:true, y:false, xy:false }`. 

#### `onClick`: PropTypes.func

Calls when resizable component clicked.

#### `onTouchStart`: PropTypes.func

Calls when resizable component touched.

#### `onDoubleClick`: PropTypes.func

Calls when resizable component double clicked.

#### `onResizeStart`: PropTypes.func

Calls when resizable component resize starts.
Calls back with (`direction: string`, `event: object`)

- direction: `x` or `y` or `xy`
- event: `mouse down event`

#### `onResize`: PropTypes.func

Calls when resizable component resize.
Calls back with (`direction: string`, `styleSize: object`, `clientSize: object`)

- direction: `x` or `y` or `xy`
- getComputedStyleSize: `{ width, height }`
  - this argument is {width, height} of getComputedStyle.
- clientSize: `{ width`, height }`
  - this argument is `clientWidth` and `clientHeight`.
  
For example, when `<Resizable width={100} height={200} style={{ padding: '20px'}} onResize={...} />` mounted and resize 'x', this callback is called with `('x', { width: 100, height: 200 }, { width: 140, height: 240 })`

#### `onResizeStop`: PropTypes.func

Calls back with (`direction: string`, `styleSize: object`, `clientSize: object`)

- direction: `x` or `y` or `xy`
- getComputedStyleSize: `{ width, height }`
  - this argument is {width, height} of getComputedStyle.
- clientSize: `{ width`, height }`
  - this argument is `clientWidth` and `clientHeight`.
  
For example, when `<Resizable width={100} height={200} style={{ padding: '20px'}} onResize={...} />` mounted and resize 'x', this callback is called with `('x', { width: 100, height: 200 }, { width: 140, height: 240 })`

## Test

``` sh
npm test
```

## Changelog

#### v0.4.0

- Support `'px'` and `'%'` for width and height props.

## License

The MIT License (MIT)

Copyright (c) 2016 @Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
