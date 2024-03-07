'use strict';

const glob = require('glob-all');
const path = require('path');
const miniCssWebpackPlugin = require('mini-css-extract-plugin');
const uglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function cssWhiteList() {
    return [/mfp/, /fa/, /mb/, /img/, /project__screenshot/, /skills__item/, /fancybox/, /project__images/, /alert/, /button/, /close/, /flag-icon/,
        /audio-player/];
}

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: miniCssWebpackPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'style-loader',
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new miniCssWebpackPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
        new PurgecssPlugin({
            paths: glob.sync(['./index.html']),
            whitelistPatterns: cssWhiteList(),
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    optimization: {
        minimizer: [
            new uglifyJsWebpackPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new optimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
            })
        ]
    }
};
