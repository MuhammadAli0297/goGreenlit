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
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      var item = q.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
})();
/* ============================================================
   HAMBURGER MENU
   ============================================================ */
(function(){
  var btn = document.querySelector('.nav-hamburger');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  /* Ensure menu starts closed on every page load */
  links.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    var open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', function(e){
    if (!btn.contains(e.target) && !links.contains(e.target)){
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && links.classList.contains('open')){
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      btn.focus();
    }
  });

  /* Resize guard: if window grows past 900px, ensure menu collapses */
  window.addEventListener('resize', function(){
    if (window.innerWidth > 900){
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();
