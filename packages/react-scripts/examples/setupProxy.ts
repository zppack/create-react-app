import { createProxyMiddleware } from 'http-proxy-middleware';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (app: any) {
  app.use(
    '/ooooo',
    createProxyMiddleware({
      target: 'http://local.zhenguanyu.com:3000/index.html',
      pathRewrite: { '/ooooo': '' },
      changeOrigin: true,
    }),
  );

  app.use(
    '/my',
    createProxyMiddleware({
      target: 'http://local.zhenguanyu.com:3000/about.html',
      pathRewrite: { '/my': '' },
      changeOrigin: true,
    }),
  );

  app.use(
    '/gosh',
    createProxyMiddleware({
      target: 'http://local.zhenguanyu.com:3000/path/test.html',
      pathRewrite: { '/gosh': '' },
      changeOrigin: true,
    }),
  );
};


