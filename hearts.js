/* Сердечко heart-hand дорисовывается линией один раз, когда появляется на экране.
   Без JS или с отключёнными анимациями сердечко просто видно сразу. */

(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var uses = document.querySelectorAll('use[href="#heart-hand"]');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-drawn');
      io.unobserve(e.target);
    });
  }, { threshold: 0.6 });

  uses.forEach(function (use) {
    var svg = use.parentNode;
    svg.classList.add('draw');
    io.observe(svg);
  });
})();
