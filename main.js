// imports
// globals
// create scene
// create origin objects - one for each section
// create materials
// import objects & create meshes
// create lights
// gsap animations
// () => mouse move 
// () => debug
// () => window resize
// () => animate

/*
######################################################
IMPORTS
######################################################
*/

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { TextureLoader } from 'three'
import {Text} from 'troika-three-text'


/*
######################################################
GLOBALS
######################################################
*/

gsap.registerPlugin(ScrollTrigger)

//importers
const objLoader = new OBJLoader()
const textureLoader = new TextureLoader()

//utilities
const pointer = new THREE.Vector2()
const Radians = THREE.MathUtils.degToRad

//event listeners
window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener('mousemove', onMouseMove, false)

/*
######################################################
SCENE
######################################################
*/

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
  antialias: true,
  alpha: true
})

scene.background = null

camera.position.set(0, 3, 30)

renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(innerWidth, innerHeight)



/*
######################################################
ORIGINS
######################################################
*/

// landing section origins
const origin = new THREE.Vector3(15, 2, 0)
const originRot = new THREE.Vector3(Radians(-55), Radians(-20), 0)

// defines an origin for the planet and rings with location and rotation
const planet_origin = new THREE.Object3D()
planet_origin.position.set(origin.x, origin.y, origin.z)
planet_origin.rotation.set(originRot.x, originRot.y, 0)

scene.add(planet_origin)

// defines an origin at the same location as the planet, but without rotation
const planet_light_origin = new THREE.Object3D()
planet_light_origin.position.set(origin.x, origin.y, origin.z)

scene.add(planet_light_origin)

// defines orgins for each of the moons at the location of the planet but able to rotate independantly
const red_moon_origin = new THREE.Object3D()
const green_moon_origin = new THREE.Object3D()
const metal_moon_origin = new THREE.Object3D()

// scripting section origins
const scripting_origin = new THREE.Object3D()
scripting_origin.position.set(-15, -50, 0)
scripting_origin.rotation.set(0, 0, 0)

scene.add(scripting_origin)

const scripting_light_origin = new THREE.Object3D()
scripting_origin.add(scripting_light_origin)

// automation section origins
const automation_origin = new THREE.Object3D()
automation_origin.position.set(15, -100, 0)

scene.add(automation_origin)

const automation_light_origin = new THREE.Object3D()
automation_origin.add(automation_light_origin)


// systems section origin
const systems_origin = new THREE.Object3D()
systems_origin.position.set(-15, -150, 0)

scene.add(systems_origin)

const systems_light_origin = new THREE.Object3D()
systems_origin.add(systems_light_origin)

// web section origin
const web_origin = new THREE.Object3D()
web_origin.position.set(15, -200, 0)

scene.add(web_origin)

const web_light_origin = new THREE.Object3D()
web_origin.add(web_light_origin)


/*
######################################################
MATERIALS
######################################################
*/

// landing section materials
let MAT_red = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  opacity: 0.75
})

let MAT_white = new THREE.MeshStandardMaterial({
  color: 0xffffff
})

let MAT_green = new THREE.MeshStandardMaterial({
  color: 0x5c614a
})

let MAT_metal = new THREE.MeshStandardMaterial({
  color: 0xadb2ba,
  metalness: 0.9,
  roughness: 0.40
})

// scripting section materials
const MAT_blue = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  roughness: 0.6
})
const MAT_yellow = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  roughness: 0.6
})

const MAT_orange = new THREE.MeshStandardMaterial({
  color: 0xff8000
})

// automation section materials
const MAT_black = new THREE.MeshStandardMaterial({
  color: 0x000000
})

/*
######################################################
MESHES
######################################################
*/

// landing section meshes
let planet = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  MAT_red
)
planet_origin.add(planet)

let ring1 = new THREE.Mesh(
  new THREE.RingGeometry(7, 9.5, 64, 6),
  MAT_white
)


let ring2 = new THREE.Mesh(
  new THREE.RingGeometry(10, 12, 64, 6),
  MAT_green
)

let ring3 = new THREE.Mesh(
  new THREE.RingGeometry(12.2, 12.5, 64, 6),
  MAT_metal
)

function addMoon(radius, pos, mat, origin) {
  let moon = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 16, 16),
    mat
  )

  moon.position.set(pos, 0, 0.5)
  origin.add(moon)

  return moon
}

