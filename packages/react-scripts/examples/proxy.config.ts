/**
 * This is an example of how to customize webpack-dev-server proxy config.
 * Original CRA uses the "proxy" field in package.json to generate proxy config,
 *    but it only supports the type "string".
 * The way using `http-proxy-middleware` and a "src/setupProxy.js" file to config proxies is still supported.
 * If both exist, the "src/setupProxy.js" and the "proxy.config.js" will work at the same time.
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  '/ooooo': {
    target: 'http://local.zhenguanyu.com:3000/index.html',
    pathRewrite: { '/ooooo': '' },
    changeOrigin: true,
  },
  '/my': {
    target: 'http://local.zhenguanyu.com:3000/about.html',
    pathRewrite: { '/my': '' },
    changeOrigin: true,
  },
  '/gosh': {
    target: 'http://local.zhenguanyu.com:3000/path/test.html',
    pathRewrite: { '/gosh': '' },
    changeOrigin: true,
  },
};

