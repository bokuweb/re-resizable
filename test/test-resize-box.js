import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Resizable from '../src';

describe('Resizable Component test', () => {
  it ('Should box width and height equal auto when not specify width and height', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs[0].style.width, 'auto');
    assert.equal(divs[0].style.height, 'auto');
    assert.equal(divs[0].style.position, 'relative');
    done();
  });

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
    const resizable = TestUtils.renderIntoDocument(<Resizable customStyle={{position:"absolute"}}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 4);
    assert.equal(divs[0].style.position, 'absolute');
    done();
  });

  it ('Should custom class name is applied to box', (done) => {
    const resizable = TestUtils.renderIntoDocument(<Resizable customClass={"custom-class-name"}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 4);
    assert.equal(divs[0].className, 'custom-class-name');
    done();
  });

  it ('Should only x-direction is resizabl and call onResizeStart when mousedown', (done) => {
    const onResizeStart = axis => {
      assert.equal(axis, 'x');
      done();
    }
    const resizable = TestUtils.renderIntoDocument(<Resizable isResizable={{x:true, y:false, xy:false}} onResizeStart={onResizeStart}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
  });

  it ('Should only y-direction is resizable and call onResizeStart when mousedown', (done) => {
    const onResizeStart = axis => {
      assert.equal(axis, 'y');
      done();
    }
    const resizable = TestUtils.renderIntoDocument(<Resizable isResizable={{x:false, y:true, xy:false}} onResizeStart={onResizeStart}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
  });

  it ('Should only xy-direction is resizable and call onResizeStart when mousedown', (done) => {
    const onResizeStart = axis => {
      assert.equal(axis, 'xy');
      done();
    }
    const resizable = TestUtils.renderIntoDocument(<Resizable isResizable={{x:false, y:false, xy:true}} onResizeStart={onResizeStart}/>);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(resizable, 'div');
    assert.equal(divs.length, 2);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(divs[1]));
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});
