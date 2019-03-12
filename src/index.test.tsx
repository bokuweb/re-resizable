/* eslint-disable */

import test from 'ava';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import { Resizable } from './';

const { screenshot } = require('avaron');

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

test.afterEach(async t => {
  ReactDOM.unmountComponentAtNode(document.body);
  const content = document.querySelector('#content');
  if (!content) return;
  ReactDOM.unmountComponentAtNode(content);
});

test.serial('should box width and height equal 100px', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable defaultSize={{ width: 100, height: 100 }} />);
  if (!resizable || resizable instanceof Element) {
    return t.fail();
  }
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 9);
  t.is(divs[0].style.width, '100px');
  t.is(divs[0].style.height, '100px');
  t.is(divs[0].style.position, 'relative');
});

test.serial('should allow vh, vw relative units', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable defaultSize={{ width: '100vw', height: '100vh' }} />);
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 9);
  t.is(divs[0].style.width, '100vw');
  t.is(divs[0].style.height, '100vh');
  t.is(divs[0].style.position, 'relative');
});

test.serial('should allow vmax, vmin relative units', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable defaultSize={{ width: '100vmax', height: '100vmin' }} />);
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 9);
  t.is(divs[0].style.width, '100vmax');
  t.is(divs[0].style.height, '100vmin');
  t.is(divs[0].style.position, 'relative');
});

test.serial('should box width and height equal auto when size omitted', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable />);
  if (!resizable || resizable instanceof Element) {
    return t.fail();
  }
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 9);
  t.is(divs[0].style.width, 'auto');
  t.is(divs[0].style.height, 'auto');
  t.is(divs[0].style.position, 'relative');
});

test.serial('should box width and height equal auto when set auto', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable defaultSize={{ width: 'auto', height: 'auto' }} />);
  if (!resizable || resizable instanceof Element) {
    return t.fail();
  }
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 9);
  t.is(divs[0].style.width, 'auto');
  t.is(divs[0].style.height, 'auto');
  t.is(divs[0].style.position, 'relative');
});

test.serial('Should style is applied to box', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable style={{ position: 'absolute' }} />);
  if (!resizable || resizable instanceof Element) {
    return t.fail();
  }
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 9);
  t.is(divs[0].style.position, 'absolute');
});

test.serial('Should custom class name be applied to box', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable className={'custom-class-name'} />);
  if (!resizable || resizable instanceof Element) {
    return t.fail();
  }
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
  t.is(divs.length, 9);
  t.is(divs[0].className, 'custom-class-name');
});

test.serial('Should custom class name be applied to resizer', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable handleClasses={{ right: 'right-handle-class' }} />);
  if (!resizable || resizable instanceof Element) {
    return t.fail();
  }
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
  const node = ReactDOM.findDOMNode(divs[2]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  t.is(node.getAttribute('class'), 'right-handle-class');
});

test.serial('Should create custom span that wraps resizable divs ', async t => {
  const resizable = TestUtils.renderIntoDocument(<Resizable handleWrapperClass="wrapper-class" />);
  if (!resizable || resizable instanceof Element) {
    return t.fail();
  }
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'span');
  const node = ReactDOM.findDOMNode(divs[0]) as Element;
  t.is(node.getAttribute('class'), 'wrapper-class');
});

test.serial('Should not render resizer when enable props all false', async t => {
  const resizable = TestUtils.renderIntoDocument(
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
  if (!resizable || resizable instanceof Element) {
    return t.fail();
  }
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
  t.is(divs.length, 1);
});

test.serial('Should render one resizer when one enable props set true', async t => {
  const resizable = TestUtils.renderIntoDocument(
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
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
  t.is(divs.length, 2);
});

test.serial('Should render two resizer when two enable props set true', async t => {
  const resizable = TestUtils.renderIntoDocument(
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
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
  t.is(divs.length, 3);
});

test.serial('Should render three resizer when three enable props set true', async t => {
  const resizable = TestUtils.renderIntoDocument(
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
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
  t.is(divs.length, 4);
});

test.serial('Should only right is resizable and call onResizeStart when mousedown', async t => {
  const onResizeStart = sinon.spy();
  const resizable = TestUtils.renderIntoDocument(
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
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 2);
  TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]) as Element);
  t.is(onResizeStart.callCount, 1);
  t.is(onResizeStart.getCall(0).args[1], 'right');
});

test.serial('Should only bottom is resizable and call onResizeStart when mousedown', async t => {
  const onResizeStart = sinon.spy();
  const resizable = TestUtils.renderIntoDocument(
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
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 2);
  TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]) as Element);
  t.is(onResizeStart.callCount, 1);
  t.is(onResizeStart.getCall(0).args[1], 'bottom');
});

test.serial('Should only bottomRight is resizable and call onResizeStart when mousedown', async t => {
  const onResizeStart = sinon.spy();
  const resizable = TestUtils.renderIntoDocument(
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
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 2);
  TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]) as Element);
  t.is(onResizeStart.callCount, 1);
  t.is(onResizeStart.getCall(0).args[1], 'bottomRight');
});

