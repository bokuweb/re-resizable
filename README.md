# react-resizable-box

Resizable component for React.

[![Build Status](https://img.shields.io/travis/bokuweb/react-resizable-box.svg?style=flat-square)](https://travis-ci.org/bokuweb/react-resizable-box)
[![Version](https://img.shields.io/npm/v/react-resizable-box.svg?style=flat-square)](https://www.npmjs.com/package/react-resizable-box)
[![npm](https://img.shields.io/npm/dm/react-resizable-box.svg?style=flat-square)]()
[![License](https://img.shields.io/npm/l/react-resizable-box.svg?style=flat-square)](https://github.com/bokuweb/react-resizable-box#license)

## Table of Contents

- [Demo](#Demo)
- [Install](#install)
- [Usage](#usage)
- [Props](#props)
- [Method](#method)
- [Test](#test)
- [Changelog](#changelog)
- [License](#license)

## Demo

![screenshot](https://github.com/bokuweb/react-resizable-box/blob/master/docs/screenshot.gif?raw=true)
   
See demo: [http://bokuweb.github.io/react-resizable-box/example/](http://bokuweb.github.io/react-resizable-box/)

## Install

``` sh
$ npm install --save react-resizable-box
```

## Usage

### Basic

``` javascript
<Resizable
  className="item"
  width={320}
  height={200}
>
  Basic Sample
</Resizable>
```

## Props

#### `className?: string;`

The `className` property is used to set the custom `className` of a resizable component.

#### `style?: any;`

The `style` property is used to set the custom `style` of a resizable component.

#### `width?: (number | string);`

The `width` property is used to set the initial width of a resizable component.   
For example, you can set `300`, `'300px'`, `50%`.     
If omitted, set `'auto'`.    

#### `height?: (number | string);`

The `height` property is used to set the initial height of a resizable component.    
For example, you can set `300`, `'300px'`, `50%`.    
If omitted, set `'auto'`.    

#### `minWidth?: number;`

The `minWidth` property is used to set the minimum width of a resizable component.

#### `minHeight?: number;`

The `minHeight` property is used to set the minimum height of a resizable component.

#### `maxWidth?: number;`

The `maxWidth` property is used to set the maximum width of a resizable component.

#### `maxHeight?: number`;

The `maxHeight` property is used to set the maximum height of a resizable component.

#### `grid?: Array<number>;`

The `grid` property is used to specify the increments that resizing should snap to. Defaults to `[1, 1]`.

#### `lockAspectRatio?: boolean;`

The `lockAspectRatio` property is used to lock aspect ratio.
If omitted, set `false`.

#### `bounds?: ('window' | 'parent' | HTMLElement);`

Specifies resize boundaries.

#### `handlerStyles?: HandlersStyles;`

The `handleStyles` property is used to override the style of one or more resize handlers.
Only the axis you specify will have its handler style replaced.
If you specify a value for `right` it will completely replace the styles for the `right` resize handler,
but other handler will still use the default styles.

#### `handlerClasses?: HandlersClassName;`

The `handlerClasses` property is used to set the className of one or more resize handlers.

#### `enable?: ?Enable;`

The `enable` property is used to set the resizable permission of a resizable component.

The permission of `top`, `right`, `bottom`, `left`, `topRight`, `bottomRight`, `bottomLeft`, `topLeft` direction resizing.
If omitted, all resizer are enabled.
If you want to permit only right direction resizing, set `{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }`. 

#### `onResizeStart?: ResizeStartCallBack;`

`ResizeStartCallBack` type is below.

```
type ResizeStartCallBack = (
  e: SyntheticMouseEvent | SyntheticTouchEvent,
  dir: Direction,
  refToElement: HTMLElement,
) => void;
```

Calls when resizable component resize start.

#### `onResize?: Callback;`

### Basic

`Callback` type is below.

```
type Callback = (
  event: MouseEvent | TouchEvent,
  direction: Direction,
  refToElement: HTMLElement,
  delta: NumberSize,
) => void;
```

Calls when resizable component resizing.

#### `onResizeStop?: Callback;`

`Callback` type is below.

```
type Callback = (
  event: MouseEvent | TouchEvent,
  direction: Direction,
  refToElement: HTMLElement,
  delta: NumberSize,
) => void;
```

Calls when resizable component resize startStop.

#### `extendsProps?: any;`

This property is used to pass the other props to the component.

e.g.

``` javascript
const extendsProps = {
  data-foo: 'foo',
  onMouseOver: () => {},
};

<Resizable extendsProps={extendsProps} />
```

## method

#### `updateSize(object size)`

Update component size.
`grid` ,`max/minWidth`, `max/minHeight` props is ignored, when this method called.

- for example

``` js
class YourComponent extends Component {

  ...
  
  update() {
    this.resizable.updateSize({ width: 200, height: 300 });
  }
  
  render() {
    return (
      <Resizable ref={c => { this.resizable = c; }}>
        example
      </Resizable>
    );
  }

  ...
}
```

## Test

``` sh
npm test
```

## Changelog

#### v1.8.4

- FIx cursor

#### v1.8.3

- Fix npm readme

#### v1.8.2

- Add index.d.ts.
- Fix resize glitch when aspct ratio locked.

#### v1.8.1

- Fixing issue on resizing with touch events

#### v1.8.0

- Add `extendsProps` prop to other props (e.g. `data-*`, `aria-*`, and other ).

#### v1.7.0

- Support siver side rendering #43

#### v1.6.0

- Add `updateSize` method.

#### v1.5.1

- Add `lockAspectRatio` property.

#### v1.4.3

- Avoid unnecessary rendering on resizer

#### v1.4.2

- Fix onTouchStart bind timing to avoid re-rendering

#### v1.4.1

- Support preserving auto size #40 (thanks @noradaiko)

#### v1.4.0

- Add `grid` props to snap grid. (thanks @paulyoung)

#### v1.3.0

- Add `userSelect: none` when resize get srated.
- Add shouldComponentUpdate.
- Add handler custom className.

#### v1.2.0

- Add module export plugin for `require`.

#### v1.1.3

- Update document.

#### v1.1.2

- Add size argument to resizeStart callback.
- Fix bug

#### v1.1.1

- Fix delta value bug

#### v1.1.0

- Add delta argument to onResize and onResizeStop callback.

#### v1.0.0

- Rename and add resizer.

#### v0.4.2

- Support react v15
- ESLint run when push  

#### v0.4.1

- Add mousedown event object to `onResizeStart` callback argument.

#### v0.4.0

- Support `'px'` and `'%'` for width and height props.


## License

The MIT License (MIT)

Copyright (c) 2017 bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
