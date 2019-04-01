const path = require('path');

/* Start editing the values below */

var webpackDevServer = 'http://localhost:8080/'; // Webpack Dev Server
var vHost = 'http://create-react-app-scratch.test'; // Your vhost.

const sources = {
  mainJS : "./src/main.js",
  mainCSS : "./src/main.scss",
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
    // contentBase: vHost + assetBasePath,
  }
};
