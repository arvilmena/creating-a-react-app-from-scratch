const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

var paths = {
  publicFolder: "public/",
  distFolder : "dist/",
  outputPath : "public/dist/",
  outputPathAbs : path.resolve(__dirname, "public/dist/"),
}

module.exports = (env, argv) => {
  console.log(`This is the Webpack 4 'mode': ${argv.mode}`);

  var serverURL = 'http://localhost:8080/'; // Webpack Dev Server
  var proxyURL = 'http://localhost:9090'; // Your external HTML server
  var proxy = {
    '*': proxyURL
  };

  var config = {
    entry: {
      index : "./src/index.js",
      globalStyles : "./src/App.scss",
      // index2 : "./src/index2.js",

    },
    mode: "development",
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
          use: ['css-hot-loader', "style-loader", "css-loader"]
        },
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: paths.outputPathAbs,
      publicPath: ( 'production' !== argv.mode ) ? serverURL + paths.outputPath : paths.distFolder,
      filename: ( argv.mode !== 'production' ) ? "[name].js" : "[name].[hash].js",
    },
    resolve: { alias: {} },
    devServer: {
      contentBase: serverURL + paths.outputPath,
      proxy: proxy,
      host: '0.0.0.0',
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    },
    plugins: [
      new WriteFilePlugin(),
      new CleanWebpackPlugin(),
      new ManifestPlugin({
        // output: paths.outputPath,
        writeToFileEmit: true
      }),
      new webpack.HotModuleReplacementPlugin(),
    ]
  }
  
  config.module.rules.push({
    test: /\.scss$/,
    use: [
        'css-hot-loader',
        // ( argv.mode !== 'production' ) ? 'style-loader' : MiniCssExtractPlugin.loader,
        MiniCssExtractPlugin.loader,
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
    ]
  });

  config.plugins.push(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: ( argv.mode !== 'production' ) ? '[name].css' : '[name].[hash].css',
      chunkFilename: ( argv.mode !== 'production' ) ? '[id].css' : '[id].[hash].css',
    })
  );

  if ( 'production' !== argv.mode ) {
    config.watch = true;
  }

  return config;
};
