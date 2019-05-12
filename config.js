const path = require('path');

/* Start editing the values below */

var webpackDevServer = 'http://localhost:8080/'; // Webpack Dev Server

const sources = {
  main : "./src/main.js",
};

const outputFolder = './public/dist';
const assetBasePath = '/dist/'; // this path is prepended to the asset file name.

const fontsFolder = 'fonts';
const imagesFolder = 'images';

/* That's it! Stop editing! */


module.exports = {
  src: sources,
  dest: {
    outputFolder: outputFolder,
    outputFolderAbsolute: path.resolve(__dirname, outputFolder),
    basePath : assetBasePath,
    fonts: fontsFolder,
    images: imagesFolder,
  },
  devServer: {
    proxy: webpackDevServer,
    watchAndReload: [
      path.resolve(__dirname, './public/') + '/index.php',
    ]
  }
};
