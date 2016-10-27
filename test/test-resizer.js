import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Resizer from '../src/resizer';

describe('Resizer Component test', () => {
  it('Should call onResizeStart, when click', (done) => {
    const onResizeStart = e => {
      assert.equal(e.clientX, 100);
      done();
    };
    const resizer = TestUtils.renderIntoDocument(
      <Resizer onResizeStart={onResizeStart} type="right" />
    );
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizer), { clientX: 100 });
  });

  it('Should call onResizeStart, when touch start', (done) => {
    const onResizeStart = e => {
      assert.equal(e.touches[0].clientX, 200);
      done();
    };
    const resizer = TestUtils.renderIntoDocument(
      <Resizer onResizeStart={onResizeStart} type="right" />
    );
    TestUtils.Simulate.touchStart(ReactDOM.findDOMNode(resizer), { touches: [{ clientX: 200 }] });
  });

  afterEach(done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    setTimeout(done);
  });
});
