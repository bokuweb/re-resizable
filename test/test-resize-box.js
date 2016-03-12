import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
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

  it ('Should box width and height equal 100px', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable width={100} height={100} />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 4);
    assert.equal(divs[0].style.width, '100px');
    assert.equal(divs[0].style.height, '100px');
    assert.equal(divs[0].style.position, 'relative');
    done();
  });

  it ('Should style is applied to box', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable customStyle={{ position: "absolute" }}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 4);
    assert.equal(divs[0].style.position, 'absolute');
    done();
  });

  it ('Should custom class name is applied to box', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable customClass={"custom-class-name"} />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 4);
    assert.equal(divs[0].className, 'custom-class-name');
    done();
  });

  it ('Should only x-direction is resizabl and call onResizeStart when mousedown', () => {
    const onResizeStart = sinon.spy();
    const resizable = TestUtils.renderIntoDocument(<Resizable isResizable={{x: true, y: false, xy: false }} onResizeStart={onResizeStart}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
    assert.equal(onResizeStart.callCount, 1);
    assert.equal(onResizeStart.getCall(0).args[0], 'x');
  });

  it ('Should only y-direction is resizable and call onResizeStart when mousedown', () => {
    const onResizeStart = sinon.spy();
    const resizable = TestUtils.renderIntoDocument(<Resizable isResizable={{x: false, y: true, xy: false }} onResizeStart={onResizeStart}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
    assert.equal(onResizeStart.callCount, 1);
    assert.equal(onResizeStart.getCall(0).args[0], 'y');
  });

  it ('Should only xy-direction is resizable and call onResizeStart when mousedown', () => {
    const onResizeStart = sinon.spy();
    const resizable = TestUtils.renderIntoDocument(<Resizable isResizable={{x: false, y: false, xy: true }} onResizeStart={onResizeStart}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
    assert.equal(onResizeStart.callCount, 1);
    assert.equal(onResizeStart.getCall(0).args[0], 'xy');
  });

  it('should call onResize with expected args when resize direction x', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const resizable = TestUtils.renderIntoDocument(
      <Resizable
        width={100} height={100}
        isResizable={{x: true, y: true, xy: true }}
        onResize={onResize}
        onResizeStart={onResizeStart}
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[1]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    // const e = new MouseEvent('mousemove', {clientX: 100, clientY: 100}); // for chrome, firefox
    mouseMove(200, 220);
    TestUtils.Simulate.mouseUp(node);
    assert.equal(onResize.callCount, 1);
    assert.deepEqual(onResize.getCall(0).args[0], { width: 200, height: 100 });
  });

  it('should call onResize with expected args when resize direction y', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const resizable = TestUtils.renderIntoDocument(
      <Resizable
        width={100} height={100}
        isResizable={{ x: false, y: true, xy: false }}
        onResize={onResize}
        onResizeStart={onResizeStart}
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[1]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    TestUtils.Simulate.mouseUp(node);
    assert.equal(onResize.callCount, 1);
    assert.deepEqual(onResize.getCall(0).args[0], { width: 100, height: 220 });
  });

  it('should call onResize with expected args when resize direction xy', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const resizable = TestUtils.renderIntoDocument(
      <Resizable
        width={100} height={100}
        isResizable={{ x: false, y: false, xy: true }}
        onResize={onResize}
        onResizeStart={onResizeStart}
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[1]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    TestUtils.Simulate.mouseUp(node);
    assert.equal(onResize.callCount, 1);
    assert.deepEqual(onResize.getCall(0).args[0], { width: 200, height: 220 });
  });

  it('should call onResizeStop when resize stop', () => {
    const onResize = sinon.spy();
    const onResizeStart = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizable = TestUtils.renderIntoDocument(
      <Resizable
        width={100} height={100}
        isResizable={{x: true, y: false, xy: false }}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    const node = ReactDOM.findDOMNode(divs[1]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    mouseUp(200, 220);
    assert.equal(onResizeStop.callCount, 1);
    assert.deepEqual(onResize.getCall(0).args[0], { width: 200, height: 100 });
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    setTimeout(done);
  });
});
