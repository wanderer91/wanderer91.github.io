const path = require('path');
const fs = require('fs');
const miniCssWebpackPlugin = require('mini-css-extract-plugin');
const uglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

const entryPointPath = path.resolve(__dirname, 'src/js/blocks');
let entryPoints = {};

const getEntryPoints = () => {
    fs.readdirSync(entryPointPath).forEach((path) => {
       entryPoints[path.replace(/\.[^\.]+$/, '')] = `${entryPointPath}/${path}`;
    });
};

getEntryPoints();

module.exports = {
    entry: entryPoints,
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
