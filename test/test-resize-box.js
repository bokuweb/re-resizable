import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import Resizable from '../src';

const mouseMove = (x, y) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mousemove', true, true, window,
    0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

const mouseUp = (x, y) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mouseup', true, true, window,
    0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

describe('Resizable Component test', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/fixtures.html'];
  });

  it('Should box width and height equal 100px', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable width={100} height={100} />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 9);
    assert.equal(divs[0].style.width, '100px');
    assert.equal(divs[0].style.height, '100px');
    assert.equal(divs[0].style.position, 'relative');
    done();
  });

  it('Should box width and height equal auto', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable width="auto" height="auto" />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 9);
    assert.equal(divs[0].style.width, 'auto');
    assert.equal(divs[0].style.height, 'auto');
    assert.equal(divs[0].style.position, 'relative');
    done();
  });

  it('Should style is applied to box', (done) => {
    const resizable = TestUtils.renderIntoDocument(
      <Resizable style={{ position: 'absolute' }} />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 9);
    assert.equal(divs[0].style.position, 'absolute');
    done();
  });

  it('Should custom class name be applied to box', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable className={'custom-class-name'} />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 9);
    assert.equal(divs[0].className, 'custom-class-name');
    done();
  });

  it('Should custom class name be applied to resizer', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable handlerClasses={{ right: 'right-handle-class' }} />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[2]);
    assert.equal(node.getAttribute('class'), 'right-handle-class');
    done();
  });

  it('Should create custom span that wraps resizable divs ', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable handlerClasses={{ wrapper: 'wrapper-class' }} />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'span');
    const node = ReactDOM.findDOMNode(divs[0]);
    assert.equal(node.getAttribute('class'), 'wrapper-class');
    done();
  });

  it('Should not render resizer when enable props all false', () => {
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
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 1);
  });

  it('Should render one resizer when one enable props set true', () => {
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
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
  });

  it('Should render two resizer when two enable props set true', () => {
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
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 3);
  });

  it('Should render three resizer when three enable props set true', () => {
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
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 4);
  });

  it('Should only right is resizable and call onResizeStart when mousedown', () => {
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
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
    assert.equal(onResizeStart.callCount, 1);
    assert.equal(onResizeStart.getCall(0).args[1], 'right');
  });

  it('Should only bottom is resizable and call onResizeStart when mousedown', () => {
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
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
    assert.equal(onResizeStart.callCount, 1);
    assert.equal(onResizeStart.getCall(0).args[1], 'bottom');
  });

  it('Should only bottomRight is resizable and call onResizeStart when mousedown', () => {
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
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
    assert.equal(onResizeStart.callCount, 1);
    assert.equal(onResizeStart.getCall(0).args[1], 'bottomRight');
  });

  it('should call onResize with expected args when resize direction right', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100}
        height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        style={{ padding: '40px' }}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[2]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    TestUtils.Simulate.mouseUp(node);
    assert.equal(onResize.callCount, 1);
    assert(onResize.getCall(0).args[0] instanceof Event);
    assert.equal(onResize.getCall(0).args[1], 'right');
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 0 });
  });

  it('should call onResize with expected args when resize direction bottom', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        style={{ padding: '40px' }}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[3]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    TestUtils.Simulate.mouseUp(node);
    assert.equal(onResize.callCount, 1);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.equal(onResize.getCall(0).args[1], 'bottom');
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 100);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 320);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 220 });
  });

  it('should call onResize with expected args when resize direction bottomRight', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        style={{ padding: '40px' }}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    TestUtils.Simulate.mouseUp(node);
    assert.equal(onResize.callCount, 1);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.equal(onResize.getCall(0).args[1], 'bottomRight');
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 320);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 220 });
  });

  it('should call onResizeStop when resize stop direction right', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        style={{ padding: '40px' }}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[2]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    mouseUp(200, 220);
    assert.equal(onResizeStop.callCount, 1);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResizeStop.getCall(0).args[1], 'right');
    assert.deepEqual(onResizeStop.getCall(0).args[2].clientWidth, 300);
    assert.deepEqual(onResizeStop.getCall(0).args[2].clientHeight, 100);
    assert.deepEqual(onResizeStop.getCall(0).args[3], { width: 200, height: 0 });
  });

  it('should call onResizeStop when resize stop direction bottom', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        style={{ padding: '40px' }}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[3]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    mouseUp(200, 220);
    assert.equal(onResizeStop.callCount, 1);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResizeStop.getCall(0).args[1], 'bottom');
    assert.deepEqual(onResizeStop.getCall(0).args[2].clientWidth, 100);
    assert.deepEqual(onResizeStop.getCall(0).args[2].clientHeight, 320);
    assert.deepEqual(onResizeStop.getCall(0).args[3], { width: 0, height: 220 });
  });

  it('should call onResizeStop when resize stop direction bottomRight', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        style={{ padding: '40px' }}
      />,
      document.getElementById('content')
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    mouseUp(200, 220);
    assert.equal(onResizeStop.callCount, 1);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResizeStop.getCall(0).args[1], 'bottomRight');
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 320);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 220 });
  });

  it('should component size updated when updateSize method called', () => {
    // let resizable;
    const resizable = ReactDOM.render(
      <Resizable width={100} height={100} />,
      document.getElementById('content'),
    );
    resizable.updateSize({ width: 200, height: 300 });
    assert.equal(resizable.state.width, 200);
    assert.equal(resizable.state.height, 300);
  });

  afterEach(done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    setTimeout(done);
  });

  it('should snapped by grid value', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        grid={[10, 10]}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(12, 12);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 110);
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 110);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 10, height: 10 });
  });

  it('should clamped by max width', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        maxWidth={200}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 0);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 200);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 100, height: 0 });
  });


  it('should clamped by min width', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        minWidth={50}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(-100, 0);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 50);
    assert.deepEqual(onResize.getCall(0).args[3], { width: -50, height: 0 });
  });

  it('should clamped by max height', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        maxHeight={200}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(0, 200);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 200);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 100 });
  });


  it('should clamped by min height', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        minHeight={50}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(0, -100);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 50);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 0, height: -50 });
  });

  it('should aspect ratio locked when resize to right', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        lockAspectRatio
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[2]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 0);
    mouseUp(200, 0);
    assert.equal(onResizeStop.callCount, 1);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
  });

  it('should aspect ratio locked when resize to bottom', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100} height={100}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        lockAspectRatio
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[3]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(0, 200);
    mouseUp(0, 200);
    assert.equal(onResizeStop.callCount, 1);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 300);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 200 });
  });

  it('should clamped by parent width', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100}
        height={100}
        bounds="parent"
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 0);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 200);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 100, height: 0 });
  });


  it('should clamped by parent height', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = ReactDOM.render(
      <Resizable
        width={100}
        height={100}
        bounds="parent"
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      />,
      document.getElementById('content'),
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[6]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(0, 200);
    assert(onResize.getCall(0).args[0] instanceof MouseEvent);
    assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 200);
    assert.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 100 });
  });
});
