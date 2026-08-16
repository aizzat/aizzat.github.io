import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const initThreeJS = () => {
  const container = document.getElementById('canvas-container');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0A0A0A'); // Background color from theme
  scene.fog = new THREE.FogExp2(0x0A0A0A, 0.015);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 40);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // High quality lighting setup
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x00A2A2, 3.0); // Turquoise main light
  dirLight.position.set(15, 20, 10);
  scene.add(dirLight);

  const blueLight = new THREE.PointLight(0x184A92, 4.0, 60); // Blue accent
  blueLight.position.set(-15, 5, 10);
  scene.add(blueLight);
  
  const whiteFill = new THREE.DirectionalLight(0xffffff, 1.0);
  whiteFill.position.set(-10, 0, -10);
  scene.add(whiteFill);

  // Shared Hologram Material
  const hologramMaterial = new THREE.MeshLambertMaterial({
    color: 0x184A92, // Deep blue base
    emissive: 0x00A2A2, // Turquoise glow
    emissiveIntensity: 0.4, // Reduced for text readability
    wireframe: true,
    transparent: true,
    opacity: 0.3, // Reduced for text readability
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  // Darker Hologram Material specifically for the Robot Arm
  const armHologramMaterial = new THREE.MeshLambertMaterial({
    color: 0x0a1e3b, // Extremely dark blue base
    emissive: 0x004444, // Dim turquoise glow
    emissiveIntensity: 0.25, // Increased slightly for visibility
    wireframe: true,
    transparent: true,
    opacity: 0.25, // Increased slightly so it can be seen
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  // Loaders
  const gltfLoader = new GLTFLoader();
  
  let robotArm;
  let mixer;

  gltfLoader.load('/robot_arm.glb', (gltf) => {
    robotArm = gltf.scene;
    // Normalize scale and position - make it massive like the sphere
    robotArm.scale.set(15, 15, 15);
    robotArm.position.set(0, -15, -10);
    robotArm.rotation.y = Math.PI / 2; // Set default view to side profile (S shape)
    
    // Apply darker hologram material
    robotArm.traverse((child) => {
      if (child.isMesh) {
        child.material = armHologramMaterial;
      }
    });

    scene.add(robotArm);
  });

  // Bright Solid Material for the Timeline UGV
  const solidHologramMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff, // Bright cyan base
    emissive: 0x008888, // Cyan glow
    emissiveIntensity: 0.8,
    wireframe: false, // Solid, not wireframe
    transparent: true,
    opacity: 0.9, // High opacity to stand out against background
    blending: THREE.NormalBlending,
    depthWrite: true
  });

  // Create Procedural Premium UGV (Autonomous Mobile Robot)
  const createUGV = (isTimeline = false) => {
    const ugvGroup = new THREE.Group();
    const mat = isTimeline ? solidHologramMaterial : hologramMaterial;
    
    // Chassis
    const chassisGeo = new THREE.BoxGeometry(4, 1.5, 6);
    const chassis = new THREE.Mesh(chassisGeo, mat);
    chassis.position.y = 1;
    ugvGroup.add(chassis);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(1, 1, 0.8, 32);
    wheelGeo.rotateZ(Math.PI / 2);
    
    const wheelPositions = [
      [-2.2, 1, 2], [2.2, 1, 2],
      [-2.2, 1, -2], [2.2, 1, -2]
    ];
    
    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, mat);
      wheel.position.set(...pos);
      ugvGroup.add(wheel);
    });

    // Sensor / LiDAR on top
    const sensorGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
    const sensorMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff, 
      emissive: 0x00ffff, // Bright cyan glow
      emissiveIntensity: 1.0,
      wireframe: !isTimeline, // Solid if timeline
      transparent: true,
      opacity: 0.9,
      blending: isTimeline ? THREE.NormalBlending : THREE.AdditiveBlending
    });
    const sensor = new THREE.Mesh(sensorGeo, sensorMaterial);
    sensor.position.set(0, 2.25, 1);
    sensor.name = "lidar";

    // Holographic LiDAR Scanning Beam (Sweeping Radar)
    const beamGeo = new THREE.CylinderGeometry(15, 0.1, 60, 32); // Wide at top, tiny at base
    beamGeo.rotateX(Math.PI / 2); // Point wide end forward (+Z)
    beamGeo.translate(0, 0, 30); // Move tiny tip to origin
    
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: isTimeline ? 0.15 : 0.05, // Make beam brighter for timeline
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    sensor.add(beam);

    ugvGroup.add(sensor);

    return ugvGroup;
  };

  const ugv = createUGV(false);
  ugv.position.set(12, -8, -15);
  scene.add(ugv);

  const timelineUgv = createUGV(true);
  timelineUgv.scale.set(1.5, 1.5, 1.5); // Make it slightly larger so it's very clear
  timelineUgv.visible = false;
  scene.add(timelineUgv);

  // --- Holographic City Buildings (for LiDAR scanning) ---
  const cityGroup = new THREE.Group();
  for(let i=0; i<30; i++) {
    const w = 4 + Math.random() * 8;
    const h = 10 + Math.random() * 40;
    const d = 4 + Math.random() * 8;
    const buildingGeo = new THREE.BoxGeometry(w, h, d);
    const building = new THREE.Mesh(buildingGeo, hologramMaterial);
    
    // Scatter buildings in the distant background
    const x = (Math.random() - 0.5) * 150;
    const z = -40 - Math.random() * 40;
    building.position.set(x, h/2 - 15, z);
    cityGroup.add(building);
  }
  scene.add(cityGroup);

  // --- Sensor Node Network (Particles + Lines) ---
  const nodeCount = 150;
  const nodes = [];
  const maxDistance = 15;

  const nodeGeometry = new THREE.BufferGeometry();
  const nodePositions = new Float32Array(nodeCount * 3);
  
  for(let i=0; i<nodeCount; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 50 - 20; // Keep mostly behind

    nodePositions[i*3] = x;
    nodePositions[i*3+1] = y;
    nodePositions[i*3+2] = z;

    nodes.push({
      velocity: new THREE.Vector3((Math.random()-0.5)*0.08, (Math.random()-0.5)*0.08, (Math.random()-0.5)*0.08)
    });
  }

  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
  
  const nodeMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.3,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const nodeParticles = new THREE.Points(nodeGeometry, nodeMaterial);
  scene.add(nodeParticles);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x184A92,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
  });
  let linesMesh = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
  scene.add(linesMesh);

  // Mouse interaction variables
  let mouseX = 0;
  let mouseY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
  });

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  let lastTime = 0;

  const animate = () => {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    const delta = time - lastTime;
    lastTime = time;

    const targetX = mouseX * 0.002;
    const targetY = mouseY * 0.002;

    if (robotArm) {
      // Base fixed (no swinging or floating)
      robotArm.rotation.y = (Math.PI / 2) + (targetX * 0.2); // Side profile with slight parallax
      robotArm.rotation.x = targetY * 0.2;
      robotArm.position.y = -15;

      // Change from big to far on scroll
      const scale = Math.max(1.5, 15 - (scrollY * 0.015));
      robotArm.scale.set(scale, scale, scale);
      robotArm.position.z = -10 - (scrollY * 0.04);
    }

    if (ugv) {
      // UGV driving in a wide ellipse around the scene
      const speed = 0.08; 
      ugv.position.x = Math.sin(time * speed) * 35;
      ugv.position.z = -20 + Math.cos(time * speed) * 15;
      ugv.position.y = -8;
      
      // Point the UGV in the direction of travel
      const dx = Math.cos(time * speed) * 35;
      const dz = -Math.sin(time * speed) * 15;
      ugv.rotation.y = Math.atan2(dx, dz) + Math.PI; // Face forward
      ugv.rotation.x = 0;
      ugv.rotation.z = 0;
      
      // Spin LiDAR (Radar sweep effect)
      const lidar = ugv.getObjectByName("lidar");
      if (lidar) lidar.rotation.y += 0.02; 
      
      // Wheels rolling animation
      ugv.children.forEach(child => {
        if (child.geometry.type === 'CylinderGeometry' && child.name !== 'lidar') {
          child.rotation.x += 0.1;
        }
      });
    }

    if (timelineUgv) {
      let drivingTimeline = false;
      const timelineEl = document.getElementById('timeline');
      
      if (timelineEl) {
        const rect = timelineEl.getBoundingClientRect();
        // If the timeline is anywhere near the viewport
        if (rect.top < window.innerHeight + 300 && rect.bottom > -300) {
          drivingTimeline = true;
          timelineUgv.visible = true;
          
          // Map progress 0 to 1 based on timeline position in screen
          let progress = (window.innerHeight / 2 - rect.top) / rect.height;
          progress = Math.max(-0.1, Math.min(1.1, progress));
          
          // Smooth the progress for fluid motion
          if (typeof timelineUgv.userData.smoothedProgress === 'undefined') {
            timelineUgv.userData.smoothedProgress = progress;
          }
          timelineUgv.userData.smoothedProgress += (progress - timelineUgv.userData.smoothedProgress) * 0.1;

          // Target Y in camera's local space (top to bottom of screen)
          // At -25 Z, the visible Y is roughly +/- 14.
          const targetY_local = 8 - (timelineUgv.userData.smoothedProgress * 16); 

          // Calculate exact world position relative to camera's current view
          const localOffset = new THREE.Vector3(0, targetY_local, -25);
          localOffset.applyMatrix4(camera.matrixWorld);
          
          timelineUgv.position.copy(localOffset);

          // Align rotation precisely with camera, then pitch down 90 degrees
          timelineUgv.quaternion.copy(camera.quaternion);
          timelineUgv.rotateX(Math.PI / 2); // Roof faces camera, nose points down screen
          
          const lidar = timelineUgv.getObjectByName("lidar");
          if (lidar) lidar.rotation.y += 0.05;
          
          timelineUgv.children.forEach(child => {
            if (child.geometry.type === 'CylinderGeometry' && child.name !== 'lidar') {
              child.rotation.x += 0.2; // spin faster when driving down timeline
            }
          });
        }
      }

      if (!drivingTimeline) {
        timelineUgv.visible = false;
        // Pre-position slightly above the view so it smoothly enters next time
        timelineUgv.position.set(0, camera.position.y + 15, 15);
        timelineUgv.rotation.set(Math.PI / 2, 0, 0);
      }
    }

    // Camera movement based on scroll
    camera.position.y = 5 - (scrollY * 0.02);
    camera.lookAt(0, 0, 0);

    // --- Update Sensor Nodes ---
    const positions = nodeParticles.geometry.attributes.position.array;
    const linePositions = [];
    
    for(let i=0; i<nodeCount; i++) {
      const p = nodes[i];
      // Update position
      positions[i*3] += p.velocity.x;
      positions[i*3+1] += p.velocity.y;
      positions[i*3+2] += p.velocity.z;

      // Bounce off bounds
      if(positions[i*3] > 50 || positions[i*3] < -50) p.velocity.x *= -1;
      if(positions[i*3+1] > 50 || positions[i*3+1] < -50) p.velocity.y *= -1;
      if(positions[i*3+2] > 10 || positions[i*3+2] < -50) p.velocity.z *= -1;

      // Check connections
      for(let j=i+1; j<nodeCount; j++) {
        const dx = positions[i*3] - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        const distSq = dx*dx + dy*dy + dz*dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            positions[i*3], positions[i*3+1], positions[i*3+2],
            positions[j*3], positions[j*3+1], positions[j*3+2]
          );
        }
      }
    }
    
    nodeParticles.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    renderer.render(scene, camera);
  };

  animate();
};
