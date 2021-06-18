# zp-react-scripts

## Differences to original `react-scripts`

Original CRA `react-scripts` has a default webpack config which only supports a single-page-app. And its webpack config is difficult to modify.
If you want to modify the config, you could only excute command `npm run eject` to get all the config files moved to your project.

### 1. Customize webpack entry config

This `zp-react-scripts` now supports customize your entry config without do `eject`.
It still has a default webpack entry-config which supports a SPA, but you can put a `webpack.entry.config.js` file at the root of your project to replace the config.
A multi-page webpack entry-config example file is placed [here](examples/webpack.entry.config.js) for you.

**Remember** to generate a correct `manifest.json` file through `webpack-manifest-plugin` if you're to modify the entry-config.

### 2. Config proxy of webpack-dev-server

Original CRA `react-scripts` uses a string-typed "proxy" field in package.json to generate proxy config. If you want to do complex proxy configuration, CRA `react-scripts` advises using the `http-proxy-middleware` package and adding a `src/setupProxy.js` file to config proxies.
This way is still supported now and [here](examples/setupProxy.js) is an example config file.
If you don't want to install a package, `zp-react-scripts` supports taking full use of the "proxy" field of webpack-dev-server config. Just putting a `proxy.config.js` file at the root of your project to do proxy configuration. [Here](examples/proxy.config.js) is the example file.

### 3. About "publich path"

Original CRA `react-scripts` uses `PUBLIC_URL` environment variable or "homepage" field in package.json to infer "public path" at which the app is served.
I don't think the "homepage" field being used is a good way because this is not so transparent to us users and is easy to write something not-related in the field.
So I modified the config and now `zp-react-scripts` only uses `PUBLIC_URL` environment variable to infer "public path" at local server.

### 4. Runtime environment variables

Original CRA `react-scripts` grabs NODE_ENV and REACT_APP_* environment variables and prepare them to be injected into the application via DefinePlugin in webpack configuration.
For `zp-react-srcipts`, "REACT_APP_*" is replaced with "RUNTIME_*" by default to be the prefix of environment variables that are to be injected into the runtime application. What's more important is that when injecting into runtime app, the "RUMTIME_" prefix will be dropped. That means if you put an environment variable like "RUNTIME_XXX=xxx" in your `.env` file, you are able to use "XXX=xxx" at the runtime application.
Of course, you may want to change a prefix of "RUNTIME_". This can be done by adding an environment variable in the `.env` file as `"RUNTIME_ENV_PREFIX=RUNTIME"`. (Don't add "_" character at the end.)

## Tips of `react-scripts`

* Using a `HOST` envrionment variable to infer "allowedHost" at the local server.
* Using a `PORT` environment variable to infer "port" at the local server. The default port is 3000.
* `PUBLIC_URL` environment variable will be automaticaly used in building period. But if you want to use it in your app code, set another `RUNTIME_PLUBLIC_URL` environment variable which has a same value to `PUBLIC_URL`.

## What is `react-scripts`

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.