test.serial('should call onResize with expected args when resize direction right', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[2]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
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

test.serial('should call onResize with expected args when resize direction bottom', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
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

test.serial('should call onResize with expected args when resize direction bottomRight', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
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

test.serial('should call onResizeStop when resize stop direction right', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[2]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
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

test.serial('should call onResizeStop when resize stop direction bottom', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
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

test.serial('should call onResizeStop when resize stop direction bottomRight', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      style={{ padding: '40px' }}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  mouseUp(200, 220);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResizeStop.getCall(0).args[1], 'bottomRight');
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 320);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 220 });
});

test.serial('should component size updated when updateSize method called', async t => {
  // let resizable;
  const resizable = ReactDOM.render(
    <Resizable defaultSize={{ width: 100, height: 100 }} />,
    document.getElementById('content'),
  ) as Resizable;
  resizable.updateSize({ width: 200, height: 300 });
  t.is(resizable.state.width, 200);
  t.is(resizable.state.height, 300);
});

test.serial('should snapped by grid value', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      grid={[10, 10]}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(12, 12);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 110);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 110);
  t.deepEqual(onResize.getCall(0).args[3], { width: 10, height: 10 });
});

test.serial('should snapped by absolute snap value', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      snap={{ x: [20, 30], y: [100] }}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(12, 12);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 30);
  t.deepEqual(onResize.getCall(0).args[3], { width: -70, height: 0 });
});

test.serial('should clamped by max width', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      maxWidth={200}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 100, height: 0 });
});

test.serial('should clamped by min width', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      minWidth={50}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(-100, 0);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 50);
  t.deepEqual(onResize.getCall(0).args[3], { width: -50, height: 0 });
});

test.serial('should allow 0 as minWidth', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      minWidth={0}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(-100, 0);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 0);
  t.deepEqual(onResize.getCall(0).args[3], { width: -100, height: 0 });
});

test.serial('should clamped by max height', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      maxHeight={200}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 100 });
});

test.serial('should clamped by min height', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      minHeight={50}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, -100);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 50);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: -50 });
});

test.serial('should allow 0 as minHeight', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      minHeight={0}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, -100);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 0);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: -100 });
});

test.serial('should aspect ratio locked when resize to right', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[2]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  mouseUp(200, 0);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
});

test.serial('should aspect ratio locked with 1:1 ratio when resize to right', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={1 / 1}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[2]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  mouseUp(200, 0);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
});

test.serial('should aspect ratio locked with 2:1 ratio when resize to right', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 200, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={2 / 1}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[2]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  mouseUp(200, 0);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 400);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 100 });
});

test.serial('should aspect ratio locked with 2:1 ratio with extra width/height when resize to right', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
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
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[2]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  mouseUp(200, 0);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 450);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 250);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 100 });
});

test.serial('should aspect ratio locked when resize to bottom', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  mouseUp(0, 200);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
});

test.serial('should aspect ratio locked with 1:1 ratio when resize to bottom', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={1 / 1}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  mouseUp(0, 200);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
});

test.serial('should aspect ratio locked with 2:1 ratio when resize to bottom', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 200, height: 100 }}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      lockAspectRatio={2 / 1}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  mouseUp(0, 200);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 600);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
  t.deepEqual(onResize.getCall(0).args[3], { width: 400, height: 200 });
});

test.serial('should aspect ratio locked with 2:1 ratio with extra width/height when resize to bottom', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
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
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[3]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  mouseUp(0, 200);
  t.is(onResizeStop.callCount, 1);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 650);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 350);
  t.deepEqual(onResize.getCall(0).args[3], { width: 400, height: 200 });
});

test.serial('should clamped by parent width', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      bounds="parent"
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(200, 0);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 100, height: 0 });
});

test.serial('should clamped by parent height', async t => {
  const onResize = sinon.spy();
  const onResizeStart = sinon.spy();
  const onResizeStop = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable
      defaultSize={{ width: 100, height: 100 }}
      bounds="parent"
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
  mouseMove(0, 200);
  t.true(onResize.getCall(0).args[0] instanceof MouseEvent);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 200);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 100 });
});

test.serial('should defaultSize ignored when size set', async t => {
  const resizable = TestUtils.renderIntoDocument(
    <Resizable defaultSize={{ width: 100, height: 100 }} size={{ width: 200, height: 300 }} />,
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  t.is(divs.length, 9);
  t.is(divs[0].style.width, '200px');
  t.is(divs[0].style.height, '300px');
  t.is(divs[0].style.position, 'relative');
});

test.serial('should render a handleComponent for right', async t => {
  const CustomComponent = <div className={'customHandle-right'} />;
  const resizable = TestUtils.renderIntoDocument(<Resizable handleComponent={{ right: CustomComponent }} />);
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[2]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
  const handleNode = node.children[0];
  t.is(node.childElementCount, 1);
  t.is(handleNode.getAttribute('class'), 'customHandle-right');
});

test.serial('should adjust resizing for specified scale', async t => {
  const onResize = sinon.spy();
  const resizable = ReactDOM.render(
    <Resizable defaultSize={{ width: 100, height: 100 }} onResize={onResize} style={{ padding: '40px' }} scale={0.5} />,
    document.getElementById('content'),
  );
  if (!resizable || resizable instanceof Element) return t.fail();
  const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div') as HTMLDivElement[];
  const node = ReactDOM.findDOMNode(divs[6]);
  if (!node || !(node instanceof HTMLDivElement)) return t.fail();
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
