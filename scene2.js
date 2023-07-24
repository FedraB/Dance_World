import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js';

function main() {
    
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
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);
  camera.position.set(0,75,200);
  camera.lookAt(0,60,0);

  // RESPONSIVE WINDOW
  window.addEventListener( 'resize', onWindowResize, false )
  function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize( window.innerWidth, window.innerHeight )
  }

  //LIGHT
  { 
    const color = 0xFFFFFF;
    const intensity = .1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
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

  const chatBox_texture = textureLoader.load('./Models/Textures/ChatBox/Texture.jpg');
  chatBox_texture.wrapS = THREE.RepeatWrapping;
  chatBox_texture.wrapT = THREE.RepeatWrapping;
  chatBox_texture.magFilter = THREE.NearestFilter;
  const chatBoxRepeats = 1;
  chatBox_texture.repeat.set(chatBoxRepeats,chatBoxRepeats);

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

  //CHAT BOX
  var geometryChat = new THREE.BoxGeometry(160, 30, 1);
  var chatMesh = new THREE.Mesh(geometryChat, new THREE.MeshStandardMaterial({map: chatBox_texture}));
  scene.add(chatMesh);
  chatMesh.position.x=-30;
  chatMesh.position.y=30;
  chatMesh.position.z=80;

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

  // LOADERS
  const loader = new GLTFLoader();

  //GAME OBJECTS
  loader.load('./Models/Characters/Lingo/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(-45, 85, 65);
    gltf.scene.scale.set(45,45,45);
    gltf.scene.rotation.y = 1;
  }, undefined, function (error){
      console.error(error);
  });

  loader.load('./Models/Characters/Lola.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(60, 0, 100);
    gltf.scene.scale.set(45,45,45);
    gltf.scene.rotation.y = -1.5;

    gltf.scene.traverse( function( node ) {
      if ( node.isMesh ) { 
        node.castShadow = true;
      }
    });
  }, undefined, function (error){
      console.error(error);
  });

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