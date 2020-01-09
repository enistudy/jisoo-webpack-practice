const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackConfigCommon = require("./webpack.config.common");

const webpackConfigProd = {
	mode: "production",
	devtool: "cheap-module-source-map",
	plugins: [new CleanWebpackPlugin()]
};

module.exports = merge(webpackConfigCommon, webpackConfigProd);
