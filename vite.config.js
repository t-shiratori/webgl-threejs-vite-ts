import * as fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const pages = resolve(__dirname, 'src', 'pages')
const outDir = resolve(__dirname, 'dist')

// 各ページのディレクトリ名のリストを取得
const pageDirNameList = fs.readdirSync(pages)
console.log('pageDirNameList:', pageDirNameList)

// rollupOptions用のコンフィグを作成
const pageConfig = pageDirNameList.reduce((arr, pageName) => {
	arr[pageName] = resolve(root, 'pages', pageName, 'index.html')
	return arr
}, {})

// 各ページ遷移用リストのHTMLを作成
const paheListHtml = pageDirNameList
	.map((pageName) => `<li><a target="_blank" href="./pages/${pageName}/index.html">${pageName}</a></li>`)
	.join('')

// rollupのプラグインを定義
// index.htmlを書き換える。各ページのリンクリストを差し込む。
const htmlPlugin = () => {
	return {
		name: 'html-transform',
		transformIndexHtml(html) {
			return html.replace(/<ul id="pageIndex"><\/ul>/, `<ul id="pageIndex">${paheListHtml}</ul>`)
		},
	}
}

// Viteのコンフィグを定義
export default defineConfig({
	root,
	build: {
		outDir,
		rollupOptions: {
			input: {
				main: resolve(root, 'index.html'),
				...pageConfig,
			},
		},
	},
	plugins: [htmlPlugin()],
})
