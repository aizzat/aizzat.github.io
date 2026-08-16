import{t as e}from"./three-bg-CKTrwQbf.js";document.querySelector(`#app`).innerHTML=`
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
      <p style="text-align: center; color: var(--color-text-muted); max-width: 600px; margin: -10px auto 30px; font-size: 1.05rem;">
        Browse our experts and feel free to contact them for any collaboration opportunities.
      </p>
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
            <img src="/partners/teraju-logo.png" alt="Teraju">
            <img src="/partners/EDMlab.png" alt="EDM Lab">
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ARMS Research Cluster, UMPSA. All rights reserved.</p>
      </div>
    </div>
  </footer>
`;var t=[{acronym:`ARC FTKPM`,name:`Autonomous, Robotic and Control`,description:`Specializes in autonomous systems, path planning, and advanced vehicle dynamics.`,members:[`Assoc. Prof. Ts. Dr. Muhammad Aizzat Bin Zakaria`,`Dr. Ismayuzri Bin Ishak`],icon:`fa-robot`,url:`/arcftkpm-lab.html`},{acronym:`IMAMS Lab`,name:`Innovative, Manufacturing, Mechatronics`,description:`Focuses on mechatronic system design, smart manufacturing, and AI integration.`,members:[`Dr. Mohd Azraai Bin Mohd Razman`,`Mr. Wan Hasbullah Bin Mohd Isa`],icon:`fa-microchip`},{acronym:`EMDL Lab`,name:`Electromechanical Drivetrain Laboratory`,description:`Research in electric motor drives, fault detection, and electromechanical actuators.`,members:[`Dr. Mohd Azri Hizami Bin Rasid`],icon:`fa-cogs`},{acronym:`RMRL`,name:`Robot Mechanism Research Lab`,description:`Dedicated to kinematics, assistive robotics, and dynamic control of robotic arms.`,members:[`Dr. Ahmad Najmuddin Bin Ibrahim`,`Ts. Dr. Sheikh Muhammad Hafiz Fahami Bin Zainal`],icon:`fa-drafting-compass`},{acronym:`HTFFM Lab`,name:`Heat Transfer, Fluid Flow, Manufacturing`,description:`Expertise in thermofluid process control, CFD, and advanced manufacturing.`,members:[`Assoc. Prof. Dr. Abdul Aziz Bin Jaafar`],icon:`fa-fire-alt`}],n=document.getElementById(`labs-container`),r=document.getElementById(`laboratories-dropdown`),i=``;n&&(t.forEach((e,t)=>{let r=t*.1,a=`lab-${t}`,o=document.createElement(`div`);o.id=a,o.className=`lab-card-3d`,o.style.animation=`fadeInUp 0.6s ease-out ${.2+r}s forwards`,o.style.opacity=`0`,e.url&&(o.style.cursor=`pointer`,o.addEventListener(`click`,()=>{window.open(e.url,`_blank`)})),e.url?i+=`<a href="${e.url}" target="_blank">${e.acronym}</a>`:i+=`<a href="#${a}">${e.acronym}</a>`,o.innerHTML=`
      <div class="lab-card-inner">
        <!-- Front of Card -->
        <div class="lab-card-front">
          <div class="lab-icon"><i class="fas ${e.icon}"></i></div>
          <h3>${e.acronym}</h3>
          <p>${e.name}</p>
        </div>
        <!-- Back of Card -->
        <div class="lab-card-back">
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: rgba(255,255,255,0.9); line-height: 1.3;">${e.description}</p>
          <h4>Team Members</h4>
          <ul class="lab-members-list">
            ${e.members.map(e=>`<li><i class="fas fa-user-tie"></i> ${e}</li>`).join(``)}
          </ul>
        </div>
      </div>
    `,n.appendChild(o)}),r&&(r.innerHTML=i));var a=[{name:`Assoc. Prof. Dr. Abdul Aziz Bin Jaafar`,shortName:`PM Dr. Abdul Aziz`,title:`Head of Cluster`,tags:[`P04`],image:`/members/pm-aziz-7.jpg`,about:`Expert in industrial mechatronics, advanced manufacturing, and thermofluid process control.`},{name:`Assoc. Prof. Ts. Dr. Muhammad Aizzat Bin Zakaria`,shortName:`PM Dr. Aizzat`,title:`Researcher`,tags:[`P01`,`P02`],image:`/members/aizzat.jpeg`,website:`https://www.maizzat.my`,about:`Specializes in autonomous vehicles, mobile robotics, SLAM, and intelligent assistive technologies.`},{name:`Dr. Ahmad Najmuddin Bin Ibrahim`,shortName:`Dr. Najmuddin`,title:`Researcher`,tags:[`P02`],image:`/members/najmuddin.jpg`,website:`https://blog.ump.edu.my/anajmuddin/`,about:`Focuses on intelligent robotics, kinematics, and dynamic control of robotic systems.`},{name:`Dr. Mohd Azri Hizami Bin Rasid`,shortName:`Dr. Azri`,title:`Researcher`,tags:[`P03`],image:`/members/azri.jpg`,website:`https://sites.google.com/ump.edu.my/mahrasid/home?pli=1`,about:`Research interests include electric motor drives, electromechanical actuators, and fault detection.`},{name:`Ts. Dr. Sheikh Muhammad Hafiz Fahami Bin Zainal`,shortName:`Dr. Hafiz`,title:`Researcher`,tags:[`P03`],image:`/members/hafiz-21.jpg`,website:`https://scholar.google.com/citations?user=z6j75UsAAAAJ&hl=en`,about:`Expertise in drive systems, thermal modelling, and dynamic control engineering.`},{name:`Dr. Ismayuzri Bin Ishak`,shortName:`Dr. Ismayuzri`,title:`Researcher`,tags:[`P03`,`P04`],image:`/members/ismayuzri-1.jpg`,website:`https://scholar.google.com/citations?user=T3IxOdwAAAAJ&hl=en`,about:`Works on advanced actuators, smart industrial systems, and computational fluid dynamics.`},{name:`Dr. Mohd Azraai Bin Mohd Razman`,shortName:`Dr. Azraai`,title:`Researcher`,tags:[`P04`],image:`/members/dr-azraai-5.jpg`,website:`https://imamslab.umpsa.edu.my/index.php/en/about-us/people`,about:`Specializes in smart systems, mechatronic design, and sustainable manufacturing processes.`},{name:`Mr. Wan Hasbullah Bin Mohd Isa`,shortName:`Mr. Wan Hasbullah`,title:`Researcher`,tags:[`P04`],image:`/members/wan-hasbullah-12.jpg`,website:`https://imamslab.umpsa.edu.my/index.php/en/about-us/people`,about:`Focuses on industrial mechatronics, automation, and intelligent process control.`}],o=document.querySelector(`.researchers-grid`),s=document.getElementById(`researchers-dropdown`),c=``,l=``;a.forEach((e,t)=>{let n=e.name.split(` `).map(e=>e[0]).slice(0,2).join(``),r=e.image?e.image:`https://placehold.co/400x400/184A92/FFFFFF?text=${n}`,i=`researcher-${t}`;c+=`<a href="#${i}">${e.shortName||e.name}</a>`,l+=`
    <div class="researcher-card" id="${i}">
      <div class="researcher-img" style="background: url('${r}') center/cover"></div>
      <div class="researcher-info">
        <h4>${e.name}</h4>
        <p style="margin-bottom: 0.5rem">${e.title}</p>
        ${e.website?`<a href="${e.website}" target="_blank" class="btn-website"><i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Personal Website</a>`:``}
        <div class="researcher-about">
          <p>${e.about}</p>
        </div>
        <div class="researcher-tags" style="margin-top: 1rem;">
          ${e.tags.map(e=>`<span class="tag">${e}</span>`).join(``)}
        </div>
      </div>
    </div>
  `}),o.innerHTML=l,s&&(s.innerHTML=c),e();