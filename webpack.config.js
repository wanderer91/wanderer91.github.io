'use strict';

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import fs from 'fs';

const {PWD: currentDir, NODE_ENV: mode} = process.env;
const pageOptions = JSON.parse(fs.readFileSync(`${currentDir}/data/page-options.json`, 'utf-8'));
const htmlSrcDirectory = `${currentDir}/src/html`;
const htmlWebpackPlugins = [];
const basicHtmlPluginOptions = {
    inject: 'body',
    hash: true,
    scriptLoading: 'defer',
    minify: mode === 'development' ? false : {
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
const walkDirectory = (dir) => {
    fs.readdirSync(dir).forEach((item) => {
        const sourcePath = `${dir}/${item}`;
        if (fs.lstatSync(sourcePath).isDirectory()) {
            walkDirectory(sourcePath);
        } else if (/\.html$/.test(sourcePath)) {
            const filePath = sourcePath.replace(new RegExp(`${htmlSrcDirectory}\/?`), '');
            let htmlPluginOptions = {
                filename: `${currentDir}/${filePath}`,
                template: sourcePath,
                ...basicHtmlPluginOptions,
            };

            const pathSlug = filePath.replace(/\.html$/, '');

            if (pageOptions[pathSlug]) {
                htmlPluginOptions = {
                    ...htmlPluginOptions,
                    ...pageOptions[pathSlug],
                };
            }
            
            htmlWebpackPlugins.push(new HtmlWebpackPlugin(htmlPluginOptions));
        }
    });
}
walkDirectory(htmlSrcDirectory);

export default {
    mode,
    devServer: {
        static: {
          directory: currentDir,
        },
        hot: true,
        compress: true,
        port: 9000,
    },
    entry: {
        main: './src/js/main.js',
        'simple-swiper': './src/js/simple-swiper.js',
    },
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
                test: /\.(s?css)$/,
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
            filename: '[name].css',
        }),
        ...htmlWebpackPlugins,
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
