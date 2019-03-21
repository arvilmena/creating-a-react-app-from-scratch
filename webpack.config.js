const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var paths = {
  publicFolder: "public/",
  distFolder : "dist/",
  outputPath : "public/dist/",
  outputPathAbs : path.resolve(__dirname, "public/dist/"),
}

module.exports = (env, argv) => {
  console.log(`This is the Webpack 4 'mode': ${argv.mode}`);

  var serverURL = 'http://localhost:8080/'; // Webpack Dev Server
  var proxyURL = 'http://create-react-app-scratch.test'; // Your external HTML server
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
          use: [
            'css-hot-loader',
            "style-loader",
            "css-loader",
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: 'inline'
              }
            },
          ]
        },
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: paths.outputPathAbs,
      publicPath: ( 'production' !== argv.mode ) ? serverURL + paths.distFolder : paths.distFolder,
      filename: ( argv.mode !== 'production' ) ? "[name].js" : "[name].[hash].js",
    },
    resolve: { alias: {} },
    devServer: {
      contentBase: serverURL + paths.distFolder,
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
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: 'inline'
          }
        },
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

  if ( 'production' !== argv.mode ) {
    config.plugins.push(
      new BrowserSyncPlugin({
        // browse to http://localhost:9091/ during development,
        proxy: proxyURL,
        // proxy: "http://localhost:9090/",
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
      })
    );
  }

  return config;
};
