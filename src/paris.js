import { initThreeJS } from './three-bg.js';

// Initialize the 3D Holographic Background
initThreeJS();

// Mobile Navigation Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.paris-nav-links');

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Global Lightbox
window.openLightbox = function(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (lightbox && img) {
    img.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// Robobus Technical Specs Modal Controls
window.openRobobusSpecModal = function() {
  const modal = document.getElementById('robobusSpecModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeRobobusSpecModal = function(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('spec-modal-close-btn')) {
    return;
  }
  const modal = document.getElementById('robobusSpecModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

// Scroll reveal animation
const revealTargets = document.querySelectorAll('.section-header-center, .showcase-grid, .spec-card, .rnd-pillar-card, .synergy-card, .paris-partner-card, .meeting-card');
revealTargets.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));
