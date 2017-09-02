import common from './prod.common';

export default Object.assign({}, common, {
  dest: 'lib/index.es5.js',
  format: 'cjs',
});
