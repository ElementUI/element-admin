const {
  resolve
} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const url = require('url');

module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    app: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].[chunkhash:7].js',
    chunkFilename: '[id].[chunkhash:7].js',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              postcss: require('./postcss.config.js').plugins
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'buble-loader',
            query: {
              objectAssign: 'Object.assign'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['eslint-loader']
      },
      {
        test: /\.css$/,
        loader: options.dev
          ? 'style-loader!css-loader?sourceMap!postcss-loader?sourceMap'
          : ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader?sourceMap!postcss-loader?sourceMap'
          })
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'index.tpl'
    }),
    new CopyWebpackPlugin([
      { from: 'static', ignore: ['.gitkeep'] }
    ]),
    new webpack.ProgressPlugin(),
    options.dev
      ? new webpack.NoEmitOnErrorsPlugin()
      : new ExtractTextPlugin('[name].[contenthash:7].css')
  ],
  resolve: {
    alias: {
      'src': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue']
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    stats: 'errors-only',
    historyApiFallback: true
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
});
