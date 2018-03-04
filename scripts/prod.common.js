import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      plugins: ['external-helpers'],
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
  output: {
    name: 're-resizable',
    globals: {
      react: 'React',
    },
    sourcemap: true,
    exports: 'named',
  },
  external: ['react'],
};
