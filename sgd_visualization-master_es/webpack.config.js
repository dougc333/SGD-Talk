const path = require("path");

module.exports = {
  entry:{
    p1: "./projects/p1.jsx",
},
  mode: 'development',
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: false
  }
}