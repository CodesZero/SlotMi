/* =========================================================
   SLOTMI — SITE SCRIPT
   1. Config
   2. Navigation (mobile menu)
   3. Download link wiring
   4. Coverage tab switcher
   5. FAQ accordion (native details — no extra JS needed)
   6. Footer year
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. CONFIG ----------
     Update DOWNLOAD_URL with the real direct link or GitHub release
     once the public repository is live.
     This is the ONLY place the download destination needs to change —
     every "Download for Windows" button reads from it. */
  var CONFIG = {
    DOWNLOAD_URL: 'https://www.mediafire.com/file/ymqyjq7lpzb5px8/SlotMiBot-Setup.exe/file',
    DOWNLOAD_ANDROID_URL: 'https://www.mediafire.com/file/3u7sl6vy276pstx/SlotMi-Apk.apk/file'
  };

  /* ---------- 2. NAVIGATION ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      if (isOpen) {
        mobileMenu.setAttribute('hidden', '');
      } else {
        mobileMenu.removeAttribute('hidden');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        mobileMenu.setAttribute('hidden', '');
      });
    });
  }

  /* ---------- 3. DOWNLOAD LINK WIRING ---------- */
  document.querySelectorAll('[data-download-url]').forEach(function (btn) {
    btn.setAttribute('href', CONFIG.DOWNLOAD_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });

  document.querySelectorAll('[data-download-android-url]').forEach(function (btn) {
    btn.setAttribute('href', CONFIG.DOWNLOAD_ANDROID_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });

  /* ---------- 4. COVERAGE TAB SWITCHER ---------- */
  var tabs = document.querySelectorAll('.region-tab');
  var panels = document.querySelectorAll('.region-panel');

  function activateTab(index) {
    tabs.forEach(function (t, i) {
      var active = i === index;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    panels.forEach(function (p, i) {
      var active = i === index;
      p.classList.toggle('is-active', active);
      if (active) {
        p.removeAttribute('hidden');
      } else {
        p.setAttribute('hidden', '');
      }
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { activateTab(i); });
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { activateTab((i + 1) % tabs.length); tabs[(i + 1) % tabs.length].focus(); }
      if (e.key === 'ArrowLeft')  { activateTab((i - 1 + tabs.length) % tabs.length); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
    });
  });

  /* ---------- 5. FOOTER YEAR ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
