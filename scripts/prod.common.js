import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      exclude: ['stories'],
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
  output: {
    sourcemap: true,
    exports: 'named',
    name: 're-resizable',
    globals: {
      react: 'React',
      memoize: 'fast-memoize'
    },
  },
  external: ['react', 'fast-memoize'],
};