const path = require('path');
const miniCssWebpackPlugin = require('mini-css-extract-plugin');
const uglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        waves: './src/js/blocks/waves.js',
        'mouse-color': './src/js/blocks/mouse-color.js',
        preloader: './src/js/blocks/preloader.js',
        'mouse-images': './src/js/blocks/mouse-images.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
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
                        loader: 'css-loader'
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            name: '[name].css'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../img',
                            emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new miniCssWebpackPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
    ],
    optimization: {
        minimizer: [
            new cleanWebpackPlugin(),
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
