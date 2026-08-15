import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <div class="container nav-container">
      <a href="#home" class="logo">ARMS FTKPM</a>
      <ul class="nav-links">
        <li class="dropdown">
          <a href="#pillars" class="dropbtn">Pillars <i class="fas fa-caret-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
          <div class="dropdown-content">
            <a href="#pillar-p01">P01: Autonomous Mobility</a>
            <a href="#pillar-p02">P02: Intelligent Robotics</a>
            <a href="#pillar-p03">P03: Actuators & Drives</a>
            <a href="#pillar-p04">P04: Industrial Mechatronics</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#laboratories" class="dropbtn">Laboratories <i class="fas fa-caret-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
          <div class="dropdown-content" id="laboratories-dropdown">
            <!-- Populated via JS -->
          </div>
        </li>
        <li class="dropdown">
          <a href="#researchers" class="dropbtn">Researchers <i class="fas fa-caret-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
          <div class="dropdown-content" id="researchers-dropdown">
            <!-- Populated via JS -->
          </div>
        </li>
        <li><a href="#impact">Impact</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <section class="hero" id="home">
    <div class="container">
      <h1 data-text="ARMS FTKPM">ARMS FTKPM</h1>
      <p style="font-size: 1.25rem; font-weight: 600; color: var(--color-primary); margin-top: -0.5rem; margin-bottom: 0.5rem; animation: fadeInUp 1s ease-out 0.3s forwards; opacity: 0;">Autonomous, Robotic & Mechatronics System</p>
      <p style="font-size: 0.9rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; animation: fadeInUp 1s ease-out 0.4s forwards; opacity: 0;">A research cluster under FTKPM UMPSA</p>
      <p>Innovating next-generation autonomous systems, robotics, and smart industrial mechatronics.</p>
      <a href="#pillars" class="btn">Explore Our Research</a>
    </div>
  </section>

  <section id="pillars">
    <div class="container">
      <h2>The Four Core Research Pillars</h2>
      <div class="pillars-grid">
      <div class="pillar-card" id="pillar-p01">
        <h3><span class="tag" style="margin-right: 0.5rem">P01</span>Autonomous Mobility & Vehicle Dynamics</h3>
        <ul>
          <li>Autonomous ground vehicles (AGV) & self-driving technology</li>
          <li>Path planning, obstacle avoidance & SLAM navigation</li>
          <li>Vehicle dynamics & active suspension systems</li>
        </ul>
      </div>
      <div class="pillar-card" id="pillar-p02">
        <h3><span class="tag" style="margin-right: 0.5rem">P02</span>Intelligent & Assistive Robotics</h3>
        <ul>
          <li>Kinematics & dynamic control of robotic arms</li>
          <li>Rehabilitation & assistive robotics</li>
          <li>Precision trajectory tracking & manipulator design</li>
        </ul>
      </div>
      <div class="pillar-card" id="pillar-p03">
        <h3><span class="tag" style="margin-right: 0.5rem">P03</span>Actuators, Drive Systems & Dynamic Control</h3>
        <ul>
          <li>Electric motor drives & electromechanical actuators</li>
          <li>Thermal modelling, fault detection & condition monitoring</li>
          <li>Advanced control engineering & system identification</li>
        </ul>
      </div>
      <div class="pillar-card" id="pillar-p04">
        <h3><span class="tag" style="margin-right: 0.5rem">P04</span>Industrial Mechatronics & Smart Systems</h3>
        <ul>
          <li>Mechatronic system design & advanced manufacturing</li>
          <li>Computational fluid dynamics & thermofluid process control</li>
          <li>AI & machine learning in mechatronics / biomechatronics</li>
          <li>Embedded hardware, microcontrollers & HIL prototyping</li>
        </ul>
      </div>
      </div>
    </div>
  </section>

  <section id="laboratories">
    <div class="container">
      <h2>Specialized Laboratories</h2>
      <div class="laboratories-grid" id="labs-container">
        <!-- Labs injected via JS -->
      </div>
    </div>
  </section>

  <section id="researchers">
    <div class="container">
      <h2>Cluster Researchers</h2>
      <div class="researchers-grid">
        <!-- Cards will be populated here -->
      </div>
    </div>
  </section>

  <section id="impact" class="impact">
    <div class="container">
      <h2>Impact At A Glance</h2>
      <div class="impact-grid">
        <div class="impact-item">
          <h3>RM3M+</h3>
          <p class="label">ACCUMULATED GRANTS</p>
          <p class="desc">MOHE • MOSTI • TERAJU • French Ministry of Foreign Affairs • industry partners</p>
        </div>
        <div class="impact-item">
          <h3>100+</h3>
          <p class="label">PUBLICATIONS</p>
          <p class="desc">Indexed journal and conference papers across the four pillars</p>
        </div>
        <div class="impact-item">
          <h3>03</h3>
          <p class="label">COMMERCIALISED PRODUCTS</p>
          <p class="desc">Drebar • Agronetics • Modular Electric Motor Trainer</p>
        </div>
        <div class="impact-item">
          <h3>03</h3>
          <p class="label">TRAINING PROGRAMMES</p>
          <p class="desc">Robot Operating System • AI for agriculture • Motor design & manufacturing</p>
        </div>
      </div>
    </div>
  </section>

  <footer id="contact">
    <div class="container">
      <div class="footer-content">
        <div class="footer-col">
          <h4>Collaborate With Us</h4>
          <p>Industrial R&D • Post-graduate research • Consultancy & prototyping services</p>
          <br>
          <img src="/partners/umpsalogo.png" alt="UMPSA Logo" style="height: 60px; margin-bottom: 15px; object-fit: contain;">
          <p>Autonomous, Robotic & Mechatronics System (ARMS) Research Cluster</p>
          <p>Faculty of Manufacturing and Mechatronic Engineering Technology, UMPSA</p>
        </div>
        <div class="footer-col">
          <h4>Contact Us</h4>
          <p>For any enquiries please email to:</p>
          <a href="mailto:maizzat@umpsa.edu.my" style="color: var(--color-primary); font-weight: 600; text-decoration: none; font-size: 1.1rem; display: inline-block; margin-top: 0.5rem; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'"><i class="fas fa-envelope" style="margin-right: 8px;"></i>maizzat@umpsa.edu.my</a>
        </div>
        <div class="footer-col">
          <h4>Industry Partners</h4>
          <div class="partner-logos">
            <img src="/partners/moverobotic.webp" alt="MOVE Robotic">
            <img src="/partners/pixmoving.png" alt="Pix Moving">
            <img src="/partners/aeroground.PNG" alt="Aeroground">
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ARMS Research Cluster, UMPSA. All rights reserved.</p>
      </div>
    </div>
  </footer>
