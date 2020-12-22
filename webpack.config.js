const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); // Comes with Webpack5
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
	// Check if in development mode
	function isDevelopment() {
		return argv.mode === "development";
	}

	return {
		entry: {
			editor: "./src/editor.js", // Editor only script
			script: "./src/scripts.js", // Frontend + Editor script
		},

		output: {
			filename: "[name].js", // [name] indicates dynamic file name
			path: path.resolve(process.cwd(), "dist"),
		},

		plugins: [
			new CleanWebpackPlugin(),
			// Extract CSS into separate files
			new MiniCssExtractPlugin({
				chunkFilename: "[id].css", // In order to pass function as filename
				filename: (chunkData) =>
					chunkData.chunk.name === "script" ? "style.css" : "[name].css",
			}),
		],

		module: {
			rules: [
				// Babel Loader
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "babel-loader",
							options: {
								presets: [
									"@babel/preset-env", // Respect package.json browserslist
									[
										"@babel/preset-react",
										{
											pragma: "wp.element.createElement",
											pragmaFrag: "wp.element.Fragment",
											development: isDevelopment(),
										},
									],
								],
							},
						},
						"eslint-loader", // Lint files before babel
					],
				},

				// Sass, css, & style loader
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader, // Replace style-loader
						"css-loader", // Resolve imports
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: ["postcss-preset-env"], // Include autoprefixer, respect package.json browserslist
								},
							},
						},
						"sass-loader",
					],
				},
			],
		},

		// Minimize output JS & CSS
		optimization: {
			minimize: !isDevelopment(),
			minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
		},

		// Source Maps
		devtool: isDevelopment() ? "cheap-module-source-map" : "source-map",

		// Skip bundling: Look for global variable instead of node_modules
		externals: {
			jquery: "jQuery",
			"@wordpress/blocks": ["wp", "blocks"],
			"@wordpress/i18n": ["wp", "i18n"],
		},
	};
};
