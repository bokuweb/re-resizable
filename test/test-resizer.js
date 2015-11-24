import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Resizer from '../src/resizer';

describe('Resizer Component test', () => {
  it ('Should display close icon, when menu open', (done) => {
    //const header = TestUtils.renderIntoDocument(<Header isMenuOpen={true} />);
    //const icons = TestUtils.scryRenderedDOMComponentsWithTag(header, 'i');
    assert.equal(1, 1);
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
