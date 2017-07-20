var path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  // src folder is excluded from jekyll’s build process
  // we’re going to put the generated files in the js folder, and jekyll will grab it
  entry: {
    'init': ['./src/doubletaptogo.js', './src/init.js']
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].js'
  },
  plugins: [
    new ConcatPlugin({
      uglify: true, // uglify js or set process.env.NODE_ENV = 'production'
      fileName: 'init.js',
      filesToConcat: ['./src/doubletaptogo.js', './src/init.js']
    }),
    new ConcatPlugin({
      uglify: true, // uglify js or set process.env.NODE_ENV = 'production'
      fileName: 'skills-stick.js',
      filesToConcat: ['./src/skills-stick.js']
    })
  ],

  module: {
  loaders: [
    {
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
    ]
  }
};