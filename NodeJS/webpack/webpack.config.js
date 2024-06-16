const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body'
    }), 
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }
    ]
  }
}