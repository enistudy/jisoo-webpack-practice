const path = require("path");

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
	}
};
