const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production'

var paths = {
  outputPath : path.resolve(__dirname, "public/dist/"),
  jsFileName : "[name].[hash].js",
}

var config = {
  entry: "./src/index.js",
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
        use: ["style-loader", "css-loader"]
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //       devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      //       "style-loader", // creates style nodes from JS strings
      //       "css-loader", // translates CSS into CommonJS
      //       "sass-loader" // compiles Sass to CSS, using Node Sass by default
      //   ]
      // }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: paths.outputPath,
    publicPath: "/dist/",
    filename: paths.jsFileName
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3333,
    publicPath: "http://localhost:3333/dist/",
    hotOnly: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      // output: paths.outputPath,
      writeToFileEmit: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = (env, argv) => {
  console.log(`This is the Webpack 4 'mode': ${argv.mode}`);
  
  config.module.rules.push({
    test: /\.scss$/,
    use: [
        ( argv.mode !== 'production' ) ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
    ]
  });

  if (argv.mode === 'production') {
    config.plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      })
    );
  }

  return config;
};
