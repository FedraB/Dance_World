import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { generateScene1, generateScene2, generateScene3, generateScene4 } from './scenes.js';

function main() {
    
    //CANVAS
    let canvas = document.querySelector('#c');
    
    //RENDERER
    let renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor( 0xB7C3F3, 1 );
    renderer.shadowMap.enabled = true;
    
    //SCENE
    let scene = new THREE.Scene();

    //CAMERA
    let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);

    //LOADER
    let loader = new GLTFLoader();

    //TEXTURE LOADER
    let textureLoader = new THREE.TextureLoader();

    //MAIN CHARACTER
    let mainCharacter = null;
    let mainCharacterName = null;

    //SELECTED MACHINE
    let selectedMachineName = null;

    //MODELS
    let luarModel, melindaModel, lingoModel;
    let machine1, machine2, machine3, machine4;

    //MUSIC
    let selectedMusicName;

    scene1();

    function scene1(){
        //LOADING MESSAGE
        const loadingMessage = document.getElementById('loading-message');
        loadingMessage.style.display = 'block';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 7000);

        //SCENE
        generateScene1(camera, scene, textureLoader, loader);

        //CHARACTERS
        loader.load('./Models/Characters/Luar.glb', (gltf) => {
            luarModel = gltf.scene;
            luarModel.position.set(20, 0, 0);
            luarModel.scale.set(45, 45, 45);
        
            luarModel.traverse(function (node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
        
            scene.add(luarModel);
        }, undefined, function (error) {
            console.error(error);
        });
        
        loader.load('./Models/Characters/Melinda.gltf', (gltf) => {
            melindaModel = gltf.scene;
            melindaModel.position.set(0, 0, 0);
            melindaModel.scale.set(0.4, 0.4, 0.4);
        
            melindaModel.traverse(function (node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
        
            scene.add(melindaModel);
        }, undefined, function (error) {
            console.error(error);
        });

        // DIV
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.position = 'absolute';
        buttonsDiv.style.top = '10px';
        buttonsDiv.style.left = '10px';

        //BUTTONS
        const luarButton = document.createElement('button');
        luarButton.textContent = 'Select Luar';
        buttonsDiv.appendChild(luarButton);

        const melindaButton = document.createElement('button');
        melindaButton.textContent = 'Select Melinda';
        buttonsDiv.appendChild(melindaButton);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        buttonsDiv.appendChild(startButton);

        document.body.appendChild(buttonsDiv);

        //BUTTON EVENTS
        luarButton.addEventListener('click', () => {
            mainCharacterName = "Luar";
        });

        melindaButton.addEventListener('click', () => {
            mainCharacterName = "Melinda";
        });

        startButton.addEventListener('click', () => {
            if(mainCharacterName != null){
                scene2();
                buttonsDiv.remove();
            }
            else{
                console.log('escolha um personagem');
            }
        });

        //MACHINES    
        loader.load('./Models/Scenario/Dance_Machine_1/scene.gltf', function(gltf){
            machine1 = gltf.scene;
            machine1.position.set(645, 0, 175)
            machine1.scale.set(20,20,20)
            machine1.rotation.y = -2.35

            machine1.traverse( function( node ) {
                if ( node.isMesh ) { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });

            scene.add(machine1);
        }, undefined, function (error){
            console.error(error);
        });

        loader.load('./Models/Scenario/Dance_Machine_2/scene.gltf', function(gltf){
            machine2 = gltf.scene;
            machine2.position.set(-540, 0, 325)
            machine2.scale.set(0.15,0.15,0.15)
            machine2.rotation.y = 2.32

            machine2.traverse( function( node ) {
                if ( node.isMesh ) { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });

            scene.add(machine2);
        }, undefined, function (error){
            console.error(error);
        });

        loader.load('./Models/Scenario/Dance_Machine_3/scene.gltf', function(gltf){
            machine3 = gltf.scene;
            machine3.position.set(-390, 0, -390)
            machine3.scale.set(20,20,20)
            machine3.rotation.y = 0.84

            machine3.traverse( function( node ) {
                if ( node.isMesh ) { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });

            scene.add(machine3);
        }, undefined, function (error){
            console.error(error);
        });

        loader.load('./Models/Scenario/Dance_Machine_4/scene.gltf', function(gltf){
            machine4 = gltf.scene;
            machine4.position.set(355, -125, -120)
            machine4.scale.set(60,60,60)
            machine4.rotation.y = 0.72

            machine4.traverse( function( node ) {
                if ( node.isMesh ) { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });

            scene.add(machine4);
        }, undefined, function (error){
            console.error(error);
        });
    }    

    function scene2() {
        scene.clear();

        //CAMERA ORBIT CONTROLS
        const controls = new OrbitControls(camera, renderer.domElement);

        //LOADING MESSAGE
        const loadingMessage = document.getElementById('loading-message');
        loadingMessage.style.display = 'block';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 7000);
        
        //SCENE
        generateScene2(controls, camera, scene, textureLoader, loader);
        
        //LOAD MAIN CHARACTER
        if (mainCharacterName === "Luar") {
            loader.load('./Models/Characters/Luar.glb', (gltf) => {
                luarModel = gltf.scene;
                luarModel.position.set(0, 0, 0);
                luarModel.scale.set(45, 45, 45);
            
                luarModel.traverse(function (node) {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
            
                scene.add(luarModel);
            }, undefined, function (error) {
                console.error(error);
            });

            mainCharacter = luarModel;
        } 
        else if (mainCharacterName === "Melinda") {
            loader.load('./Models/Characters/Melinda.gltf', (gltf) => {
                melindaModel = gltf.scene;
                melindaModel.position.set(0, 0, 0);
                melindaModel.scale.set(0.4, 0.4, 0.4);
            
                melindaModel.traverse(function (node) {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
            
                scene.add(melindaModel);
            }, undefined, function (error) {
                console.error(error);
            });

            mainCharacter = melindaModel;
        }

        //TODO: animar mainCharacter!!!!!

        //MACHINES
        loader.load('./Models/Scenario/Dance_Machine_1/scene.gltf', function(gltf){
            machine1 = gltf.scene;
            machine1.position.set(645, 0, 175)
            machine1.scale.set(20,20,20)
            machine1.rotation.y = -2.35

            machine1.traverse( function( node ) {
                if ( node.isMesh ) { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });

            scene.add(machine1);
        }, undefined, function (error){
            console.error(error);
        });

        loader.load('./Models/Scenario/Dance_Machine_2/scene.gltf', function(gltf){
            machine2 = gltf.scene;
            machine2.position.set(-540, 0, 325)
            machine2.scale.set(0.15,0.15,0.15)
            machine2.rotation.y = 2.32

            machine2.traverse( function( node ) {
                if ( node.isMesh ) { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });

            scene.add(machine2);
        }, undefined, function (error){
            console.error(error);
        });

        loader.load('./Models/Scenario/Dance_Machine_3/scene.gltf', function(gltf){
            machine3 = gltf.scene;
            machine3.position.set(-390, 0, -390)
            machine3.scale.set(20,20,20)
            machine3.rotation.y = 0.84

            machine3.traverse( function( node ) {
                if ( node.isMesh ) { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });

            scene.add(machine3);
        }, undefined, function (error){
            console.error(error);
        });

        loader.load('./Models/Scenario/Dance_Machine_4/scene.gltf', function(gltf){
            machine4 = gltf.scene;
            machine4.position.set(355, -125, -120)
            machine4.scale.set(60,60,60)
            machine4.rotation.y = 0.72

            machine4.traverse( function( node ) {
                if ( node.isMesh ) { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });

            scene.add(machine4);
        }, undefined, function (error){
            console.error(error);
        });

        //DIV
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.position = 'absolute';
        buttonsDiv.style.top = '10px';
        buttonsDiv.style.left = '10px';

        //BUTTONS
        const backButton = document.createElement('button');
        backButton.textContent = 'Back To Menu';
        buttonsDiv.appendChild(backButton);

        const machine1Button = document.createElement('button');
        machine1Button.textContent = 'Machine 1';
        buttonsDiv.appendChild(machine1Button);

        const machine2Button = document.createElement('button');
        machine2Button.textContent = 'Machine 2';
        buttonsDiv.appendChild(machine2Button);

        document.body.appendChild(buttonsDiv);

        backButton.addEventListener('click', () => {
            scene.clear();
            buttonsDiv.remove();
            controls.dispose();
            scene1();
        });

        machine1Button.addEventListener('click', () => {
            buttonsDiv.remove();
            controls.dispose();
            selectedMachineName = "Machine1";
            scene3();
        });

        machine2Button.addEventListener('click', () => {
            buttonsDiv.remove();
            controls.dispose();
            selectedMachineName = "Machine2";
            scene3();
        });
    }

    function scene3(){
        scene.remove(melindaModel, luarModel);
        scene.clear();

        //LOADING MESSAGE
        const loadingMessage = document.getElementById('loading-message');
        loadingMessage.style.display = 'block';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 7000);

        //SCENE
        generateScene3(camera, scene, textureLoader, loader);
        
        //CHAT BOX
        const chatBox_texture = textureLoader.load('./Models/Textures/ChatBox/Texture.jpg');
        chatBox_texture.wrapS = THREE.RepeatWrapping;
        chatBox_texture.wrapT = THREE.RepeatWrapping;
        chatBox_texture.magFilter = THREE.NearestFilter;
        const chatBoxRepeats = 1;
        chatBox_texture.repeat.set(chatBoxRepeats,chatBoxRepeats);

        var geometryChat = new THREE.BoxGeometry(160, 30, 1);
        var chatMesh = new THREE.Mesh(geometryChat, new THREE.MeshStandardMaterial({map: chatBox_texture}));
        scene.add(chatMesh);
        chatMesh.position.x=-30;
        chatMesh.position.y=30;
        chatMesh.position.z=80;

        //GAME OBJECTS
        loader.load('./Models/Characters/Lingo/scene.gltf', (gltf) => {
            lingoModel = gltf.scene;
            lingoModel.position.set(-45, 85, 65);
            lingoModel.scale.set(45,45,45);
            lingoModel.rotation.y = 1;

            scene.add(lingoModel);
        }, undefined, function (error){
            console.error(error);
        });

        if (mainCharacterName === "Luar") {
            loader.load('./Models/Characters/Luar.glb', (gltf) => {
                luarModel = gltf.scene;
                luarModel.position.set(60, 0, 100);
                luarModel.scale.set(45, 45, 45);
                luarModel.rotation.y = -1.5;
            
                luarModel.traverse(function (node) {
                    if (node.isMesh) {
                        node.castShadow = true;
                    }
                });
            
                scene.add(luarModel);
            }, undefined, function (error) {
                console.error(error);
            });

            mainCharacter = luarModel
        } 
        else if (mainCharacterName === "Melinda") {
            loader.load('./Models/Characters/Melinda.gltf', (gltf) => {
                melindaModel = gltf.scene;
                melindaModel.position.set(60, 0, 100);
                melindaModel.scale.set(0.4, 0.4, 0.4);
                melindaModel.rotation.y = -1.5;
            
                melindaModel.traverse(function (node) {
                    if (node.isMesh) {
                        node.castShadow = true;
                    }
                });
            
                scene.add(melindaModel);
            }, undefined, function (error) {
                console.error(error);
            });

            mainCharacter = melindaModel
        }

        //DIV
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.position = 'absolute';
        buttonsDiv.style.top = '10px';  // Ajuste a posição conforme necessário
        buttonsDiv.style.left = '10px'; // Ajuste a posição conforme necessário

        //BUTTONS
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        buttonsDiv.appendChild(backButton);
        
        const music1Button = document.createElement('button');
        music1Button.textContent = 'Music 1';
        buttonsDiv.appendChild(music1Button);
        
        const music2Button = document.createElement('button');
        music2Button.textContent = 'Music 2';
        buttonsDiv.appendChild(music2Button);

        document.body.appendChild(buttonsDiv);

        //BUTTON EVENTS
        backButton.addEventListener('click', () => {
            scene2();
        });

        music1Button.addEventListener('click', () => {
            selectedMusicName = "Music1";
            scene4();
        });

        music2Button.addEventListener('click', () => {
            selectedMusicName = "Music2";
            scene4();
        });
    }

    function scene4(){
        scene.remove(luarModel, melindaModel, lingoModel);
        scene.clear();

        //LOADING MESSAGE
        const loadingMessage = document.getElementById('loading-message');
        loadingMessage.style.display = 'block';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 7000);

        //SCENE
        generateScene4(camera, scene, textureLoader);

        //GAME SCREEN
        const gameScreen_texture = textureLoader.load('./Models/Textures/GameScreen/Texture.jpg');
        gameScreen_texture.wrapS = THREE.RepeatWrapping;
        gameScreen_texture.wrapT = THREE.RepeatWrapping;
        gameScreen_texture.magFilter = THREE.NearestFilter;
        const gMRepeats = 1;
        gameScreen_texture.repeat.set(gMRepeats,gMRepeats);

        var geometryGameScreen = new THREE.BoxGeometry(125, 250, 1);
        var gameScreen = new THREE.Mesh(geometryGameScreen, new THREE.MeshBasicMaterial({map: gameScreen_texture }));
        scene.add(gameScreen);
        gameScreen.position.y=100;
        gameScreen.position.z=200;

        //GAME SCREEN FRAME
        var geometryFrame = new THREE.BoxGeometry(135, 250, 1);
        var screenFrame = new THREE.Mesh(geometryFrame, new THREE.MeshBasicMaterial({ color: 0x4B0082 }));
        scene.add(screenFrame);
        screenFrame.position.y=100;
        screenFrame.position.z=gameScreen.position.z-1;

        //SEQUENCE BAR
        var geometrySquenceBar = new THREE.BoxGeometry(125, 25, 1);
        var sequenceBar = new THREE.Mesh(geometrySquenceBar, new THREE.MeshBasicMaterial({ color: 0x000000 }));
        scene.add(sequenceBar);
        sequenceBar.position.y=gameScreen.position.y-70;
        sequenceBar.position.z=gameScreen.position.z+1;

        //MAIN CHARACTER            
        if (mainCharacterName === "Luar") {
            loader.load('./Models/Characters/Luar.glb', (gltf) => {
                luarModel = gltf.scene;
                luarModel.position.set(-150, 4, 140);
                luarModel.scale.set(45, 45, 45);
                luarModel.rotation.y = 2.8;
            
                scene.add(luarModel);
            }, undefined, function (error) {
                console.error(error);
            });

            mainCharacter = luarModel;
        } 
        else if (mainCharacterName === "Melinda") {
            loader.load('./Models/Characters/Melinda.gltf', (gltf) => {
                melindaModel = gltf.scene;
                melindaModel.position.set(-150, 4, 140);
                melindaModel.scale.set(0.4, 0.4, 0.4);
                melindaModel.rotation.y = 2.8;
            
                scene.add(melindaModel);
            }, undefined, function (error) {
                console.error(error);
            });

            mainCharacter = melindaModel;
        }

        //GAME OBJECTS
        loader.load('./Models/Characters/Luar.glb', (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.position.set(150, 4, 140);
            gltf.scene.scale.set(45,45,45);
            gltf.scene.rotation.y = -2.8;
        }, undefined, function (error) {
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
        loader.load('./Models/Scenario/Middle_Button/scene.gltf', function(gltf){ //right
            scene.add(gltf.scene);
            gltf.scene.position.set(3, 20, 180)
            gltf.scene.scale.set(8,8,8)
            gltf.scene.rotation.x = -0.25
        }, undefined, function (error){
            console.error(error);
        });

        if(selectedMachineName === "Machine1"){
            switch (selectedMusicName) {
                case "Music1":
                    backgroundMusic.src = "./Music/bonbonchocolat_everglow.mp3";
                    backgroundMusic.play();
                    break;
                case "Music2":
                    backgroundMusic.src = "./Music/getlucky_daftpunk.mp3";
                    backgroundMusic.play();
                    break;
                default:
                    break;
            }
        }
        else if(selectedMachineName === "Machine2"){
            switch (selectedMusicName) {
                case "Music1":
                    backgroundMusic.src = "./Music/ymca_villagepeople.mp3";
                    backgroundMusic.play();
                    break;
                case "Music2":
                    backgroundMusic.src = "./Music/itstricky_rundmc.mp3";
                    backgroundMusic.play();
                    break;
                default:
                    break;
            }
        }
    }

    // ANIMATE
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // RESPONSIVE WINDOW
    window.addEventListener( 'resize', onWindowResize, false )
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize( window.innerWidth, window.innerHeight )
    }

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