import * as THREE from 'three';

export function generateScene1(camera, scene, textureLoader, gltfLoader) {
    cameraScene1(camera);
    lightsScene1(scene);
    generateRoomScene1(textureLoader, scene, gltfLoader);
}

export function generateScene2(controls, camera, scene, textureLoader, gltfLoader) {
    cameraScene2(controls, camera);
    lightsScene1(scene);
    generateRoomScene1(textureLoader, scene, gltfLoader);
}

export function generateScene3(camera, scene, textureLoader, gltfLoader) {
    cameraScene3(camera);
    lightsScene3(scene);
    generateRoomScene3(textureLoader, scene, gltfLoader);
}

export function generateScene4(camera, scene, textureLoader) {
    cameraScene4(camera);
    lightsScene4(scene);
    generateRoomScene4(textureLoader, scene);
}

function cameraScene1(camera) {
    camera.position.set(0,100,200);
    camera.lookAt(0,60,0);
}

function lightsScene1(scene) {
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

function generateRoomScene1(textureLoader, scene, loader) {
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

    //DECOR
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

function cameraScene2(controls, camera) {
    controls.minDistance = 5
    controls.maxDistance = 150
    controls.enablePan = false
    controls.maxPolarAngle = Math.PI / 2 - 0.05
    controls.target.set(0,60,0)
    controls.update();

    camera.position.set(0,400,1000);

    controls.update();
}

function cameraScene3(camera) {
    camera.position.set(0,75,200);
    camera.lookAt(0,60,0);
}

function lightsScene3(scene) {
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

function generateRoomScene3(textureLoader, scene, loader) {
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

    //SCENARIO
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

function cameraScene4(camera) {
    camera.position.set(0,200,380);
    camera.lookAt(0,40,0);
}

function lightsScene4(scene) {
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

function generateRoomScene4(textureLoader, scene){
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