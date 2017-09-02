import common from './prod.common';

export default Object.assign({}, common, {
  output: {
    file: 'lib/re-resizable.umd.js',
    format: 'umd',
  },
});
