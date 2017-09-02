import common from './prod.common';

export default Object.assign({}, common, {
  output: {
    file: 'lib/react-resizable-box.umd.js',
    format: 'umd',
  },
});
