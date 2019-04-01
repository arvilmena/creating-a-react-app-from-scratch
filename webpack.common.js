const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const config = require('./config');

module.exports = {
  entry: config.src,
  output: {
      path: config.dest.outputFolderAbsolute,
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
      new WriteFilePlugin(),
      new CleanWebpackPlugin(),
      new ManifestPlugin({
        writeToFileEmit: true
      }),
      new MiniCssExtractPlugin({
        filename: ( process.env.NODE_ENV === 'production' ) ? '[name].[hash].css' : '[name].css',
        chunkFilename: ( process.env.NODE_ENV === 'production' ) ? '[id].[hash].css' : '[id].css',
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*','!**/*index.php'],
      }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        resolve: { extensions: [".js", ".jsx"] }
      },
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: []
            }
          },
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: config.dest.images,
            },
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: config.dest.fonts,
            },
          },
        ]
      }
    ]
  },
};
