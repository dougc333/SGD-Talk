const path = require('path')

module.entry={
  entry: {
     main:"./src/index.js"
  },
  rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
}
