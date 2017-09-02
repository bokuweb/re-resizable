import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
    entry: 'src/index.js',
    plugins: [
        babel({
            plugins: ['external-helpers']
        }),
        replace({ 'process.env.NODE_ENV': JSON.stringify('production') })
    ],
    sourceMap: true,
    exports: 'named',
    moduleName: 'react-resizable-box',
    external: ['react'],
    globals: {
        'react': 'React',
    }
};