const path = require("path");
const merge = require("webpack-merge");

const development = require("./dev.config");
const production = require("./prod.config");

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, "../src"),
  build: path.join(__dirname, "../dist")
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: [PATHS.app],

  output: {
    path: PATHS.build,
    filename: "bundle.js",
    chunkFilename: "bundle.[chunkhash].js"
  },

  resolve: {
    extensions: ["*", ".jsx", ".js", ".json", ".less"],
    modules: ["node_modules", PATHS.app]
  },

  module: {
    rules: [
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url-loader?limit=10000&mimetype=application/font-woff"]
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url-loader?limit=10000&mimetype=application/font-woff2"]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url-loader?limit=10000&mimetype=application/octet-stream"]
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url-loader?limit=10000&mimetype=application/font-otf"]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url-loader?limit=10000&mimetype=image/svg+xml"]
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: ["file-loader?name=[name].[ext]"]
      },
      {
        test: /\.jpg$/,
        use: ["file-loader?name=[name].[ext]"]
      }
    ]
  }
};

if (TARGET === "start" || !TARGET) {
  module.exports = merge(development, common);
}

if (TARGET === "build" || !TARGET) {
  module.exports = merge(production, common);
}
