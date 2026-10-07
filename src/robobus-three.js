import * as THREE from 'three';

export const initRobobusThreeJS = () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Clear any existing canvas
  container.innerHTML = '';

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07090e, 0.018);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3.8, 22);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);

  // Exhibition & Cybernetic Lighting
  const ambientLight = new THREE.AmbientLight(0x0a1e3b, 1.4);
  scene.add(ambientLight);

  const dirLightTeal = new THREE.DirectionalLight(0x00F3FF, 2.8);
  dirLightTeal.position.set(14, 20, 16);
  scene.add(dirLightTeal);

  const dirLightGold = new THREE.DirectionalLight(0xFFD500, 1.6);
  dirLightGold.position.set(-16, 12, -12);
  scene.add(dirLightGold);

  const dirLightFront = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLightFront.position.set(0, 8, 20);
  scene.add(dirLightFront);

  const blueFill = new THREE.PointLight(0x002395, 3.0, 50);
  blueFill.position.set(0, -4, 10);
  scene.add(blueFill);

  // ----------------------------------------------------
  // CLEAN EDGES HOLOGRAPHIC MATERIALS
  // ----------------------------------------------------
  const holoColor = 0x00F3FF;
  
  // Very faint glowing volume
  const holoVolumeMat = new THREE.MeshBasicMaterial({
    color: holoColor,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  // Darker glass volume
  const holoGlassVolumeMat = new THREE.MeshBasicMaterial({
    color: 0x006688,
    transparent: true,
    opacity: 0.04,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  // Bright glowing edges for the blueprint look
  const holoEdgeMat = new THREE.LineBasicMaterial({
    color: holoColor,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });

  const holoGlassEdgeMat = new THREE.LineBasicMaterial({
    color: 0x00FFFF,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });

  // Helpers to create clean hologram shapes
  const createHoloBox = (w, h, d, isGlass = false) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, isGlass ? holoGlassVolumeMat : holoVolumeMat);
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(edges, isGlass ? holoGlassEdgeMat : holoEdgeMat);
    mesh.add(line);
    return mesh;
  };

  const createHoloCylinder = (rTop, rBot, h, s, isGlass = false) => {
    const geo = new THREE.CylinderGeometry(rTop, rBot, h, s);
    const mesh = new THREE.Mesh(geo, isGlass ? holoGlassVolumeMat : holoVolumeMat);
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(edges, isGlass ? holoGlassEdgeMat : holoEdgeMat);
    mesh.add(line);
    return mesh;
  };

  const glowingCyanLineMat = new THREE.LineBasicMaterial({
    color: 0x00F3FF,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  // ----------------------------------------------------
  // 3D PIX ROBOBUS MASTER BUILDER (Matching Reference Photo)
  // ----------------------------------------------------
  const robobusMasterGroup = new THREE.Group();
  scene.add(robobusMasterGroup);

  const robobusPod = new THREE.Group();
  robobusMasterGroup.add(robobusPod);

  // Proportions matching the reference photo:
  // Tall, rounded pod capsule with outboard wheels and flared fenders
  const CABIN_W = 2.5;     // Main body width (X)
  const CABIN_L = 4.8;     // Main body length (Z)
  const CABIN_H = 3.3;     // Total body height (Y: 0.7 to 4.0)
  const WHEEL_TRACK = 3.6; // Outboard wheel center (X = ±1.8)
  const WHEEL_BASE = 3.6;  // Wheelbase (Z = ±1.8)
  const WHEEL_R = 0.62;    // Wheel radius

  // --------------------------------------------------
  // 1. PROPER AUTONOMOUS SHUTTLE CABIN (Clean Edges)
  // --------------------------------------------------
  const cabinGroup = new THREE.Group();
  robobusPod.add(cabinGroup);

  // A. Main Lower Body (Solid Chassis)
  const chassis = createHoloBox(CABIN_W, 0.8, CABIN_L);
  chassis.position.y = 1.1;
  cabinGroup.add(chassis);

  // Front & Rear Bumpers (slightly protruding)
  const bumperF = createHoloBox(CABIN_W * 0.9, 0.4, 0.3);
  bumperF.position.set(0, 0.9, CABIN_L / 2 + 0.15);
  cabinGroup.add(bumperF);

  const bumperR = createHoloBox(CABIN_W * 0.9, 0.4, 0.3);
  bumperR.position.set(0, 0.9, -(CABIN_L / 2 + 0.15));
  cabinGroup.add(bumperR);

  // B. Upper Glass Canopy (Wrap-around windows)
  // Side Windows
  const sideGlass = createHoloBox(CABIN_W * 0.95, 1.4, CABIN_L * 0.8, true);
  sideGlass.position.y = 2.2;
  cabinGroup.add(sideGlass);

  // Front & Rear Windshields
  const endGlassF = createHoloBox(CABIN_W * 0.85, 1.4, 0.2, true);
  endGlassF.position.set(0, 2.2, CABIN_L / 2 * 0.9);
  cabinGroup.add(endGlassF);

  const endGlassR = createHoloBox(CABIN_W * 0.85, 1.4, 0.2, true);
  endGlassR.position.set(0, 2.2, -CABIN_L / 2 * 0.9);
  cabinGroup.add(endGlassR);

  // Roof Structure
  const roof = createHoloBox(CABIN_W * 0.98, 0.2, CABIN_L * 0.95);
  roof.position.y = 3.0;
  cabinGroup.add(roof);

  // --------------------------------------------------
  // 2. WIDE SLIDING DOORS (Center)
  // --------------------------------------------------
  [-1.1, 1.1].forEach((sideX) => {
    // Large glass doors
    const door = createHoloBox(0.1, 1.9, 1.6, true);
    door.position.set(sideX > 0 ? CABIN_W / 2 + 0.05 : -CABIN_W / 2 - 0.05, 1.95, 0);
    cabinGroup.add(door);
  });

  // --------------------------------------------------
  // 3. LED LIGHT BARS & SENSORS
  // --------------------------------------------------
  // High-mounted corner LiDAR sensors
  const sensorConfigs = [
    { x: -CABIN_W * 0.45, y: 3.15, z: CABIN_L * 0.45 },
    { x: CABIN_W * 0.45, y: 3.15, z: CABIN_L * 0.45 },
    { x: -CABIN_W * 0.45, y: 3.15, z: -CABIN_L * 0.45 },
    { x: CABIN_W * 0.45, y: 3.15, z: -CABIN_L * 0.45 }
  ];

  const earLidarPucks = [];
  sensorConfigs.forEach(cfg => {
    const lidarPuck = createHoloCylinder(0.15, 0.15, 0.2, 16);
    lidarPuck.position.set(cfg.x, cfg.y, cfg.z);
    cabinGroup.add(lidarPuck);
    earLidarPucks.push(lidarPuck);
  });

  // --------------------------------------------------
  // 4. WHEELS (Holographic Cyber Wheels)
  // --------------------------------------------------
  const wheelAssemblies = [];
  const wheelConfigs = [
    { x: -WHEEL_TRACK * 0.45, z: WHEEL_BASE * 0.45, isFront: true },
    { x: WHEEL_TRACK * 0.45, z: WHEEL_BASE * 0.45, isFront: true },
    { x: -WHEEL_TRACK * 0.45, z: -WHEEL_BASE * 0.45, isFront: false },
    { x: WHEEL_TRACK * 0.45, z: -WHEEL_BASE * 0.45, isFront: false }
  ];

  wheelConfigs.forEach(cfg => {
    const steerPivot = new THREE.Group();
    steerPivot.position.set(cfg.x, 0.6, cfg.z);
    robobusPod.add(steerPivot);

    const wheelRotator = new THREE.Group();
    steerPivot.add(wheelRotator);

    // Tire (Hollow edge cylinder)
    const tire = createHoloCylinder(WHEEL_R, WHEEL_R, 0.35, 24);
    tire.rotation.z = Math.PI / 2;
    wheelRotator.add(tire);
    
    // Hub
    const hub = createHoloCylinder(WHEEL_R * 0.4, WHEEL_R * 0.4, 0.38, 12);
    hub.rotation.z = Math.PI / 2;
    wheelRotator.add(hub);

    wheelAssemblies.push({ steerPivot, wheelRotator, isFront: cfg.isFront });
  });

  // --------------------------------------------------
  // 5. HIGH-MOUNTED SENSOR "EARS" & TOP ROOF DOME
  // --------------------------------------------------
  const sensorGroup = new THREE.Group();
  robobusPod.add(sensorGroup);

  // The 4 prominent high-mounted sensor stalk "ears" seen in the reference photo!
  const sensorEarConfigs = [
    { x: -CABIN_W * 0.48, y: 3.1, z: CABIN_L * 0.3, isLeft: true, isFront: true },
    { x: CABIN_W * 0.48, y: 3.1, z: CABIN_L * 0.3, isLeft: false, isFront: true },
    { x: -CABIN_W * 0.48, y: 3.1, z: -CABIN_L * 0.3, isLeft: true, isFront: false },
    { x: CABIN_W * 0.48, y: 3.1, z: -CABIN_L * 0.3, isLeft: false, isFront: false }
  ];

  const earLidarPucks = [];

  sensorEarConfigs.forEach(cfg => {
    const earGroup = new THREE.Group();
    earGroup.position.set(cfg.x, cfg.y, cfg.z);
    sensorGroup.add(earGroup);

    // Horizontal stalk boom extending outward
    const stalkGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.44, 12);
    stalkGeo.rotateZ(Math.PI / 2);
    const stalkMesh = new THREE.Mesh(stalkGeo, darkTrimMat);
    stalkMesh.position.x = cfg.isLeft ? -0.22 : 0.22;
    earGroup.add(stalkMesh);

    // Aerodynamic sensor teardrop pod at tip of stalk
    const tipPodGeo = new THREE.SphereGeometry(0.15, 14, 14);
    tipPodGeo.scale(1.4, 0.85, 1.1);
    const tipPod = new THREE.Mesh(tipPodGeo, darkTrimMat);
    tipPod.position.x = cfg.isLeft ? -0.44 : 0.44;
    earGroup.add(tipPod);

    // Vertical miniature LiDAR puck mounted on top of the ear pod
    const earLidarGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.14, 14);
    const earLidarMesh = new THREE.Mesh(earLidarGeo, ledBladeCyanMat);
    earLidarMesh.position.set(cfg.isLeft ? -0.44 : 0.44, 0.12, 0);
    earGroup.add(earLidarMesh);
    earLidarPucks.push(earLidarMesh);

    // Forward/Rear Optical Camera Lens Aperture on ear
    const lensGeo = new THREE.CircleGeometry(0.055, 12);
    const lensMesh = new THREE.Mesh(lensGeo, new THREE.MeshBasicMaterial({ color: 0x00F3FF, side: THREE.DoubleSide }));
    lensMesh.position.set(cfg.isLeft ? -0.44 : 0.44, 0, cfg.isFront ? 0.15 : -0.15);
    if (!cfg.isFront) lensMesh.rotation.y = Math.PI;
    earGroup.add(lensMesh);
  });

  // Top Center Low-Profile Roof Dome / Satellite LiDAR Pod
  const topDomeGeo = new THREE.SphereGeometry(0.32, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.45);
  topDomeGeo.scale(1.2, 0.52, 1.2);
  const topDome = new THREE.Mesh(topDomeGeo, holoBodyMat);
  topDome.position.set(0, 3.65, 0);
  sensorGroup.add(topDome);

  const topDomeWire = new THREE.Mesh(topDomeGeo, holoBodyWireframe);
  topDomeWire.position.set(0, 3.65, 0);
  sensorGroup.add(topDomeWire);

  // Rotating Central LiDAR Sensor Scanner inside the dome
  const topScannerHead = new THREE.Group();
  topScannerHead.position.set(0, 3.75, 0);
  sensorGroup.add(topScannerHead);

  // Sweeping 360° LiDAR Holographic Laser Fan
  const radarSectorGeo = new THREE.CylinderGeometry(16, 0.2, 0.1, 32, 1, false, 0, Math.PI * 0.42);
  radarSectorGeo.rotateZ(Math.PI / 2);
  const radarSectorMat = new THREE.MeshBasicMaterial({
    color: 0x00F3FF,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const radarSector = new THREE.Mesh(radarSectorGeo, radarSectorMat);
  radarSector.position.y = -0.5;
  topScannerHead.add(radarSector);

  // 3 Concentric Expanding Radar Ground Rings
  const pulseRings = [];
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.RingGeometry(0.6, 0.9, 32);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00F3FF,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.08;
    robobusPod.add(ringMesh);
    pulseRings.push({ mesh: ringMesh, basePhase: i / 3 });
  }

  // Neon Underglow Ground Halo (illuminates cyber-grid beneath chassis)
  const underglowGeo = new THREE.PlaneGeometry(CABIN_W * 1.35, CABIN_L * 1.15);
  const underglowMat = new THREE.MeshBasicMaterial({
    color: 0x00F3FF,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  const underglowMesh = new THREE.Mesh(underglowGeo, underglowMat);
  underglowMesh.rotation.x = Math.PI / 2;
  underglowMesh.position.y = 0.06;
  robobusPod.add(underglowMesh);

  // ----------------------------------------------------
  // HOLOGRAPHIC CYBER ROAD & DREBAR L4 PATH TRAJECTORY
  // ----------------------------------------------------
  // Infinite Cyber Ground Grid
  const gridHelper = new THREE.GridHelper(90, 45, 0x00A2A2, 0x08253a);
  gridHelper.position.y = 0;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.35;
  gridHelper.material.blending = THREE.AdditiveBlending;
  scene.add(gridHelper);

  // Autonomous Path Trajectory Ribbon (DREBAR path planning ahead of shuttle)
  const trajectoryPoints = [];
  const TRAJ_LEN = 35;
  for (let i = 0; i < TRAJ_LEN; i++) {
    const z = i * 1.5;
    const x = Math.sin(i * 0.2) * 1.8;
    trajectoryPoints.push(new THREE.Vector3(x, 0.12, z));
  }
  const trajectoryCurve = new THREE.CatmullRomCurve3(trajectoryPoints);
  const trajectoryGeo = new THREE.BufferGeometry().setFromPoints(trajectoryCurve.getPoints(70));
  const trajectoryLine = new THREE.Line(trajectoryGeo, new THREE.LineDashedMaterial({
    color: 0x00F3FF,
    linewidth: 2,
    scale: 1,
    dashSize: 1.2,
    gapSize: 0.8,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  }));
  trajectoryLine.computeLineDistances();
  scene.add(trajectoryLine);

  // Holographic Waypoint Nodes on Road
  const waypointsGroup = new THREE.Group();
  scene.add(waypointsGroup);
  [6, 16, 26, 36].forEach((dist, idx) => {
    const wpCircleGeo = new THREE.RingGeometry(0.6, 0.85, 16);
    wpCircleGeo.rotateX(Math.PI / 2);
    const wpCircle = new THREE.Mesh(wpCircleGeo, new THREE.MeshBasicMaterial({
      color: idx % 2 === 0 ? 0x00F3FF : 0xFFD500,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    }));
    wpCircle.position.set(Math.sin((dist / 1.5) * 0.2) * 1.8, 0.15, dist);
    waypointsGroup.add(wpCircle);
  });

  // ----------------------------------------------------
  // AUTONOMOUS POINT-CLOUD PERCEPTION SIMULATION
  // ----------------------------------------------------
  const pointCount = 280;
  const pointPositions = new Float32Array(pointCount * 3);
  const pointColors = new Float32Array(pointCount * 3);

  for (let i = 0; i < pointCount; i++) {
    const r = 5 + Math.random() * 26;
    const theta = Math.random() * Math.PI * 2;
    const y = Math.random() * 6 - 0.5;

    pointPositions[i * 3] = Math.cos(theta) * r;
    pointPositions[i * 3 + 1] = y;
    pointPositions[i * 3 + 2] = Math.sin(theta) * r;

    const isGold = Math.random() > 0.85;
    pointColors[i * 3] = isGold ? 1.0 : 0.0;
    pointColors[i * 3 + 1] = isGold ? 0.83 : 0.95;
    pointColors[i * 3 + 2] = isGold ? 0.0 : 1.0;
  }

  const pointCloudGeo = new THREE.BufferGeometry();
  pointCloudGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
  pointCloudGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

  const pointCloudMat = new THREE.PointsMaterial({
    size: 0.28,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const pointCloud = new THREE.Points(pointCloudGeo, pointCloudMat);
  scene.add(pointCloud);

  // ----------------------------------------------------
  // INTERACTIVE ORBIT & SCROLL CONTROLS
  // ----------------------------------------------------
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    targetMouseX = (event.clientX - windowHalfX) * 0.0012;
    targetMouseY = (event.clientY - windowHalfY) * 0.0012;
  });

  let scrollY = window.scrollY;
  let targetScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ----------------------------------------------------
  // ANIMATION LOOP
  // ----------------------------------------------------
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth damping for mouse and scroll
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;
    scrollY += (targetScrollY - scrollY) * 0.08;

    const scrollRatio = Math.min(1.0, scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1));

    // 1. Suspension Breathing
    const hoverY = Math.sin(elapsedTime * 2.2) * 0.06;
    robobusPod.position.y = hoverY;

    // 2. Wheel Rotation & Dynamic Autonomous Steering
    const driveSpeed = 0.07;
    const steerAngle = Math.sin(elapsedTime * 1.5) * 0.2;

    wheelAssemblies.forEach(wa => {
      // Wheel rolling
      wa.wheelRotator.rotation.x += driveSpeed * 2.5;

      // 4-wheel independent steering
      if (wa.isFront) {
        wa.steerPivot.rotation.y = steerAngle;
      } else {
        wa.steerPivot.rotation.y = -steerAngle * 0.55;
      }
    });

    // 3. Sweeping LiDAR Sensor Scanner
    topScannerHead.rotation.y += 0.045;

    // Corner ear LiDAR puck pulsing
    earLidarPucks.forEach((puck, idx) => {
      puck.scale.setScalar(1 + Math.sin(elapsedTime * 4 + idx) * 0.12);
    });

    // 4. Expanding Radar Ground Rings
    pulseRings.forEach(pr => {
      const p = (elapsedTime * 0.5 + pr.basePhase) % 1;
      const s = 1 + p * 16;
      pr.mesh.scale.set(s, s, s);
      pr.mesh.material.opacity = (1 - p) * 0.55;
    });

    // 5. Road Grid Forward Scroll Illusion
    gridHelper.position.z = (elapsedTime * 4.5) % 2;

    // 6. Responsive Section Staging
    const isDesktop = window.innerWidth >= 1200;
    const isMobile = window.innerWidth < 768;

    let targetX = 5.8;
    let targetY = 0.6;
    let targetZ = 2.0;
    let targetRotY = -0.75 + mouseX * 0.6;
    let targetRotX = 0.08 + mouseY * 0.35;
    let targetScale = 1.05;

    if (scrollRatio < 0.2) {
      // HERO SECTION: 3/4 Heroic angle showcasing front fascia, ear sensors & white dish wheels
      targetX = isDesktop ? 6.5 : (isMobile ? 0.0 : 4.0);
      targetY = isMobile ? 0.0 : 0.85;
      targetZ = isMobile ? -1.0 : 3.5;
      targetRotY = isDesktop ? -0.78 + mouseX * 0.6 : -0.45 + mouseX * 0.6;
      targetScale = isMobile ? 0.95 : 1.32;
    } else if (scrollRatio < 0.45) {
      // PARTNERSHIP SECTION: Slides across to reveal side profile and outboard wheels
      targetX = isDesktop ? -5.8 : -2.2;
      targetY = 0.4;
      targetZ = 1.0;
      targetRotY = 0.62 + mouseX * 0.6;
      targetScale = 1.1;
    } else if (scrollRatio < 0.72) {
      // ROBOBUS MALAYSIA SECTION: Centers and turns to side profile showing giant capsule doors
      targetX = isDesktop ? 5.2 : 1.8;
      targetY = 0.4;
      targetZ = 2.2;
      targetRotY = Math.PI * 0.48 + mouseX * 0.5;
      targetScale = 1.25;
    } else {
      // DREBAR / STAND C01: Forward drive perspective with path trajectory
      targetX = 0.0;
      targetY = -0.1;
      targetZ = 4.5;
      targetRotY = mouseX * 0.8;
      targetRotX = 0.22 + mouseY * 0.35;
      targetScale = 1.3;
    }

    // Smooth lerp to target poses
    robobusMasterGroup.position.x += (targetX - robobusMasterGroup.position.x) * 0.04;
    robobusMasterGroup.position.y += (targetY - robobusMasterGroup.position.y) * 0.04;
    robobusMasterGroup.position.z += (targetZ - robobusMasterGroup.position.z) * 0.04;
    robobusMasterGroup.rotation.y += (targetRotY - robobusMasterGroup.rotation.y) * 0.04;
    robobusMasterGroup.rotation.x += (targetRotX - robobusMasterGroup.rotation.x) * 0.04;
    robobusMasterGroup.scale.setScalar(
      robobusMasterGroup.scale.x + (targetScale - robobusMasterGroup.scale.x) * 0.04
    );

    // Camera subtle parallax
    camera.position.x = mouseX * 2.5;
    camera.position.y = 3.8 - mouseY * 1.5;
    camera.lookAt(0, 1.8, 0);

    renderer.render(scene, camera);
  };

  animate();
};
