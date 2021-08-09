const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const common = require('./webpack.common');
const { merge } = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    target: "web",
    devtool: "eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ],
});