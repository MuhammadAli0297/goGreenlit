/* ============================================================
   FADE-IN OBSERVER
   ============================================================ */
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });
})();
/* ============================================================
   HOW-IT-WORKS OBSERVER
   ============================================================ */
(function() {
  var cards = document.querySelectorAll('.how-card');
  if (!cards.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(function(card) { observer.observe(card); });
})();
/* ============================================================
   COUNTER ANIMATION (18+, 45%, 95% only — $1B+ stays static)
   ============================================================ */
(function() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1200;
      var start = performance.now();
      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(function(el) { observer.observe(el); });
})();
/* ============================================================
   FAQ ACCORDION
   ============================================================ */
(function() {
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-question').forEach(function(b) {
        b.setAttribute('aria-expanded', 'false');
        var a = b.nextElementSibling;
        if (a) a.classList.remove('open');
      });
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        var answer = btn.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });
})();
/* ============================================================
   DROPDOWN — 120ms close delay so mouse can travel to panel
   ============================================================ */
(function(){
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function(dd) {
    var timer = null;
    var menu = dd.querySelector('.dropdown-menu');
    if (!menu) return;
    function openDrop() {
      clearTimeout(timer);
      menu.style.opacity = '1';
      menu.style.visibility = 'visible';
      menu.style.transform = 'translateX(-50%) translateY(0)';
      menu.style.pointerEvents = 'auto';
    }
    function closeDrop() {
      timer = setTimeout(function() {
        menu.style.opacity = '';
        menu.style.visibility = '';
        menu.style.transform = '';
        menu.style.pointerEvents = '';
      }, 120);
    }
    dd.addEventListener('mouseenter', openDrop);
    dd.addEventListener('mouseleave', closeDrop);
    menu.addEventListener('mouseenter', function() { clearTimeout(timer); });
    menu.addEventListener('mouseleave', closeDrop);
  });
})();
/* ============================================================
   HAMBURGER MENU — mobile nav toggle
   ============================================================ */
(function () {
  'use strict';

  var btn = document.querySelector('.nav-hamburger');
  var menu = document.querySelector('.nav-links');

  if (!btn || !menu) return;

  /* Always start closed */
  function closeMenu() {
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    menu.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  /* Ensure closed on load */
  closeMenu();

  /* Toggle on button click */
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close when any nav link is clicked */
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close when clicking outside nav */
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      btn.focus();
    }
  });

  /* Close on resize to desktop width */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}());
