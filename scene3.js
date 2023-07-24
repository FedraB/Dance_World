import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js';
import {RectAreaLightHelper} from 'three/addons/helpers/RectAreaLightHelper.js';

function main() {
    
    //CANVAS
    const canvas = document.querySelector('#c');
    
    // RENDERER
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor( 0xB7C3F3, 1 )
    RectAreaLightUniformsLib.init();
    renderer.shadowMap.enabled =true;

    //SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0,200,380);
    camera.lookAt(0,30,0);

    // RESPONSIVE WINDOW
    window.addEventListener( 'resize', onWindowResize, false )
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize( window.innerWidth, window.innerHeight )
    }

    {
        const whiteLight = 0xffffff;

        // SPOTLIGHTS CONSTANTS
        const spotLightIntensity = 1;

        // MIDDLE LIGHT
        const mSpotLight = new THREE.SpotLight(whiteLight, spotLightIntensity);
        mSpotLight.castShadow=true;
        mSpotLight.penumbra = .8;
        mSpotLight.position.set(0,100,400);
        mSpotLight.target.position.set(0,0,200);
        scene.add(mSpotLight);
        scene.add(mSpotLight.target);

        // LEFT SPOTLIGHT
        const lSpotLight = new THREE.SpotLight(whiteLight, spotLightIntensity);
        lSpotLight.castShadow=true;
        lSpotLight.penumbra = 1
        lSpotLight.position.set(-150,150,140);
        lSpotLight.target.position.set(-150, 4, 140);
        scene.add(lSpotLight);
        scene.add(lSpotLight.target);

        // RIGHT SPOTLIGHT
        const rSpotLight = new THREE.SpotLight(whiteLight, spotLightIntensity);
        rSpotLight.castShadow=true;
        rSpotLight.penumbra = 1
        rSpotLight.position.set(150,150,140);
        rSpotLight.target.position.set(150, 4, 140);
        scene.add(rSpotLight);
        scene.add(rSpotLight.target);
    }

    // TEXTURE LOADER
    const textureLoader = new THREE.TextureLoader();

    // TEXTURES
    const floor_texture = textureLoader.load('./Models/Textures/Floor/textures/herringbone_parquet_diff_4k.jpg');
    floor_texture.wrapS = THREE.RepeatWrapping;
    floor_texture.wrapT = THREE.RepeatWrapping;
    floor_texture.magFilter = THREE.NearestFilter;
    const floorRepeats = 10;
    floor_texture.repeat.set(floorRepeats,floorRepeats);

    const roof_texture = textureLoader.load('./Models/Textures/Roof/Texture.jpg');
    roof_texture.wrapS = THREE.RepeatWrapping;
    roof_texture.wrapT = THREE.RepeatWrapping;
    roof_texture.magFilter = THREE.NearestFilter;
    const roofRepeats = 10;
    roof_texture.repeat.set(roofRepeats,roofRepeats);

    const wall_texture = textureLoader.load('./Models/Textures/Wall/Texture.jpg');
    wall_texture.wrapS = THREE.RepeatWrapping;
    wall_texture.wrapT = THREE.RepeatWrapping;
    wall_texture.magFilter = THREE.NearestFilter;
    const wallRepeats = 10;
    wall_texture.repeat.set(wallRepeats,wallRepeats);

    const gameScreen_texture = textureLoader.load('./Models/Textures/GameScreen/Texture.jpg');
    gameScreen_texture.wrapS = THREE.RepeatWrapping;
    gameScreen_texture.wrapT = THREE.RepeatWrapping;
    gameScreen_texture.magFilter = THREE.NearestFilter;
    const gMRepeats = 1;
    gameScreen_texture.repeat.set(gMRepeats,gMRepeats);

    //GROUND
    const groundGeometry = new THREE.BoxGeometry(1000, 1, 1000, 700, 1, 70);
    const groundMesh = new THREE.Mesh(groundGeometry, new THREE.MeshStandardMaterial({map: floor_texture}));
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    //ROOF
    var geometryRoof = new THREE.BoxGeometry(1000, 1, 1000, 700, 1, 70);
    var roofMesh = new THREE.Mesh(geometryRoof, new THREE.MeshStandardMaterial({map: roof_texture}));
    roofMesh.receiveShadow = true;
    scene.add(roofMesh);
    roofMesh.position.y= 200;

    //WALLS
    var geometryLateral = new THREE.BoxGeometry(1, 200, 1000);
    var wall1Mesh = new THREE.Mesh(geometryLateral, new THREE.MeshStandardMaterial({map: wall_texture}));
    wall1Mesh.receiveShadow = true;
    scene.add(wall1Mesh);
    wall1Mesh.position.x=-500;
    wall1Mesh.position.y=100;
    var wall2Mesh = new THREE.Mesh(geometryLateral, new THREE.MeshStandardMaterial({map: wall_texture}));
    wall2Mesh.receiveShadow = true;
    scene.add(wall2Mesh);
    wall2Mesh.position.x=500;
    wall2Mesh.position.y=wall1Mesh.position.y;

    var geometryFB = new THREE.BoxGeometry(1000, 200, 1);
    var backWallMesh = new THREE.Mesh(geometryFB, new THREE.MeshStandardMaterial({map: wall_texture}));
    scene.add(backWallMesh);
    backWallMesh.position.y=100;
    backWallMesh.position.z=-500;
    var frontWallMesh = new THREE.Mesh(geometryFB, new THREE.MeshStandardMaterial({map: wall_texture}));
    scene.add(frontWallMesh);
    frontWallMesh.position.y=100;
    frontWallMesh.position.z=500;

    //GAME SCREEN
    var geometryGameScreen = new THREE.BoxGeometry(125, 250, 1);
    var gameScreen = new THREE.Mesh(geometryGameScreen, new THREE.MeshBasicMaterial({map: gameScreen_texture }));
    scene.add(gameScreen);
    gameScreen.position.y=100;
    gameScreen.position.z=200;

    //GAME SCREEN FRAME
    var geometryFrame = new THREE.BoxGeometry(135, 250, 1);
    var screenFrame = new THREE.Mesh(geometryFrame, new THREE.MeshBasicMaterial({ color: 0xfe7f9c }));
    scene.add(screenFrame);
    screenFrame.position.y=100;
    screenFrame.position.z=gameScreen.position.z-1;

    //SEQUENCE BAR
    var geometrySquenceBar = new THREE.BoxGeometry(125, 25, 1);
    var sequenceBar = new THREE.Mesh(geometrySquenceBar, new THREE.MeshBasicMaterial({ color: 0x4B0082 }));
    scene.add(sequenceBar);
    sequenceBar.position.y=gameScreen.position.y-70;
    sequenceBar.position.z=gameScreen.position.z+1;
    
    // LOADER
    const loader = new GLTFLoader();

    loader.load('./Models/Characters/Luar.glb', (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.position.set(150, 4, 140);
        gltf.scene.scale.set(45,45,45);
        gltf.scene.rotation.y = -2.8
        this.luar = gltf.scene;
    }, undefined, function (error){
        console.error(error);
    });
    
    loader.load('./Models/Characters/Melinda.gltf', function(gltf){
        scene.add(gltf.scene);
        gltf.scene.position.set(-150, 4, 140)
        gltf.scene.scale.set(0.4, 0.4, 0.4)
        gltf.scene.rotation.y = 2.8
    }, undefined, function (error){
        console.error(error);
    });
    
    loader.load('./Models/Scenario/Pad/scene.gltf', function(gltf){ //left
        scene.add(gltf.scene);
        gltf.scene.position.set(-150, 0, 140)
        gltf.scene.scale.set(0.1,0.1,0.1)
        gltf.scene.rotation.y = -0.3
    }, undefined, function (error){
        console.error(error);
    });
    
    loader.load('./Models/Scenario/Pad/scene.gltf', function(gltf){ //right
        scene.add(gltf.scene);
        gltf.scene.position.set(150, 0, 140)
        gltf.scene.scale.set(0.1,0.1,0.1)
        gltf.scene.rotation.y = 0.3
    }, undefined, function (error){
        console.error(error);
    });

    loader.load('./Models/Scenario/Arrow/scene.gltf', function(gltf){ //left
        scene.add(gltf.scene);
        gltf.scene.position.set(-65, 30, 202)
        gltf.scene.scale.set(1,1,1)
        gltf.scene.rotation.z = -1.575
    }, undefined, function (error){
        console.error(error);
    });
    loader.load('./Models/Scenario/Arrow/scene.gltf', function(gltf){ //down
        scene.add(gltf.scene);
        gltf.scene.position.set(-23, 15, 202)
        gltf.scene.scale.set(1,1,1)
    }, undefined, function (error){
        console.error(error);
    });
    loader.load('./Models/Scenario/Arrow/scene.gltf', function(gltf){ //up
        scene.add(gltf.scene);
        gltf.scene.position.set(23, 45, 202)
        gltf.scene.scale.set(1,1,1)
        gltf.scene.rotation.z = 3.15
    }, undefined, function (error){
        console.error(error);
    });
    loader.load('./Models/Scenario/Arrow/scene.gltf', function(gltf){ //right
        scene.add(gltf.scene);
        gltf.scene.position.set(65, 31, 202)
        gltf.scene.scale.set(1,1,1)
        gltf.scene.rotation.z = 1.575
    }, undefined, function (error){
        console.error(error);
    });


    // ANIMATE
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
        renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();