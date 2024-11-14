const path = require('path')
const { webpack, ProvidePlugin } = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: [
            './src/index',
            './src/assets/scss/style.scss',
        ],
        aboutus: [
            './src/about/index.js',
        ],
        // service: './src/service.js'
    },
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[path][name].[ext]'
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@scss': path.resolve(__dirname, 'src/assets/scss/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@common': path.resolve(__dirname, 'src/components/common/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@layouts': path.resolve(__dirname, 'src/layouts/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@services': path.resolve(__dirname, 'src/services/'),
            '@stores': path.resolve(__dirname, 'src/stores/'),
            '@utils': path.resolve(__dirname, 'src/utils/')
        },
        extensions: ['.xml', '.mjs', '.js', '.json', '.scss']
    },
    devServer: {
        static: [{
            directory: path.join(__dirname, 'dist')
        }],
        compress: true,
        port: 8080,
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true,
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        client: {
            webSocketURL: {
                hostname: '0.0.0.0',
                pathname: '/websocket',
                protocol: 'http'
            }
        },
        webSocketServer: {
            type: 'ws',
            options: {
                path: '/websocket'
            }
        }
    },
    plugins: [
        // new ESLintPlugin(),
        new CleanWebpackPlugin(),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            // cần sử dụng khi thêm jsquery library
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            title: 'Home Page',
            filename: 'index.html',
            template: 'src/index.html',
            inject: true,
            chunks: ['main'],
            'meta': {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
        }),
        new HtmlWebpackPlugin({
            title: 'About us!',
            filename: 'about.html',
            // template: './src/about/index.html',
            chunks: ['aboutus']

        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
                parser: {
                    // dung lượng nhỏ hơn 8kb thì chuyển thành base64 để hiển thị
                    dataUrlCondition: {
                        maxSize: 16 * 1024
                    }
                },
                // generator: {
                //     filename: 'static/images/[hash][ext][query]'
                // }
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[hash][ext][query]'
                }

            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.(sa|sc)ss$/i,
                use: [
                    process.env.NODE_ENV !== "production"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: true,
                            import: true,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "expanded",
                                includePaths: [
                                    path.resolve(__dirname, 'src/assets/scss')
                                ]
                            },
                            additionalData: `@use "sass:math"; @use "colors" as *;`
                        }
                    }
                ],
            },
        ]
    }

    // optimization: {
    //     // Webpack Code Splitting
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }

}
