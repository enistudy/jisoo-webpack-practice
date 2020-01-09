const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		app: "./index.js"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public/index.html"),
			filename: path.join(__dirname, "build/index.html"),
			inject: true
		})
	]
};
