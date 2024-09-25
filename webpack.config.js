'use strict';

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

const devMode = process.env.NODE_ENV === 'development';
const {PWD: currentDir} = process.env;
const siteTitle = "Portfolio Page | Nikita Churilov";
const siteDesc = `I develop, support and maintain sites and web-applications: 
    Wordpress, Laravel, Yii, NodeJS, Javascript, Vue, Nuxt, React, Docker`;
const htmlPluginOptions = {
    meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "X-UA-Compatible": {
            "http-equiv": "X-UA-Compatible",
            content: "IE=edge",
        },
        generator: "Webpack",
        keywords: "Web-developer's Portfolio, Freelancer, Web-developer PHP JS NodeJS Laravel Yii Wordpress Vue Nuxt React Docker",
        description: siteDesc,
        "twitter:card": "summary",
        "twitter:title": siteTitle,
        "twitter:description": siteDesc,
        "og:type": {
            property: "og:type",
            content: "website",
        },
        "og:description": {
            property: "og:description",
            content: siteDesc,
        },
        "og:title": {
            property: "og:title",
            content: siteTitle,
        },
        "og:image": {
            property: "og:image",
            content: "static/img/main.png",
        },
        "og:image:type": {
            property: "og:image:type",
            content: "image/png",
        },
        "og:image:width": {
            property: "og:image:width",
            content: "718",
        },
        "og:image:height": {
            property: "og:image:height",
            content: "718",
        },
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
    title: siteTitle,
};


export default {
    devServer: {
        static: {
          directory: currentDir,
        },
        compress: true,
        port: 9000,
    },
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
