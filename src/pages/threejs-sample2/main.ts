import './style.css'
import * as THREE from 'three'
import vertexSource from './shader/vertex.glsl?raw'
import fragmentSource from './shader/fragment.glsl?raw'
import { Stage } from '../../common/stage'

/* scene
--------------------------------------*/
const scene = new THREE.Scene()

/* camera
--------------------------------------*/
const camera = new THREE.OrthographicCamera(
  -window.innerWidth / 2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  -window.innerHeight / 2,
  0,
  0.1,
)

/* renderer
--------------------------------------*/
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

/* Geometry
--------------------------------------*/
const planeBufferGeometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight)

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
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
  },
  vertexShader: vertexSource,
  fragmentShader: fragmentSource,
})

/* Mesh
--------------------------------------*/
const mesh = new THREE.Mesh(planeBufferGeometry, shaderMaterial)
scene.add(mesh)

/* Stage
--------------------------------------*/
const stage = new Stage({ scene, camera, renderer })
stage.start()
