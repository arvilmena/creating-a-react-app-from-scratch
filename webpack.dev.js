const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'development',
    output: {
        publicPath: common.serverURL + common.paths.distFolder,
        filename: '[name].js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: common.serverURL + common.paths.distFolder,
        proxy: common.proxy,
        host: '0.0.0.0',
        hot: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
    },
    plugins: [
        new BrowserSyncPlugin({
            proxy: common.proxyURL,
            // browse to http://localhost:9091/ during development,
            port: 9091,
            files: [ // watch on changes
                {
                    match: ['public/**/*.php'],
                    fn: function (event, file) {
                        if (event === 'change') {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }
            ]
          },
          {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: false,
            name: 'bs-webpack-plugin',
          }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].[hash].css',
        })
    ],
});