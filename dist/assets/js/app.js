/**
 * Public-site interactivity (vanilla JS, replaces framer-motion from the old
 * React build). All behavior is data-attribute driven; styles that pair with
 * these hooks live in assets/css/tailwind.css.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Scroll reveal ----------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-visible'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '-60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --- Navbar: condense on scroll + mobile drawer ------------------------ */
  var navShell = document.getElementById('site-nav');
  var drawer = document.getElementById('nav-drawer');
  var drawerToggle = document.getElementById('nav-drawer-toggle');
  var lastScrollY = window.scrollY;

  function updateNav() {
    var y = window.scrollY;
    var isMobile = window.innerWidth < 1024;
    var condensed;
    if (isMobile) {
      condensed = y > lastScrollY && y > 50; // condense only while scrolling down
    } else {
      condensed = y > 120;
    }
    if (navShell) navShell.classList.toggle('is-condensed', condensed);
    lastScrollY = y;
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);
  updateNav();

  if (drawerToggle && drawer) {
    drawerToggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('hidden') === false;
      drawerToggle.setAttribute('aria-expanded', String(open));
      drawerToggle.querySelector('.nav-icon-menu').classList.toggle('hidden', open);
      drawerToggle.querySelector('.nav-icon-close').classList.toggle('hidden', !open);
    });
  }

  /* --- Tabbed pages (profil / akademik / mahasiswa) ---------------------- */
  var tabButtons = document.querySelectorAll('[data-tab-group] [data-tab]');
  if (tabButtons.length) {
    var activateTab = function (id) {
      document.querySelectorAll('.tab-panel').forEach(function (panel) {
        panel.classList.toggle('hidden', panel.getAttribute('data-panel') !== id);
      });
      tabButtons.forEach(function (btn) {
        var active = btn.getAttribute('data-tab') === id;
        btn.classList.toggle('is-active', active);
        // sidebar buttons swap full class sets; easiest is explicit toggles
        if (btn.closest('aside')) {
          btn.classList.toggle('bg-forest-700', active);
          btn.classList.toggle('text-white', active);
          btn.classList.toggle('shadow-lg', active);
          btn.classList.toggle('text-gray-500', !active);
          var svg = btn.querySelector('svg');
          if (svg) {
            svg.classList.toggle('text-gold-400', active);
            svg.classList.toggle('text-gray-400', !active);
          }
        } else {
          var icon = btn.querySelector('.tab-mobile-icon');
          var label = btn.querySelector('.tab-mobile-label');
          if (icon) {
            icon.classList.toggle('bg-gold-400', active);
            icon.classList.toggle('text-forest-900', active);
            icon.classList.toggle('bg-transparent', !active);
            icon.classList.toggle('text-white/40', !active);
          }
          if (label) {
            label.classList.toggle('text-gold-400', active);
            label.classList.toggle('text-white/30', !active);
          }
        }
      });
      if (window.innerWidth < 1024) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    };
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () { activateTab(btn.getAttribute('data-tab')); });
    });
  }

  /* --- Mobile bottom tab bar: hide while scrolling down ------------------ */
  var mobileBar = document.getElementById('mobile-tab-bar');
  if (mobileBar) {
    var lastBarY = window.scrollY;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      mobileBar.classList.toggle('is-hidden', y > lastBarY && y > 150);
      lastBarY = y;
    }, { passive: true });
  }

  /* --- Accordions (kurikulum semester) ----------------------------------- */
  document.querySelectorAll('[data-accordion]').forEach(function (acc) {
    var toggle = acc.querySelector('[data-acc-toggle]');
    var body = acc.querySelector('[data-acc-body]');
    if (!toggle || !body) return;
    toggle.addEventListener('click', function () {
      var open = acc.classList.toggle('is-open');
      body.classList.toggle('hidden', !open);
    });
  });

  /* --- Expanding cards (dosen / mahasiswa / fasilitas) ------------------- */
  document.querySelectorAll('[data-expand-card]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // links inside the card keep working
      var wasOpen = card.classList.contains('is-open');
      // one open card per grid, matching the old accordion behavior
      var grid = card.parentElement;
      grid.querySelectorAll('[data-expand-card].is-open').forEach(function (other) {
        other.classList.remove('is-open');
      });
      if (!wasOpen) card.classList.add('is-open');
    });
  });

  /* --- History slider (profil) ------------------------------------------- */
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var track = slider.querySelector('[data-slider-track]');
    var prev = slider.querySelector('[data-slider-prev]');
    var next = slider.querySelector('[data-slider-next]');
    var dots = slider.querySelectorAll('[data-slider-dots] > div');
    if (!track) return;
    var index = 0;
    var count = track.children.length;

    function render() {
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === count - 1;
      dots.forEach(function (dot, i) {
        dot.className = 'h-1.5 rounded-full transition-all duration-300 ' +
          (i === index ? 'w-8 bg-gold-400' : 'w-2 bg-gray-200');
      });
    }
    if (prev) prev.addEventListener('click', function () { if (index > 0) { index--; render(); } });
    if (next) next.addEventListener('click', function () { if (index < count - 1) { index++; render(); } });
    render();
  });

  /* --- Carousel scroll-snap (brosur pendaftaran) --------------------------- */
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    if (!track) return;
    function slideBy(dir) {
      var slide = track.firstElementChild;
      var step = slide ? slide.offsetWidth + 20 : track.clientWidth; // 20 = gap-5
      track.scrollBy({ left: dir * step, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { slideBy(-1); });
    if (next) next.addEventListener('click', function () { slideBy(1); });
  });

  /* --- Salin link artikel (tombol share) ---------------------------------- */
  document.querySelectorAll('[data-copy-link]').forEach(function (btn) {
    var label = btn.querySelector('[data-copy-label]');
    var original = label ? label.textContent : '';
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-copy-link') || window.location.href;
      function done() {
        if (!label) return;
        label.textContent = 'Tersalin!';
        btn.classList.add('is-copied');
        setTimeout(function () {
          label.textContent = original;
          btn.classList.remove('is-copied');
        }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { fallbackCopy(url, done); });
      } else {
        fallbackCopy(url, done);
      }
    });
  });
  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* abaikan */ }
    document.body.removeChild(ta);
  }

  /* --- Lightbox (brosur kontak) ------------------------------------------ */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('[data-lightbox-img]');
    var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox-src]'));
    var current = 0;
    var zoomed = false;

    function show(i) {
      current = (i + triggers.length) % triggers.length;
      lbImg.src = triggers[current].getAttribute('data-lightbox-src');
      zoomed = false;
      lbImg.style.transform = '';
    }
    function open(i) {
      show(i);
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    }
    function toggleZoom() {
      zoomed = !zoomed;
      lbImg.style.transform = zoomed ? 'scale(1.8)' : '';
    }

    triggers.forEach(function (btn, i) {
      btn.addEventListener('click', function () { open(i); });
    });
    lightbox.querySelector('[data-lightbox-close]').addEventListener('click', close);
    lightbox.querySelector('[data-lightbox-prev]').addEventListener('click', function () { show(current - 1); });
    lightbox.querySelector('[data-lightbox-next]').addEventListener('click', function () { show(current + 1); });
    lightbox.querySelector('[data-lightbox-zoom]').addEventListener('click', toggleZoom);
    lbImg.addEventListener('click', toggleZoom);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('overflow-auto')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
