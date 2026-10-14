// Меню на телефоне (popover): панель встаёт ровно под шапкой и закрывается после выбора пункта
const nav = document.getElementById('site-nav');
const header = document.querySelector('.site-header');

if (nav && header && nav.showPopover) {
  nav.addEventListener('beforetoggle', (e) => {
    if (e.newState === 'open') nav.style.top = header.getBoundingClientRect().bottom + 'px';
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && nav.matches(':popover-open')) nav.hidePopover();
  });
}