let moon1 = addMoon(0.4, 7, MAT_green, green_moon_origin)
let moon2 = addMoon(0.6, 9.6, MAT_metal, metal_moon_origin)
let moon3 = addMoon(0.3, 13, MAT_red, red_moon_origin)

planet_origin.add(ring1, ring2, ring3)

red_moon_origin.rotation.z = THREE.MathUtils.randFloatSpread(Radians(360))
green_moon_origin.rotation.z = THREE.MathUtils.randFloatSpread(Radians(360))
metal_moon_origin.rotation.z = THREE.MathUtils.randFloatSpread(Radians(360))

planet_origin.add(red_moon_origin, green_moon_origin, metal_moon_origin)


// background text for landing section
const landing_text = new Text()
scene.add(landing_text)


landing_text.text = 'DEVELOPER'
landing_text.fontSize = 18
landing_text.anchorX = '50%'
landing_text.anchorY = '50%'
landing_text.position.x = 0
landing_text.position.y = 0
landing_text.position.z = -20
landing_text.color = 0x1d1d1d
landing_text.fillOpacity = 0.2

landing_text.scale.x = 1.5
landing_text.scale.y = 5.25

landing_text.sync()

// scripting section meshes

objLoader.load('objects/python.obj', (object) => {
  const geometry = object.children[0].geometry
  const mesh = new THREE.Mesh(
    geometry,
    [MAT_blue, MAT_yellow]
  )

  mesh.position.set(-6, 10, 0)
	scripting_origin.add(mesh)
})


objLoader.load('objects/bash.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/bash.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_metal])
	
  mesh.position.set(-8, -6, 0)
  mesh.scale.set(2, 2, 2)
  mesh.rotation.set(Radians(25), Radians(55), Radians(-25))
	scripting_origin.add(mesh)
})

objLoader.load('objects/javascript.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/javascript-logo.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_orange])
	
  mesh.position.set(13, -2, 0)
  mesh.scale.set(2, 2, 2)
  mesh.rotation.set(Radians(5), Radians(-25), 0)
	scripting_origin.add(mesh)
})

// background text for scripting section
const scripting_text = new Text()
scene.add(scripting_text)


scripting_text.text = 'SCRIPTING'
scripting_text.fontSize = 18
scripting_text.anchorX = '50%'
scripting_text.anchorY = '50%'
scripting_text.position.x = 0
scripting_text.position.y = -50
scripting_text.position.z = -20
scripting_text.color = 0x1d1d1d
scripting_text.fillOpacity = 0

scripting_text.scale.x = 1.5
scripting_text.scale.y = 5.25

scripting_text.sync()

// automation section meshes


objLoader.load('objects/ansible.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/ansible-logo.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_metal])
	
  mesh.position.set(-4, 10, 0)
  mesh.scale.set(3, 3, 3)
	automation_origin.add(mesh)
})

objLoader.load('objects/puppet.obj', (object) => {
	const geometry = object.children[0].geometry
	const mesh = new THREE.Mesh(geometry, MAT_orange)
	
  mesh.position.set(15, 3, 0)
	automation_origin.add(mesh)
})


objLoader.load('objects/python.obj', (object) => {
  const geometry = object.children[0].geometry
  const mesh = new THREE.Mesh(
    geometry,
    [MAT_blue, MAT_yellow]
  )

  mesh.position.set(-4, -10, 0)
  mesh.scale.set(1.5, 1.5, 1.5)
  mesh.rotation.set(Radians(-5), Radians(-15), 0)
	automation_origin.add(mesh)
})

// background text for automation section
const automation_text = new Text()
scene.add(automation_text)


automation_text.text = 'AUTOMATION'
automation_text.fontSize = 18
automation_text.anchorX = '50%'
automation_text.anchorY = '50%'
automation_text.position.x = 0
automation_text.position.y = -100
automation_text.position.z = -20
automation_text.color = 0x1d1d1d
automation_text.fillOpacity = 0

automation_text.scale.x = 1.25
automation_text.scale.y = 5.25

automation_text.sync()

// systems section meshes

objLoader.load('objects/ssa-02.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/ssa.png')
	})

	const mesh = new THREE.Mesh(geometry, [MAT_metal, mat_texture])
	
  mesh.position.set(5, 0, 10)
  mesh.scale.set(2.5, 2.5, 2.5)

	systems_origin.add(mesh)
})

