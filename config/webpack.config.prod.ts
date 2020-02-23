/*
 * @Author: Mr.zheng
 * @Date: 2019-12-04 10:10:00
 * @LastEditors: Mr.zheng
 * @LastEditTime: 2019-12-04 10:10:00
 * @Description: webpack打包文件
 */
import path from 'path'
import merge from 'webpack-merge'
const webpackCommon = require('./webpack.config.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除上一次打包后的旧版文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css单独打包出来
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin") // 压缩css，将多余的css注释和重复代码去除
const ROOT_PATH = process.cwd(); // 获取到当前node运行的进程目录
const DIST_PATH = path.resolve(ROOT_PATH, "build"); // 获取到dist目录
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 显示进度条
const chalk = require('react-dev-utils/chalk')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 压缩一ES6
import Config from '../web.config'

module.exports = merge(webpackCommon, {
	mode: 'production',
	entry: {
		build: path.resolve(process.cwd(), 'src/index.tsx'),
		vendor: Config.Vendor
	},
	output: {
		path: DIST_PATH,
		filename: "static/js/[name].[hash].js"
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				// 使用 'style-loader','css-loader'
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer'),
							]
						}
					},
					'sass-loader',
				]
			},
		]
	},
	// configureWebpack: {
		performance: {
			hints:false
		},
	// },
	externals: { // 配置通过第三方cdn引入
	},
	optimization: { // 分包
		splitChunks: {
			chunks: 'async',
			cacheGroups: {
				vendors: {
					test: /node_modules/,
					name: 'vendors',
					priority: -10,
				},
				common: {
					name: 'common',
					minChunks: 2,
					minSize: 30,
					chunks: 'all'
				}
			}
		},
		
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	plugins: [
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
			clear: false
		}),
		new CleanWebpackPlugin(), // 清除上一次打包后的旧版文件
		new MiniCssExtractPlugin({
			// 与webpackoptions.output中相同选项类似的选项
			// 两个选项都是可选的
			filename: 'static/css/[id].[hash].css',
			chunkFilename: 'static/css/[id].[hash].css'
		}),
		new OptimizeCSSAssetsPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(process.cwd(), "public/server.js"),
				to: path.resolve(process.cwd(), "build"),
				ignore: ['.*']
			}
		])
	]
}) 