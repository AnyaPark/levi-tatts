/* Галерея «Роботи»: стрелки и линия прогресса для горизонтальной ленты.
   Листание пальцем и snap работают на CSS; без JS лента просто прокручивается. */

(function () {
  var track = document.getElementById('works-track');
  if (!track) return;
  var bar = track.parentNode.querySelector('.works-bar');
  var fill = bar.querySelector('.works-bar__fill');
  var prev = bar.querySelector('[data-dir="-1"]');
  var next = bar.querySelector('[data-dir="1"]');

  var count = bar.querySelector('.works-bar__count');
  var slides = track.querySelectorAll('.work');
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function update() {
    var max = track.scrollWidth - track.clientWidth;
    var seen = (track.scrollLeft + track.clientWidth) / track.scrollWidth;
    fill.style.transform = 'scaleX(' + Math.min(1, seen) + ')';
    // счётчик: работа, ближайшая к левому краю ленты; в самом конце — последняя
    var pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    var cur = 0, best = Infinity;
    for (var i = 0; i < slides.length; i++) {
      var d = Math.abs(slides[i].offsetLeft - pad - track.scrollLeft);
      if (d < best) { best = d; cur = i; }
    }
    if (track.scrollLeft >= max - 2) cur = slides.length - 1;
    count.textContent = pad2(cur + 1) + ' / ' + pad2(slides.length);
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
  }

  // к началу следующей/предыдущей работы (ширина работ разная: фото не обрезаем)
  function step(dir) {
    var pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    var now = track.scrollLeft;
    var slides = track.querySelectorAll('.work');
    var target = null;
    for (var i = 0; i < slides.length; i++) {
      var x = slides[i].offsetLeft - pad;
      if (dir > 0 && x > now + 4) { target = x; break; }
      if (dir < 0 && x < now - 4) target = x;
    }
    if (target !== null) track.scrollTo({ left: target });
  }

  prev.addEventListener('click', function () { step(-1); });
  next.addEventListener('click', function () { step(1); });
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  bar.hidden = false;
  update();
})();
