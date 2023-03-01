// 引入THREE
import * as THREE from 'three'
// 创建场景
const scene = new THREE.Scene()
// 创建相机，透视相机（角度，宽高比，最近，最远）
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
// 将相机添加到场景中
scene.add(camera)

// 创建几何体，设置大小
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质，设置颜色
const cubeMetarial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材质创建立方体
const cube = new THREE.Mesh(cubeGeometry, cubeMetarial)
// 将立方体添加到场景中
scene.add(cube)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器的结果（canvas）添加到body
document.body.appendChild(renderer.domElement)

// 通过渲染器把相机看到的场景渲染出来
renderer.render(scene, camera)