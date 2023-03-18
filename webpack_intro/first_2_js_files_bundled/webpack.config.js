const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['./first.js','./second.js'],
  output:{
    filename:'output_bundle.js'
  },
}
