import{t as e}from"./three-bg-C9M_0JGI.js";document.querySelector(`#app`).innerHTML=`
  <nav class="navbar">
    <div class="container nav-container">
      <div class="nav-header">
        <a href="#home" class="logo">ARMS FTKPM</a>
        <button class="mobile-menu-toggle" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>
      </div>
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
      <p style="font-size: 0.9rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; animation: fadeInUp 1s ease-out 0.4s forwards; opacity: 0;">A RESEARCH CLUSTER UNDER FACULTY OF MANUFACTURING AND MECHATRONIC ENGINEERING TECHNOLOGY (FTKPM) UNIVERSITI MALAYSIA PAHANG AL-SULTAN ABDULLAH (UMPSA)</p>
      <p>Innovating next-generation autonomous systems, robotics, and smart industrial mechatronics.</p>
      <a href="#pillars" class="btn">Explore Our Research</a>
    </div>
  </section>

  <section id="pillars">
    <div class="container">
      <h2>The Four Core Research Pillars</h2>
      <p style="text-align: center; color: var(--color-text-muted); max-width: 600px; margin: -10px auto 30px; font-size: 1.05rem;">
        Our research is organized around four interconnected pillars, driving innovation across autonomous systems, robotics, and mechatronics.
      </p>
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
      <p style="text-align: center; color: var(--color-text-muted); max-width: 600px; margin: -10px auto 30px; font-size: 1.05rem;">
        Each lab is equipped to support cutting-edge research and development across our core focus areas.
      </p>
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
      <p style="text-align: center; color: var(--color-text-muted); max-width: 600px; margin: -10px auto 30px; font-size: 1.05rem;">
        Highlights of our research cluster's achievements, funding, and contributions to the field.
      </p>
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
          <h4>Strategic Partners</h4>
          <div class="partner-logos">
            <img src="/partners/moverobotic.webp" alt="MOVE Robotic">
            <img src="/partners/pixmoving.png" alt="Pix Moving">
            <img src="/partners/aeroground.PNG" alt="Aeroground">
            <img src="/partners/teraju-logo.png" alt="Teraju">
            <img src="/partners/EDMlab.png" alt="EDM Lab">
            <img src="/partners/DREBAR Trademark - 1.png" alt="Drebar Trademark">
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ARMS Research Cluster, UMPSA. All rights reserved.</p>
      </div>
    </div>
  </footer>
`;var t=[{acronym:`ARC FTKPM`,name:`Autonomous, Robotic and Control`,description:`Specializes in autonomous systems, path planning, and advanced vehicle dynamics.`,members:[`Assoc. Prof. Ts. Dr. Muhammad Aizzat Bin Zakaria`,`Dr. Ismayuzri Bin Ishak`],icon:`fa-robot`,url:`/arcftkpm-lab.html`},{acronym:`IMAMS Lab`,name:`Innovative, Manufacturing, Mechatronics`,description:`Focuses on mechatronic system design, smart manufacturing, and AI integration.`,members:[`Dr. Mohd Azraai Bin Mohd Razman`,`Mr. Wan Hasbullah Bin Mohd Isa`],icon:`fa-microchip`,url:`https://imamslab.umpsa.edu.my/index.php/en/`},{acronym:`EMDL Lab`,name:`Electromechanical Drivetrain Laboratory`,description:`Research in electric motor drives, fault detection, and electromechanical actuators.`,members:[`Dr. Mohd Azri Hizami Bin Rasid`],icon:`fa-cogs`,url:`https://azrihizami.github.io/emdlab-student-opportunities/`},{acronym:`OM Lab`,name:`Outdoor Mobility Lab`,description:`Dedicated to kinematics, assistive robotics, and dynamic control of robotic arms.`,members:[`Dr. Ahmad Najmuddin Bin Ibrahim`,`Ts. Dr. Sheikh Muhammad Hafiz Fahami Bin Zainal`],icon:`fa-drafting-compass`,url:`https://www.drnajmuddin.com/projects/`},{acronym:`Agronetics Lab`,name:`Agronetics`,description:`Focuses on agricultural technology and smart farming systems.`,members:[`Assoc. Prof. Dr. Abdul Aziz Bin Jaafar`,`Dr. Mohd Azraai Bin Mohd Razman`,`Mr. Wan Hasbullah Bin Mohd Isa`],icon:`fa-seedling`,url:`https://agronetics.net`},{acronym:`HTFFM Lab`,name:`Heat Transfer, Fluid Flow, Manufacturing`,description:`Expertise in thermofluid process control, CFD, and advanced manufacturing.`,members:[`Assoc. Prof. Dr. Abdul Aziz Bin Jaafar`],icon:`fa-fire-alt`}],n=document.getElementById(`labs-container`),r=document.getElementById(`laboratories-dropdown`),i=``;n&&(t.forEach((e,t)=>{let r=t*.1,a=`lab-${t}`,o=document.createElement(`div`);o.id=a,o.className=`lab-card-3d`,o.style.animation=`fadeInUp 0.6s ease-out ${.2+r}s forwards`,o.style.opacity=`0`,e.url?i+=`<a href="${e.url}" target="_blank">${e.acronym}</a>`:i+=`<a href="#${a}">${e.acronym}</a>`,o.innerHTML=`
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
          ${e.url?`<a href="${e.url}" target="_blank" class="lab-btn">View this Lab</a>`:``}
        </div>
      </div>
    `,n.appendChild(o)}),r&&(r.innerHTML=i));var a=[{name:`Assoc. Prof. Dr. Abdul Aziz Bin Jaafar`,shortName:`PM Dr. Abdul Aziz`,title:`Head of Cluster`,tags:[`P04`],image:`/members/pm-aziz-7.jpg`,about:`Expert in industrial mechatronics, advanced manufacturing, and thermofluid process control.`},{name:`Assoc. Prof. Ts. Dr. Muhammad Aizzat Bin Zakaria`,shortName:`PM Dr. Aizzat`,title:`Researcher`,tags:[`P01`,`P02`],image:`/members/aizzat.jpeg`,website:`https://www.maizzat.my`,about:`Specializes in autonomous vehicles, mobile robotics, SLAM, and intelligent assistive technologies.`},{name:`Dr. Ahmad Najmuddin Bin Ibrahim`,shortName:`Dr. Najmuddin`,title:`Researcher`,tags:[`P02`],image:`/members/najmuddin.jpg`,website:`https://www.drnajmuddin.com/`,about:`Focuses on intelligent robotics, kinematics, and dynamic control of robotic systems.`},{name:`Dr. Mohd Azri Hizami Bin Rasid`,shortName:`Dr. Azri`,title:`Researcher`,tags:[`P03`],image:`/members/azri.jpg`,website:`https://azrihizami.github.io/emdlab-student-opportunities/`,about:`Research interests include electric motor drives, electromechanical actuators, and fault detection.`},{name:`Ts. Dr. Sheikh Muhammad Hafiz Fahami Bin Zainal`,shortName:`Dr. Hafiz`,title:`Researcher`,tags:[`P03`],image:`/members/hafiz-21.jpg`,website:`https://scholar.google.com/citations?user=z6j75UsAAAAJ&hl=en`,about:`Expertise in CAD design, mechanical design and optimisation, and vehicle steering control.`},{name:`Dr. Ismayuzri Bin Ishak`,shortName:`Dr. Ismayuzri`,title:`Researcher`,tags:[`P03`,`P04`],image:`/members/ismayuzri-1.jpg`,website:`https://scholar.google.com/citations?user=T3IxOdwAAAAJ&hl=en`,about:`Additive manufacturing, robotics, and design and development for mechatronic systems.`},{name:`Dr. Mohd Azraai Bin Mohd Razman`,shortName:`Dr. Azraai`,title:`Researcher`,tags:[`P04`],image:`/members/dr-azraai-5.jpg`,website:`https://imamslab.umpsa.edu.my/index.php/en/about-us/people`,about:`Specializes in smart systems, mechatronic design, and sustainable manufacturing processes.`},{name:`Mr. Wan Hasbullah Bin Mohd Isa`,shortName:`Mr. Wan Hasbullah`,title:`Researcher`,tags:[`P04`],image:`/members/wan-hasbullah-12.jpg`,website:`https://imamslab.umpsa.edu.my/index.php/en/about-us/people`,about:`Focuses on industrial mechatronics, automation, and intelligent process control.`}],o=document.querySelector(`.researchers-grid`),s=document.getElementById(`researchers-dropdown`),c=``,l=``;a.forEach((e,t)=>{let n=e.name.split(` `).map(e=>e[0]).slice(0,2).join(``),r=e.image?e.image:`https://placehold.co/400x400/184A92/FFFFFF?text=${n}`,i=`researcher-${t}`;c+=`<a href="#${i}">${e.shortName||e.name}</a>`,l+=`
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
  `}),o.innerHTML=l,s&&(s.innerHTML=c),e();function u(e,t,n,r,i=``,a=``,o=null){e.dataset.rafId&&window.cancelAnimationFrame(parseInt(e.dataset.rafId));let s=null,c=u=>{s||=u;let d=Math.min((u-s)/r,1),f=1-(1-d)*(1-d),p=Math.floor(f*(n-t)+t),m=p.toLocaleString();if(n<10&&p<10&&l===2&&(m=`0`+p.toString()),e.innerHTML=i+m+a,d<1)e.dataset.rafId=window.requestAnimationFrame(c);else{if(o!==null)e.innerHTML=o;else{let t=n.toLocaleString();n<10&&l===2&&(t=`0`+n.toString()),e.innerHTML=i+t+a}e.removeAttribute(`data-raf-id`)}},l=n.toString().length;e.innerText.replace(/[^0-9]/g,``).length===2&&n<10&&(l=2),e.dataset.rafId=window.requestAnimationFrame(c)}var d=document.querySelectorAll(`.impact-item`);if(d.length>0){let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.style.animation=e.target.dataset.animation,e.target.style.opacity=`1`;let t=e.target.querySelector(`h3`);if(t&&!t.dataset.animated){t.dataset.animated=`true`,t.dataset.originalText||(t.dataset.originalText=t.innerText);let n=t.dataset.originalText,r=``,i=``,a=n,o=null,s;if(n===`RM3M+`?(s=3e6,r=`RM`,i=`+`,o=`RM3M+`):(n.startsWith(`RM`)&&(r=`RM`,a=a.replace(`RM`,``)),a.endsWith(`M+`)?(i=`M+`,a=a.replace(`M+`,``)):a.endsWith(`+`)&&(i=`+`,a=a.replace(`+`,``)),s=parseInt(a.replace(/,/g,``),10)),!isNaN(s)){let a=parseFloat(e.target.dataset.delay)*1e3||0;t.innerHTML=r+(s<10&&n.replace(/[^0-9]/g,``).length===2?`00`:`0`)+i,setTimeout(()=>{u(t,0,s,2e3,r,i,o)},a+200)}}}else{e.target.style.animation=`none`,e.target.style.opacity=`0`;let t=e.target.querySelector(`h3`);t&&(t.dataset.animated=``)}})},{threshold:.15,rootMargin:`0px 0px -50px 0px`});d.forEach((t,n)=>{t.style.opacity=`0`,t.dataset.delay=(n*.15).toString(),t.dataset.animation=`fadeInUp 0.8s ease-out ${n*.15}s forwards`,e.observe(t)})}var f=document.querySelector(`.mobile-menu-toggle`),p=document.querySelector(`.nav-links`);f&&p&&(f.addEventListener(`click`,()=>{p.classList.toggle(`active`)}),p.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>{p.classList.remove(`active`)})}));