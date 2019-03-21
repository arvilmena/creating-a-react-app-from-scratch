const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var paths = {
    publicFolder: "public/",
    distFolder: "dist/",
    outputPath: "public/dist/",
    outputPathAbs: path.resolve(__dirname, "public/dist/"),
};

var serverURL = 'http://localhost:8080/'; // Webpack Dev Server
var proxyURL = 'http://create-react-app-scratch.test'; // Your external HTML server
var proxy = {
  '*': proxyURL
};

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
    }
};

module.exports = {
    entry: {
        main : "./src/main.js",
        globalStyles : "./src/App.scss",
    },
    output: {
        path: paths.outputPathAbs,
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
                postCSSLoader,
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                "css-loader",
                postCSSLoader,
                'sass-loader',
            ]
        },
      ]
    },
};