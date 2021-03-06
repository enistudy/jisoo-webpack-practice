const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvPlugin = require("dotenv-webpack");

module.exports = {
	context: path.resolve(__dirname, "..", "src"),
	entry: { app: ["@babel/polyfill", "./index.js"] },
	output: {
		path: path.resolve(__dirname, "..", "build"),
		filename: "[name].bundle.[hash].js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader",
				options: {
					publicPath: "./",
					name: "[name].[ext]?[hash]"
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: "url-loader",
					options: {
						name: "[name].[ext]?[hash]",
						limit: 8192
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "..", "public/index.html"),
			filename: path.join(__dirname, "..", "build/index.html"),
			favicon: path.join(__dirname, "..", "public/favicon.ico"),
			inject: true
		}),
		new DotenvPlugin()
	],
	resolve: {
		extensions: [".js", ".json"],
		modules: [path.join(__dirname, "..", "src"), "node_modules"]
	}
};
