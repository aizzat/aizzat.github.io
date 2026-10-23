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

  // Respect the OS "reduce motion" setting: robots hold still, scroll-driven placement still works
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionScale = reduceMotion ? 0 : 1;

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

  const WHEEL_RADIUS = 1;

  // Create Procedural Premium UGV (Autonomous Mobile Robot)
  // Forward is +Z. Wheels sit on the group; chassis and sensor sit on a "body" sub-group
  // so the body can lean and bounce on its suspension while the wheels stay planted.
  const createUGV = (isTimeline = false) => {
    const ugvGroup = new THREE.Group();
    const body = new THREE.Group();
    ugvGroup.add(body);
    const mat = isTimeline ? solidHologramMaterial : hologramMaterial;

    // Chassis
    const chassisGeo = new THREE.BoxGeometry(4, 1.5, 6);
    const chassis = new THREE.Mesh(chassisGeo, mat);
    chassis.position.y = 1;
    body.add(chassis);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(WHEEL_RADIUS, WHEEL_RADIUS, 0.8, 32);
    wheelGeo.rotateZ(Math.PI / 2);

    const wheelPositions = [
      [-2.2, 1, 2], [2.2, 1, 2],
      [-2.2, 1, -2], [2.2, 1, -2]
    ];

    const wheels = wheelPositions.map(pos => {
      const wheel = new THREE.Mesh(wheelGeo, mat);
      wheel.position.set(...pos);
      ugvGroup.add(wheel);
      return wheel;
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

    body.add(sensor);

    // Base opacities so the whole robot can be faded in and out
    const fadeMaterials = [mat, sensorMaterial, beamMat].map(m => ({ m, base: m.opacity }));
    ugvGroup.userData = { body, sensor, wheels, fadeMaterials };

    return ugvGroup;
  };

  // Roll the wheels by the distance actually travelled, so they never skid
  const rollWheels = (robot, distance) => {
    robot.userData.wheels.forEach(w => { w.rotation.x += distance / WHEEL_RADIUS; });
  };

  const setRobotOpacity = (robot, fade) => {
    robot.userData.fadeMaterials.forEach(({ m, base }) => { m.opacity = base * fade; });
    robot.visible = fade > 0.01;
  };

  // Shortest signed difference between two angles
  const angleDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

  const ugv = createUGV(false);
  scene.add(ugv);

  const timelineUgv = createUGV(true);
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
  cityGroup.updateMatrixWorld(true); // Static, so ray hits are valid from the first frame

  // --- Background UGV route, drawn like an Autoware RViz planning view ---
  // Lane boundaries + dashed centre line + drivable area (static), and a speed-coloured
  // trajectory ribbon with flowing chevrons and footprint outlines ahead of the robot (per frame).
  const GROUND_Y = -8;
  const LANDSCAPE_ROUTE = [
    [-38, -12], [-20, -6], [0, -14], [18, -6], [36, -14],
    [30, -30], [10, -36], [-8, -26], [-26, -36], [-40, -26]
  ];
  // Tall loop running into the distance, so the whole route fits a portrait phone screen
  const PORTRAIT_ROUTE = [
    [0, -3], [6, -7], [8, -16], [4, -25], [7, -35],
    [2, -44], [-5, -41], [-8, -31], [-4, -21], [-7, -11]
  ];

  const UGV_SPEED = 3; // world units per second on straights
  const SLOWDOWN = 0.45; // fraction of speed shed in the tightest bends
  const KAPPA_SLOW = 0.18; // curvature (1/radius) at which the robot is slowest
  const LANE_HALF = 3.2; // lane half-width at robot scale 1
  const ROBOT_HALF_WIDTH = 2.6; // wheel outer edge, at robot scale 1
  const ROBOT_HALF_LENGTH = 3;
  const TRAJ_LENGTH = 26; // planned trajectory shown ahead of the robot
  const TRAJ_SAMPLES = 60;
  const CHEVRON_SPACING = 3;
  const FOOTPRINT_SPACING = 6.5;
  const SPEED_TABLE_SIZE = 720;

  const ugvState = { distance: 0, speed: UGV_SPEED, heading: null, roll: 0 };
  const routeGroup = new THREE.Group();
  scene.add(routeGroup);
  let route;
  let routeLength = 1;
  let speedTable = new Float32Array(SPEED_TABLE_SIZE).fill(UGV_SPEED);
  let robotScale = 1;
  let layoutKey = '';

  const wrapDist = (d) => ((d % routeLength) + routeLength) % routeLength;
  const plannedSpeedAt = (d) => speedTable[Math.floor(wrapDist(d) / routeLength * SPEED_TABLE_SIZE) % SPEED_TABLE_SIZE];

  // Point, forward tangent and left normal on the ground at a distance along the route
  const samplePoint = new THREE.Vector3();
  const sampleTangent = new THREE.Vector3();
  const sampleNormal = new THREE.Vector3();
  const sampleRoute = (d) => {
    const u = wrapDist(d) / routeLength;
    route.getPointAt(u, samplePoint);
    route.getTangentAt(u, sampleTangent);
    sampleTangent.y = 0;
    sampleTangent.normalize();
    sampleNormal.set(sampleTangent.z, 0, -sampleTangent.x);
  };

  // Static strip along the whole loop, `offset` from the centre line; `keep(s)` drops segments (for dashes)
  const buildStrip = (offset, width, opacity, keep = () => true) => {
    const steps = 600;
    const verts = [];
    const side = (d) => {
      sampleRoute(d);
      const lo = offset - width / 2;
      const hi = offset + width / 2;
      return [
        samplePoint.x + sampleNormal.x * lo, samplePoint.z + sampleNormal.z * lo,
        samplePoint.x + sampleNormal.x * hi, samplePoint.z + sampleNormal.z * hi
      ];
    };
    let prev = side(0);
    for (let i = 1; i <= steps; i++) {
      const d = i / steps * routeLength;
      const next = side(d);
      if (keep(d)) {
        const y = GROUND_Y + 0.02;
        verts.push(
          prev[0], y, prev[1], prev[2], y, prev[3], next[0], y, next[1],
          prev[2], y, prev[3], next[2], y, next[3], next[0], y, next[1]
        );
      }
      prev = next;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: 0x00A2A2,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    }));
  };

  // Build (or rebuild on resize) the route that fits the current screen
  const buildRoute = () => {
    const portrait = camera.aspect < 1;
    robotScale = portrait ? 0.75 : 1;
    const laneHalf = LANE_HALF * robotScale;
    const waypoints = portrait ? PORTRAIT_ROUTE : LANDSCAPE_ROUTE;

    // Squeeze sideways only as much as needed for every waypoint (plus its lane) to stay in view
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    let squeeze = 1;
    waypoints.forEach(([x, z]) => {
      if (x === 0) return;
      const room = tanHalf * (camera.position.z - z) * camera.aspect * 0.88 - laneHalf;
      squeeze = Math.min(squeeze, Math.max(0.3, room / Math.abs(x)));
    });

    const key = `${portrait}:${squeeze.toFixed(2)}`;
    if (key === layoutKey) return;
    layoutKey = key;

    const progress = route ? ugvState.distance / routeLength : 0;
    route = new THREE.CatmullRomCurve3(
      waypoints.map(([x, z]) => new THREE.Vector3(x * squeeze, GROUND_Y, z)), true, 'centripetal');
    routeLength = route.getLength();
    ugvState.distance = progress * routeLength;
    ugvState.heading = null;

    // Planned speed from curvature: slower into bends, like a velocity planner
    const ds = routeLength / SPEED_TABLE_SIZE;
    const headings = Array.from({ length: SPEED_TABLE_SIZE }, (_, i) => {
      sampleRoute(i * ds);
      return Math.atan2(sampleTangent.x, sampleTangent.z);
    });
    const curvature = headings.map((h, i) => Math.abs(angleDiff(headings[(i + 1) % SPEED_TABLE_SIZE], h)) / ds);
    speedTable = new Float32Array(SPEED_TABLE_SIZE);
    for (let i = 0; i < SPEED_TABLE_SIZE; i++) {
      let sum = 0;
      for (let k = -6; k <= 6; k++) sum += curvature[(i + k + SPEED_TABLE_SIZE) % SPEED_TABLE_SIZE];
      speedTable[i] = UGV_SPEED * (1 - SLOWDOWN * Math.min(1, (sum / 13) / KAPPA_SLOW));
    }

    // Static lane markings
    routeGroup.children.slice().forEach(m => {
      m.geometry.dispose();
      m.material.dispose();
      routeGroup.remove(m);
    });
    routeGroup.add(buildStrip(0, laneHalf * 2, 0.05)); // drivable area
    routeGroup.add(buildStrip(-laneHalf, 0.16, 0.55)); // right boundary
    routeGroup.add(buildStrip(laneHalf, 0.16, 0.55)); // left boundary
    routeGroup.add(buildStrip(0, 0.1, 0.3, d => Math.floor(d / 1.4) % 2 === 0)); // dashed centre line

    ugv.scale.setScalar(robotScale);
  };

  // Per-frame overlays: trajectory ribbon, chevrons and footprints share one vertex-coloured buffer each
  const createOverlay = (maxVerts, opacity) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxVerts * 3), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(maxVerts * 3), 3));
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    }));
    mesh.frustumCulled = false;
    scene.add(mesh);
    return { mesh, pos: geo.attributes.position.array, col: geo.attributes.color.array, count: 0 };
  };
  const trajectory = createOverlay(TRAJ_SAMPLES * 6, 0.32);
  const markers = createOverlay(400, 0.85);

  // Fast = cyan, slow = amber
  const speedColor = (speed, brightness, out) => {
    const f = THREE.MathUtils.clamp((speed - UGV_SPEED * (1 - SLOWDOWN)) / (UGV_SPEED * SLOWDOWN), 0, 1);
    out[0] = (1 - f) * brightness;
    out[1] = (0.65 + 0.3 * f) * brightness;
    out[2] = (0.1 + 0.9 * f) * brightness;
    return out;
  };
  const rgb = [0, 0, 0];

  const pushVert = (o, x, z, c) => {
    const i = o.count * 3;
    o.pos[i] = x; o.pos[i+1] = GROUND_Y + 0.05; o.pos[i+2] = z;
    o.col[i] = c[0]; o.col[i+1] = c[1]; o.col[i+2] = c[2];
    o.count++;
  };
  // Thick segment on the ground between (ax, az) and (bx, bz)
  const pushSegment = (o, ax, az, bx, bz, width, c) => {
    const len = Math.hypot(bx - ax, bz - az) || 1;
    const nx = -(bz - az) / len * width / 2;
    const nz = (bx - ax) / len * width / 2;
    pushVert(o, ax + nx, az + nz, c); pushVert(o, ax - nx, az - nz, c); pushVert(o, bx + nx, bz + nz, c);
    pushVert(o, ax - nx, az - nz, c); pushVert(o, bx - nx, bz - nz, c); pushVert(o, bx + nx, bz + nz, c);
  };
  const finishOverlay = (o) => {
    o.mesh.geometry.attributes.position.needsUpdate = true;
    o.mesh.geometry.attributes.color.needsUpdate = true;
    o.mesh.geometry.setDrawRange(0, o.count);
  };

  const updatePlanningOverlay = (time) => {
    const halfW = ROBOT_HALF_WIDTH * robotScale;
    const start = ugvState.distance;

    // Trajectory ribbon, robot-wide, coloured by planned speed and fading with distance
    trajectory.count = 0;
    let prevL = null;
    let prevR = null;
    let prevC = null;
    for (let i = 0; i < TRAJ_SAMPLES; i++) {
      const t = i / (TRAJ_SAMPLES - 1);
      const d = start + t * TRAJ_LENGTH;
      sampleRoute(d);
      const lx = samplePoint.x + sampleNormal.x * halfW;
      const lz = samplePoint.z + sampleNormal.z * halfW;
      const rx = samplePoint.x - sampleNormal.x * halfW;
      const rz = samplePoint.z - sampleNormal.z * halfW;
      const c = speedColor(plannedSpeedAt(d), Math.pow(1 - t, 1.3), [0, 0, 0]);
      if (prevL) {
        pushVert(trajectory, prevL[0], prevL[1], prevC); pushVert(trajectory, prevR[0], prevR[1], prevC); pushVert(trajectory, lx, lz, c);
        pushVert(trajectory, prevR[0], prevR[1], prevC); pushVert(trajectory, rx, rz, c); pushVert(trajectory, lx, lz, c);
      }
      prevL = [lx, lz];
      prevR = [rx, rz];
      prevC = c;
    }
    finishOverlay(trajectory);

    markers.count = 0;
    const s = robotScale;

    // Chevrons flowing forward along the trajectory
    const phase = reduceMotion ? 0 : (time * 2.5) % CHEVRON_SPACING;
    for (let a = CHEVRON_SPACING * 0.6 + phase; a < TRAJ_LENGTH; a += CHEVRON_SPACING) {
      const d = start + a;
      sampleRoute(d);
      const fade = Math.pow(1 - a / TRAJ_LENGTH, 1.2);
      speedColor(plannedSpeedAt(d), fade, rgb);
      const tipX = samplePoint.x + sampleTangent.x * 0.6 * s;
      const tipZ = samplePoint.z + sampleTangent.z * 0.6 * s;
      for (const dir of [1, -1]) {
        const endX = samplePoint.x - sampleTangent.x * 0.5 * s + sampleNormal.x * dir * 1.1 * s;
        const endZ = samplePoint.z - sampleTangent.z * 0.5 * s + sampleNormal.z * dir * 1.1 * s;
        pushSegment(markers, endX, endZ, tipX, tipZ, 0.24 * s, rgb);
      }
    }

    // Footprint outlines: where the robot body will be
    for (let a = FOOTPRINT_SPACING; a < TRAJ_LENGTH; a += FOOTPRINT_SPACING) {
      const d = start + a;
      sampleRoute(d);
      const fade = 0.55 * Math.pow(1 - a / TRAJ_LENGTH, 1.1);
      speedColor(plannedSpeedAt(d), fade, rgb);
      const hl = ROBOT_HALF_LENGTH * s;
      const corners = [[hl, halfW], [hl, -halfW], [-hl, -halfW], [-hl, halfW]].map(([f, l]) => [
        samplePoint.x + sampleTangent.x * f + sampleNormal.x * l,
        samplePoint.z + sampleTangent.z * f + sampleNormal.z * l
      ]);
      corners.forEach((c, i) => {
        const n = corners[(i + 1) % 4];
        pushSegment(markers, c[0], c[1], n[0], n[1], 0.09 * s, rgb);
      });
    }
    finishOverlay(markers);
  };

  buildRoute();

  // --- LiDAR point cloud: where the sweeping beam hits buildings, a point lights up and fades ---
  const MAX_HITS = 1500;
  const HIT_LIFE = 2.5; // seconds
  const LIDAR_SPIN = 1.5; // radians per second
  const SCAN_ELEVATIONS = [-0.04, 0.06, 0.16, 0.26, 0.36]; // stacked scan rings, like a multi-beam LiDAR
  const hitPositions = new Float32Array(MAX_HITS * 3);
  const hitColors = new Float32Array(MAX_HITS * 3);
  const hitAges = new Float32Array(MAX_HITS).fill(HIT_LIFE);
  let hitCursor = 0;

  const hitGeo = new THREE.BufferGeometry();
  hitGeo.setAttribute('position', new THREE.BufferAttribute(hitPositions, 3));
  hitGeo.setAttribute('color', new THREE.BufferAttribute(hitColors, 3));
  const hitPoints = new THREE.Points(hitGeo, new THREE.PointsMaterial({
    size: 0.45,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }));
  hitPoints.frustumCulled = false;
  scene.add(hitPoints);

  const raycaster = new THREE.Raycaster();
  raycaster.far = 70;
  const rayOrigin = new THREE.Vector3();
  const rayDir = new THREE.Vector3();
  const sensorQuat = new THREE.Quaternion();

  const scanLidar = (sensor, sweepStep) => {
    sensor.getWorldPosition(rayOrigin);
    sensor.getWorldQuaternion(sensorQuat);
    // Two sub-steps per frame keep the scan columns evenly spaced
    for (const back of [0, 0.5]) {
      const yaw = -back * sweepStep;
      for (const elev of SCAN_ELEVATIONS) {
        rayDir.set(Math.sin(yaw) * Math.cos(elev), Math.sin(elev), Math.cos(yaw) * Math.cos(elev)).applyQuaternion(sensorQuat);
        raycaster.set(rayOrigin, rayDir);
        const hit = raycaster.intersectObjects(cityGroup.children, false)[0];
        if (hit) {
          hitPositions.set([hit.point.x, hit.point.y, hit.point.z], hitCursor * 3);
          hitAges[hitCursor] = 0;
          hitCursor = (hitCursor + 1) % MAX_HITS;
        }
      }
    }
  };

  const updateLidarHits = (delta) => {
    for (let i = 0; i < MAX_HITS; i++) {
      hitAges[i] = Math.min(HIT_LIFE, hitAges[i] + delta);
      const glow = 1 - hitAges[i] / HIT_LIFE;
      hitColors[i*3] = glow * 0.3;
      hitColors[i*3+1] = glow;
      hitColors[i*3+2] = glow;
    }
    hitGeo.attributes.position.needsUpdate = true;
    hitGeo.attributes.color.needsUpdate = true;
  };

  // --- Timeline UGV: rides the timeline's centre line and parks on each milestone dot ---
  const TIMELINE_DEPTH = 25; // distance in front of the camera
  const DOT_CENTER_OFFSET = 35; // .timeline-item::after: top 25px + half of its 20px box
  const PARK_ZONE = 140; // px either side of a dot where the robot holds on it

  // Pulse ring shown while parked on a milestone
  const pulseRing = new THREE.Mesh(
    new THREE.RingGeometry(2.6, 3, 48),
    new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  );
  pulseRing.rotation.x = -Math.PI / 2; // Lie flat under the robot, facing the camera
  pulseRing.position.y = 0.1;
  timelineUgv.add(pulseRing);

  const timelineState = { fade: 0, screenY: null, pageY: null, parkedItem: null, pulse: 0 };

  // Pixel position on screen -> point in camera space at the timeline depth
  const screenToCameraLocal = (sx, sy, target) => {
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * TIMELINE_DEPTH;
    const halfW = halfH * camera.aspect;
    return target.set(
      (sx / window.innerWidth * 2 - 1) * halfW,
      -(sy / window.innerHeight * 2 - 1) * halfH,
      -TIMELINE_DEPTH
    );
  };
  const timelineLocal = new THREE.Vector3();

  const updateTimelineUgv = (time, delta) => {
    const timelineEl = document.querySelector('#timeline .timeline');
    if (!timelineEl) return;

    const rect = timelineEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const near = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
    timelineState.fade += ((near ? 1 : 0) - timelineState.fade) * Math.min(1, delta * 5);
    setRobotOpacity(timelineUgv, timelineState.fade);
    if (!timelineUgv.visible) {
      timelineState.screenY = null;
      return;
    }

    // Centre line x, read from the ::after rule so it follows the mobile layout too
    const lineLeft = parseFloat(getComputedStyle(timelineEl, '::after').left) || rect.width / 2;
    const lineX = rect.left + lineLeft;

    // Milestone dot positions on screen
    const items = timelineEl.querySelectorAll('.timeline-item');
    if (!items.length) return;
    const dots = Array.from(items, el => ({ el, y: el.getBoundingClientRect().top + DOT_CENTER_OFFSET }));

    // Aim for the screen centre, kept between the first and last dot
    const center = vh / 2;
    let target = Math.max(dots[0].y, Math.min(dots[dots.length - 1].y, center));

    // Near a dot, hold on it (moving with the page), then ease back to centre
    let parked = null;
    let nearest = dots[0];
    dots.forEach(dot => { if (Math.abs(center - dot.y) < Math.abs(center - nearest.y)) nearest = dot; });
    const off = center - nearest.y;
    if (Math.abs(off) < PARK_ZONE) {
      target = nearest.y + Math.sign(off) * PARK_ZONE * Math.pow(Math.abs(off) / PARK_ZONE, 3);
      if (Math.abs(off) < PARK_ZONE * 0.4) parked = nearest.el;
    }

    // Smooth the screen position, then measure travel along the page for the wheels
    if (timelineState.screenY === null) timelineState.screenY = target;
    timelineState.screenY += (target - timelineState.screenY) * Math.min(1, delta * 8);
    const pageY = timelineState.screenY - rect.top;
    if (timelineState.pageY !== null) {
      const pxToWorld = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * TIMELINE_DEPTH / vh;
      rollWheels(timelineUgv, (pageY - timelineState.pageY) * pxToWorld / timelineUgv.scale.x);
    }
    timelineState.pageY = pageY;

    // Smaller on narrow screens, and never wider than the gap left of the mobile timeline line
    const unitsPerPx = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * TIMELINE_DEPTH / vh;
    const fitScale = Math.max(0.3, (lineX - 6) * unitsPerPx / ROBOT_HALF_WIDTH);
    timelineUgv.scale.setScalar(Math.min(1.2 * Math.min(1, camera.aspect), fitScale));

    screenToCameraLocal(lineX, timelineState.screenY, timelineLocal);
    timelineUgv.position.copy(timelineLocal.applyMatrix4(camera.matrixWorld));
    timelineUgv.quaternion.copy(camera.quaternion);
    timelineUgv.rotateX(Math.PI / 2); // Roof faces camera, nose points down screen

    const { sensor } = timelineUgv.userData;
    sensor.rotation.y += 3 * delta * motionScale;

    // Highlight the milestone the robot is parked on, and pulse a ring under it
    if (parked !== timelineState.parkedItem) {
      timelineState.parkedItem?.classList.remove('robot-stop');
      parked?.classList.add('robot-stop');
      timelineState.parkedItem = parked;
    }
    const pulseTarget = parked && !reduceMotion ? 1 : 0;
    timelineState.pulse += (pulseTarget - timelineState.pulse) * Math.min(1, delta * 6);
    const cycle = (time * 0.8) % 1;
    pulseRing.scale.setScalar(1 + cycle * 1.4);
    pulseRing.material.opacity = (1 - cycle) * 0.6 * timelineState.pulse * timelineState.fade;
  };

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
      // Units per second (was 0.08 per frame at 60fps)
      velocity: new THREE.Vector3((Math.random()-0.5)*4.8, (Math.random()-0.5)*4.8, (Math.random()-0.5)*4.8)
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
  // One buffer sized for every possible pair, reused each frame (no per-frame allocation)
  const linePositions = new Float32Array(nodeCount * (nodeCount - 1) / 2 * 6);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  linesMesh.frustumCulled = false;
  scene.add(linesMesh);

  // Mouse interaction variables
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2);
  });

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    buildRoute(); // Refit the route when the screen size or orientation changes
  });

  const timer = new THREE.Timer();
  timer.connect(document); // Pauses while the tab is hidden, so there's no jump on return

  const animate = () => {
    requestAnimationFrame(animate);
    // Seconds since last frame, capped so a slow frame doesn't cause a jump
    timer.update();
    const delta = Math.min(timer.getDelta(), 0.05);
    const time = timer.getElapsed();
    const motionDelta = delta * motionScale;

    const targetX = mouseX * 0.002;
    const targetY = mouseY * 0.002;

    // Camera first, so everything placed in camera space this frame lines up
    camera.position.y = 5 - (scrollY * 0.02);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();

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

    // --- Background UGV following its route ---
    const step = ugvState.speed * motionDelta;
    ugvState.distance = wrapDist(ugvState.distance + step);
    sampleRoute(ugvState.distance);
    ugv.position.copy(samplePoint);

    const heading = Math.atan2(sampleTangent.x, sampleTangent.z); // +Z is forward
    if (ugvState.heading === null) ugvState.heading = heading;
    const yawRate = motionDelta > 0 ? angleDiff(heading, ugvState.heading) / motionDelta : 0;
    ugvState.heading = heading;
    ugv.rotation.set(0, heading, 0);

    // Follow the planned speed a little ahead, so it brakes before a bend rather than in it
    ugvState.speed += (plannedSpeedAt(ugvState.distance + 4) - ugvState.speed) * Math.min(1, delta * 2);

    // Body leans out of the turn and bounces lightly on its suspension
    const { body, sensor } = ugv.userData;
    const targetRoll = THREE.MathUtils.clamp(yawRate * 0.12, -0.1, 0.1);
    ugvState.roll += (targetRoll - ugvState.roll) * Math.min(1, delta * 4);
    body.rotation.z = ugvState.roll;
    body.position.y = Math.sin(time * 9) * 0.04 * motionScale;
    rollWheels(ugv, step / robotScale);

    // Spin LiDAR and paint hits onto the city
    const sweepStep = LIDAR_SPIN * motionDelta;
    sensor.rotation.y += sweepStep;
    ugv.updateMatrixWorld(true);
    if (motionScale) scanLidar(sensor, sweepStep);
    updateLidarHits(delta);

    updatePlanningOverlay(time);

    updateTimelineUgv(time, delta);

    // --- Update Sensor Nodes ---
    const positions = nodeParticles.geometry.attributes.position.array;
    let lineCount = 0;

    for(let i=0; i<nodeCount; i++) {
      const p = nodes[i];
      // Update position
      positions[i*3] += p.velocity.x * motionDelta;
      positions[i*3+1] += p.velocity.y * motionDelta;
      positions[i*3+2] += p.velocity.z * motionDelta;

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
          const o = lineCount * 6;
          linePositions[o] = positions[i*3];
          linePositions[o+1] = positions[i*3+1];
          linePositions[o+2] = positions[i*3+2];
          linePositions[o+3] = positions[j*3];
          linePositions[o+4] = positions[j*3+1];
          linePositions[o+5] = positions[j*3+2];
          lineCount++;
        }
      }
    }

    nodeParticles.geometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.setDrawRange(0, lineCount * 2);

    renderer.render(scene, camera);
  };

  animate();
};
