const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config');



module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [

  ]
}); 
