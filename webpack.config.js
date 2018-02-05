'use strict'

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const compressionPlugin = require('compression-webpack-plugin')
const preloadWebpackPlugin = require('preload-webpack-plugin')
const webpack = require('webpack')

let production = process.env.NODE_ENV === 'production'
let css = production ? [{
      loader: 'style-loader',
      options: {
        hmr: false,
        convertToAbsoluteUrls: true,
        attrs: {
          defer: true
        }
      }
    }, {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        minimize: true
      }
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [ require('autoprefixer') ]
        }
      }
    }, {
      loader: 'sass-loader',
      options: {}
  }] : [ 'style-loader', 'css-loader', 'sass-loader' ]

let appHtml = production ? new htmlWebpackPlugin({
  title: 'RSS Reader',
  template: `${path.join(__dirname, 'client', 'index.ejs')}`,
  xhtml: true,
  inject: true,
  minify: {
    decodeEntities: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
    collapseWhitespace: true
  },
  hash: true
}) : new htmlWebpackPlugin({
  title: 'RSS Reader',
  template: `${path.join(__dirname, 'client', 'index.ejs')}`,
  hash: true
})

let webpackConfig = {
  entry: {
    app: `${path.join(__dirname, 'client', 'js', 'app.js')}`
  },
  output: {
    path: path.resolve(__dirname, 'app', 'client'),
    filename: './js/[name].bundle.js',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [{
      test: /\.(scss|sass)$/,
      use: css
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-runtime']
        }
      }]
    }, {
      test: /\.modernizrrc.js$/,
      use: [{ loader: 'modernizr-loader' }]
    }, {
      test: /\.modernizrrc(\.json)?$/,
      use: [{ loader: 'modernizr-loader' }, { loader: 'json-loader' }]
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      use: 'json-loader'
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'react-svg-loader',
        options: {
          jsx: false,
          svgo: {
            plugins: [{ removeTitle: true }, { convertColors: true }, { convertPathData: true }, { cleanupAttrs: true }, { removeDoctype: true }, { removeXMLProcInst: true }, { removeComments: true }, { removeMetadata: true }, { removeDesc: true }, { removeUselessDefs: true }, { removeXMLNS: true }, { removeEditorsNSData: true }, { removeEmptyAttrs: true }, { removeHiddenElems: true }, { removeEmptyText: true }, { removeEmptyContainers: true }, { removeViewBox: false }, { cleanupEnableBackground: true }, { minifyStyles: true }, { convertStyleToAttrs: true }, { convertTransform: true }, { removeUnknonsAndDefaults: true }, { removeNonInheritableGroupAttrs: true }, { removeUselessStrokeAndFill: true }, { removeUnusedNS: true }, { cleanupIDs: true }, { cleanupNumericValues: true }, { cleanupListOfValues: true }, { moveElemsAttrsToGroup: true }, { moveGroupAttrsToElems: true }, { collapseGroups: false }, { removeRasterImages: false }, { mergePaths: true }, { convertShapeToPath: true }, { sortAttrs: true }, { transformsWithOnePath: true }, { removeDimensions: true }, { removeAttrs: { attrs: 'feGaussianBlur:(in)' } }, { removeElementsByAttr: true }, { addClassesToSVGElement: false }, { addAttributesToSVGElement: false }, { removeScriptElement: true }, { removeStyleElement: true }],
            floatPrecision: 2
          }
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      use: [ 'file-loader?name=assets/images/[name].[ext]', {
        loader: 'image-webpack-loader',
        query: {
          pngquant: {
            quality: '70-100',
            speed: 1,
            nofs: false,
            floyd: 1,
            posterize: 4
          },
          optipng: {
            optimizationLevel: 7,
            bitDepthReduction: true,
            colorTypeReduction: true,
            paletteReduction: true
          },
          mozjpeg: {
            quality: 100,
            progressive: true,
            interlaced: true
          },
          gifsicle: {
            interlaced: true,
            optimizationLevel: 3,
            colors: 256
          }
        }
      }]
    }]
  },
  resolve: { alias: { modernizr$: path.resolve(__dirname, '.modernizrrc') } },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    appHtml,
    new extractTextPlugin({
      filename: 'style.min.css',
      disable: !production,
      allChunks: true
    }),
    new preloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.(jpe?g|png|gif|svg)$/i.test(entry)) return 'image';
        return 'script';
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    hot: true,
    open: false
  }
}

if (production) {
  delete webpackConfig['devtool']
  delete webpackConfig['devServer']
  webpackConfig['output']['filename'] = './js/[name].bundle.min.js'
}

module.exports = webpackConfig
