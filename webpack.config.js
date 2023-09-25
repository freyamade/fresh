var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    fresh: './src/index.ts',
    'pkg/game-of-life': './src/pkg/game-of-life/game-of-life.pkg.ts',
    'pkg/github-user-languages': './src/pkg/github-user-languages/github-user-languages.pkg.ts',
  },
  output: {
    path: path.resolve(__dirname, './static/js'),
    publicPath: '/static/js/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.wasm'],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'eval-source-map',
  experiments: {
    syncWebAssembly: true,
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'source-map'
  module.exports.optimization = {minimize: true}
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
