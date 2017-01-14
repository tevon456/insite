module.exports = {
  entry: './www/static/index.js',
  output: {
    filename: './www/static/dist/bundle.js'
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test:/\.css$/,
        exclude: /node_modules/,
        loader: 'style!css!'
      },
      {
        test:/\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
      },
      {
        test:/vendor\.min.js$/,
        exclude: /node_modules/,
        loader: 'imports?jQuery=jquery,$jquery,this=>window'
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css'],
    root: [
      'node_modules'
    ]
  }
}
