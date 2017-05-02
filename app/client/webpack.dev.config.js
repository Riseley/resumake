const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const webpack = require('webpack')

const src = resolve(__dirname, 'src')
const dist = resolve(__dirname, 'dist')

module.exports = {
  context: src,

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: '/'
  },

  devtool: 'cheap-eval-source-map',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'blyss-loader',
        exclude: /(node_modules)/,
        options: {
          error: true,
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.styl$/,
        loader: 'stylint-loader'
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ template: './index.html', inject: 'body' })
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    overlay: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: './index.html' }
      ]
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  }
}