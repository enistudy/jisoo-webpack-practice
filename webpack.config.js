const path = require("path");

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		app: "./index.js"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].bundle.js"
	}
};
