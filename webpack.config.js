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
            '@components': path.resolve(__dirname, 'src/components/'),
            
        },
        extensions: ['.xml', '.mjs', '.js', '.json']
    },
    devServer: {
        static: [{
            directory: path.join(__dirname, 'dist')
        }],
        compress: true,
        port: 8080,
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
                            api: "modern",
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "expanded",
                            }
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
