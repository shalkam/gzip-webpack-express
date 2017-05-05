var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var config = {
  entry: [path.join(__dirname, './src/index.js')],
  output: {
    path: path.join(__dirname, './assets/'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10,
      minRatio: 0.8
    })
  ],
  module: {
    rules: [
      { test: /\.png$/, use: { loader: 'url-loader', options: { limit: '100000' } } },
      { test: /\.jpg$/, use: { loader: 'file-loader' } },
      { test: /\.gif$/, use: { loader: 'url-loader', options: { mimetype: 'image/png' } } },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: {
          loader: 'file-loader?name=[name].[ext]&publicPath=/assets/'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    ]
  }
};

module.exports = webpack(config);
