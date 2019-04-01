const env = 'development';
process.env.NODE_ENV = env;

const merge = require('webpack-merge');
const webpack = require("webpack");
const common = require('./webpack.common');
const config = require('./config');

module.exports = merge(common, {
  mode: env,
  output: {
    publicPath: config.dest.basePath,
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      "**": config.devServer.proxy
    },
    // host: '0.0.0.0',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    disableHostCheck: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
});
