const path = require( 'path' )
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' )
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' )
const devMode = process.env.NODE_ENV !== 'production'

const plugins = [
  new FriendlyErrorsWebpackPlugin()
]

if ( !devMode ) {
  plugins.push( new BundleAnalyzerPlugin( {
    analyzerMode: 'static',
    reportFilename: 'webpack-report.html',
    openAnalyzer: false
  } ) )
}

module.exports = {
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-2'],
            plugins:  [
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-object-rest-spread',
              'transform-async-to-generator'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|ttf|eot|otf)$/,
        use: 'file-loader?name=[hash:base64:7].[ext]'
      },
      {
        test: /favicon\.png$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader'
      },
      { 
        test: /\.(sa|sc|c)ss$/, 
        use: [ 
          MiniCssExtractPlugin.loader, 
          { 
            loader: 'css-loader', 
            options: { 
              localIdentName: '[name]__[local]--[hash:base64:5]', 
              minimize: { safe: true }
            } 
          }, 
          { 
            loader: 'sass-loader'
          } 
        ] 
      }
    ]
  },
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name].bundle.js'
  },
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
}
