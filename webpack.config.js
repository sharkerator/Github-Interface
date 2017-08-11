const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$|\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader', 'import-glob-loader']
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = config;