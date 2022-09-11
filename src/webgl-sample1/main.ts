import './style.css'
import vertexSource from './shader/vertex.glsl?raw'
import fragmentSource from './shader/fragment.glsl?raw'
import { WebGL } from '../common/webgl'

const attribLoacations: { vPositionLocation: number } = { vPositionLocation: 0 }
let vertexBuffer: WebGLBuffer | null = null
let indexBuffer: WebGLBuffer | null = null

const vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0]
const indices = [0, 1, 2, 0, 2, 3]

const webgl = new WebGL({ elementId: 'canvas', vertexSource, fragmentSource })

console.log('webgl: ', webgl)

const settingData = () => {
	if (!webgl.gl2 || !webgl.program) return

	attribLoacations.vPositionLocation = webgl.gl2.getAttribLocation(webgl.program, 'vPosition')

	vertexBuffer = webgl.gl2.createBuffer()
	webgl.gl2.bindBuffer(webgl.gl2.ARRAY_BUFFER, vertexBuffer)
	webgl.gl2.bufferData(webgl.gl2.ARRAY_BUFFER, new Float32Array(vertices), webgl.gl2.STATIC_DRAW)

	indexBuffer = webgl.gl2.createBuffer()
	webgl.gl2.bindBuffer(webgl.gl2.ELEMENT_ARRAY_BUFFER, indexBuffer)
	webgl.gl2.bufferData(webgl.gl2.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), webgl.gl2.STATIC_DRAW)

	webgl.gl2.bindBuffer(webgl.gl2.ARRAY_BUFFER, null)
	webgl.gl2.bindBuffer(webgl.gl2.ELEMENT_ARRAY_BUFFER, null)
}

const draw = () => {
	if (!webgl.gl2) return
	webgl.gl2.clearColor(0, 0, 0, 1)
	webgl.gl2.clear(webgl.gl2.COLOR_BUFFER_BIT | webgl.gl2.DEPTH_BUFFER_BIT)
	webgl.gl2.viewport(0, 0, webgl.gl2.canvas.width, webgl.gl2.canvas.height)

	webgl.gl2.bindBuffer(webgl.gl2.ARRAY_BUFFER, vertexBuffer)
	webgl.gl2.vertexAttribPointer(attribLoacations.vPositionLocation, 3, webgl.gl2.FLOAT, false, 0, 0)
	webgl.gl2.enableVertexAttribArray(attribLoacations.vPositionLocation)

	webgl.gl2.bindBuffer(webgl.gl2.ELEMENT_ARRAY_BUFFER, indexBuffer)

	webgl.gl2.drawElements(webgl.gl2.TRIANGLES, indices.length, webgl.gl2.UNSIGNED_SHORT, 0)

	webgl.gl2.bindBuffer(webgl.gl2.ARRAY_BUFFER, null)
	webgl.gl2.bindBuffer(webgl.gl2.ELEMENT_ARRAY_BUFFER, null)
}

settingData()
draw()

export {}
