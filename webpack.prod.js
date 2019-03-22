const env = 'production';
process.env.NODE_ENV = env;


const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const myVariables = require('./webpack.variables');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = {
    mode: env,
    devtool: false,
    output: {
        publicPath: myVariables.paths.publicAssetFolder,
        filename: "[name].[hash].js",
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
        ]
    },
}

module.exports = merge(common, config);