objLoader.load('objects/lambda.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/lambda.png')
	})

	const mesh = new THREE.Mesh(geometry, [MAT_metal, mat_texture])
	
  mesh.position.set(13, 8, 2)
  mesh.scale.set(2, 2, 2)
	systems_origin.add(mesh)
})

objLoader.load('objects/route-53.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/route53.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_metal])
	
  mesh.position.set(-11, 7, 2)
  mesh.scale.set(2, 2, 2)
	systems_origin.add(mesh)
})

objLoader.load('objects/s3.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/s3.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_metal])
	
  mesh.position.set(-12, -6, 2)
  mesh.scale.set(2, 2, 2)
	systems_origin.add(mesh)
})

objLoader.load('objects/sqs.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/sqs.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_metal])
	
  mesh.position.set(12, -6, 2)
  mesh.scale.set(2, 2, 2)

	systems_origin.add(mesh)
})

// background text for systems section
const systems_text = new Text()
scene.add(systems_text)


systems_text.text = 'SYSTEMS DESIGN'
systems_text.fontSize = 18
systems_text.anchorX = '50%'
systems_text.anchorY = '50%'
systems_text.position.x = 0
systems_text.position.y = -150
systems_text.position.z = -20
systems_text.color = 0x1d1d1d
systems_text.fillOpacity = 0

systems_text.scale.x = 1
systems_text.scale.y = 5.25

systems_text.sync()

// web section meshes

objLoader.load('objects/css.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/css-logo.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_blue])
	
  mesh.position.set(7, -3, 5)
  mesh.scale.set(2, 2, 2)
	web_origin.add(mesh)
})

objLoader.load('objects/html.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/html-logo.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_red])
	
  mesh.position.set(-10, 10, 5)
  mesh.scale.set(2, 2, 2)
	web_origin.add(mesh)
})

objLoader.load('objects/javascript.obj', (object) => {
	
	const geometry = object.children[0].geometry
	const mat_texture = new THREE.MeshStandardMaterial({
		map: textureLoader.load('textures/javascript-logo.png')
	})

	const mesh = new THREE.Mesh(geometry, [mat_texture, MAT_orange])
	
  mesh.position.set(-6, -12, 5)
  mesh.scale.set(2, 2, 2)
	web_origin.add(mesh)
})

objLoader.load('objects/p5.obj', (object) => {
	
	const geometry = object.children[0].geometry
	

	const mesh = new THREE.Mesh(geometry, MAT_red)
	
  mesh.position.set(-13, -3, 5)
  mesh.scale.set(2, 2, 2)
  mesh.rotation.set(0, Radians(180), 0)
	web_origin.add(mesh)
})

objLoader.load('objects/three.obj', (object) => {
	
	const geometry = object.children[0].geometry

	const mesh = new THREE.Mesh(geometry, MAT_metal)
	
  mesh.position.set(8, 12, 0)
  mesh.rotation.set(0, Radians(180), 0)
	web_origin.add(mesh)
})

// background text for web section
const web_text = new Text()
scene.add(web_text)


web_text.text = 'WEB DESIGN'
web_text.fontSize = 18
web_text.anchorX = '50%'
web_text.anchorY = '50%'
web_text.position.x = 0
web_text.position.y = -200
web_text.position.z = -20
web_text.color = 0x1d1d1d
web_text.fillOpacity = 0

web_text.scale.x = 1.4
web_text.scale.y = 5.25

web_text.sync()

// background text for contact section
const contact_text = new Text()
scene.add(contact_text)


contact_text.text = 'CONTACT'
contact_text.fontSize = 18
contact_text.anchorX = '50%'
contact_text.anchorY = '50%'
contact_text.position.x = 0
contact_text.position.y = -250
contact_text.position.z = -20
contact_text.color = 0x1d1d1d
contact_text.fillOpacity = 0

contact_text.scale.x = 1.75
contact_text.scale.y = 5.25

contact_text.sync()

/*
######################################################
LIGHTS
######################################################
*/

// landing section lights 
const planet_keyLight = new THREE.SpotLight(0xe0ecff, 0.41) //0.41
const planet_fillLight = new THREE.SpotLight(0xfff3e0, 1.1) //1.1
const planet_rimLight = new THREE.SpotLight(0xc7e7ff, 2) //2

planet_keyLight.position.set(-4, 30, -21.75)
planet_keyLight.penumbra = 1
planet_keyLight.target = planet

