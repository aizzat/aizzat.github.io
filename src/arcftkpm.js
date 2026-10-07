import { initThreeJS } from './three-bg.js';
import { arcNewsCategories, arcNewsItems } from './data/arcNewsData.js';

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

// ── Populate & Filter ARC FTKPM Research Updates & News ──
const arcNewsFiltersContainer = document.querySelector('#arc-news-filters');
const arcNewsGridContainer = document.querySelector('#arc-news-grid');

let activeNewsCategory = 'all';

function renderNewsFilters() {
  if (!arcNewsFiltersContainer) return;
  arcNewsFiltersContainer.innerHTML = arcNewsCategories.map(cat => `
    <button type="button" class="news-filter-btn ${cat.id === activeNewsCategory ? 'active' : ''}" data-category="${cat.id}">
      <i class="fas ${cat.icon}"></i>
      <span>${cat.label}</span>
    </button>
  `).join('');

  arcNewsFiltersContainer.querySelectorAll('.news-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeNewsCategory = btn.dataset.category;
      renderNewsFilters();
      renderNewsCards();
    });
  });
}

// Global modal trigger for YouTube Embed
window.openYouTubeModal = function(videoId, title) {
  const modal = document.getElementById('newsVideoModal');
  const container = document.getElementById('newsVideoContainer');
  if (!modal || !container) return;

  container.innerHTML = `
    <div style="position: relative; width: 100%; max-width: 800px; aspect-ratio: 16/9; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.15); background: #000;">
      <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${title || 'YouTube Video Player'}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Global modal trigger for TikTok Embed
window.openTikTokModal = function(citeUrl, videoId) {
  const modal = document.getElementById('newsVideoModal');
  const container = document.getElementById('newsVideoContainer');
  if (!modal || !container) return;
  
  container.innerHTML = `
    <blockquote class="tiktok-embed" cite="${citeUrl}" data-video-id="${videoId}" style="max-width: 605px; min-width: 325px; margin: 0 auto;">
      <section>
        <a target="_blank" title="@draizzat" href="https://www.tiktok.com/@draizzat?refer=embed">@draizzat</a>
        <p>ARC FTKPM team doing R&D development for new upcoming autonomous robot with our partner Pix Moving.</p>
        <a target="_blank" title="♬ Whatcha Gonna Do - The Valdons" href="https://www.tiktok.com/music/Whatcha-Gonna-Do-7393076794599835649?refer=embed">♬ Whatcha Gonna Do - The Valdons</a>
      </section>
    </blockquote>
  `;

  // Dynamically re-trigger TikTok embed script
  const oldScript = document.getElementById('tiktok-embed-dynamic-script');
  if (oldScript) oldScript.remove();
  const script = document.createElement('script');
  script.id = 'tiktok-embed-dynamic-script';
  script.src = 'https://www.tiktok.com/embed.js';
  script.async = true;
  document.body.appendChild(script);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeNewsVideoModal = function(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('news-modal-close')) {
    return;
  }
  const modal = document.getElementById('newsVideoModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  const container = document.getElementById('newsVideoContainer');
  if (container) container.innerHTML = '';
};

function renderNewsCards() {
  if (!arcNewsGridContainer) return;

  const filtered = activeNewsCategory === 'all'
    ? arcNewsItems
    : arcNewsItems.filter(item => item.category === activeNewsCategory);

  if (filtered.length === 0) {
    arcNewsGridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-muted);">
        <i class="fas fa-folder-open" style="font-size: 2.2rem; margin-bottom: 1rem; display: block; opacity: 0.4;"></i>
        <p style="font-size: 1.05rem;">No updates currently in this category.</p>
      </div>
    `;
    return;
  }

  arcNewsGridContainer.innerHTML = filtered.map(item => {
    const isYouTube = item.isVideo && item.videoPlatform === 'youtube';
    const clickVideoAction = isYouTube 
      ? `window.openYouTubeModal('${item.videoId}', '${(item.title || '').replace(/'/g, "\\'")}')`
      : `window.openTikTokModal('${item.videoCite}', '${item.videoId}')`;
    const openPlatformText = isYouTube ? 'Open in YouTube' : 'Open in TikTok';
    const platformIcon = isYouTube ? 'fab fa-youtube' : 'fab fa-tiktok';
    const clickThumbAction = item.isVideo ? clickVideoAction : `window.openLightbox && window.openLightbox('${item.lightboxImage || item.image}')`;

    return `
    <article class="news-card ${item.featured ? 'featured-card' : ''}" id="${item.id}">
      <div class="news-thumb-wrapper" onclick="${clickThumbAction}" title="${item.isVideo ? 'Click to watch Video' : 'Click to expand full image'}">
        <img src="${item.image}" alt="${item.title}" class="news-thumb" loading="lazy" />
        <span class="news-badge ${item.badgeClass || ''}">${item.badge}</span>
        ${item.isVideo ? `
          <div class="news-play-icon"><i class="fas fa-play"></i></div>
        ` : `
          <button type="button" class="news-expand-btn" aria-label="Expand image">
            <i class="fas fa-search-plus"></i>
          </button>
        `}
      </div>
      <div class="news-card-body">
        <div class="news-meta">
          <span class="news-date"><i class="far fa-calendar-alt"></i> ${item.date}</span>
          <span class="news-source"><i class="fas fa-landmark"></i> ${item.source}</span>
        </div>
        <h3 class="news-title">${item.title}</h3>
        ${item.subtitle ? `<div class="news-subtitle">${item.subtitle}</div>` : ''}
        <p class="news-summary">${item.summary}</p>
        
        <div class="news-tags">
          ${(item.tags || []).map(t => `<span class="news-tag">#${t}</span>`).join('')}
        </div>
        
        <div class="news-actions">
          ${item.isVideo ? `
            <button type="button" class="news-btn-primary" onclick="${clickVideoAction}">
              <i class="${platformIcon}"></i>
              <span>${item.actionText || 'Watch Video'}</span>
            </button>
            <a href="${item.externalUrl}" target="_blank" rel="noopener noreferrer" class="news-btn-secondary">
              <i class="fas fa-external-link-alt"></i>
              <span>${openPlatformText}</span>
            </a>
          ` : `
            ${item.externalUrl ? `
              <a href="${item.externalUrl}" target="_blank" rel="noopener noreferrer" class="news-btn-primary">
                <span>${item.actionText || 'Read Story'}</span>
                <i class="fas fa-external-link-alt"></i>
              </a>
            ` : ''}
            ${item.hasClipping ? `
              <button type="button" class="news-btn-secondary" onclick="window.openLightbox && window.openLightbox('${item.clippingImage || item.image}')">
                <i class="fas fa-newspaper"></i>
                <span>Press Clipping</span>
              </button>
            ` : (item.lightboxImage && !item.externalUrl ? `
              <button type="button" class="news-btn-secondary" onclick="window.openLightbox && window.openLightbox('${item.lightboxImage}')">
                <i class="fas fa-image"></i>
                <span>${item.actionText || 'View Media'}</span>
              </button>
            ` : '')}
          `}
        </div>
      </div>
    </article>
    `;
  }).join('');
}

// Initialize News Section if elements exist
if (arcNewsFiltersContainer || arcNewsGridContainer) {
  renderNewsFilters();
  renderNewsCards();
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

// ── Paris Motor Show 2026 Interactive Tab Switcher ──
const parisTabButtons = document.querySelectorAll('.paris-tab-btn');
const parisTabPanes = document.querySelectorAll('.paris-tab-pane');

if (parisTabButtons.length > 0) {
  parisTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.parisTab;
      
      parisTabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      parisTabPanes.forEach(pane => pane.classList.remove('active'));
      
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPane = document.getElementById(`paris-pane-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

