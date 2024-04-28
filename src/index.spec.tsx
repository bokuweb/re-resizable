import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';
import { Resizable } from '.';

const mouseMove = (x: number, y: number) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mousemove', true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

const mouseUp = (x: number, y: number) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

// test.afterEach(async ({ mount })=> {
//   ReactDOM.unmountComponentAtNode(document.body);
//   const content = document.querySelector('#content');
//   if (!content) return;
//   ReactDOM.unmountComponentAtNode(content);
// });

const fail = (m: string = 'unknown reason') => {
  throw new Error(`[fail] ${m}`);
};

test.use({ viewport: { width: 500, height: 500 } });

test('should box width and height equal 100px', async ({ mount }) => {
  const resizable = await mount(<Resizable defaultSize={{ width: 100, height: 100 }} />);
  const divs = await resizable.locator('div');
  const width = await resizable.evaluate(node => node.style.width);
  const height = await resizable.evaluate(node => node.style.height);
  const position = await resizable.evaluate(node => node.style.position);

  expect(await divs.count()).toBe(9);
  expect(width).toBe('100px');
  expect(height).toBe('100px');
  expect(position).toBe('relative');
});

test('should allow vh, vw relative units', async ({ mount }) => {
  const resizable = await mount(<Resizable defaultSize={{ width: '100vw', height: '100vh' }} />);

  const divs = await resizable.locator('div');
  const width = await resizable.evaluate(node => node.style.width);
  const height = await resizable.evaluate(node => node.style.height);
  const position = await resizable.evaluate(node => node.style.position);

  expect(await divs.count()).toBe(9);
  expect(width).toBe('100vw');
  expect(height).toBe('100vh');
  expect(position).toBe('relative');
});

test('should allow vmax, vmin relative units', async ({ mount }) => {
  const resizable = await mount(<Resizable defaultSize={{ width: '100vmax', height: '100vmin' }} />);

  const divs = await resizable.locator('div');
  const width = await resizable.evaluate(node => node.style.width);
  const height = await resizable.evaluate(node => node.style.height);
  const position = await resizable.evaluate(node => node.style.position);

  expect(await divs.count()).toBe(9);
  expect(width).toBe('100vmax');
  expect(height).toBe('100vmin');
  expect(position).toBe('relative');
});

test('should box width and height equal auto when size omitted', async ({ mount }) => {
  const resizable = await mount(<Resizable />);
  const divs = await resizable.locator('div');
  expect(await divs.count()).toBe(9);
  expect(await resizable.evaluate(node => node.style.width)).toBe('auto');
  expect(await resizable.evaluate(node => node.style.height)).toBe('auto');
  expect(await resizable.evaluate(node => node.style.position)).toBe('relative');
});

test('should box width and height equal auto when set auto', async ({ mount }) => {
  const resizable = await mount(<Resizable defaultSize={{ width: 'auto', height: 'auto' }} />);
  const divs = await resizable.locator('div');
  expect(await divs.count()).toBe(9);
  expect(await resizable.evaluate(node => node.style.width)).toBe('auto');
  expect(await resizable.evaluate(node => node.style.height)).toBe('auto');
  expect(await resizable.evaluate(node => node.style.position)).toBe('relative');
});

test('Should style is applied to box', async ({ mount }) => {
  const resizable = await mount(<Resizable style={{ position: 'absolute' }} />);
  const divs = await resizable.locator('div');
  expect(await divs.count()).toBe(9);
  expect(await resizable.evaluate(node => node.style.position)).toBe('absolute');
});

test('Should custom class name be applied to box', async ({ mount }) => {
  const resizable = await mount(<Resizable className={'custom-class-name'} />);

  const divs = await resizable.locator('div');
  expect(await divs.count()).toBe(9);
  expect(await resizable.evaluate(node => node.className)).toBe('custom-class-name');
});

test('Should use a custom wrapper element', async ({ mount }) => {
  const resizable = await mount(<Resizable as="header" />);

  expect(await resizable.evaluate(node => node.tagName)).toBe('HEADER');
});

test('Should custom class name be applied to resizer', async ({ mount }) => {
  const resizable = await mount(<Resizable handleClasses={{ right: 'right-handle-class' }} />);

  expect(await resizable.evaluate(node => node.querySelector('.right-handle-class'))).toBeTruthy();
});

