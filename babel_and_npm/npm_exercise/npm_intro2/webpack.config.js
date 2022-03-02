const path=require('path')


module.exports={
  entry: {
     foo: './src/foo.js',
  },
  output: {
    path:path.resolve(__dirname,'dist'),
    filename: '[name].bundle.js'
  }
}
