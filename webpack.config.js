const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
let WebpackNotifierPlugin;

const config = require('./config.js');
const pck = require('./package.json');

config.client.version = pck.version;

const replacements = {
	'config.js': () => config,
	'client.config.js': () => {
		return {version: pck.version, backendUrl: config.server.backendUrl, devMode: config.client.devMode}
	}
};

// config for client & server app

const defaultConfig = () => {
	return {
		// https://webpack.github.io/docs/configuration.html#devtool
		devtool: config.webpack.sourcemaps ? 'source-map' : undefined,
		context: __dirname,
		resolve: {
			extensions: ['*', '.ts', '.js']
		},
		output: {
			publicPath: path.resolve(__dirname),
			filename: 'index.js'
		},
		module: {
			loaders: [
				{test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader']},
				{test: /\.html$/, loader: 'raw-loader'},
				{test: /\.json$/, loader: 'raw-loader'}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				// do not use an object for 'process.env' otherwise all other environment
				// variables are set to 'undefined' see issue #291
				'process.env.NODE_ENV': JSON.stringify(config.webpack.debug ? 'development' : 'production'),
				'process.env.AOT': false
			}),
			new webpack.ContextReplacementPlugin(
				/@angular(\\|\/)core(\\|\/)/,
				root('../src'),
				{}
			),
			new webpack.optimize.OccurrenceOrderPlugin(true),
			new webpack.LoaderOptionsPlugin({
				minimize: config.webpack.minimize,
				debug: config.webpack.debug
			})
		]
	};
};

// config for client app

const clientConfig = () => {
	let plugins = [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'polyfills',
			chunks: ['polyfills']
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'polyfills_ie',
			chunks: ['polyfills_ie']
		}),
		new webpack.optimize.CommonsChunkPlugin({
			// filename: 'vendor.js',
			// minChunks: Infinity,
			name: 'vendor',
			chunks: ['app'],
			minChunks: module => /node_modules/.test(module.resource)
		}),
		new webpack.NormalModuleReplacementPlugin(
			/zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
			root('empty.js')
		),
		new webpack.ContextReplacementPlugin(/rxjs[\/\\]testing/, /nope/),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de.js|it/)
	];
	if (config.client.devMode) {
		if (!WebpackNotifierPlugin) {
			WebpackNotifierPlugin = require('webpack-notifier');
		}
		plugins.push(new WebpackNotifierPlugin({title: "Opentender Client Build", alwaysNotify: true}));
	}
	if (config.webpack.minimize) {
		plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
		plugins.push(new PurifyPlugin());
		plugins.push(new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			output: {
				comments: false
			},
			mangle: {
				screw_ie8: true
			},
			compress: {
				loops: true,
				comparisons: true,
				conditionals: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
				screw_ie8: true,
				sequences: true,
				unused: true,
				negate_iife: false, // we need this for lazy v8
				warnings: false
			},
			sourceMap: config.webpack.sourcemaps
		}));
		plugins.push(
			new CompressionPlugin({
				asset: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.(js|html)$/,
				threshold: 10240,
				minRatio: 0.8
			})
		);
	}

	if (config.webpack.analyze) {
		plugins.push(new BundleAnalyzerPlugin({
			analyzerMode: 'static', // server|disabled|static
			reportFilename: '../reports/report.html',
			openAnalyzer: false,
			generateStatsFile: true,
			statsFilename: '../reports/stats.json',
		}));
	}

	return {
		target: 'web',
		entry: {
			app: './src/client/client',
			polyfills: './src/client/polyfills',
			polyfills_ie: './src/client/polyfills_ie'
		},
		recordsPath: root('webpack.records.json'),
		output: {
			path: root('dist/client'),
			filename: '[name].js'
		},
		plugins: plugins,
		externals: (context, request, cb) => {
			if (request.indexOf('.json') >= 0 && request.charAt(0) === '.') {
				// console.log(context, request);
				return fs.readFile(context + request.slice(1), (err, result) => {
					result = JSON.parse(result.toString());
					return cb(null, 'var ' + JSON.stringify(result));
				});
			}
			cb();
		},

		node: {
			global: true,
			crypto: 'empty',
			__dirname: true,
			__filename: true,
			process: true,
			Buffer: false
		}
	};
};

// config for server app

const serverConfig = () => {
	return {
		target: 'node',
		entry: './src/server/server', // use the entry file of the node server if everything is ts rather than es5
		output: {
			path: root('dist/server'),
			libraryTarget: 'commonjs2'
		},
		externals: (context, request, cb) => {
			let replacement = replacements[request];
			if (replacement) {
				return cb(null, 'var ' + JSON.stringify(replacement()));
			}
			if (request.indexOf('.json') >= 0 && request.charAt(0) === '.') {
				return fs.readFile(context + request.slice(1), (err, result) => {
					result = JSON.parse(result.toString());
					return cb(null, 'var ' + JSON.stringify(result));
				});
			}
			if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
				return cb(null, 'commonjs ' + request);
			}
			cb();
		},
		node: {
			global: true,
			crypto: true,
			__dirname: true,
			__filename: true,
			process: true,
			Buffer: true
		}
	};
};

// config for css

const styleConfig = () => {
	return {
		target: 'node',
		entry: './src/style/style.scss',
		output: {
			path: root('dist/style'),
			filename: '_style.js'
		},
		devtool: config.webpack.sourcemaps ? 'source-map' : undefined,
		context: __dirname,
		resolve: {
			extensions: ['.scss']
		},
		module: {
			loaders: [
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: ExtractTextPlugin
					.extract({
						use: [
							{
								loader: 'css-loader',
								query: {
									modules: false,
									minimize: config.webpack.minimize,
									sourceMap: config.webpack.sourcemaps,
									importLoaders: 2,
									localIdentName: '[name]__[local]___[hash:base64:5]'
								}
							},
							// {loader: 'postcss-loader'},
							{loader: 'sass-loader', query: {sourceMaps: config.webpack.sourcemaps}}
						]
					})
				},
				{
					test: /\.(woff|woff2|ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader?name=res/[name].[ext]?[hash]'
				}
			]
		},
		plugins: [
			new ExtractTextPlugin("style.css")
		]
	};
};

// Helpers

function root(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [__dirname].concat(args));
}

module.exports = [
	// Style
	styleConfig(),
	// Client
	webpackMerge({}, defaultConfig(), clientConfig()),
	// Server
	webpackMerge({}, defaultConfig(), serverConfig())
];