/*
test('Should create custom span that wraps resizable divs ', async ({ mount })=> {
  const resizable = await mount(<Resizable handleWrapperClass="wrapper-class" />);
  
  c const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[1]) as Element;
  t.is(node.getAttribute('class'), 'wrapper-class');
});

test('Should not render resizer when enable props all false', async ({ mount })=> {
  const resizable = await mount(
    <Resizable
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    />,
  );
  
  c const divs = await resizable.locator('div');
  t.is(divs.length, 2);
});

test('Should render one resizer when one enable props set true', async ({ mount })=> {
  const resizable = await mount(
    <Resizable
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    />,
  );
  if (!resizable || resizable instanceof Element) return fail();
  c const divs = await resizable.locator('div');
  t.is(divs.length, 3);
});

test('Should render two resizer when two enable props set true', async ({ mount })=> {
  const resizable = await mount(
    <Resizable
      enable={{
        top: true,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    />,
  );
  if (!resizable || resizable instanceof Element) return fail();
  c const divs = await resizable.locator('div');
  t.is(divs.length, 4);
});

test('Should render three resizer when three enable props set true', async ({ mount })=> {
  const resizable = await mount(
    <Resizable
      enable={{
        top: true,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    />,
  );
  if (!resizable || resizable instanceof Element) return fail();
  c const divs = await resizable.locator('div');
  t.is(divs.length, 5);
});

test('Should only right is resizable and call onResizeStart when mousedown', async ({ mount })=> {
  const onResizeStart = sinon.spy();
  const resizable = await mount(
    <Resizable
      onResizeStart={onResizeStart}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    />,
  );
  const divs = await resizable.locator('div');
  t.is(divs.length, 3);
  TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[2]) as Element);
  t.is(onResizeStart.callCount, 1);
  t.is(onResizeStart.getCall(0).args[1], 'right');
});

test('Should only bottom is resizable and call onResizeStart when mousedown', async ({ mount })=> {
  const onResizeStart = sinon.spy();
  const resizable = await mount(
    <Resizable
      onResizeStart={onResizeStart}
      enable={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    />,
  );
  const divs = await resizable.locator('div');
  t.is(divs.length, 3);
  TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[2]) as Element);
  t.is(onResizeStart.callCount, 1);
  t.is(onResizeStart.getCall(0).args[1], 'bottom');
});

test('Should only bottomRight is resizable and call onResizeStart when mousedown', async ({ mount })=> {
  const onResizeStart = sinon.spy();
  const resizable = await mount(
    <Resizable
      onResizeStart={onResizeStart}
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
    />,
  );
  const divs = await resizable.locator('div');
  t.is(divs.length, 3);
  TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[2]) as Element);
  t.is(onResizeStart.callCount, 1);
  t.is(onResizeStart.getCall(0).args[1], 'bottomRight');
});

test('Should not begin resize when onResizeStart returns false', async ({ mount })=> {
  const onResizeStart = () => {
    return false;
  };
  const onResize = sinon.spy();
  const resizable = TestUtils.renderIntoDocument<ResizableProps, Resizable>(
    <Resizable onResizeStart={onResizeStart} onResize={onResize} />,
  );
  const divs = await resizable.locator('div');
  const previousState = resizable.state.isResizing;
  TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[2]) as Element);
  mouseMove(200, 220);
  t.is(onResize.callCount, 0);
  t.is(resizable.state.isResizing, previousState);
});

test('should call onResize with expected args when resize direction right', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  TestUtils.Simulate.mouseUp(node);
  t.is(onResize.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof Event);
  t.is(onResize.getCall(0).args[1], 'right');
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 0 });
});

test('should call onResize with expected args when resize direction bottom', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[4]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  TestUtils.Simulate.mouseUp(node);
  t.is(onResize.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.is(onResize.getCall(0).args[1], 'bottom');
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 100);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 320);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 220 });
});

test('should call onResize with expected args when resize direction bottomRight', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  TestUtils.Simulate.mouseUp(node);
  t.is(onResize.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.is(onResize.getCall(0).args[1], 'bottomRight');
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 320);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 220 });
});

test('should call onResizeStop when resize stop direction right', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  mouseUp(200, 220);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResizeStop.getCall(0).args[1], 'right');
  t.deepEqual(onResizeStop.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResizeStop.getCall(0).args[2].clientHeight, 100);
  t.deepEqual(onResizeStop.getCall(0).args[3], { width: 200, height: 0 });
});

test('should call onResizeStop when resize stop direction bottom', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[4]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  mouseUp(200, 220);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResizeStop.getCall(0).args[1], 'bottom');
  t.deepEqual(onResizeStop.getCall(0).args[2].clientWidth, 100);
  t.deepEqual(onResizeStop.getCall(0).args[2].clientHeight, 320);
  t.deepEqual(onResizeStop.getCall(0).args[3], { width: 0, height: 220 });
});

test('should call onResizeStop when resize stop direction bottomRight', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  mouseUp(200, 220);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResizeStop.getCall(0).args[1], 'bottomRight');
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 320);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 220 });
});

test('should component size updated when updateSize method called', async ({ mount })=> {
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable defaultSize={{ width: 100, height: 100 }} />,
    document.getElementById('content'),
  );
  resizable.updateSize({ width: 200, height: 300 });
  t.is(resizable.state.width, 200);
  t.is(resizable.state.height, 300);
});

test('should snapped by grid value', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      grid={[10, 10]}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(12, 12);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 110);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 110);
  t.deepEqual(onResize.getCall(0).args[3], { width: 10, height: 10 });
});

test('should snapped by absolute snap value', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      snap={{ x: [20, 30], y: [100] }}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(12, 12);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 30);
  t.deepEqual(onResize.getCall(0).args[3], { width: -70, height: 0 });
});

test('should only snap if the gap is small enough', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 40, height: 40 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      grid={[40, 40]}
      snapGap={10}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 40, clientY: 40 });
  mouseMove(15, 15);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 55);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 55);
  t.deepEqual(onResize.getCall(0).args[3], { width: 15, height: 15 });

  mouseMove(35, 35);
  t.deepEqual(onResize.getCall(1).args[2].clientHeight, 80);
  t.deepEqual(onResize.getCall(1).args[2].clientWidth, 80);
  t.deepEqual(onResize.getCall(1).args[3], { width: 40, height: 40 });
});

test('should clamped by max width', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      maxWidth={200}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 100, height: 0 });
});

test('should clamped by min width', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      minWidth={50}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(-100, 0);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 50);
  t.deepEqual(onResize.getCall(0).args[3], { width: -50, height: 0 });
});

test('should allow 0 as minWidth', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      minWidth={0}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(-100, 0);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 0);
  t.deepEqual(onResize.getCall(0).args[3], { width: -100, height: 0 });
});

test('should clamped by max height', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      maxHeight={200}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 100 });
});

test('should clamped by min height', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      minHeight={50}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, -100);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 50);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: -50 });
});

test('should allow 0 as minHeight', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      minHeight={0}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, -100);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 0);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: -100 });
});

test('should aspect ratio locked when resize to right', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  mouseUp(200, 0);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
});

test('should aspect ratio locked with 1:1 ratio when resize to right', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={1 / 1}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  mouseUp(200, 0);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
});

test('should aspect ratio locked with 2:1 ratio when resize to right', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 200, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={2 / 1}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  mouseUp(200, 0);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 400);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 100 });
});

test('should aspect ratio locked with 2:1 ratio with extra width/height when resize to right', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 250, height: 150 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={2 / 1}
      lockAspectRatioExtraHeight={50}
      lockAspectRatioExtraWidth={50}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  mouseUp(200, 0);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 450);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 250);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 100 });
});

test('should aspect ratio locked when resize to bottom', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[4]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  mouseUp(0, 200);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
});

test('should aspect ratio locked with 1:1 ratio when resize to bottom', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={1 / 1}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[4]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  mouseUp(0, 200);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
});

test('should aspect ratio locked with 2:1 ratio when resize to bottom', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 200, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={2 / 1}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[4]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  mouseUp(0, 200);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 600);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 400, height: 200 });
});

test('should aspect ratio locked with 2:1 ratio with extra width/height when resize to bottom', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 250, height: 150 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={2 / 1}
      lockAspectRatioExtraHeight={50}
      lockAspectRatioExtraWidth={50}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[4]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  mouseUp(0, 200);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 650);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 350);
  t.deepEqual(onResize.getCall(0).args[3], { width: 400, height: 200 });
});

test('should clamped by parent width', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      bounds="parent"
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 100, height: 0 });
});

test('should clamped by parent height', async ({ mount })=> {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      bounds="parent"
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 100 });
});

test('should defaultSize ignored when size set', async ({ mount })=> {
  const resizable = await mount(
    <Resizable defaultSize={{ width: 100, height: 100 }} size={{ width: 200, height: 300 }} />,
  );
  const divs = await resizable.locator('div');
  expect(await divs.count()).toBe(9);
  expect(await resizable.evaluate(node => node.style.width)).toBe('200px');
  expect(await resizable.evaluate(node => node.style.height)).toBe('300px');
  expect(await resizable.evaluate(node => node.style.position)).toBe('relative');
});

test('should render a handleComponent for right', async ({ mount })=> {
  const CustomComponent = <div className={'customHandle-right'} />;
  const resizable = await mount(<Resizable handleComponent={{ right: CustomComponent }} />);
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  const handleNode = node.children[0];
  t.is(node.childElementCount, 1);
  t.is(handleNode.getAttribute('class'), 'customHandle-right');
});

test('should adjust resizing for specified scale', async ({ mount })=> {
  const onResize = sinon.spy();
  const resizable = ReactDOM.render<ResizableProps, Resizable>(
    <Resizable defaultSize={{ width: 100, height: 100 }} onResize={onResize} style={{ padding: '40px' }} scale={0.5} />,
    document.getElementById('content'),
  );
  const divs = await resizable.locator('div');
  const node = ReactDOM.findDOMNode(divs[7]);
  if (!node || !(node instanceof HTMLDivElement)) return fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  TestUtils.Simulate.mouseUp(node);
  t.is(onResize.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.is(onResize.getCall(0).args[1], 'bottomRight');
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 500);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 540);
  t.deepEqual(onResize.getCall(0).args[3], { width: 400, height: 440 });
});
*/
