import * as THREE from 'three';
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
    let luarModel, lingoModel;
    let machine1, machine2, machine3, machine4;

    //ANIMATION
    let clock = new THREE.Clock();
    let mixer, animations, activeAction, previousAction;
    let characterSpeed = 2;
    let currentScene = null;

    //MUSIC
    let musicOption1, musicOption2;
    let selectedMusicName;

    //GAME
    let arrows = [];
    let arrowSpeed;
    let arrowModel;

    scene1();

    function scene1(){
        currentScene = scene1;

        //LOADING MESSAGE
        const loadingMessage = document.getElementById('loading-message');
        loadingMessage.style.display = 'block';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 7000);

        // DIV
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.position = 'absolute';
        buttonsDiv.style.top = '20px';
        buttonsDiv.style.left = '25px';

        //BUTTONS
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.className = 'custom-button';
        buttonsDiv.appendChild(startButton);

        document.body.appendChild(buttonsDiv);

        //BUTTON EVENTS
        startButton.addEventListener('click', () => {
            if(mainCharacterName != null){
                scene2();
                buttonsDiv.remove();
            }
            else{
                console.log('escolha um personagem');
            }
        });

        //SCENE
        generateScene1(camera, scene, textureLoader, loader);

        //CHARACTERS
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

            mixer = new THREE.AnimationMixer(luarModel);
    
            animations = gltf.animations;

            activeAction = mixer.clipAction(gltf.animations[2]);

            activeAction.play();
        
            scene.add(luarModel);
            
            animate();
        }, undefined, function (error) {
            console.error(error);
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

        //RAYCASTER BUTTON
        const luarButton3D = new THREE.Mesh(
            new THREE.BoxGeometry(40,85,20),
            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 })
        );
        luarButton3D.position.set(0,40,0);
        scene.add(luarButton3D);
        
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseClick(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects([luarButton3D]);

            if (intersects.length > 0) {
                const clickedButton = intersects[0].object;
                if (clickedButton === luarButton3D) {
                    mainCharacterName = "Luar";
                }
            }
        }

        window.addEventListener('click', onMouseClick, false);
    }

    function scene2() {
        currentScene = scene2;
        scene.clear();

        //LOADING MESSAGE
        const loadingMessage = document.getElementById('loading-message');
        loadingMessage.style.display = 'block';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 7000);
        
        //SCENE
        scene.add(camera);
        generateScene2(scene, textureLoader, loader);

        //DIV
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.position = 'absolute';
        buttonsDiv.style.top = '20px';
        buttonsDiv.style.left = '25px';

        //BUTTONS
        const backButton = document.createElement('button');
        backButton.textContent = 'Back To Menu';
        backButton.className = 'custom-button';
        buttonsDiv.appendChild(backButton);

        document.body.appendChild(buttonsDiv);

        backButton.addEventListener('click', () => {
            scene.clear();
            buttonsDiv.remove();
            controls.dispose();
            scene1();
        });
        
        //LOAD MAIN CHARACTER
        if(mainCharacterName === "Luar"){
            loader.load('./Models/Characters/Luar.glb', (gltf) => {
                mainCharacter = gltf.scene;
                mainCharacter.position.set(0, 0, 0);
                mainCharacter.scale.set(45, 45, 45);
                mainCharacter.rotation.y = 3.25;
            
                mainCharacter.traverse(function (node) {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
    
                mixer = new THREE.AnimationMixer(mainCharacter);
    
                animations = gltf.animations;
    
                activeAction = mixer.clipAction(gltf.animations[2]);
    
                activeAction.play();
            
                scene.add(mainCharacter);
    
                animate();
            }, undefined, function (error) {
                console.error(error);
            });
        }

        //MAIN CHARACTER ANIMATION EVENT LISTENERS
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);

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

        //RAYCASTER BUTTON
        const machine1Button3D = new THREE.Mesh(
            new THREE.BoxGeometry(120,120,150),
            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 })
        );
        machine1Button3D.position.set(432, 65, 420);
        scene.add(machine1Button3D);
        
        const machine2Button3D = new THREE.Mesh(
            new THREE.BoxGeometry(145,130,150),
            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 })
        );
        machine2Button3D.position.set(-420, 65, 415);
        scene.add(machine2Button3D);
        
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseClick(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects([machine1Button3D, machine2Button3D]);

            if (intersects.length > 0) {
                const clickedButton = intersects[0].object;
                if (clickedButton === machine1Button3D) {
                    selectedMachineName = "Machine1";
                    musicOption1 = 'Bon Bon Chocolat - Everglow';
                    musicOption2 = 'Get Lucky - Daft Punk';
                    buttonsDiv.remove();
                    scene3();
                } else if (clickedButton === machine2Button3D) {
                    selectedMachineName = "Machine2";
                    musicOption1 = 'YMCA - Run DMC';
                    musicOption2 = 'It`s Tricky - Village People';
                    buttonsDiv.remove();
                    scene3();
                }
            }
        }

        window.addEventListener('click', onMouseClick, false);
    }

    function scene3(){
        currentScene = scene3;
        scene.remove(luarModel);
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

        //LOAD MAIN CHARACTER
        if(mainCharacterName === "Luar"){
            loader.load('./Models/Characters/Luar.glb', (gltf) => {
                mainCharacter = gltf.scene;
                mainCharacter.position.set(60, 0, 100);
                mainCharacter.scale.set(45, 45, 45);
                mainCharacter.rotation.y = -1.5;
            
                mainCharacter.traverse(function (node) {
                    if (node.isMesh) {
                        node.castShadow = true;
                    }
                });
    
                mixer = new THREE.AnimationMixer(mainCharacter);
    
                animations = gltf.animations;
    
                activeAction = mixer.clipAction(gltf.animations[2]);
    
                activeAction.play();
            
                scene.add(mainCharacter);
    
                animate();
            }, undefined, function (error) {
                console.error(error);
            });
        }

        //DIV
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.position = 'absolute';
        buttonsDiv.style.top = '20px';  // Ajuste a posição conforme necessário
        buttonsDiv.style.left = '25px'; // Ajuste a posição conforme necessário

        //BUTTONS
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.className = 'custom-button';
        buttonsDiv.appendChild(backButton);

        document.body.appendChild(buttonsDiv);

        //BUTTON EVENTS
        backButton.addEventListener('click', () => {
            scene2();
        });

        const messageDiv = document.createElement('div');
        messageDiv.style.position = 'absolute';
        messageDiv.style.bottom = '150px';
        messageDiv.style.left = '80px';
        messageDiv.style.color = '#ffffff';
        messageDiv.style.fontFamily = 'Arial, sans-serif';
        messageDiv.style.fontSize = '16px';

        messageDiv.innerHTML = 'Choose today`s challenge!<br>';

        document.body.appendChild(messageDiv);

        const musicsDiv = document.createElement('div');
        musicsDiv.style.position = 'absolute';
        musicsDiv.style.bottom = '55px';
        musicsDiv.style.left = '80px';
        musicsDiv.style.width = '200px';
        musicsDiv.style.marginTop = '10px';

        const music1Button = document.createElement('button');
        music1Button.textContent = musicOption1;
        music1Button.className = 'custom-music-button';
        musicsDiv.appendChild(music1Button);
        
        const music2Button = document.createElement('button');
        music2Button.textContent = musicOption2;
        music2Button.className = 'custom-music-button';
        musicsDiv.appendChild(music2Button);

        document.body.appendChild(musicsDiv);

        music1Button.addEventListener('click', () => {
            selectedMusicName = "Music1";
            buttonsDiv.remove();
            messageDiv.remove();
            musicsDiv.remove();
            scene4();
        });

        music2Button.addEventListener('click', () => {
            selectedMusicName = "Music2";
            buttonsDiv.remove();
            messageDiv.remove();
            musicsDiv.remove();
            scene4();
        });
    }

    function scene4(){
        currentScene = scene4;
        scene.remove(mainCharacter, lingoModel);
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

        //GENERATE ARROW
        function generateArrow(arrowConstructor) {
            const arrow = arrowConstructor;
            arrows.push(arrow);
        }
        
        //ARROW CONSTRUCTORS
        class ArrowLeft {
            constructor(arrowModel) {
                loader.load('./Models/Scenario/Arrow/scene.gltf', function(gltf){ //left
                    arrowModel = gltf.scene;
                    arrowModel.scale.set(1,1,1)
                    arrowModel.rotation.z = -1.575
                    scene.add(arrowModel);
                }, undefined, function (error){
                    console.error(error);
                });
                this.mesh = arrowModel.scene.clone();
                this.mesh.position.set(-65, 250, 202); // Define uma posição inicial
                scene.add(this.mesh);
            }

            update(deltaTime) {
                this.mesh.position.y -= arrowSpeed * deltaTime;
            }
        }
        class ArrowDown {
            constructor() {
                const arrowModel = null;
                loader.load('./Models/Scenario/Arrow/scene.gltf', function(gltf){ //down
                    arrowModel = gltf.scene;
                    arrowModel.scale.set(1,1,1)
                }, undefined, function (error){
                    console.error(error);
                });
                this.mesh = arrowModel.scene.clone();
                this.mesh.position.set(-23, 250, 202);
                scene.add(this.mesh);
            }

            update(deltaTime) {
                this.mesh.position.y -= arrowSpeed * deltaTime;
            }
        }
        class ArrowUp {
            constructor() {
                const arrowModel = null;
                loader.load('./Models/Scenario/Arrow/scene.gltf', function(gltf){ //up
                    arrowModel = gltf.scene;
                    arrowModel.scale.set(1,1,1)
                    arrowModel.rotation.z = 3.15
                }, undefined, function (error){
                    console.error(error);
                });
                this.mesh = arrowModel.scene.clone();
                this.mesh.position.set(23, 250, 202);
                scene.add(this.mesh);
            }

            update(deltaTime) {
                this.mesh.position.y -= arrowSpeed * deltaTime;
            }
        }
        class ArrowRight {
            constructor() {
                const arrowModel = null;
                loader.load('./Models/Scenario/Arrow/scene.gltf', function(gltf){ //right
                    arrowModel = gltf.scene;
                    arrowModel.scale.set(1,1,1)
                    arrowModel.rotation.z = 1.575
                }, undefined, function (error){
                    console.error(error);
                });
                this.mesh = arrowModel.scene.clone();
                this.mesh.position.set(65, 250, 202);
                scene.add(this.mesh);
            }

            update(deltaTime) {
                this.mesh.position.y -= arrowSpeed * deltaTime;
            }
        }
        class MiddleButton {
            constructor() {
                const arrowModel = null;
                loader.load('./Models/Scenario/Middle_Button/scene.gltf', function(gltf){ //right
                    scene.add(gltf.scene);
                    gltf.scene.scale.set(8,8,8)
                    gltf.scene.rotation.x = -0.25
                }, undefined, function (error){
                    console.error(error);
                });
                this.mesh = arrowModel.scene.clone();
                this.mesh.position.set(3, 250, 180);
                scene.add(this.mesh);
            }

            update(deltaTime) {
                this.mesh.position.y -= arrowSpeed * deltaTime;
            }
        }

        if(selectedMachineName === "Machine1"){
            switch (selectedMusicName) {
                case "Music1":
                    backgroundMusic.src = "./Music/bonbonchocolat_everglow.mp3";
                    backgroundMusic.play();
                    arrowSpeed = 0.5;
                    setTimeout(() => {
                        generateArrow(new ArrowLeft(arrowModel));
                    }, 3000);
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

    function onKeyDown(event){

        previousAction = activeAction;
        
        switch(event.code){
            case 'KeyW':
                activeAction = mixer.clipAction(animations[7]);
                if(mainCharacter.rotation.y != -3.25){
                    mainCharacter.rotation.y = -3.25;
                }
                mainCharacter.position.z -= characterSpeed;
                break;
            case 'KeyA':
                activeAction = mixer.clipAction(animations[7]);
                if(mainCharacter.rotation.y != -1.625){
                    mainCharacter.rotation.y = -1.625;
                }
                mainCharacter.position.x -= characterSpeed;
                break;
            case 'KeyS':
                activeAction = mixer.clipAction(animations[7]);
                if (mainCharacter.rotation.y != 0) {
                    mainCharacter.rotation.y = 0;
                }
                mainCharacter.position.z += characterSpeed;
                break;
            case 'KeyD':
                activeAction = mixer.clipAction(animations[7]);
                if(mainCharacter.rotation.y != 1.625){
                    mainCharacter.rotation.y = 1.625;
                }
                mainCharacter.position.x += characterSpeed;
                break;
        }
      
        if(previousAction !== activeAction){
          previousAction.fadeOut(0.5);
          activeAction.reset()
                      .setEffectiveTimeScale(1)
                      .setEffectiveWeight(1)
                      .fadeIn(0.5)
                      .play();
        }
    }

    function onKeyUp(event){

        previousAction = activeAction;

        switch (event.code) {
            case 'KeyW':
            case 'KeyS':
                activeAction = mixer.clipAction(animations[2]);
                break;
            case 'KeyA':
            case 'KeyD':
                activeAction = mixer.clipAction(animations[2]);
                break;
        }
      
        if(previousAction !== activeAction){
          previousAction.fadeOut(0.5);
          activeAction.reset()
                      .setEffectiveTimeScale(1)
                      .setEffectiveWeight(1)
                      .fadeIn(0.5)
                      .play();
        }
    }

    // ANIMATE
    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        if (mixer){
            mixer.update(delta);
        }

        if (currentScene === scene2 && mainCharacter) {
            camera.position.copy(mainCharacter.position);

            camera.position.y += 100;

            //CAMERA LOOKING TO THE BACK OF THE CHARACTER
            const angle = mainCharacter.rotation.y;
            const distance = 200;
            camera.position.x = mainCharacter.position.x - Math.sin(angle) * distance;
            camera.position.z = mainCharacter.position.z - Math.cos(angle) * distance;

            camera.lookAt(mainCharacter.position.x, 60, mainCharacter.position.z);
        }

        if(currentScene === scene4 && arrows.length != 0){
            console.log("game on");
            for (let i = arrows.length - 1; i >= 0; i--) {
                arrows[i].update(delta);
                if (arrows[i].mesh.position.y < -100) {
                    scene.remove(arrows[i].mesh);
                    arrows.splice(i, 1);
                }
            }
        }

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