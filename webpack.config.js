const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const cwd = process.cwd();
let hook;

if (fs.existsSync(path.resolve(cwd, './index.html'))) {
  // Do something
  HTMLWebpackPluginOptions = {
    template: path.resolve(cwd, './index.html'),
  };
}

if (fs.existsSync(path.resolve(cwd, './uxi.extend.js'))) {
    // Do something
    hook = require(path.resolve(cwd, './uxi.extend.js'));
}

const prodConfig = {
  mode: 'production',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(cwd, 'build'),
    filename: 'app.js',
  },
  devtool: 'nosources-source-map',
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-object-rest-spread'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      NODE_ENV: JSON.stringify('production'),
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // https://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
  ],
};

module.exports = hook ? hook(prodConfig) : prodConfig;