planet_fillLight.position.set(-19.75, 26.5, 30)
planet_fillLight.target = planet

planet_rimLight.position.set(25.75, -23.75, -28.25)
planet_rimLight.target = planet

planet_light_origin.add(planet_keyLight, planet_fillLight, planet_rimLight)

// scripting section lights
const scripting_keyLight = new THREE.SpotLight(0xe0ecff, 0) //1.38
const scripting_fillLight = new THREE.SpotLight(0xfff3e0, 0) //0.91
const scripting_rimLight = new THREE.SpotLight(0xc7e7ff, 0) //1.69

scripting_keyLight.position.set(39.75, 51.25, 50)
scripting_keyLight.penumbra = 1
scripting_keyLight.target = scripting_origin

scripting_fillLight.position.set(-37.25, -33, 30)
scripting_fillLight.target = scripting_origin

scripting_rimLight.position.set(-5.75, 33.25, -50)
scripting_rimLight.target = scripting_origin

scripting_light_origin.add(scripting_keyLight, scripting_fillLight, scripting_rimLight)

// automation section lights
const automation_keyLight = new THREE.SpotLight(0xe0ecff, 0.73) //0.41
const automation_fillLight = new THREE.SpotLight(0xfff3e0, 0) //1.1
const automation_rimLight = new THREE.SpotLight(0xc7e7ff, 0) //2

automation_keyLight.position.set(50, 76.5, 23.5)
automation_keyLight.penumbra = 1
automation_keyLight.target = automation_origin

automation_fillLight.position.set(-21, -10, 44)
automation_fillLight.target = automation_origin

automation_rimLight.position.set(25.75, -23.75, -30.75)
automation_rimLight.target = automation_origin

automation_light_origin.add(automation_keyLight, automation_fillLight, automation_rimLight)

// systems section lights
const systems_keyLight = new THREE.SpotLight(0xe0ecff, 0) //0.69
const systems_fillLight = new THREE.SpotLight(0xfff3e0, 0) //0.58
const systems_rimLight = new THREE.SpotLight(0xc7e7ff, 0) //0.23

systems_keyLight.position.set(-37.25, 16, 40.75)
systems_keyLight.penumbra = 1
systems_keyLight.target = systems_origin

systems_fillLight.position.set(6.25, -23, 30)
systems_fillLight.target = systems_origin

systems_rimLight.position.set(25.75, -1.5, -50)
systems_rimLight.target = systems_origin

systems_light_origin.add(systems_keyLight, systems_fillLight, systems_rimLight)

// web section lights
const web_keyLight = new THREE.SpotLight(0xe0ecff, 0) //1.1
const web_fillLight = new THREE.SpotLight(0xfff3e0, 0) //0.78
const web_rimLight = new THREE.SpotLight(0xc7e7ff, 0) //0.23


web_keyLight.position.set(-50, 200, 50)
web_keyLight.penumbra = 1
web_keyLight.target = web_origin

web_fillLight.position.set(-10, -10, 50)
web_fillLight.target = web_origin

web_rimLight.position.set(-34, -49.25, -50)
web_rimLight.target = web_origin

web_light_origin.add(web_keyLight, web_fillLight, web_rimLight)

/*
######################################################
GSAP TIMELINES
######################################################
*/


// landing animations
const landing_tl = gsap.timeline({
  scrollTrigger: {
      trigger: "#section-landing",
      start: "top top",
      end: "+=80%",
      onEnterBack: () => {
        planet_origin.position.setY(2)
        planet_light_origin.position.setY(2)
      },
      scrub: 1,

  }
})

// scripting animation
const scripting_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-scripting",
    end: "+=100%",
    scrub: 1 
  }
})

scripting_tl.to(scripting_keyLight, {
  intensity: 1.38,
  duration: 0.5,
  delay: "<"
})

scripting_tl.to(scripting_fillLight, {
  intensity: 0.91,
  duration: 0.5,
  delay: "<"
})

scripting_tl.to(scripting_rimLight, {
  intensity: 1.69,
  duration: 0.5,
  delay: "<"
})

scripting_tl.to(camera.position, {
  y: -50,
  duration: 3
})

scripting_tl.to(landing_text.position, {
  y: 50,
  duration: 1,
  delay: "<"
})

scripting_tl.to(planet_keyLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

scripting_tl.to(planet_fillLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

scripting_tl.to(planet_rimLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})



// automation animation
const automation_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-automation",
    end: "+=100%",
    scrub: 1
  }
})

