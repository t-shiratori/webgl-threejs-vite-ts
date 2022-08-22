import './style.css'
import * as THREE from 'three'
import vertexSource from './shader/vertex.glsl?raw'
import fragmentSource from './shader/fragment.glsl?raw'
import { Stage } from './stage'

/* scene
--------------------------------------*/
const scene = new THREE.Scene()

/* camera
--------------------------------------*/
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 50
camera.position.y = 50
camera.position.z = 100
camera.lookAt(scene.position)

/* renderer
--------------------------------------*/
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

/* Geometry
--------------------------------------*/
const boxGeometry = new THREE.BoxGeometry(40, 40, 40, 10, 10, 10)

/* Material
--------------------------------------*/
const shaderMaterial = new THREE.RawShaderMaterial({
	uniforms: {
		time: {
			value: 0,
		},
		mouse: {
			value: {
				x: 0.0,
				y: 0.0,
			},
		},
		resolution: {
			value: {
				x: 0.0,
				y: 0.0,
			},
		},
		radius: {
			value: 30.0,
		},
	},
	vertexShader: vertexSource,
	fragmentShader: fragmentSource,
	wireframe: true,
})

/* Mesh
--------------------------------------*/
const mesh = new THREE.Mesh(boxGeometry, shaderMaterial)
scene.add(mesh)

const updateShader = (time?: number) => {
	mesh.material.uniforms.time.value = time
}

/* Stage
--------------------------------------*/
const stage = new Stage({ scene, camera, renderer })
stage.addFrameTask({ taskName: 'updateShader', task: updateShader })
stage.start()
