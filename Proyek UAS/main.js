import * as THREE from "three";
import * as CAR from "./car.js";

class Main {
    static init() {
        var canvasReference = document.getElementById("canvas");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasReference
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);
        this.renderer.shadowMap.enabled = true;

        // Ground plane
        var ground = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshPhongMaterial({ color: 0xcbcbcb, side: THREE.DoubleSide }),
        );
        this.scene.add(ground);
        ground.rotation.x = Math.PI / 2;
        ground.receiveShadow = true;
        ground.castShadow = true;

        // Finish Line plane
        var finishLine = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 1),
            new THREE.MeshPhongMaterial({ color: 0xff00ff, side: THREE.DoubleSide }),
        );
        this.scene.add(finishLine);
        finishLine.position.set(0, 0, -50); // Position it along the z-axis
        finishLine.receiveShadow = true;
        finishLine.castShadow = true;

        // Directional Light
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(3, 10, 10);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Initialize car and camera
        this.car = new CAR.Car(
            new CAR.ThirdPersonCamera(
                this.camera, new THREE.Vector3(-5, 5, 0), new THREE.Vector3(0, 0, 0), this.renderer.domElement
            ),
            new CAR.CarController(),
            this.scene,
            0.5 // speed
        );
    }

    static render(dt) {
        this.car.update(dt);
        this.renderer.render(this.scene, this.camera);
    }
}

var clock = new THREE.Clock();

Main.init();
function animate() {
    Main.render(clock.getDelta());
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
