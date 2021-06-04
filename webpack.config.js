const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
      fallback: {
        "fs": false,
        "tls": false,
        "assert": false,
        "path": false,
        "inspector": false,
        "constants": false,
        "child_process": false,
        "stream": false,
        "crypto": false,
        "os": false,
        "util": false,
        "vm": false,
        "http": false,
        "https": false,
        "worker_threads": false
      }
  },
  module: {
    rules: [{
        test: /\.bundle\.js$/,
        use: {
          loader: 'bundle-loader',
          options: {
            name: 'my-chunk',
            cacheDirectory: true,
            presets: ['@babel/preset-env', { 
              useBuiltIns: 'usage', 
              targets: {
                  browsers: 'last 2 versions'
              },
            }]
          }
        }
      },

      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ["@babel/preset-env",
                {
                  "useBuiltIns": "entry",
                  "corejs": 3
                }
              ],
              "@babel/preset-typescript",
              "@babel/preset-react"
            ]
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name:'assets/[name].[ext]'
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                }
              }
            }
          }]
      },
      { 
        test: /\.scss$/,
        use: [ 
        { loader: "style-loader" },
        { loader: "css-modules-typescript-loader"},
        { loader: "css-loader", options: { modules: true } }, 
        { loader: "sass-loader" }
    ] 
  }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};