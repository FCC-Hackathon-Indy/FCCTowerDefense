var path = require('path')
var glob = require('glob')
module.exports = {
	entry: ['./src/game.js'],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, './build')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},

			{
		        test: /\.(png|gif|jpe?g)$/,
		        loader: 'file-loader?name=/assets/[name].[ext]'
   			}
		]
	},
	resolve: {
		extensions: ['.js']
	}
}