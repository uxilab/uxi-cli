const webpack = require('webpack');
const path = require('path');
// const transformObjectRestSpread = require('transform-object-rest-spread')


module.exports = {
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
    path: path.join(__dirname, 'build'),
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
            presets: ['env', 'react'],
            // plugins: [transformObjectRestSpread],
            plugins: ['transform-object-rest-spread'],
          },
        },
      },
      // {
      //   test: /\.jsx?$/,
      //   use: [
      //     'babel-loader',
      //   ],
      //   exclude: /node_modules/,
      // },
      // This loader seems to be there exclusively for graphiQL:
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
