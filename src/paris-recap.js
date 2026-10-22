import {
  recapStats,
  recapTimeline,
  recapRoles,
  recapPress,
  recapPartnerPosts,
  recapGallery,
  recapGalleryGroups
} from './data/parisRecapData.js';

const IMG = '/arcftkpm-resources/paris-2026-recap';

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ── Mobile Navigation ──
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.recap-nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Stats ──
document.getElementById('recap-stats').innerHTML = recapStats.map(s => `
  <div class="stat-card reveal">
    <i class="${s.brand ? 'fab' : 'fas'} ${s.icon}"></i>
    <div class="stat-value">${esc(s.value)}</div>
    <div class="stat-label">${esc(s.label)}</div>
  </div>`).join('');

// ── Roles ──
document.getElementById('recap-roles').innerHTML = recapRoles.map(r => `
  <article class="role-card ${r.id} reveal">
    <div class="role-logo"><img src="${r.logo}" alt="${esc(r.name)} logo" loading="lazy"></div>
    <h3>${esc(r.name)}</h3>
    <p class="role-full">${esc(r.fullName)}</p>
    <p class="role-tag">${esc(r.role)}</p>
    <ul>${r.points.map(p => `<li><i class="fas fa-check"></i><span>${esc(p)}</span></li>`).join('')}</ul>
  </article>`).join('');

// ── Timeline ──
document.getElementById('recap-timeline').innerHTML = recapTimeline.map(t => `
  <li class="${t.highlight ? 'highlight' : ''}">
    <div class="tl-date">${esc(t.date)}</div>
    <div class="tl-title">${esc(t.title)}</div>
    <p class="tl-text">${esc(t.text)}</p>
  </li>`).join('');

// ── Press ──
const pressGrid = document.getElementById('recap-press');
const renderPress = (region) => {
  const items = region === 'all' ? recapPress : recapPress.filter(p => p.region === region);
  pressGrid.innerHTML = items.map(p => `
    <a class="press-card" href="${p.url}" target="_blank" rel="noopener noreferrer">
      <div class="press-top">
        <span class="press-outlet">${esc(p.outlet)}</span>
        <span class="press-tags">
          <span class="tag">${p.region === 'France' ? '🇫🇷' : '🇲🇾'} ${esc(p.lang)}</span>
          ${p.sponsored ? '<span class="tag sponsored">Partner feature</span>' : ''}
        </span>
      </div>
      <h3 class="press-title">${esc(p.title)}</h3>
      <p class="press-summary">${esc(p.summary)}</p>
      <div class="card-foot"><span>${esc(p.date)}</span><span class="go">Read article <i class="fas fa-arrow-right"></i></span></div>
    </a>`).join('');
};
renderPress('all');

document.querySelectorAll('[data-press-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-press-filter]').forEach(b => b.classList.toggle('active', b === btn));
    renderPress(btn.dataset.pressFilter);
  });
});

// ── Partner posts ──
document.getElementById('recap-posts').innerHTML = recapPartnerPosts.map(p => `
  <a class="post-card reveal" href="${p.url}" target="_blank" rel="noopener noreferrer">
    <div class="post-head">
      <i class="fab fa-linkedin" aria-hidden="true"></i>
      <div>
        <div class="post-author">${esc(p.author)}</div>
        <div class="post-role">${esc(p.title)}</div>
      </div>
    </div>
    <p class="post-quote">${esc(p.quote)}</p>
    ${p.translated ? `<span class="post-translated">Translated from ${esc(p.translated)}</span>` : ''}
    <div class="card-foot"><span>${esc(p.date)}</span><span class="go">View on LinkedIn <i class="fas fa-arrow-right"></i></span></div>
  </a>`).join('');

// ── Gallery ──
const galleryGrid = document.getElementById('recap-gallery');
galleryGrid.innerHTML = recapGallery.map((g, i) => `
  <button type="button" class="gallery-item" data-index="${i}" data-group="${g.group}" aria-label="Enlarge: ${esc(g.caption)}">
    <img src="${g.thumb}" alt="${esc(g.caption)}" width="640" height="480" loading="lazy" decoding="async">
    <figcaption>${esc(g.caption)}${g.credit ? `<small>Photo courtesy of ${esc(g.credit)}</small>` : ''}</figcaption>
  </button>`).join('');

document.getElementById('gallery-filters').innerHTML = recapGalleryGroups.map((g, i) =>
  `<button type="button" class="filter-btn${i === 0 ? ' active' : ''}" data-gallery-filter="${g.id}">${esc(g.label)}</button>`
).join('');

document.querySelectorAll('[data-gallery-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.galleryFilter;
    document.querySelectorAll('[data-gallery-filter]').forEach(b => b.classList.toggle('active', b === btn));
    galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
      el.hidden = group !== 'all' && el.dataset.group !== group;
    });
  });
});

// ── Lightbox (browses the photos currently visible in the gallery) ──
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCaption = document.getElementById('lightbox-caption');
let lbList = [];
let lbPos = 0;
let lastFocus = null;

const showLightbox = () => {
  const item = lbList[lbPos];
  lbImg.src = item.full;
  lbImg.alt = item.caption;
  lbCaption.innerHTML = `${esc(item.caption)}${item.credit ? `<small>Photo courtesy of ${esc(item.credit)}</small>` : ''}`;
  const multi = lbList.length > 1;
  lightbox.querySelector('.lb-prev').hidden = !multi;
  lightbox.querySelector('.lb-next').hidden = !multi;
};

const openLightbox = (list, pos) => {
  lastFocus = document.activeElement;
  lbList = list;
  lbPos = pos;
  showLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lb-close').focus();
};

const closeLightbox = () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
  if (lastFocus) lastFocus.focus();
};

const step = (d) => {
  lbPos = (lbPos + d + lbList.length) % lbList.length;
  showLightbox();
};

galleryGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.gallery-item');
  if (!btn) return;
  const visible = [...galleryGrid.querySelectorAll('.gallery-item:not([hidden])')];
  openLightbox(visible.map(el => recapGallery[+el.dataset.index]), visible.indexOf(btn));
});

// Feature photos outside the gallery open on their own
document.querySelectorAll('[data-lightbox]').forEach(el => {
  el.addEventListener('click', () => {
    const slug = el.dataset.lightbox;
    const found = recapGallery.find(g => g.slug === slug);
    const caption = el.querySelector('img')?.alt || '';
    openLightbox([found || { caption, full: `${IMG}/${slug}-1600.jpg` }], 0);
  });
});

lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lb-prev').addEventListener('click', () => step(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => step(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lbList.length > 1) step(-1);
  if (e.key === 'ArrowRight' && lbList.length > 1) step(1);
});

// Swipe left/right on touch screens
let touchX = null;
lightbox.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  if (touchX === null || lbList.length < 2) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  touchX = null;
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
