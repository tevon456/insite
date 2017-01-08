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
          presets: ['es2015']
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
    ]
  }
}
