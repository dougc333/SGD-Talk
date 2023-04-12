const path = require('path')


module.exports={
  entry: './index.js',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  mode: 'development',
}