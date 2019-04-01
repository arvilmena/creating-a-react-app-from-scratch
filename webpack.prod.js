const env = 'production';
process.env.NODE_ENV = env;

const merge = require('webpack-merge');
const webpack = require("webpack");
const common = require('./webpack.common');
const config = require('./config');

module.exports = merge(common, {
  mode: env,
  devtool: false,
  output: {
    publicPath: config.dest.basePath,
    filename: "[name].[hash].js",
  },
});
