// webpack.config.js
const path = require('path');

module.exports = {
  entry: './app.js', // adjust this path if needed
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), // adjust this path if needed
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      mobx: 'mobx/lib/mobx.es6.js'
    },
  },
};
