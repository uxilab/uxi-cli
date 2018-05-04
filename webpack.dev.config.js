const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const transformObjectRestSpread = require('transform-object-rest-spread')
const fs = require('fs');

const cwd = process.cwd();
let hook;
let HTMLWebpackPluginOptions;

if (fs.existsSync(path.resolve(cwd, '/index.html'))) {
  // Do something
  HTMLWebpackPluginOptions = {
    template: path.resolve(cwd, '/index.html'),
  };
}

if (fs.existsSync(path.resolve(cwd, './uxi.dev.extend.js'))) {
    // Do something
  hook = require(path.resolve(cwd, './uxi.dev.extend.js'));
}

const devConfig = {
  mode: 'development',
  entry: [
    // 'babel-polyfill',
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3100',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    './src/index.js',
  ],
  devServer: {
    contentBase: './',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  output: {
    path: path.join(cwd, 'build'),
    filename: 'app.js',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              'env',
              'react',
              'stage-0',
            ],
            plugins: ['transform-object-rest-spread'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin(),
  ],
};

module.exports = hook ? hook(devConfig) : devConfig;
