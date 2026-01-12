//@ts-check
import CopyPlugin from 'copy-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'node:path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import svgoConfig from './svgo.config.mjs'

/**
 * @typedef {import("webpack").Configuration & {devServer: import("webpack-dev-server").Configuration}} WebpackConfig
 * @type {(args: {production: boolean}) => WebpackConfig}
 */
const config = (env) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? false : 'eval-cheap-module-source-map',
  context: import.meta.dirname,
  entry: './src/index.tsx',
  target: 'web',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '...'],
  },
  output: {
    path: path.resolve(import.meta.dirname, 'build'),
    clean: true,
    assetModuleFilename: 'static/[contenthash][ext]',
    filename: env.production ? 'static/js/bundle-[fullhash].js' : 'static/js/bundle-[name].js',
    chunkFilename: env.production ? 'static/js/[chunkhash].chunk.js' : 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          env.production ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { modules: { auto: true } } },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'swc-loader',
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.tsx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [{ loader: '@svgr/webpack', options: { svgoConfig } }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        type: 'asset',
      },
    ],
  },
  optimization: {
    minimizer: [imageMinimizerPlugin, new CssMinimizerPlugin(), '...'],
  },
  plugins: basePlugins.concat(env.production ? productionPlugins : []).filter(Boolean),
})

const basePlugins = [
  new HtmlWebpackPlugin({
    template: path.join(import.meta.dirname, 'public', 'index.html'),
  }),
  new Dotenv({ safe: true, allowEmptyValues: false }),
  new ForkTsCheckerWebpackPlugin(),
]

const productionPlugins = [
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash].css',
    chunkFilename: 'static/css/[id].[contenthash].css',
  }),
  new CopyPlugin({
    patterns: [{ from: 'public', filter: (resourcePath) => !resourcePath.includes('.html') }],
  }),
  // new BundleAnalyzerPlugin(),
]

const imageMinimizerPlugin = new ImageMinimizerPlugin({
  minimizer: [
    {
      implementation: ImageMinimizerPlugin.sharpMinify,
      options: {
        encodeOptions: {
          jpeg: {
            // https://sharp.pixelplumbing.com/api-output#jpeg
            quality: 100,
          },
          webp: {
            // https://sharp.pixelplumbing.com/api-output#webp
            lossless: true,
          },
          // png by default sets the quality to 100%, which is same as lossless
          // https://sharp.pixelplumbing.com/api-output#png
          png: {},
        },
      },
    },
    {
      implementation: ImageMinimizerPlugin.svgoMinify,
      options: {
        encodeOptions: svgoConfig,
      },
    },
  ],
})

export default config
