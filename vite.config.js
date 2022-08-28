import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
	root,
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				'webgl-sample1': resolve(root, 'webgl-sample1', 'index.html'),
				'threejs-sample1': resolve(root, 'threejs-sample1', 'index.html'),
			},
		},
	},
})
