const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    popup: './src/popup.jsx',
    background: './src/background.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // path for build
    filename: '[name].js', // Update with the desired output file location
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
          }
        },
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
