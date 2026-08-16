import { initThreeJS } from './three-bg.js';

// Initialize the 3D Holographic Background
initThreeJS();

// Populate ARC FTKPM Researchers
const arcMembers = [
  { name: 'Assoc. Prof. Ts. Dr. Muhammad Aizzat Bin Zakaria', shortName: 'PM Dr. Aizzat', title: 'Principal Investigator, Lead AEROGROUND team', tags: ['P01', 'P02'], image: '/members/aizzat.jpeg', website: 'https://www.maizzat.my', about: 'Specializes in autonomous vehicles, mobile robotics, SLAM, and intelligent assistive technologies.' },
  { name: 'Dr. Ismayuzri Bin Ishak', shortName: 'Dr. Ismayuzri', title: 'Lead of Technical Development', tags: ['P03', 'P04'], image: '/members/ismayuzri-1.jpg', website: 'https://scholar.google.com/citations?user=T3IxOdwAAAAJ&hl=en', about: 'Works on advanced actuators, smart industrial systems, and computational fluid dynamics.' },
  { name: 'Chang Kian Hong', shortName: 'Chang', title: 'Fellow Member', tags: ['ARC'], image: 'https://robohash.org/ChangKianHong.png?set=set1&bgset=bg1', website: '', about: 'Specializes in advanced robotic development and mechanical integration for autonomous systems.' },
  { name: 'Wong Chee Cheong', shortName: 'Wong', title: 'Fellow Member', tags: ['ARC'], image: 'https://robohash.org/WongCheeCheong.png?set=set1&bgset=bg1', website: '', about: 'Focuses on low-level firmware development and hardware-software interfacing.' },
  { name: 'Akhil Vinayak Sajith', shortName: 'Akhil', title: 'Fellow Member', tags: ['ARC'], image: 'https://robohash.org/AkhilVinayakSajith.png?set=set1&bgset=bg1', website: '', about: 'Specializes in robotic firmware planning and systems architecture for autonomous robotics.' },
  { name: 'Maryam Younus', shortName: 'Maryam', title: 'Fellow Member', tags: ['ARC'], image: 'https://robohash.org/MaryamYounus.png?set=set1&bgset=bg1', website: '', about: 'Researcher focusing on path planning algorithms and navigation strategies for autonomous vehicles.' },
  { name: 'Athirah Najihah Binti Zulkifli', shortName: 'Athirah', title: 'Fellow Member', tags: ['ARC'], image: 'https://robohash.org/AthirahNajihah.png?set=set1&bgset=bg1', website: '', about: 'Researcher specializing in steering control mechanisms and autonomous vehicle dynamics.' },
  { name: 'Tang Yue Xia', shortName: 'Tang', title: 'Fellow Member', tags: ['ARC'], image: 'https://robohash.org/TangYueXia.png?set=set1&bgset=bg1', website: '', about: 'Currently deployed on a fun, highly classified secret mission for the ARC FTKPM lab! 🕵️‍♀️🤖✨' }
];

const arcResearchersContainer = document.querySelector('#arc-researchers-grid');

if (arcResearchersContainer) {
  let gridHTML = '';
  
  arcMembers.forEach((r, index) => {
    const initials = r.name.split(' ').map(n => n[0]).slice(0, 2).join('');
    const bgImage = r.image ? r.image : `https://placehold.co/400x400/184A92/FFFFFF?text=${initials}`;
    const rId = `arc-researcher-${index}`;
    
    gridHTML += `
      <div class="researcher-card animate-on-scroll" id="${rId}">
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
  
  arcResearchersContainer.innerHTML = gridHTML;
}

// Generic scroll animation observer for ARC FTKPM page
const animateElements = document.querySelectorAll('.animate-on-scroll');
if (animateElements.length > 0) {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
        entry.target.style.opacity = '1';
      } else {
        // Reset animation state so it triggers again on next scroll
        entry.target.style.animation = 'none';
        entry.target.style.opacity = '0';
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  animateElements.forEach((el) => {
    el.style.opacity = '0';
    
    // Add staggered delay based on its index among siblings
    if (!el.dataset.animation) {
        const parent = el.parentElement;
        const siblings = Array.from(parent.children).filter(c => c.classList.contains('animate-on-scroll'));
        const siblingIndex = siblings.indexOf(el);
        const delay = siblingIndex >= 0 ? siblingIndex * 0.15 : 0;
        el.dataset.animation = `fadeInUp 0.8s ease-out ${delay}s forwards`;
    }
    
    scrollObserver.observe(el);
  });
}

// Mobile Menu Toggle Logic
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}
