import * as THREE from 'three'

type TInRenderingTask = (time?: number) => void

type WorldProps = {
	scene: THREE.Scene
	camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
	renderer: THREE.WebGLRenderer
}

export class Stage {
	scene: THREE.Scene
	camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
	renderer: THREE.WebGLRenderer
	clock: THREE.Clock
	tasksInFrame: Map<string, TInRenderingTask> = new Map()

	constructor({ scene, camera, renderer }: WorldProps) {
		this.scene = scene
		this.camera = camera
		this.renderer = renderer
		this.clock = new THREE.Clock()
		window.addEventListener('resize', this.onResize)
	}

	addFrameTask = ({ taskName, task }: { taskName: string; task: TInRenderingTask }) => {
		this.tasksInFrame.set(taskName, task)
	}

	frame = () => {
		const { scene, camera, renderer, clock, tasksInFrame } = this
		const elapsedTime = clock.getElapsedTime()
		tasksInFrame.forEach((task) => task(elapsedTime))
		renderer.render(scene, camera)
		requestAnimationFrame(this.frame)
	}

	start = () => {
		this.frame()
	}

	onResize = () => {
		const { camera, renderer } = this
		const width = window.innerWidth
		const height = window.innerHeight
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
		if (camera.type === 'PerspectiveCamera') camera.aspect = width / height
		camera.updateProjectionMatrix()
	}
}
