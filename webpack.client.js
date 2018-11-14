// webpack.client.js
const webpack        = require('webpack')
const path           = require('path')
const merge          = require('webpack-merge')
const baseConfig     = require('./webpack.base.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodMode = process.env.NODE_ENV === 'production'

const config = {
  entry: './src/client.js',
  resolve: {
    modules: [
      path.resolve( './src' ),
      'node_modules'
    ]
  },
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name].bundle.js'
  },
  optimization: prodMode ? {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  } : {},
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

module.exports = merge(baseConfig, config)