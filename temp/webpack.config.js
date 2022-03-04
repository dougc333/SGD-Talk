const path = require('path');
const webpack = require('webpack');
const h = require('html-webpack-plugin')



module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output:{
    path:path.resolve(__dirname,'./dist'),
    filename:'output_bundle.js'
  },
  plugins:[new h({
  title:"stuff",
  template:'src/index.html'
  })]
}
