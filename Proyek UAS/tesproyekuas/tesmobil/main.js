// Set up scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 10);

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create car
const carGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
const carMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);

// Set initial position of the car
car.position.set(0, 0.25, 0);

// Create ground plane
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2; // Rotate plane to be horizontal
scene.add(ground);

// Create finish line plane
const finishLineGeometry = new THREE.PlaneGeometry(10, 1);
const finishLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide });
const finishLine = new THREE.Mesh(finishLineGeometry, finishLineMaterial);
finishLine.position.set(0, 0, -50); // Adjust position along z-axis
scene.add(finishLine);

// Add lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 2, 2);
scene.add(light);

// Physics
const speed = 0.0025;
let rotationSpeed = 0.02;
const friction = 0.98; // Friction factor

// Control variables
const keyStates = {
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false
};

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Velocity vector
const velocity = new THREE.Vector3(0, 0, 0);

// Event listeners for key presses
document.addEventListener('keydown', event => {
    if (keyStates.hasOwnProperty(event.code)) {
        keyStates[event.code] = true;
    }
});

document.addEventListener('keyup', event => {
    if (keyStates.hasOwnProperty(event.code)) {
        keyStates[event.code] = false;
    }
});

// Event listeners for mouse movement
document.addEventListener('mousedown', event => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', event => {
    if (isDragging) {
        const deltaMove = { x: event.clientX - previousMousePosition.x, y: event.clientY - previousMousePosition.y };
        camera.rotation.y -= deltaMove.x * 0.01;
        camera.rotation.x -= deltaMove.y * 0.01;
        previousMousePosition = { x: event.clientX, y: event.clientY };
    }
});

function animate() {
    requestAnimationFrame(animate);

    // Apply friction to velocity
    velocity.multiplyScalar(friction);

    // Update velocity based on key states
    if (keyStates.KeyW) {
        velocity.x -= Math.sin(car.rotation.y) * speed;
        velocity.z -= Math.cos(car.rotation.y) * speed;
    }
    if (keyStates.KeyS) {
        velocity.x += Math.sin(car.rotation.y) * speed;
        velocity.z += Math.cos(car.rotation.y) * speed;
    }
    if (keyStates.KeyA) {
        car.rotation.y += rotationSpeed;
    }
    if (keyStates.KeyD) {
        car.rotation.y -= rotationSpeed;
    }

    // Update car position based on velocity
    car.position.add(velocity);

    // Boundaries
    const boundary = 50; // Adjust the boundary distance as needed

    if (car.position.x > boundary) {
        car.position.x = boundary;
        velocity.x = 0;
    } else if (car.position.x < -boundary) {
        car.position.x = -boundary;
        velocity.x = 0;
    }
    if (car.position.z > boundary) {
        car.position.z = boundary;
        velocity.z = 0;
    } else if (car.position.z < -boundary) {
        car.position.z = -boundary;
        velocity.z = 0;
    }

    // Check if car crosses the finish line
    if (car.position.z < finishLine.position.z) {
        console.log("You crossed the finish line!");
    }

    // Update camera position to follow the car
    camera.position.x = car.position.x;
    camera.position.z = car.position.z + 5; // Adjust the height of the camera
    camera.lookAt(car.position); // Ensure the camera looks at the car

    renderer.render(scene, camera);
}

animate();
