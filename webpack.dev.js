const env = 'development';
process.env.NODE_ENV = env;

const merge = require('webpack-merge');
const webpack = require("webpack");
const chokidar = require("chokidar");
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
    host: "localhost",
    port: 8080,
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
    before:(app, server) => {
      console.log('watching: ', config.devServer.watchAndReload);
      const watcher = chokidar.watch(config.devServer.watchAndReload, {
        alwaysStat: true,
        atomic: false,
        followSymlinks: false,
        ignoreInitial: true,
        ignorePermissionErrors: true,
        persistent: true,
        usePolling: true,
      });
      watcher
        .on("all", () => {
          server.sockWrite( server.sockets, "content-changed" );
        });
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
});
