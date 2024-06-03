import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

class Car {
    constructor(camera, controller, scene, speed) {
        this.camera = camera;
        this.controller = controller;
        this.scene = scene;
        this.speed = speed; // Adjust car speed
        this.rotationVector = new THREE.Vector3();

        this.animations = {};
        this.state = 'idle';

        this.camera.setup(new THREE.Vector3(0, 0, 0), this.rotationVector);

        this.loadModel();
    }

    loadModel() {
        var loader = new FBXLoader();
        loader.setPath('./resources/car/low_poly_car/Car-Model/');
        loader.load('Car.fbx', (fbx) => {
            fbx.scale.setScalar(0.01);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            this.mesh = fbx;
            this.scene.add(this.mesh);
            this.rotationVector.y += -Math.PI / 2;

            this.mixer = new THREE.AnimationMixer(this.mesh);
            var onLoad = (animName, anim) => {
                var clip = anim.animations[0];
                var action = this.mixer.clipAction(clip);
                this.animations[animName] = {
                    clip: clip,
                    action: action
                };
            };

            var loader = new FBXLoader();
            loader.setPath('./resources/car/low_poly_car/Car-Model/');
            loader.load('Car.fbx', (fbx) => { onLoad('idle', fbx) });
            loader.load('Car.fbx', (fbx) => { onLoad('run', fbx) });
        });
    }

    update(dt) {
        if (!this.mesh) {
            return;
        }

        var direction = new THREE.Vector3(0, 0, 0);
        if (this.controller.keys['forward']) {
            direction.x = 1;
        }
        if (this.controller.keys['backward']) {
            direction.x = -1;
        }
        if (this.controller.keys['left']) {
            direction.z = -1;
        }
        if (this.controller.keys['right']) {
            direction.z = 1;
        }

        if (direction.length() == 0) {
            if (this.animations['idle']) {
                if (this.state != 'idle') {
                    this.mixer.stopAllAction();
                    this.state = 'idle';
                }
                this.mixer.clipAction(this.animations['idle'].clip).play();
                this.mixer.update(dt);
            }
        } else {
            if (this.animations['run']) {
                if (this.state != 'run') {
                    this.mixer.stopAllAction();
                    this.state = 'run';
                }
                this.mixer.clipAction(this.animations['run'].clip).play();
                this.mixer.update(dt);
            }
        }

        if (this.controller.mouseDown) {
            var dtMouse = this.controller.deltaMousePos;
            dtMouse.x = dtMouse.x / Math.PI;
            dtMouse.y = dtMouse.y / Math.PI;

            this.rotationVector.y += dtMouse.x * 10000 * dt;
            this.rotationVector.z += dtMouse.y * 10000 * dt;

            this.mesh.rotation.y = this.rotationVector.y;
        }

        var forwardVector = new THREE.Vector3(1, 0, 0);
        var rightVector = new THREE.Vector3(0, 0, 1);
        forwardVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationVector.y);
        rightVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationVector.y);

        this.mesh.position.add(forwardVector.multiplyScalar(dt * this.speed * direction.x));
        this.mesh.position.add(rightVector.multiplyScalar(dt * this.speed * direction.z));

        this.camera.setup(this.mesh.position, this.rotationVector);
    }
}

class CarController {
    constructor() {
        this.keys = {
            "forward": false,
            "backward": false,
            "left": false,
            "right": false
        };

        this.mousePos = new THREE.Vector2();
        this.mouseDown = false;
        this.deltaMousePos = new THREE.Vector2();

        document.addEventListener('keydown', (e) => this.onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this.onKeyUp(e), false);
        document.addEventListener('mousedown', (e) => this.onMouseDown(e), false);
        document.addEventListener('mouseup', (e) => this.onMouseUp(e), false);
        document.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'W':
            case 'w': this.keys['forward'] = true; break;
            case 'S':
            case 's': this.keys['backward'] = true; break;
            case 'A':
            case 'a': this.keys['left'] = true; break;
            case 'D':
            case 'd': this.keys['right'] = true; break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case 'W':
            case 'w': this.keys['forward'] = false; break;
            case 'S':
            case 's': this.keys['backward'] = false; break;
            case 'A':
            case 'a': this.keys['left'] = false; break;
            case 'D':
            case 'd': this.keys['right'] = false; break;
        }
    }

    onMouseDown(event) {
        this.mouseDown = true;
    }

    onMouseUp(event) {
        this.mouseDown = false;
    }

    onMouseMove(event) {
        var currentMousePos = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );
        this.deltaMousePos.addVectors(currentMousePos, this.mousePos.multiplyScalar(-1));
        this.mousePos.copy(currentMousePos);
    }
}

class ThirdPersonCamera {
    constructor(camera, positionOffSet, targetOffSet) {
        this.camera = camera;
        this.positionOffSet = positionOffSet;
        this.targetOffSet = targetOffSet;
    }

    setup(target, angle) {
        var temp = new THREE.Vector3();
        temp.copy(this.positionOffSet);
        temp.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle.y);
        temp.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle.z);
        temp.addVectors(target, temp);
        this.camera.position.copy(temp);

        temp = new THREE.Vector3();
        temp.addVectors(target, this.targetOffSet);
        this.camera.lookAt(temp);
    }
}

export { Car, CarController, ThirdPersonCamera };
