// 引入THREE
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//导入gsap动画库
import gsap from 'gsap'
// 导入dat.gui
import * as dat from 'dat.gui'
// 创建场景
const scene = new THREE.Scene()
// 创建相机，透视相机（角度，宽高比，最近，最远）
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
// 设置相机位置
camera.position.set(10, 10, 10)
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


// 创建轨道控制器，设置阻尼
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

// 创建坐标轴辅助器，并设置大小
const axesHelper = new THREE.AxesHelper(5)
// 将坐标轴辅助器添加到场景中
scene.add(axesHelper)

// gsap控制动画修改属性
gsap.to(cube.position, {
    x: 5, paused: true, duration: 2, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 2,
    onStart: () => {
        console.log("动画开始")
    },
    onComplete: () => {
        console.log("动画完成")
    },
})

// 监听窗口变化
window.addEventListener('resize', () => {
    // 修改摄像头宽高比
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置渲染器的像素比
    // renderer.setPixelRatio(window.devicePixelRatio)
})


// 实时渲染函数
function render() {
    // 轨道控制器设置阻尼生效
    orbitControls.update()
    // 通过渲染器把相机看到的场景渲染出来    
    renderer.render(scene, camera)
    // 注册下一帧的渲染
    requestAnimationFrame(render)
}
// 实时渲染
render()

const gui = new dat.GUI()
gui.add(cube.position, "x").min(0).max(5).step(0.01).name("移动x轴")
    .onChange((value) => {
        console.log("chaonChangenge-x", value)
    }).onFinishChange((value) => {
        console.log("onFinishChange-x", value)
    })

gui.addColor({ color: "#ffff00" }, "color").name("立方体颜色")
    .onChange((value) => {
        console.log("chaonChangenge-x", value)
        cubeMetarial.color.set(value)
    }).onFinishChange((value) => {
        console.log("onFinishChange-x", value)
    })

gui.add(cube, 'visible').name('是否显示')
gui.add(cubeMetarial, 'wireframe').name('是否显示线框')
const folder = gui.addFolder("函数")
folder.add({ fn: () => { console.log("do something") } }, "fn").name("执行函数")