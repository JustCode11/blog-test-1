const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

module.exports = {
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, "./src/index.js")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        //assetModuleFilename: "images/[hash][ext][query]"
        assetModuleFilename: "images/[name]"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset"
                /*use: [
                    {
                        loader: 'file-loader',
                        options: {} // produces {hash}.[ext] files by default
                    }
                ]*/
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" }
                    },
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            [
                                "@babel/preset-react",
                                {
                                    runtime: "automatic"
                                }
                            ]
                        ],
                        cacheDirectory: true,
                    }
                }
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            title: "React Project"
        })
    ],
    resolve: {
        extensions: ['', ".js", ".jsx", ".md"]
    },
    devServer: {
        //contentBase: path.resolve(__dirname, "./dist"),
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "./dist"),
        hot: true
    }
}