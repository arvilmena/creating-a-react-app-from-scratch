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
        new MiniCssExtractPlugin({
            filename: ( process.env.NODE_ENV === 'production' ) ? '[name].[hash].css' : '[name].css',
            chunkFilename: ( process.env.NODE_ENV === 'production' ) ? '[id].[hash].css' : '[id].css',
        }),
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
            // options: { presets: ["@babel/env"] }
        },
        {
            test: /\.css$/,
            use: [
                'css-hot-loader',
                ( process.env.NODE_ENV === 'production' ) ?  MiniCssExtractPlugin.loader :  "style-loader",
                "css-loader",
                myVariables.loaders.postCSSLoader,
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'css-hot-loader',
                ( process.env.NODE_ENV === 'production' ) ?  MiniCssExtractPlugin.loader :  "style-loader",
                "css-loader",
                myVariables.loaders.postCSSLoader,
                'sass-loader',
            ]
        },
      ]
    },
};