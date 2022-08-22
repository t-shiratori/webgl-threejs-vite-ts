import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexSource from './shader/vertex.glsl?raw'
import fragmentSource from './shader/fragment.glsl?raw'

let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer

type TInRenderingTask = (time?: number) => void
const tasksInFrame: Map<string, TInRenderingTask> = new Map()

const clock = new THREE.Clock()

/* rendering
--------------------------------------*/
const frame = () => {
	const elapsedTime = clock.getElapsedTime()
	tasksInFrame.forEach((task) => task(elapsedTime))
	renderer.render(scene, camera)
	requestAnimationFrame(frame)
}

/* resize
--------------------------------------*/
const onResize = () => {
	const width = window.innerWidth
	const height = window.innerHeight
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(width, height)
	camera.aspect = width / height
	camera.updateProjectionMatrix()
}

const init = () => {
	/* scene
    --------------------------------------*/
	scene = new THREE.Scene()

	/* camera
    --------------------------------------*/
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.x = 50
	camera.position.y = 50
	camera.position.z = 100
	camera.lookAt(scene.position)

	renderer = new THREE.WebGLRenderer()
	renderer.setClearColor(new THREE.Color(0x000000))
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	// Geometry
	const boxGeometry = new THREE.BoxGeometry(40, 40, 40, 10, 10, 10)

	// Material
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

	// Mesh
	const mesh = new THREE.Mesh(boxGeometry, shaderMaterial)

	scene.add(mesh)

	const updateGeometry: TInRenderingTask = (time) => {
		mesh.material.uniforms.time.value = time
	}

	tasksInFrame.set('updateGeometry', updateGeometry)

	/* OrbitControls
    -------------------------------------------------------------*/
	const orbitControls = new OrbitControls(camera, renderer.domElement)
	orbitControls.autoRotate = false
	orbitControls.enableDamping = true
	orbitControls.dampingFactor = 0.12

	/* resize
    -------------------------------------------------------------*/
	window.addEventListener('resize', onResize)

	/* start animation
    -------------------------------------------------------------*/
	frame()
}

init()
