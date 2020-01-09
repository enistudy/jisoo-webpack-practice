const PORT = 3000;

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: { app: ["@babel/polyfill", "./index.js"] },
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].bundle.js"
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
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public/index.html"),
			filename: path.join(__dirname, "build/index.html"),
			favicon: path.join(__dirname, "public/favicon.ico"),
			inject: true
		})
	],
	resolve: {
		extensions: [".js", ".json"],
		modules: [path.join(__dirname, "src"), "node_modules"]
	},
	devServer: {
		host: "localhost",
		contentBase: path.join(__dirname, "build/"),
		port: PORT,
		open: true,
		hot: true,
		historyApiFallback: true,
		stats: "minimal",
		overlay: {
			warnings: true,
			errors: true
		}
	}
};