`;

// Populate Laboratories
const labs = [
  { 
    acronym: 'ARC FTKPM', 
    name: 'Autonomous, Robotic and Control', 
    description: 'Specializes in autonomous systems, path planning, and advanced vehicle dynamics.',
    members: ['Assoc. Prof. Ts. Dr. Muhammad Aizzat Bin Zakaria', 'Dr. Ismayuzri Bin Ishak'],
    icon: 'fa-robot'
  },
  { 
    acronym: 'IMAMS Lab', 
    name: 'Innovative, Manufacturing, Mechatronics', 
    description: 'Focuses on mechatronic system design, smart manufacturing, and AI integration.',
    members: ['Dr. Mohd Azraai Bin Mohd Razman', 'Mr. Wan Hasbullah Bin Mohd Isa'],
    icon: 'fa-microchip'
  },
  { 
    acronym: 'EMDL Lab', 
    name: 'Electromechanical Drivetrain Laboratory', 
    description: 'Research in electric motor drives, fault detection, and electromechanical actuators.',
    members: ['Dr. Mohd Azri Hizami Bin Rasid'],
    icon: 'fa-cogs'
  },
  { 
    acronym: 'RMRL', 
    name: 'Robot Mechanism Research Lab', 
    description: 'Dedicated to kinematics, assistive robotics, and dynamic control of robotic arms.',
    members: ['Dr. Ahmad Najmuddin Bin Ibrahim', 'Ts. Dr. Sheikh Muhammad Hafiz Fahami Bin Zainal'],
    icon: 'fa-drafting-compass'
  },
  { 
    acronym: 'HTFFM Lab', 
    name: 'Heat Transfer, Fluid Flow, Manufacturing', 
    description: 'Expertise in thermofluid process control, CFD, and advanced manufacturing.',
    members: ['Assoc. Prof. Dr. Abdul Aziz Bin Jaafar'],
    icon: 'fa-fire-alt'
  }
];

const labsContainer = document.getElementById('labs-container');
const labsDropdownContainer = document.getElementById('laboratories-dropdown');
let labsDropdownHTML = '';

if (labsContainer) {
  labs.forEach((lab, index) => {
    const delay = index * 0.1;
    const labId = `lab-${index}`;
    const labCard = document.createElement('div');
    labCard.id = labId; // Add ID for anchor linking
    labCard.className = 'lab-card-3d';
    labCard.style.animation = `fadeInUp 0.6s ease-out ${0.2 + delay}s forwards`;
    labCard.style.opacity = '0';
    
    // Build Dropdown Item
    labsDropdownHTML += `<a href="#${labId}">${lab.acronym}</a>`;
    
    labCard.innerHTML = `
      <div class="lab-card-inner">
        <!-- Front of Card -->
        <div class="lab-card-front">
          <div class="lab-icon"><i class="fas ${lab.icon}"></i></div>
          <h3>${lab.acronym}</h3>
          <p>${lab.name}</p>
        </div>
        <!-- Back of Card -->
        <div class="lab-card-back">
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: rgba(255,255,255,0.9); line-height: 1.3;">${lab.description}</p>
          <h4>Team Members</h4>
          <ul class="lab-members-list">
            ${lab.members.map(m => `<li><i class="fas fa-user-tie"></i> ${m}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    labsContainer.appendChild(labCard);
  });
  
  if(labsDropdownContainer) labsDropdownContainer.innerHTML = labsDropdownHTML;
}

// Populate researchers
const researchers = [
  { name: 'Assoc. Prof. Dr. Abdul Aziz Bin Jaafar', shortName: 'PM Dr. Abdul Aziz', title: 'Head of Cluster', tags: ['P04'], image: '/members/pm-aziz-7.jpg', about: 'Expert in industrial mechatronics, advanced manufacturing, and thermofluid process control.' },
  { name: 'Assoc. Prof. Ts. Dr. Muhammad Aizzat Bin Zakaria', shortName: 'PM Dr. Aizzat', title: 'Researcher', tags: ['P01', 'P02'], image: '/members/aizzat.jpeg', website: 'https://www.maizzat.my', about: 'Specializes in autonomous vehicles, mobile robotics, SLAM, and intelligent assistive technologies.' },
  { name: 'Dr. Ahmad Najmuddin Bin Ibrahim', shortName: 'Dr. Najmuddin', title: 'Researcher', tags: ['P02'], image: '/members/najmuddin.jpg', website: 'https://blog.ump.edu.my/anajmuddin/', about: 'Focuses on intelligent robotics, kinematics, and dynamic control of robotic systems.' },
  { name: 'Dr. Mohd Azri Hizami Bin Rasid', shortName: 'Dr. Azri', title: 'Researcher', tags: ['P03'], image: '/members/azri.jpg', website: 'https://sites.google.com/ump.edu.my/mahrasid/home?pli=1', about: 'Research interests include electric motor drives, electromechanical actuators, and fault detection.' },
  { name: 'Ts. Dr. Sheikh Muhammad Hafiz Fahami Bin Zainal', shortName: 'Dr. Hafiz', title: 'Researcher', tags: ['P03'], image: '/members/hafiz-21.jpg', website: 'https://scholar.google.com/citations?user=z6j75UsAAAAJ&hl=en', about: 'Expertise in drive systems, thermal modelling, and dynamic control engineering.' },
  { name: 'Dr. Ismayuzri Bin Ishak', shortName: 'Dr. Ismayuzri', title: 'Researcher', tags: ['P03', 'P04'], image: '/members/ismayuzri-1.jpg', website: 'https://scholar.google.com/citations?user=T3IxOdwAAAAJ&hl=en', about: 'Works on advanced actuators, smart industrial systems, and computational fluid dynamics.' },
  { name: 'Dr. Mohd Azraai Bin Mohd Razman', shortName: 'Dr. Azraai', title: 'Researcher', tags: ['P04'], image: '/members/dr-azraai-5.jpg', website: 'https://imamslab.umpsa.edu.my/index.php/en/about-us/people', about: 'Specializes in smart systems, mechatronic design, and sustainable manufacturing processes.' },
  { name: 'Mr. Wan Hasbullah Bin Mohd Isa', shortName: 'Mr. Wan Hasbullah', title: 'Researcher', tags: ['P04'], image: '/members/wan-hasbullah-12.jpg', website: 'https://imamslab.umpsa.edu.my/index.php/en/about-us/people', about: 'Focuses on industrial mechatronics, automation, and intelligent process control.' }
];

const researchersContainer = document.querySelector('.researchers-grid');
const dropdownContainer = document.getElementById('researchers-dropdown');

let dropdownHTML = '';
let gridHTML = '';

researchers.forEach((r, index) => {
  // Using placehold.co to generate placeholders based on initials
  const initials = r.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  const bgImage = r.image ? r.image : `https://placehold.co/400x400/184A92/FFFFFF?text=${initials}`;
  const rId = `researcher-${index}`;
  
  // Add to dropdown
  dropdownHTML += `<a href="#${rId}">${r.shortName || r.name}</a>`;
  
  // Add to grid
  gridHTML += `
    <div class="researcher-card" id="${rId}">
      <div class="researcher-img" style="background: url('${bgImage}') center/cover"></div>
      <div class="researcher-info">
        <h4>${r.name}</h4>
        <p style="margin-bottom: 0.5rem">${r.title}</p>
        ${r.website ? `<a href="${r.website}" target="_blank" class="btn-website"><i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Personal Website</a>` : ''}
        <div class="researcher-about">
          <p>${r.about}</p>
        </div>
        <div class="researcher-tags" style="margin-top: 1rem;">
          ${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
});

researchersContainer.innerHTML = gridHTML;
if(dropdownContainer) dropdownContainer.innerHTML = dropdownHTML;

// Three.js Background Implementation (Robotic Arm & Drone)
const initThreeJS = () => {
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

  // Create Procedural Premium UGV (Autonomous Mobile Robot)
  const createUGV = () => {
    const ugvGroup = new THREE.Group();
    
    // Chassis
    const chassisGeo = new THREE.BoxGeometry(4, 1.5, 6);
    const chassis = new THREE.Mesh(chassisGeo, hologramMaterial);
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
      const wheel = new THREE.Mesh(wheelGeo, hologramMaterial);
      wheel.position.set(...pos);
      ugvGroup.add(wheel);
    });

    // Sensor / LiDAR on top
    const sensorGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
    const sensorMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff, 
      emissive: 0x00ffff, // Bright cyan glow
      emissiveIntensity: 1.0,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
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
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    sensor.add(beam);

    ugvGroup.add(sensor);

    return ugvGroup;
  };

  const ugv = createUGV();
  ugv.position.set(12, -8, -15);
  scene.add(ugv);

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
      const speed = 0.08; // Slowed down from 0.3
      ugv.position.x = Math.sin(time * speed) * 35;
      ugv.position.z = -20 + Math.cos(time * speed) * 15;
      
      // Point the UGV in the direction of travel
      const dx = Math.cos(time * speed) * 35;
      const dz = -Math.sin(time * speed) * 15;
      ugv.rotation.y = Math.atan2(dx, dz) + Math.PI; // Face forward
      
      // Spin LiDAR (Radar sweep effect)
      const lidar = ugv.getObjectByName("lidar");
      if (lidar) lidar.rotation.y += 0.02; // Slowed down from 0.08
      
      // Wheels rolling animation
      ugv.children.forEach(child => {
        if (child.geometry.type === 'CylinderGeometry' && child.name !== 'lidar') {
          child.rotation.x += 0.1;
        }
      });
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

initThreeJS();
