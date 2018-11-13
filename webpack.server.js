const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devMode = process.env.NODE_ENV !== 'production'

const config = {
  target: 'node',
  mode: devMode ? 'development' : 'production',
  entry: './src/server',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
}

module.exports = merge(baseConfig, config)