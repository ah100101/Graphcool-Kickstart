const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const uglifyPlugin = new UglifyJSPlugin()

const htmlPlugin = new HtmlPlugin({
  template: './src/html/index.html',
  filename: './public/index.html'
})

const extractSassPlugin = new ExtractTextPlugin({
  filename: './public/css/styles.css'
})

const config = {
  entry: './src/js/entry.js',
  output: {
    path: __dirname,
    filename: './public/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: extractSassPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.js' ],
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  plugins: [
    htmlPlugin,
    extractSassPlugin,
    uglifyPlugin
  ]
}

module.exports = config
