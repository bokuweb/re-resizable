module.exports = (config) => {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'browserify', 'fixture'],

    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      'test/*.js',
      'test/fixtures.html',
    ],

    exclude: [
    ],

    browserify: {
      debug: true,
      extensions: ['.js'],
      transform: [
        require('babelify').configure({
          plugins: ['babel-plugin-espower'],
        }),
      ],
    },

    preprocessors: {
      'test/*.html': 'html2js',
      'test/*.js': ['browserify'],
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true,
  })
}
