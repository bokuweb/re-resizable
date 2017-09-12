<p align="center"><img src ="https://github.com/bokuweb/re-resizable/blob/master/logo.png?raw=true" /></p>

<p align="center">📏 A resizable component for React.</p>

<p align="center"><a href="https://circleci.com/gh/bokuweb/re-resizable/tree/master">
<img src="https://circleci.com/gh/bokuweb/re-resizable/tree/master.svg?style=svg" alt="Build Status" /></a>
<a href="https://www.npmjs.com/package/re-resizable">
<img src="https://img.shields.io/npm/v/re-resizable.svg" alt="Build Status" /></a> 
<a href="https://www.npmjs.com/package/re-resizable">
<img src="https://img.shields.io/npm/dm/re-resizable.svg" /></a> 
<a href="https://greenkeeper.io/">
<img src="https://badges.greenkeeper.io/bokuweb/re-resizable.svg" /></a> 
</p>

## Table of Contents

- [Demo](#Demo)
- [Install](#install)
- [Usage](#usage)
- [Props](#props)
- [Method](#method)
- [Test](#test)
- [Related](#related)
- [Changelog](#changelog)
- [License](#license)

## Demo

![screenshot](https://github.com/bokuweb/re-resizable/blob/master/docs/screenshot.gif?raw=true)
   
## Install

``` sh
$ npm install --save re-resizable
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

#### `style?: { [key: string]: string };`

The `style` property is used to set the custom `style` of a resizable component.

#### `width?: (number | string);`

The `width` property is used to set the initial width of a resizable component.   
For example, you can set `300`, `'300px'`, `50%`.     
If omitted, set `'auto'`.    

#### `height?: (number | string);`

The `height` property is used to set the initial height of a resizable component.    
For example, you can set `300`, `'300px'`, `50%`.    
If omitted, set `'auto'`.    

#### `minWidth?: number | string;`

The `minWidth` property is used to set the minimum width of a resizable component.

#### `minHeight?: number | string;`

The `minHeight` property is used to set the minimum height of a resizable component.

#### `maxWidth?: number | string;`

The `maxWidth` property is used to set the maximum width of a resizable component.

#### `maxHeight?: number | string`;

The `maxHeight` property is used to set the maximum height of a resizable component.

#### `grid?: [number, number];`

The `grid` property is used to specify the increments that resizing should snap to. Defaults to `[1, 1]`.

#### `lockAspectRatio?: boolean;`

The `lockAspectRatio` property is used to lock aspect ratio.
If omitted, set `false`.

#### `bounds?: ('window' | 'parent' | HTMLElement);`

Specifies resize boundaries.

#### `handleStyles?: HandleStyles;`

The `handleStyles` property is used to override the style of one or more resize handles.
Only the axis you specify will have its handle style replaced.
If you specify a value for `right` it will completely replace the styles for the `right` resize handle,
but other handle will still use the default styles.

#### `handleClasses?: HandleClassName;`

The `handleClasses` property is used to set the className of one or more resize handles.

#### `handleWrapperStyle?: { [key: string]: string };`

The `handleWrapperStyle` property is used to override the style of resize handles wrapper.

#### `handleWrapperClass?: string;`

The `handleWrapperClass` property is used to override the className of resize handles wrapper.

#### `enable?: ?Enable;`

The `enable` property is used to set the resizable permission of a resizable component.

The permission of `top`, `right`, `bottom`, `left`, `topRight`, `bottomRight`, `bottomLeft`, `topLeft` direction resizing.
If omitted, all resizer are enabled.
If you want to permit only right direction resizing, set `{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }`. 

#### `onResizeStart?: ResizeStartCallBack;`

`ResizeStartCallBack` type is below.

```
type ResizeStartCallback = (
  e: SyntheticMouseEvent<HTMLDivElement> | SyntheticTouchEvent<HTMLDivElement>,
  dir: Direction,
  refToElement: React.ElementRef<'div'>,
) => void;
```

Calls when resizable component resize start.

#### `onResize?: ResizeCallback;`

### Basic

`ResizeCallback` type is below.

```
type ResizeCallback = (
  event: MouseEvent | TouchEvent,
  direction: Direction,
  refToElement: React.ElementRef<'div'>,
  delta: NumberSize,
) => void;
```

Calls when resizable component resizing.

#### `onResizeStop?: ResizeCallback;`

`ResizeCallback` type is below.

```
type ResizeCallback = (
  event: MouseEvent | TouchEvent,
  direction: Direction,
  refToElement: React.ElementRef<'div'>,
  delta: NumberSize,
) => void;
```

Calls when resizable component resize stop.

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

## Related

- (raect-rnd)[https://github.com/bokuweb/react-rnd]
- (raect-sortable-pane)[https://github.com/bokuweb/react-sortable-pane]

## Changelog

#### v3.0.0

- Fix flowtype annotation.
- Remove `extendsProps`.

You can add extendsProps as follows.

```
<Resizable data-foo="foo" />
```

#### v3.0.0-beta.3

- fix typo. `ResizeStartCallBack` -> `ResizeStartCallback`.

#### v3.0.0-beta.2

- export `ResizeDirection` type.
- rename `Callback` to `ResizeCallback`.

#### v3.0.0-beta.1

- Fix flow filename.
- Change logo

#### v3.0.0-beta.0

- Change package name, `react-resizable-box` -> `re-resizable`.
- Add `handleWrapperStyle` and `handleWrapperClass` props.
- Change behavior that is set percentage size to width or height as props.
- Support percentage max/min size.
- Use rollup.
- Fix props name.
  - `handersClasses` -> `handleClasses`
  - `handersStyles` -> `handleStyles`

#### v2.1.0

- Remove `shouldUpdateComponent` (#135).
- Remove `lodash.isEqual`.

#### v2.0.6

- Update README.

#### v2.0.5

- Fix remove event listener

#### v2.0.4

- Fix receiveProps. (related #85)

#### v2.0.3

- Update dev dependencies.
- Modify index.js.flow.

#### v2.0.2

- Remove offset state.
- Use `border-box`.
- Fix boundary size. 

#### v2.0.1

- Add offset state for rnd component.

#### v2.0.0

- Update index.js.flow

#### v2.0.0-rc.2

- Use `flowtype`.
- Change callback args.
- Change some props name.
  - isResizable => enable.
  - customClass => className.
  - customStyle => style.
  - handleStyle => handlerStyles.
  - handleClass => handlerClasses.
- Add bounds feature.
- Fix min/max size checker when aspect ratio locked.

#### v1.8.4

- Fix cursor

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
- Add handle custom className.

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
