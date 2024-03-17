import path from 'path'
import {fileURLToPath} from 'url'
import * as fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function isLabDirName(name) {
	return name.match(/\d+/)
}

const labs = fs.readdirSync(__dirname)
	.map(fileName => path.join(fileName))
	.filter(fileName => fs.statSync(fileName).isDirectory())
	.filter(fileName => isLabDirName(path.basename(fileName)))
	.flatMap(labPath =>
		fs.readdirSync(labPath)
			.map(fileName => path.join(labPath, fileName))
			.filter(taskPath => fs.statSync(taskPath).isDirectory())
			.filter(taskPath => isLabDirName(path.basename(taskPath)))
			.filter(taskPath => fs.readdirSync(taskPath).includes('index.ts'))
	)

console.log('======================labs======================')
console.log(labs)

export default labs.map(projectPath => ({
	entry: `./${projectPath}/index.ts`,
	mode: 'development',
	module: {
		rules: [
			{
				use: 'ts-loader',
				test: /\.ts$/,
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, projectPath),
	},
}))
