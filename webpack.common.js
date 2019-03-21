const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const myVariables = require('./webpack.variables');

module.exports = {
    entry: {
        main : "./src/main.js",
        globalStyles : "./src/main.scss",
    },
    output: {
        path: myVariables.paths.outputPathAbs,
    },
    plugins: [
        new WriteFilePlugin(),
        new CleanWebpackPlugin(),
        new ManifestPlugin({
          writeToFileEmit: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: { presets: ["@babel/env"] }
        },
        {
            test: /\.css$/,
            use: [
                'css-hot-loader',
                "style-loader",
                "css-loader",
                myVariables.loaders.postCSSLoader,
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                "css-loader",
                myVariables.loaders.postCSSLoader,
                'sass-loader',
            ]
        },
      ]
    },
};