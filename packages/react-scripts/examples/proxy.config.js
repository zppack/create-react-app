/**
 * This is an example of how to customize webpack-dev-server proxy config.
 * Original CRA uses the "proxy" field in package.json to generate proxy config,
 *    but it only supports the type "string".
 * The way using `http-proxy-middleware` and a "src/setupProxy.js" file to config proxies is still supported.
 * If both exist, the "src/setupProxy.js" and the "proxy.config.js" will work at the same time.
 */

module.exports = {
  '/ooooo': {
    target: 'http://localhost:3000/about.html',
    pathRewrite: { '/ooooo': '' },
    changeOrigin: true,
  },
  '/chichi': {
    target: 'http://localhost:3000/home.html',
    pathRewrite: { '/chichi': '' },
    changeOrigin: true,
  },
  '/byebye': {
    target: 'http://localhost:3000/aboutus.html',
    pathRewrite: { '/byebye': '' },
    changeOrigin: true,
  }
};
