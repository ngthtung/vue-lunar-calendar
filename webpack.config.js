const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

let config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-lunar-calendar.min.js',
    library: 'lunarCalendar',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions'],
                },
              },
            ],
            ['es2015', { modules: false }],
          ],
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
};

module.exports = (env) => {
  if (env === 'development') {
    console.log()
    config = {
      ...config,
      mode: 'development',
      entry: './demo/index.js',
      output: {
        path: path.resolve(__dirname, './demo'),
        filename: 'bundle.js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
      },
      devServer: {
        writeToDisk: true,
      },
      resolve: {
        extensions: ['.js', '.vue'],
        alias: {
          src: path.resolve(__dirname, './src'),
          dist: path.resolve(__dirname, './dist'),
        },
      },
    }
  }
  return {
    ...config
  }
}
