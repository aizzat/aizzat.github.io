/*
 * TikTok follow prompt for ARC FTKPM / ARMS sites.
 * Shows (1) a slim "Follow us on TikTok" bar at the top of the navbar and
 * (2) a pop-up card a few seconds after load, only during the event window.
 * Edit the CONFIG block below to change account, dates or timing.
 */
(function () {
  var CONFIG = {
    url: 'https://www.tiktok.com/@arcumpsa',
    handle: '@arcumpsa',
    name: 'Autonomous Robotics @ UMPSA',
    // Promotion window, Malaysia time (UTC+8), inclusive. Festival of Idea itself is 17-19 Nov 2026.
    start: '2026-11-15T00:00:00+08:00',
    end: '2026-11-20T23:59:59+08:00',
    popupDelayMs: 0,
    storageKey: 'arc_tiktok_popup_seen'
  };

  var now = Date.now();
  if (now < Date.parse(CONFIG.start) || now > Date.parse(CONFIG.end)) return;

  var ICON =
    '<svg viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" aria-hidden="true">' +
    '<path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3v178.8A162.6 162.6 0 1 1 185 188.3v89.9a74.6 74.6 0 1 0 52.2 71.2V0h88a121 121 0 0 0 1.9 22.2A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>';

  var css =
    '.tt-bar{display:flex;align-items:center;justify-content:center;gap:.6rem;padding:.35rem 1rem;' +
    'background:linear-gradient(90deg,#fe2c55,#25f4ee);color:#fff;font:600 .85rem/1.2 Outfit,system-ui,sans-serif;' +
    'text-decoration:none;text-align:center}' +
    '.tt-bar:hover{filter:brightness(1.08)}' +
    '.tt-bar b{background:#000;color:#fff;border-radius:999px;padding:.15rem .7rem;font-weight:700}' +
    '.tt-pop{position:fixed;right:1.25rem;bottom:1.25rem;z-index:2000;width:min(340px,calc(100vw - 2rem));' +
    'background:#111;color:#fff;border:1px solid #ffffff22;border-radius:16px;padding:1.25rem 1.25rem 1.1rem;' +
    'box-shadow:0 12px 40px #000a;font-family:Outfit,system-ui,sans-serif;opacity:0;transform:translateY(16px);' +
    'transition:opacity .35s ease,transform .35s ease}' +
    '.tt-pop.tt-show{opacity:1;transform:none}' +
    '.tt-pop-x{position:absolute;top:.4rem;right:.6rem;background:none;border:0;color:#fff9;font-size:1.5rem;' +
    'line-height:1;cursor:pointer;padding:.2rem .4rem}' +
    '.tt-pop-x:hover{color:#fff}' +
    '.tt-pop-head{display:flex;align-items:center;gap:.8rem;margin-bottom:.8rem}' +
    '.tt-pop-ico{flex:none;width:44px;height:44px;border-radius:12px;background:#000;display:grid;place-items:center;' +
    'font-size:1.4rem;box-shadow:-2px -2px 0 #25f4ee,2px 2px 0 #fe2c55}' +
    '.tt-pop-name{font-weight:800;font-size:1rem;line-height:1.25}' +
    '.tt-pop-handle{color:#ffffffb3;font-size:.85rem}' +
    '.tt-pop-ev{margin:0 0 .8rem;padding:.6rem .8rem;border-left:3px solid #25f4ee;background:#ffffff0f;border-radius:6px;font-size:.88rem;line-height:1.45}' +
    '.tt-pop .tt-gift{font-weight:700;color:#ffd500}' +
    '.tt-pop p{margin:0 0 1rem;font-size:.9rem;line-height:1.45;color:#ffffffcc}' +
    '.tt-pop-btn{display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%;padding:.7rem 1rem;' +
    'border-radius:999px;background:#fe2c55;color:#fff;font-weight:700;font-size:.95rem;text-decoration:none}' +
    '.tt-pop-btn:hover{background:#e0214a}' +
    '@media (max-width:600px){.tt-long{display:none}}' +
    '@media (prefers-reduced-motion:reduce){.tt-pop{transition:none}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- Top bar (inside the fixed navbar, so it stays on top while scrolling) ----
  function addBar(nav) {
    if (nav.querySelector('.tt-bar')) return;
    var a = document.createElement('a');
    a.className = 'tt-bar';
    a.href = CONFIG.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = ICON + '<span>Festival of Idea, PICC 17&ndash;19 Nov &middot; <span class="tt-long">Meet us at the UMPSA booth &middot; </span>Follow us on TikTok &amp; get a souvenir!</span><b>Follow</b>';
    nav.insertBefore(a, nav.firstChild);
  }

  function watchNav() {
    var nav = document.querySelector('.navbar');
    if (nav) return addBar(nav);
    // Homepage renders its navbar from JS, so wait for it.
    var mo = new MutationObserver(function () {
      var n = document.querySelector('.navbar');
      if (n) {
        mo.disconnect();
        addBar(n);
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 15000);
  }

  // ---- Pop-up card (once per browser session) ----
  function seen() {
    try { return sessionStorage.getItem(CONFIG.storageKey) === '1'; } catch (e) { return false; }
  }
  function markSeen() {
    try { sessionStorage.setItem(CONFIG.storageKey, '1'); } catch (e) {}
  }

  function showPopup() {
    if (seen()) return;
    var pop = document.createElement('div');
    pop.className = 'tt-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', 'Follow us on TikTok');
    pop.innerHTML =
      '<button class="tt-pop-x" aria-label="Close">&times;</button>' +
      '<div class="tt-pop-head"><div class="tt-pop-ico">' + ICON + '</div>' +
      '<div><div class="tt-pop-name">' + CONFIG.name + '</div>' +
      '<div class="tt-pop-handle">' + CONFIG.handle + '</div></div></div>' +
      '<div class="tt-pop-ev"><b>Festival of Idea 2026</b><br>PICC, Putrajaya &middot; 17&ndash;19 Nov<br>Meet us at the UMPSA booth!</div>' +
      '<p class="tt-gift">&#127873; Follow our TikTok and show it at the UMPSA booth to get a free souvenir!</p>' +
      '<a class="tt-pop-btn" href="' + CONFIG.url + '" target="_blank" rel="noopener noreferrer">' +
      ICON + ' Follow on TikTok</a>';
    document.body.appendChild(pop);

    function close() {
      markSeen();
      pop.classList.remove('tt-show');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { pop.remove(); }, 400);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    pop.querySelector('.tt-pop-x').addEventListener('click', close);
    pop.querySelector('.tt-pop-btn').addEventListener('click', markSeen);
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(function () { pop.classList.add('tt-show'); });
  }

  function init() {
    watchNav();
    setTimeout(showPopup, CONFIG.popupDelayMs);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
