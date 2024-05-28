import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(pointLight);

// Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planet (example: Earth)
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

// Position the Earth relative to the Sun
earth.position.x = 10;
scene.add(earth);

// Meteor
const meteorGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const meteorMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);

// Position the meteor initially away from Earth (e.g., 30 units away)
meteor.position.set(30, 0, 0);
scene.add(meteor);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 20;

// Helper function to create explosion effect
function createExplosion(position) {
    const explosionGeometry = new THREE.SphereGeometry(2, 32, 32);
    const explosionMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
    explosion.position.copy(position);
    scene.add(explosion);

    setTimeout(() => {
        scene.remove(explosion);
    }, 500); // Remove explosion effect after 500ms
}

// Animate function
function animate() {
    requestAnimationFrame(animate);

    // Rotate Earth around the Sun
    earth.position.x = 10 * Math.cos(Date.now() * 0.001);
    earth.position.z = 10 * Math.sin(Date.now() * 0.001);

    // Rotate Earth on its axis
    earth.rotation.y += 0.01;

    // Apply gravity to the meteor towards Earth
    const direction = new THREE.Vector3();
    direction.subVectors(earth.position, meteor.position).normalize();
    meteor.position.add(direction.multiplyScalar(0.1));

    // Apply gravity to the meteor towards Sun
    const sunDirection = new THREE.Vector3();
    sunDirection.subVectors(sun.position, meteor.position).normalize();
    meteor.position.add(sunDirection.multiplyScalar(0.05));

    // Collision detection with Earth
    const distanceToEarth = meteor.position.distanceTo(earth.position);
    if (distanceToEarth < 1) { // Assuming the collision radius is 1
        // Handle collision with Earth: explosion effect, change planet color, remove meteor
        createExplosion(meteor.position);
        earth.material.color.set(0xff0000); // Change planet color to red
        scene.remove(meteor); // Remove meteor from the scene
        console.log('Collision with Earth detected!');
    }

    // Collision detection with Sun
    const distanceToSun = meteor.position.distanceTo(sun.position);
    if (distanceToSun < 5) { // Assuming the collision radius with Sun is 5
        // Handle collision with Sun: explosion effect, remove meteor
        createExplosion(meteor.position);
        scene.remove(meteor); // Remove meteor from the scene
        console.log('Collision with Sun detected!');
    }

    controls.update();
    renderer.render(scene, camera);
}
animate();
