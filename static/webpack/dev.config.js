const webpack = require("webpack");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: ["webpack-hot-middleware/client", "./src/index"],
  output: {
    publicPath: "/dist/"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style!css!"
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: "style!css!less"
      },
      {
        test: /vendor\.min.js$/,
        exclude: /node_modules/,
        loader: "imports?jQuery=jquery,$jquery,this=>window"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
      },
      __DEVELOPMENT__: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: "jquery"
    })
  ]
};
