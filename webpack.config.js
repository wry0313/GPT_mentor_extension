const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

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
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [tailwindcss, autoprefixer],
            }
          }
        }],
      }
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
