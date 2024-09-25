'use strict';

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

const devMode = process.env.NODE_ENV === 'development';
const {PWD: currentDir} = process.env;
const htmlPluginOptions = {
    meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "X-UA-Compatible": {
            "http-equiv": "X-UA-Compatible",
            "content": "IE=edge"
        }
    },
    filename: `${currentDir}/index.html`,
    template: 'src/html/index.html',
    inject: 'body',
    hash: true,
    scriptLoading: 'defer',
    minify: devMode ? false : {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
    },
    basePath: '',
};


export default {
    entry: './src/js/main.js',
    output: {
        path: `${currentDir}/dist`,
        filename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|woff|woff2|eot|ttf|otf)(.*)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
        new HtmlWebpackPlugin(htmlPluginOptions),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: 4,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    }
};
