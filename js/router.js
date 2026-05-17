// js/router.js — hash router. render() paints the view shell, then calls the
// afterRender hook (app.js injects view-binding + async data hydration there).
import { state } from './state.js';
import { $, $$, closeMobileMenu } from './ui.js';
import {
  viewHome, viewShare, viewFind, viewLedger, viewAbout, viewOffer,
} from './views.js';
import { t } from './i18n.js';

export const routes = {
  '': viewHome, '/': viewHome, '/share': viewShare, '/find': viewFind,
  '/ledger': viewLedger, '/about': viewAbout,
};

let afterRender = () => {};
/** app.js injects post-render work (bind events + hydrate data). */
export function setAfterRender(fn) { afterRender = fn; }

export function render() {
  const path = location.hash.slice(1) || '';
  state.route = path;
  const offerMatch = /^\/o\/(.+)$/.exec(path);
  let html;
  if (offerMatch) {
    state.offerId = offerMatch[1];
    html = viewOffer();
  } else {
    state.offerId = null;
    html = (routes[path] || viewHome)();
  }
  $('#app').innerHTML = html;
  window.scrollTo({ top: 0, behavior: 'instant' });
  updateActiveNav();
  closeMobileMenu();
  toggleFab();
  afterRender(state.route);
}

export function updateActiveNav() {
  const path = '#' + state.route;
  $$('.nav__link, .mobile-menu__link').forEach((a) => {
    a.classList.toggle('is-active',
      a.getAttribute('href') === path || (path === '#' && a.getAttribute('href') === '#/'));
  });
}

export function toggleFab() {
  const existing = $('#fab');
  if (state.route === '/find') {
    const fab = existing || document.createElement('a');
    if (!existing) {
      fab.id = 'fab';
      fab.href = '#/share';
      fab.className = 'fab';
      document.body.appendChild(fab);
    }
    // innerHTML ставится всегда — чтобы смена языка обновляла подпись
    // существующего FAB (render() при смене языка не пересоздаёт его).
    fab.innerHTML = `<span class="fab__plus">+</span><span>${t('nav.fab')}</span>`;
  } else if (existing) {
    existing.remove();
  }
}
