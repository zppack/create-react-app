/**
 * This file is an example of how to customize webpack entry config.
 * This is a multi-entries config example.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient'
);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  undefined,
  process.env.PUBLIC_URL
);

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const shouldUseReactRefresh = process.env.FAST_REFRESH;

  const htmlPluginDefaultOpts = Object.assign(
    {},
    {
      inject: true,
      template: path.resolve('./public/index.html'),
    },
    isEnvProduction
      ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
      : undefined
  );

  const appSrc = path.resolve('./src');

  return {
    entry: {
      home: isEnvDevelopment && !shouldUseReactRefresh ? [webpackDevClientEntry, `${appSrc}/index.js`] : `${appSrc}/index.js`,
      about: isEnvDevelopment && !shouldUseReactRefresh ? [webpackDevClientEntry, `${appSrc}/index2.js`] : `${appSrc}/index2.js`,
      aboutus: isEnvDevelopment && !shouldUseReactRefresh ? [webpackDevClientEntry, `${appSrc}/index2.js`] : `${appSrc}/index2.js`,
    },
    output: {
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/[name].bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(htmlPluginDefaultOpts, {
          chunks: ['home'],
          filename: 'home.html'
        })
      ),
      new HtmlWebpackPlugin(
        Object.assign(htmlPluginDefaultOpts, {
          chunks: ['about'],
          filename: 'about.html'
        })
      ),
      new HtmlWebpackPlugin(
        Object.assign(htmlPluginDefaultOpts, {
          chunks: ['aboutus'],
          filename: 'aboutus.html'
        })
      ),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          const entrypointFiles = {};
          Object.keys(entrypoints).forEach(entrypoint => {
            entrypointFiles[entrypoint] = entrypoints[entrypoint].filter(fileName => !fileName.endsWith('.map') && !fileName.endsWith('.hot-update.js'));
          });

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
    ],
  };
}