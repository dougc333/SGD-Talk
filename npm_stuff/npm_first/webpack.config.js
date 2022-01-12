const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'hidden-source-map',
  mode: 'development',
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  
};

module.exports = config;

