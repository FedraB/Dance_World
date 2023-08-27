import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function main() {
    
    //CANVAS
    let canvas = document.querySelector('#c');
    
    // RENDERER

    let renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor( 0xB7C3F3, 1 );
    renderer.shadowMap.enabled = true;
    
    //SCENE
    let scene = new THREE.Scene();

    // CAMERA
    let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);

    // RESPONSIVE WINDOW
    window.addEventListener( 'resize', onWindowResize, false )
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize( window.innerWidth, window.innerHeight )
    }

    //LOADER
    let loader = new GLTFLoader();

    // TEXTURE LOADER
    let textureLoader = new THREE.TextureLoader();

    init();

    function init(){
        camera.position.set(0,100,200);
        camera.lookAt(0,60,0);

        //LIGHT
        {  
            const pinkLight = 0xff0090;
            const blueLight = 0x0080fe;
            const yellowLight = 0xfcd12a;
            const purpleLight = 0x7600bc;
            const whiteLight = 0xffffff;

            // SPOTLIGHTS CONSTANTS
            const spotLightIntensity = 1;

            // MIDDLE LIGHT
            const mSpotLight = new THREE.SpotLight(pinkLight, spotLightIntensity);
            mSpotLight.castShadow=true;
            mSpotLight.penumbra = 1
            mSpotLight.position.set(0,150,0);
            mSpotLight.target.position.set(0,0,0);
            scene.add(mSpotLight);
            scene.add(mSpotLight.target);

            /*LIGHT HELPER
            const spotLightHelper = new THREE.SpotLightHelper(spotLight);
            scene.add(spotLightHelper);*/

            // FRONT AND BACK LIGHTS
            const fWSpotLight = new THREE.SpotLight(blueLight, spotLightIntensity);
            fWSpotLight.castShadow=true;
            fWSpotLight.penumbra = 1
            fWSpotLight.position.set(0,0,350);
            fWSpotLight.target.position.set(0,200,500);
            scene.add(fWSpotLight);
            scene.add(fWSpotLight.target);

            const bWSpotLight = new THREE.SpotLight(blueLight, spotLightIntensity);
            bWSpotLight.castShadow=true;
            bWSpotLight.penumbra = 1
            bWSpotLight.position.set(0,0,-350);
            bWSpotLight.target.position.set(0,200,-500);
            scene.add(bWSpotLight);
            scene.add(bWSpotLight.target);

            // POOL TABLE LIGHTS
            const bPTSpotLight = new THREE.SpotLight(yellowLight, spotLightIntensity);
            bPTSpotLight.castShadow=true;
            bPTSpotLight.penumbra = 1
            bPTSpotLight.position.set(400,80,-47);
            bPTSpotLight.target.position.set(400,70,-47);
            scene.add(bPTSpotLight);
            scene.add(bPTSpotLight.target);

            const fPTSpotLight = new THREE.SpotLight(yellowLight, spotLightIntensity);
            fPTSpotLight.castShadow=true;
            fPTSpotLight.penumbra = 1
            fPTSpotLight.position.set(400,80,-3);
            fPTSpotLight.target.position.set(400,70,-3);
            scene.add(fPTSpotLight);
            scene.add(fPTSpotLight.target);

            // LEFT WALL LIGHT
            const lWSpotLight = new THREE.SpotLight(yellowLight, spotLightIntensity);
            lWSpotLight.castShadow=true;
            lWSpotLight.penumbra = 1
            lWSpotLight.position.set(-350,0,0);
            lWSpotLight.target.position.set(-500,200,0);
            scene.add(lWSpotLight);
            scene.add(lWSpotLight.target);

            // EDGE LIGHTS
            const lBCspotLight = new THREE.SpotLight(purpleLight, spotLightIntensity);
            lBCspotLight.castShadow=true;
            lBCspotLight.penumbra = .5;
            lBCspotLight.position.set(-400,200,-400);
            lBCspotLight.target.position.set(-450,0,-450);
            scene.add(lBCspotLight);
            scene.add(lBCspotLight.target);
            
            const rFCSpotLight = new THREE.SpotLight(purpleLight, spotLightIntensity);
            rFCSpotLight.castShadow=true;
            rFCSpotLight.penumbra = .5;
            rFCSpotLight.position.set(400,200,400);
            rFCSpotLight.target.position.set(450,0,450);
            scene.add(rFCSpotLight);
            scene.add(rFCSpotLight.target);
            
            const lFCSpotLight = new THREE.SpotLight(purpleLight, spotLightIntensity);
            lFCSpotLight.castShadow=true;
            lFCSpotLight.penumbra = .5;
            lFCSpotLight.position.set(-400,200,400);
            lFCSpotLight.target.position.set(-450,0,450);
            scene.add(lFCSpotLight);
            scene.add(lFCSpotLight.target);
            
            const rBCSpotLight = new THREE.SpotLight(purpleLight, spotLightIntensity);
            rBCSpotLight.castShadow=true;
            rBCSpotLight.penumbra = .5;
            rBCSpotLight.position.set(400,200,-400);
            rBCSpotLight.target.position.set(450,0,-450);
            scene.add(rBCSpotLight);
            scene.add(rBCSpotLight.target);
            
            // AMBIENT LIGHT
            const intensity = .5;
            const ambientLight = new THREE.AmbientLight(whiteLight, intensity);
            scene.add(ambientLight);
        }

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

        //ROOM
        {
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
            backWallMesh.receiveShadow = true;
            scene.add(backWallMesh);
            backWallMesh.position.y=100;
            backWallMesh.position.z=-500;
            var frontWallMesh = new THREE.Mesh(geometryFB, new THREE.MeshStandardMaterial({map: wall_texture}));
            frontWallMesh.receiveShadow = true;
            scene.add(frontWallMesh);
            frontWallMesh.position.y=100;
            frontWallMesh.position.z=500;
        }

        //GAME OBJECTS

        //MAIN CHARACTER
        let mainCharacter = null;
        let mainCharacterName = null;

        //MODELS
        let luarModel, melindaModel, lingoModel;

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

        //BUTTONS

        // Criar um div para conter os botões
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.position = 'absolute';
        buttonsDiv.style.top = '10px';  // Ajuste a posição conforme necessário
        buttonsDiv.style.left = '10px'; // Ajuste a posição conforme necessário

        // Criar os botões
        const luarButton = document.createElement('button');
        luarButton.textContent = 'Select Luar';
        buttonsDiv.appendChild(luarButton);

        const melindaButton = document.createElement('button');
        melindaButton.textContent = 'Select Melinda';
        buttonsDiv.appendChild(melindaButton);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        buttonsDiv.appendChild(startButton);

        // Adicionar os botões ao corpo do documento
        document.body.appendChild(buttonsDiv);

        // Adicionar os eventos de clique aos botões
        luarButton.addEventListener('click', () => {
            selectCharacter("Luar");
        });

        melindaButton.addEventListener('click', () => {
            selectCharacter("Melinda");
        });

        startButton.addEventListener('click', () => {
            if(mainCharacter != null){
                start(mainCharacterName);
                buttonsDiv.remove();
            }
            else{
                console.log('escolha um personagem');
            }
        });

        //PICK A CHARACTER
        function selectCharacter(characterName) {
            if (characterName === "Luar") {
                mainCharacter = luarModel;
            } else if (characterName === "Melinda") {
                mainCharacter = melindaModel;
            }

            mainCharacterName = characterName;
        }

        //MACHINES

        //SELECTED MACHINE
        let selectedMachine = null;
        let selectedMachineName = null;

        //MODELS
        let machine1, machine2, machine3, machine4;
    
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

        //DECOR
        {
            loader.load('./Models/Scenario/Carpet/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(400,1,-28)
                gltf.scene.scale.set(20,20,20)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });

            loader.load('./Models/Scenario/Painting_1/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(0,100,-501)
                gltf.scene.scale.set(100,100,100)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        //node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Painting_2/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(0,45,499)
                gltf.scene.scale.set(.05,.05,.05)
                gltf.scene.rotation.y = 3.4

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Painting_3/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-497,85,0)
                gltf.scene.scale.set(70,70,70)
                gltf.scene.rotation.y = 1.575

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });

            loader.load('./Models/Scenario/Plant_1/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-470,0,300)
                gltf.scene.scale.set(10,10,10)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Plant_1/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-470,0,-300)
                gltf.scene.scale.set(10,10,10)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Plant_/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-470,0,110)
                gltf.scene.scale.set(10,10,10)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Plant_/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-470,0,-110)
                gltf.scene.scale.set(10,10,10)
                
                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });

            loader.load('./Models/Scenario/Pool_Table/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(400,0,-20)
                gltf.scene.scale.set(50,50,50)
                gltf.scene.rotation.y = 1.575

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });

            loader.load('./Models/Scenario/Table/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(475,0,-170)
                gltf.scene.scale.set(100,100,100)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Table/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(475,0,100)
                gltf.scene.scale.set(100,100,100)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });

            loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(200,15,470)
                gltf.scene.scale.set(50,50,50)
                gltf.scene.rotation.y = 1.575

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-200,15,470)
                gltf.scene.scale.set(50,50,50)
                gltf.scene.rotation.y = 1.575

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(200,15,-470)
                gltf.scene.scale.set(50,50,50)
                gltf.scene.rotation.y = 1.575

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-200,15,-470)
                gltf.scene.scale.set(50,50,50)
                gltf.scene.rotation.y = 1.575

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Sofa_2/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-470,3,200)
                gltf.scene.scale.set(50,50,50)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Sofa_2/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(-470,3,-200)
                gltf.scene.scale.set(50,50,50)

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Sofa_3/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(500,8,200)
                gltf.scene.scale.set(50,50,50)
                gltf.scene.rotation.y = -1.575

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
            loader.load('./Models/Scenario/Sofa_3/scene.gltf', function(gltf){
                scene.add(gltf.scene);
                gltf.scene.position.set(500,8,-200)
                gltf.scene.scale.set(50,50,50)
                gltf.scene.rotation.y = -1.575

                gltf.scene.traverse( function( node ) {
                    if ( node.isMesh ) { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });
            }, undefined, function (error){
                console.error(error);
            });
        }

        function start(mainCharacterName) {
            scene.clear();

            // CAMERA ORBIT CONTROLS
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 5
            controls.maxDistance = 150
            controls.enablePan = false
            controls.maxPolarAngle = Math.PI / 2 - 0.05
            controls.target.set(0,60,0)
            controls.update();

            camera.position.set(0,400,1000);
            controls.update();

            //LIGHT
            {  
                const pinkLight = 0xff0090;
                const blueLight = 0x0080fe;
                const yellowLight = 0xfcd12a;
                const purpleLight = 0x7600bc;
                const whiteLight = 0xffffff;

                // SPOTLIGHTS CONSTANTS
                const spotLightIntensity = 1;

                // MIDDLE LIGHT
                const mSpotLight = new THREE.SpotLight(pinkLight, spotLightIntensity);
                mSpotLight.castShadow=true;
                mSpotLight.penumbra = 1
                mSpotLight.position.set(0,150,0);
                mSpotLight.target.position.set(0,0,0);
                scene.add(mSpotLight);
                scene.add(mSpotLight.target);

                /*LIGHT HELPER
                const spotLightHelper = new THREE.SpotLightHelper(spotLight);
                scene.add(spotLightHelper);*/

                // FRONT AND BACK LIGHTS
                const fWSpotLight = new THREE.SpotLight(blueLight, spotLightIntensity);
                fWSpotLight.castShadow=true;
                fWSpotLight.penumbra = 1
                fWSpotLight.position.set(0,0,350);
                fWSpotLight.target.position.set(0,200,500);
                scene.add(fWSpotLight);
                scene.add(fWSpotLight.target);

                const bWSpotLight = new THREE.SpotLight(blueLight, spotLightIntensity);
                bWSpotLight.castShadow=true;
                bWSpotLight.penumbra = 1
                bWSpotLight.position.set(0,0,-350);
                bWSpotLight.target.position.set(0,200,-500);
                scene.add(bWSpotLight);
                scene.add(bWSpotLight.target);

                // POOL TABLE LIGHTS
                const bPTSpotLight = new THREE.SpotLight(yellowLight, spotLightIntensity);
                bPTSpotLight.castShadow=true;
                bPTSpotLight.penumbra = 1
                bPTSpotLight.position.set(400,80,-47);
                bPTSpotLight.target.position.set(400,70,-47);
                scene.add(bPTSpotLight);
                scene.add(bPTSpotLight.target);

                const fPTSpotLight = new THREE.SpotLight(yellowLight, spotLightIntensity);
                fPTSpotLight.castShadow=true;
                fPTSpotLight.penumbra = 1
                fPTSpotLight.position.set(400,80,-3);
                fPTSpotLight.target.position.set(400,70,-3);
                scene.add(fPTSpotLight);
                scene.add(fPTSpotLight.target);

                // LEFT WALL LIGHT
                const lWSpotLight = new THREE.SpotLight(yellowLight, spotLightIntensity);
                lWSpotLight.castShadow=true;
                lWSpotLight.penumbra = 1
                lWSpotLight.position.set(-350,0,0);
                lWSpotLight.target.position.set(-500,200,0);
                scene.add(lWSpotLight);
                scene.add(lWSpotLight.target);

                // EDGE LIGHTS
                const lBCspotLight = new THREE.SpotLight(purpleLight, spotLightIntensity);
                lBCspotLight.castShadow=true;
                lBCspotLight.penumbra = .5;
                lBCspotLight.position.set(-400,200,-400);
                lBCspotLight.target.position.set(-450,0,-450);
                scene.add(lBCspotLight);
                scene.add(lBCspotLight.target);
                
                const rFCSpotLight = new THREE.SpotLight(purpleLight, spotLightIntensity);
                rFCSpotLight.castShadow=true;
                rFCSpotLight.penumbra = .5;
                rFCSpotLight.position.set(400,200,400);
                rFCSpotLight.target.position.set(450,0,450);
                scene.add(rFCSpotLight);
                scene.add(rFCSpotLight.target);
                
                const lFCSpotLight = new THREE.SpotLight(purpleLight, spotLightIntensity);
                lFCSpotLight.castShadow=true;
                lFCSpotLight.penumbra = .5;
                lFCSpotLight.position.set(-400,200,400);
                lFCSpotLight.target.position.set(-450,0,450);
                scene.add(lFCSpotLight);
                scene.add(lFCSpotLight.target);
                
                const rBCSpotLight = new THREE.SpotLight(purpleLight, spotLightIntensity);
                rBCSpotLight.castShadow=true;
                rBCSpotLight.penumbra = .5;
                rBCSpotLight.position.set(400,200,-400);
                rBCSpotLight.target.position.set(450,0,-450);
                scene.add(rBCSpotLight);
                scene.add(rBCSpotLight.target);
                
                // AMBIENT LIGHT
                const intensity = .5;
                const ambientLight = new THREE.AmbientLight(whiteLight, intensity);
                scene.add(ambientLight);
            }

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

            //ROOM
            {
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
                backWallMesh.receiveShadow = true;
                scene.add(backWallMesh);
                backWallMesh.position.y=100;
                backWallMesh.position.z=-500;
                var frontWallMesh = new THREE.Mesh(geometryFB, new THREE.MeshStandardMaterial({map: wall_texture}));
                frontWallMesh.receiveShadow = true;
                scene.add(frontWallMesh);
                frontWallMesh.position.y=100;
                frontWallMesh.position.z=500;
            }
            
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

            //BUTTONS

            // Criar um div para conter os botões
            const buttonsDiv = document.createElement('div');
            buttonsDiv.style.position = 'absolute';
            buttonsDiv.style.top = '10px';  // Ajuste a posição conforme necessário
            buttonsDiv.style.left = '10px'; // Ajuste a posição conforme necessário

            // Criar os botões
            const backButton = document.createElement('button');
            backButton.textContent = 'Back To Menu';
            buttonsDiv.appendChild(backButton);

            const machine1Button = document.createElement('button');
            machine1Button.textContent = 'Machine 1';
            buttonsDiv.appendChild(machine1Button);

            const machine2Button = document.createElement('button');
            machine2Button.textContent = 'Machine 2';
            buttonsDiv.appendChild(machine2Button);

            // Adicionar os botões ao corpo do documento
            document.body.appendChild(buttonsDiv);

            backButton.addEventListener('click', () => {
                scene.clear();
                buttonsDiv.remove();
                controls.dispose();
                init();
            });

            machine1Button.addEventListener('click', () => {
                buttonsDiv.remove();
                controls.dispose();
                selectMachine("Machine1");
            });

            machine2Button.addEventListener('click', () => {
                buttonsDiv.remove();
                controls.dispose();
                selectMachine("Machine2");
            });

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

            //DECOR
            {
                loader.load('./Models/Scenario/Carpet/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(400,1,-28)
                    gltf.scene.scale.set(20,20,20)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });

                loader.load('./Models/Scenario/Painting_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(0,100,-501)
                    gltf.scene.scale.set(100,100,100)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            //node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Painting_2/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(0,45,499)
                    gltf.scene.scale.set(.05,.05,.05)
                    gltf.scene.rotation.y = 3.4

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Painting_3/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-497,85,0)
                    gltf.scene.scale.set(70,70,70)
                    gltf.scene.rotation.y = 1.575

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });

                loader.load('./Models/Scenario/Plant_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,0,300)
                    gltf.scene.scale.set(10,10,10)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Plant_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,0,-300)
                    gltf.scene.scale.set(10,10,10)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Plant_/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,0,110)
                    gltf.scene.scale.set(10,10,10)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Plant_/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,0,-110)
                    gltf.scene.scale.set(10,10,10)
                    
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });

                loader.load('./Models/Scenario/Pool_Table/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(400,0,-20)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });

                loader.load('./Models/Scenario/Table/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(475,0,-170)
                    gltf.scene.scale.set(100,100,100)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Table/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(475,0,100)
                    gltf.scene.scale.set(100,100,100)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });

                loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(200,15,470)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-200,15,470)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(200,15,-470)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-200,15,-470)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_2/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,3,200)
                    gltf.scene.scale.set(50,50,50)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_2/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,3,-200)
                    gltf.scene.scale.set(50,50,50)

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_3/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(500,8,200)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = -1.575

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_3/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(500,8,-200)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = -1.575

                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true; 
                            node.receiveShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
            }
        }

        function selectMachine(machineName){
            selectedMachineName = machineName;

            if (machineName === "Machine1") {
                selectedMachine = machine1;
            } else if (machineName === "Machine2") {
                selectedMachine = machine2;
            }

            selectMusic(mainCharacterName, selectedMachineName);
        }

        function selectMusic(mainCharacterName, selectedMachineName){
            scene.remove(melindaModel);
            scene.clear();
            
            //CAMERA
            camera.position.set(0,75,200);
            camera.lookAt(0,60,0);

            //LIGHT
            { 
                const color = 0xFFFFFF;
                const intensity = .1;
                const light = new THREE.AmbientLight(color, intensity);
                scene.add(light);

                //Lingo
                const lingoColor = 0xc19552;
                const lingoIntensity = 10;
                const lingoLight = new THREE.PointLight(lingoColor, lingoIntensity);
                lingoLight.distance = 1000;
                lingoLight.castShadow = true;
                lingoLight.position.set(-25,85,85);
                scene.add(lingoLight);
                /*const helper = new THREE.PointLightHelper(lingoLight);
                scene.add(helper);*/
            }

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

            const chatBox_texture = textureLoader.load('./Models/Textures/ChatBox/Texture.jpg');
            chatBox_texture.wrapS = THREE.RepeatWrapping;
            chatBox_texture.wrapT = THREE.RepeatWrapping;
            chatBox_texture.magFilter = THREE.NearestFilter;
            const chatBoxRepeats = 1;
            chatBox_texture.repeat.set(chatBoxRepeats,chatBoxRepeats);

            //ROOM
            {
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
            }

            //CHAT BOX
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

            const buttonsDiv = document.createElement('div');
            buttonsDiv.style.position = 'absolute';
            buttonsDiv.style.top = '10px';  // Ajuste a posição conforme necessário
            buttonsDiv.style.left = '10px'; // Ajuste a posição conforme necessário

            // Criar os botões
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            buttonsDiv.appendChild(backButton);
            
            const music1Button = document.createElement('button');
            music1Button.textContent = 'Music 1';
            buttonsDiv.appendChild(music1Button);
            
            const music2Button = document.createElement('button');
            music2Button.textContent = 'Music 2';
            buttonsDiv.appendChild(music2Button);

            // Adicionar os botões ao corpo do documento
            document.body.appendChild(buttonsDiv);

            backButton.addEventListener('click', () => {
                start(mainCharacterName);
            });

            music1Button.addEventListener('click', () => {
                playMusic(mainCharacterName, selectedMachineName, "Music1");
            });

            music2Button.addEventListener('click', () => {
                playMusic(mainCharacterName, selectedMachineName, "Music2");
            });

            //SCENARIO
            {
                loader.load('./Models/Scenario/Dance_Machine_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(645, 0, 175)
                    gltf.scene.scale.set(20,20,20)
                    gltf.scene.rotation.y = -2.35
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                loader.load('./Models/Scenario/Dance_Machine_2/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-540, 0, 325)
                    gltf.scene.scale.set(0.15,0.15,0.15)
                    gltf.scene.rotation.y = 2.32
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                loader.load('./Models/Scenario/Dance_Machine_3/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-390, 0, -390)
                    gltf.scene.scale.set(20,20,20)
                    gltf.scene.rotation.y = 0.84
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                loader.load('./Models/Scenario/Dance_Machine_4/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(355, -125, -120)
                    gltf.scene.scale.set(60,60,60)
                    gltf.scene.rotation.y = 0.72
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                //DECOR
                loader.load('./Models/Scenario/Carpet/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(400,1,-28)
                    gltf.scene.scale.set(20,20,20)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                loader.load('./Models/Scenario/Painting_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(0,100,-500)
                    gltf.scene.scale.set(100,100,100)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Painting_2/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(0,45,499)
                    gltf.scene.scale.set(.05,.05,.05)
                    gltf.scene.rotation.y = 3.4
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Painting_3/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-497,85,0)
                    gltf.scene.scale.set(70,70,70)
                    gltf.scene.rotation.y = 1.575
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                loader.load('./Models/Scenario/Plant_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,0,300)
                    gltf.scene.scale.set(10,10,10)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Plant_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,0,-300)
                    gltf.scene.scale.set(10,10,10)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Plant_/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,0,110)
                    gltf.scene.scale.set(10,10,10)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Plant_/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,0,-110)
                    gltf.scene.scale.set(10,10,10)
                    
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                loader.load('./Models/Scenario/Pool_Table/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(400,0,-20)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                loader.load('./Models/Scenario/Table/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(475,0,-170)
                    gltf.scene.scale.set(100,100,100)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Table/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(475,0,100)
                    gltf.scene.scale.set(100,100,100)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                
                loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(200,15,470)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-200,15,470)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(200,15,-470)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_1/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-200,15,-470)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = 1.575
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_2/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,3,200)
                    gltf.scene.scale.set(50,50,50)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_2/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(-470,3,-200)
                    gltf.scene.scale.set(50,50,50)
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_3/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(500,8,200)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = -1.575
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
                loader.load('./Models/Scenario/Sofa_3/scene.gltf', function(gltf){
                    scene.add(gltf.scene);
                    gltf.scene.position.set(500,8,-200)
                    gltf.scene.scale.set(50,50,50)
                    gltf.scene.rotation.y = -1.575
                
                    gltf.scene.traverse( function( node ) {
                        if ( node.isMesh ) { 
                            node.castShadow = true;
                        }
                    });
                }, undefined, function (error){
                    console.error(error);
                });
            }
        }

        function playMusic(mainCharacterName, selectedMachineName, musicN){
            scene.remove(luarModel, melindaModel, lingoModel);
            scene.clear();

            //CAMERA
            camera.position.set(0,200,380);
            camera.lookAt(0,40,0);

            //LIGHT
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

            //SCENARIO
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

            if(selectedMachineName === "Machine1"){
                switch (musicN) {
                    case "Music1":
                        backgroundMusic.src = "./Music/bonbonchocolat_everglow.mp3";
                        backgroundMusic.play();
                        break;
                    case "Music2":
                        break;
                    default:
                        break;
                }
            }
            else if(selectedMachineName === "Machine2"){
                switch (musicN) {
                    case "Music1":
                        break;
                    case "Music2":
                        break;
                    default:
                        break;
                }
            }
        }
    }

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