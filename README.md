# creating-a-react-app-from-scratch

This is a simple react implementation, as seen in [this article](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)

## Getting Started

_(Note: this project was created in Node v9.3.0)_

Clone this repo and install dependencies with `npm install`.

### Starting The Dev Server

**Important!** Host the public folder into a vhost, with this `webpack.config.js` use:

```http://create-react-app-scratch.test```

Start Webpack Dev Server

```BASH
npm start
```

This starter uses webpack-dev-server to spin up an Express server with Hot-Reloading capability. Changes to code in `.src` should cause pages to reload.

### Production asset bundling ###

```BASH
npm run build
```