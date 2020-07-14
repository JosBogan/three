function init() {

  let scene, camera, renderer, cube
  const clicked = {
    clicked: false,
    coords: null
  }

  function initialiser() {

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
    renderer = new THREE.WebGLRenderer( { antialias: true } )


    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial( { color: 0xff00ff } )
    cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    camera.position.z = 5
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    renderer.render(scene, camera)

  }

  function clickEvent(event) {
    clicked.clicked = !clicked.clicked
    clicked.coords = [event.clientX, event.clientY]
    // console.log(clicked.coords)

  }

  function mouseMoveEvent(event) {
    if (clicked.clicked) {
      const newCoords = [event.clientX, event.clientY]
      const diff = [newCoords[0] - clicked.coords[0], newCoords[1] - clicked.coords[1]]
      // const diff = [clicked.coords[0] - newCoords[0], clicked.coords[1] - newCoords[1]]

      cube.rotation.x += diff[1] / 10000
      cube.rotation.y += diff[0] / 10000


    }
  }

  
  initialiser()
  animate()
  
  window.addEventListener('mousemove', mouseMoveEvent)
  window.addEventListener('mousedown', clickEvent)
  window.addEventListener('mouseup', clickEvent)
  window.addEventListener('resize', onWindowResize, false)

}

window.addEventListener('DOMContentLoaded', init)