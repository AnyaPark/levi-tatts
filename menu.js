// Меню на телефоне (popover): панель встаёт ровно под шапкой и закрывается после выбора пункта
// или если человек начал листать страницу, ничего не выбрав (15.10)
const nav = document.getElementById('site-nav');
const header = document.querySelector('.site-header');

if (nav && header && nav.showPopover) {
  let openY = 0;
  nav.addEventListener('beforetoggle', (e) => {
    if (e.newState === 'open') {
      nav.style.top = header.getBoundingClientRect().bottom + 'px';
      openY = window.scrollY;
    }
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && nav.matches(':popover-open')) nav.hidePopover();
  });
  window.addEventListener('scroll', () => {
    if (nav.matches(':popover-open') && Math.abs(window.scrollY - openY) > 40) nav.hidePopover();
  }, { passive: true });
}