automation_tl.to(scripting_text, {
  fillOpacity: 0.2,
  duration: 0.5,
  delay: "<"
})

automation_tl.to(automation_keyLight, {
  intensity: 1.53,
  duration: 0.5,
  delay: "<"
})

automation_tl.to(automation_fillLight, {
  intensity: 0.73,
  duration: 0.5,
  delay: "<"
})

automation_tl.to(automation_rimLight, {
  intensity: 1.14,
  duration: 0.5,
  delay: "<"
})

automation_tl.to(camera.position, {
  y: -100,
  duration: 3
})

automation_tl.to(scripting_text.position, {
  y: 50,
  duration: 1,
  delay: "<"
})

automation_tl.to(scripting_keyLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

automation_tl.to(scripting_fillLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

automation_tl.to(scripting_rimLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

// systems animation

const systems_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-systems",
    end: "+=100%",
    scrub: 1
  }
})

systems_tl.to(automation_text, {
  fillOpacity: 0.2,
  duration: 0.5,
  delay: "<"
})

systems_tl.to(systems_keyLight, {
  intensity: 0.69,
  duration: 1,
  delay: "<"
})

systems_tl.to(systems_fillLight, {
  intensity: 0.58,
  duration: 1,
  delay: "<"
})

systems_tl.to(systems_rimLight, {
  intensity: 0.23,
  duration: 1,
  delay: "<"
})

systems_tl.to(camera.position, {
  y: -150,
  duration: 3
})

systems_tl.to(automation_text.position, {
  y: 50,
  duration: 1,
  delay: "<"
})

systems_tl.to(automation_keyLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

systems_tl.to(automation_fillLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

systems_tl.to(automation_rimLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})


// web animation

const web_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-web",
    end: "+=100%",
    scrub: 1
  }
})

web_tl.to(systems_text, {
  fillOpacity: 0.2,
  duration: 0.5,
  delay: "<"
})

web_tl.to(web_keyLight, {
  intensity: 1.1,
  duration: 1,
  delay: "<"
})

web_tl.to(web_fillLight, {
  intensity: 0.78,
  duration: 1,
  delay: "<"
})

web_tl.to(web_rimLight, {
  intensity: 0.23,
  duration: 1,
  delay: "<"
})

web_tl.to(camera.position, {
  y: -200,
  duration: 3
})

web_tl.to(systems_text.position, {
  y: 50,
  duration: 1,
  delay: "<"
})

web_tl.to(systems_keyLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

web_tl.to(systems_fillLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

web_tl.to(systems_rimLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

// contact animation

const contact_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-contact",
    end: "+=100%",
    pinSpacing: false,
    onToggle: () => {
      planet_origin.position.setY(-250)
      planet_light_origin.position.setY(-250)
    },
    scrub: 1
  }
})

contact_tl.to(web_text, {
  fillOpacity: 0.2,
  duration: 0.5,
  delay: "<"
})

contact_tl.to(planet_keyLight, {
  intensity: 0.41,
  duration: 1,
  delay: "<"
})

contact_tl.to(planet_fillLight, {
  intensity: 1.1,
  duration: 1,
  delay: "<"
})

contact_tl.to(planet_rimLight, {
  intensity: 2,
  duration: 1,
  delay: "<"
})

contact_tl.to(camera.position, {
  y: -250,
  duration: 3
})

contact_tl.to(web_text.position, {
  y: 50,
  duration: 1,
  delay: "<"
})

contact_tl.to(web_keyLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

contact_tl.to(web_fillLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

contact_tl.to(web_rimLight, {
  intensity: 0,
  duration: 1,
  delay: "<"
})

contact_tl.to(contact_text, {
  fillOpacity: 0.2,
  duration: 0.5,
  delay: "<"
})


/*
######################################################
FUNCTIONS
######################################################
*/



function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function onMouseMove(event) {
  pointer.x = (event.clientX / innerWidth ) * 2 - 1
  pointer.y = (event.clientY / innerHeight) * 2 - 1
}



function animate() {
  scene.position.x += ( pointer.x - scene.position.x ) * 0.075;
	scene.position.y += ( - ( pointer.y ) - scene.position.y ) * 0.075;

  red_moon_origin.rotation.z += 0.01
  green_moon_origin.rotation.z += 0.005
  metal_moon_origin.rotation.z -= 0.015
  
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

