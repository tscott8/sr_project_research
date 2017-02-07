var path = require("path")
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    app: './assets/js/index',
    vendors: ['react'],
  },

  output: {
      path: path.resolve('./assets/bundles/local/'),
      filename: "[name]-[hash].js"
  },

  externals: [
  ], // add all vendor libs

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
  ], // add all common plugins here

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {
    modules: ['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx']
  },
}
