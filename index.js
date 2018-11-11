require( 'babel-register' )( {
  presets: ['env', 'react', 'stage-2'],
  plugins: [
    'transform-decorators-legacy',
    'transform-class-properties',
    'transform-object-rest-spread',
    'transform-async-to-generator'
  ]
} )
require( 'babel-polyfill' )
require( './src/server' )
