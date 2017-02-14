const path = require("path")
const webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    App: './assets/js/main',
    vendors: [
      'react',
      'redux',
      'react-redux'
    ]
  },

  output: {
      path: path.resolve('./assets/bundles/local/'),
      filename: "[name]-[hash].js"
  },

  externals: [
  ], // add all vendor libs

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' })
  ], // add all common plugins here

  module: {
     rules: [
        {
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            query: {
               configFile: './.eslintrc'
            }
        }
     ],

     loaders: [
       { test: /\.html$/, loader: "file?name=[name].[ext]" },
       { test: /\.css$/, loader: "file?name=[name].[ext]" },
       { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot-loader","babel-loader"]}
     ] // add all common loaders here
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
}
