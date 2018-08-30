// const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const fs = require('fs');
const sourcePath = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../dist');
const { getPages } = require('./utils.js');

// 项目里面所有单文件js入口
const pages = getPages(sourcePath, {
  exclude: /common/,
  include: /static/
});

// plugins
const plugins = [];
//clean 
plugins.push(
  new CleanWebpackPlugin(['*.*'], {
  root: outputPath,
  verbose: false
}));
// html输出到dist
Object.keys(pages).forEach((page) => {
  plugins.push(new HtmlWebpackPlugin({
    filename: `${page}.html`,
    template: path.resolve(pages[page], `../${page}.html`),
    inject: false
  }))
});
// css
plugins.push(new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: 'css/[name].css',
  chunkFilename: 'css/[id].css',
}));

module.exports = {
  entry: pages,
  output: {
    path: outputPath,
    publicPath: '',
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      // path.resolve(__dirname, '../node_modules'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'stage-0', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              plugins: [new MiniCssExtractPlugin()],
            }
          }
        ]
      },
      {
        test: /\.jpg|png|gif|svg$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[hash:16].[ext]',
              useRelativePath: true,
              publicPath: '../img',
              limit: 10,
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
};
