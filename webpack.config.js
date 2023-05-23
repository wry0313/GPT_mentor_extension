const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
//   mode: 'production', 
  entry: {
    popup: './src/popup.js',
    background: './src/background.js',
  }, 
  output: {
    path: path.resolve(__dirname, 'dist'), // path for build
    filename: '[name].js', // Update with the desired output file location
    clean: true,
  },
  resolve: {
    extensions: ['.js'], // Add any other extensions you're using in your extension code
  },
  module: {
    rules: [
      // Add any additional rules for handling different file types (e.g., CSS, JSON)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // If you need to transpile your code using Babel, install babel-loader and configure it here
      },
    ],
  },
  plugins: [
    new CopyPlugin({
        patterns: [
            { from: "static" }
        ]
    })
  ],
};
