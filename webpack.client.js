// webpack.client.js
const webpack        = require('webpack')
const path           = require('path')
const merge          = require('webpack-merge')
const baseConfig     = require('./webpack.base.js')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

module.exports = merge(baseConfig, config)