# react-resizable-box

[![Build Status](https://travis-ci.org/bokuweb/react-resizable-box.svg)](https://travis-ci.org/bokuweb/react-resizable-box)
[![Code Climate](https://codeclimate.com/github/bokuweb/react-resizable-box/badges/gpa.svg)](https://codeclimate.com/github/bokuweb/react-resizable-box)
[![License](http://img.shields.io/npm/l/object.assign.svg)](https://github.com/bokuweb/react-resizable-box/blob/dev/LICENSE)

Resizable component for React.

## Demo

See demo: [https://](https://)

## Important Note

This is an alpha release. Use with caution and hope.

## Installation

```sh
npm i react-resizable-box
```

## Overview

### Basic

``` javascript
<Resizable customClass="item"
           width={320}
           height={200}>
  Basic Sample
</Resizable>
```

### With min/max width/height

``` javascript
<Resizable customClass="item"
           width={320}
           height={200}
           minWidth={160}
           minHeight={160}
           maxWidth={480}
           maxHeight={480} >
  min size is 160x160, max size is 480px x 480px.
</Resizable>
```
## Properties

#### width {number}

The default width of the resizable box.
If omitted, 'auto' is set.

#### height {number}

The default height of the resizable box.
If omitted, 'auto' is set.

#### minWidth {number}

The minimum width of the resizable box.

#### minHeight {number}

The minimum height of the resizable box.

#### maxWidth {number}

The maximum width of the resizable box.

#### maxHeight {number}

The maximum height of the resizable box.

#### customClass {string}

The css class set on the resizable box node.

#### customStyle {object}

The css style set on the resizable box node.

#### isResizable {object}

The permission of x, y, xy direction resizing
If omitted, x, y, xy direction resizing is enabled.
If you want to permit only x direction resizing, set `{x:true, y:false, xy:false}`. 

#### onClick {func}

Callback called on resizable box clicked.

#### onDoubleClick {func}

Callback called on resizable box double clicked.

#### onResizeStart {func}

Callback called on resize start.
Receives the resize direction as argument.

#### onResize {func}

Callback called on resizing.
Receives the box size `{width, height}` as argument.

#### onResize {func}

Callback called on resize stop.

## Test

``` sh
npm test
```

## License

The MIT License (MIT)

Copyright (c) 2015 @Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
