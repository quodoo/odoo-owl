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
        about: './src/pages/About',
        contact: './src/pages/Contact',
        // Thêm các pages khác nếu cần
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[path][name].[ext]'
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
            '@scss': path.resolve(__dirname, 'src/assets/scss/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@common': path.resolve(__dirname, 'src/components/common/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@layouts': path.resolve(__dirname, 'src/layouts/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@services': path.resolve(__dirname, 'src/services/'),
            '@stores': path.resolve(__dirname, 'src/stores/'),
        },
        extensions: ['.xml', '.mjs', '.js', '.json', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.svg']
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
        new ESLintPlugin(),
        new CleanWebpackPlugin(),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            // cần sử dụng khi thêm jsquery library
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            FontAwesome: '@fortawesome/fontawesome'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            title: 'Odoo OWL App',
            filename: 'index.html',
            template: 'src/index.html',
            inject: true,
            chunks: ['main'],
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
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
                },
                include: [
                    path.resolve(__dirname, 'node_modules/bootstrap')
                ]
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
            {
                test: /\.xml$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource', // Changed to asset/resource
                generator: {
                    filename: 'static/src/images/[hash][ext][query]'
                },
                parser: {
                    // dung lượng nhỏ hơn 8kb thì chuyển thành base64 để hiển thị
                    dataUrlCondition: {
                        maxSize: 16 * 1024
                    }
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/src/fonts/[name][ext][query]'
                },
                include: [
                    path.resolve(__dirname, 'src/assets/fonts'),
                    path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome')
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxSize: 244000,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: -20
                }
            }
        }
    }
}
