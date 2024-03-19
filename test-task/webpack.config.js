import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';

export default function ( env, argv ) {
    return {
        entry: './src/js/main.js',
        mode: argv.mode,
        output: {
            path: resolve( '.', 'dist' ),
            filename: '[name].js',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.s?[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin( {
                filename: '[name].css',
            } ),
            new HtmlWebpackPlugin( {
                meta: {
                    'X-UA-Compatible': {
                        'http-equiv': 'X-UA-Compatible',
                        content: 'IE=edge',
                    },
                    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                  },
                template: './src/html/index.html',
                filename: '../index.html',
                title: 'Диагностика зрения',
                inject: 'body',
                hash: true,
            } ),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin( {
                    extractComments: false,
                } ),
                new HtmlMinimizerPlugin( {
                    minimizerOptions: {
                        collapseWhitespace: true,
                        keepClosingSlash: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        useShortDoctype: true
                    },
                } ),
            ],
        },
    }
}