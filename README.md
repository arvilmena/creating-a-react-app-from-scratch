# creating-a-react-app-from-scratch

This is a simple react implementation, as seen in [this article](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)

## Getting Started

_(Note: this project was created in Node v9.3.0) forked by Arvil who uses v6.4.1_

### Starting The Dev Server

1. Install Composer and NPM packages

    ```BASH
    composer install && npm istall
    ```

2. **Important!** Host the public folder into a vhost, with this `webpack.config.js` use:

    ```http://create-react-app-scratch.test```

3. Update `config.js` to suit your needs.

4. Start Webpack Dev Server

    ```BASH
    npm start
    ```

This starter uses webpack-dev-server to spin up an Express server with Hot-Reloading capability.

### Production asset bundling ###

```BASH
npm run build
```
