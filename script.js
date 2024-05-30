// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create a room (1000 sqft = approximately 31.62 x 31.62 ft)
const roomSize = Math.sqrt(1000); // ~31.62 ft

// Create floor
// const floorGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
// const floorTexture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
// floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
// floorTexture.repeat.set(10, 10);
// const floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });
// const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.rotation.x = -Math.PI / 3;
// scene.add(floor);

// Create walls
const wallGeometry = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const walls = new THREE.Mesh(wallGeometry, wallMaterial);
scene.add(walls);

// Position the camera outside the room
camera.position.set(roomSize * 1.5, roomSize * 1.5, roomSize * 1.5);
camera.lookAt(scene.position);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Function to create a random object
function createRandomObject() {
    const geometries = [
        new THREE.BoxGeometry(Math.random() * 2 + 1, Math.random() * 2 + 1, Math.random() * 2 + 1),
        new THREE.SphereGeometry(Math.random() * 1.5 + 0.5, 32, 32),
        new THREE.CylinderGeometry(Math.random() * 1 + 0.5, Math.random() * 1 + 0.5, Math.random() * 2 + 1, 32)
    ];

    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
    const object = new THREE.Mesh(geometry, material);

    // Set random position within the room
    object.position.set(
        (Math.random() - 0.5) * roomSize,
        (Math.random() - 0.5) * roomSize * 0.5,
        (Math.random() - 0.5) * roomSize
    );

    return object;
}

// Add random objects to the scene
for (let i = 0; i < 20; i++) { // Add 20 random objects
    const object = createRandomObject();
    scene.add(object);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
