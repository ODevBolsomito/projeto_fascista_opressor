module.exports = {
	module: {
		rules: [
			{
				test: /\.imba$/,
				loader: 'imba/loader',
			}
		]
	},
	mode: 'development',
	resolve: {
		extensions: [".imba",".js", ".json"]
	},
	entry: "./src/client/App.imba",
	output: {  path: __dirname + '/dist', filename: "index.js" }
}