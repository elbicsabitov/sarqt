// js/app.js — entry module: init, auth lifecycle, event binding, data
// hydration, form handlers, auth UI. The only <script> index.html loads.
import { state, freshShare, seededShare } from './state.js';
import { $, $$, escape, showModal, closeModal, setTheme, openMobileMenu, closeMobileMenu, modalCaptureOpener, modalFocusOn } from './ui.js';
import { t, getLang, setLang, initLang } from './i18n.js';
import { render, setAfterRender } from './router.js';
import { renderShareForm, renderOfferCard } from './views.js';
import { REGIONS } from './config.js';
import { validateOffer, computeExpiresAt, telHref } from './offers.js';
import { resizeImage } from './photo.js';
import { signUp, signIn, signOut, currentUser, currentProfile, onAuthChange } from './auth.js';
import {
  uploadPhoto, createOffer, markTaken, removeOffer, getOfferContact,
  listActiveOffers, listMyOffers, listLedger,
} from './db.js';

// ---------- inline form errors ----------
function showError(elId, msg) {
  const el = $('#' + elId);
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
}
function clearError(elId) {
  const el = $('#' + elId);
  if (el) { el.textContent = ''; el.hidden = true; }
}
function setSubmitBtn(sel, disabled, text) {
  const b = $(sel);
  if (b) { b.disabled = disabled; b.textContent = text; }
}

// ---------- auth nav ----------
function renderAuthNav() {
  const tools = $('.nav__tools');
  if (!tools) return;
  let slot = $('#auth-slot');
  if (!slot) {
    slot = document.createElement('div');
    slot.id = 'auth-slot';
    slot.className = 'auth-slot';
    tools.prepend(slot);
  }
  if (state.user) {
    const name = (state.profile && state.profile.display_name) || t('auth.navProfile');
    slot.innerHTML = `<span class="auth-slot__name">${escape(name)}</span>
      <button class="btn btn--ghost btn--sm" id="auth-signout">${t('auth.navSignOut')}</button>`;
    $('#auth-signout').addEventListener('click', doSignOut);
  } else {
    slot.innerHTML = `<button class="btn btn--ghost btn--sm" id="auth-open">${t('auth.navSignIn')}</button>`;
    $('#auth-open').addEventListener('click', () => openAuthModal());
  }
}

// ---------- i18n chrome ----------
// Переводит статичные узлы вне #app: textContent для [data-i18n],
// aria-label для [data-i18n-aria]. Атрибуты добавляются в задачах 5-8.
function translateChrome() {
  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
}

// Обновляет <title> и meta description/og по текущему языку.
// Ключи появляются в messages.ru в задаче 5; до этого t() вернёт сам ключ —
// безопасно (видимый сигнал, не поломка).
function translateMeta() {
  document.title = t('meta.title');
  const set = (sel, key) => { const el = $(sel); if (el) el.setAttribute('content', t(key)); };
  set('meta[name="description"]', 'meta.description');
  set('meta[property="og:title"]', 'meta.title');
  set('meta[property="og:description"]', 'meta.description');
}

function updateLangButtons() {
  $$('.lang-switch__btn').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.lang === getLang());
  });
}

function applyLanguage() {
  translateChrome();
  translateMeta();
  updateLangButtons();
  renderAuthNav();
  render();
}

async function doSignOut() {
  await signOut();
  state.user = null;
  state.profile = null;
  renderAuthNav();
  render();
}

// ---------- auth modal ----------
// onSuccess (optional) runs after a successful sign-in / sign-up.
function openAuthModal(onSuccess) {
  modalCaptureOpener();
  let mode = 'login'; // 'login' | 'register'
  const draw = () => {
    const content = $('#modal-content');
    const isReg = mode === 'register';
    content.innerHTML = `
      <button class="modal__close" id="modal-close" aria-label="${t('auth.closeAria')}">✕</button>
      <h2 class="modal__title">${isReg ? t('auth.registerTitle') : t('auth.loginTitle')}</h2>
      <p class="modal__body">${isReg ? t('auth.registerBody') : t('auth.loginBody')}</p>
      <div class="form-group"><label class="label">${t('auth.email')}</label>
        <input type="email" class="input" id="auth-email"></div>
      <div class="form-group"><label class="label">${t('auth.password')}</label>
        <input type="password" class="input" id="auth-password"></div>
      ${isReg ? `
        <div class="form-group"><label class="label">${t('auth.name')}</label>
          <input type="text" class="input" id="auth-name"></div>
        <div class="form-group"><label class="label">${t('auth.phone')}</label>
          <input type="tel" class="input" id="auth-phone"></div>
        <div class="form-group"><label class="label">${t('auth.region')}</label>
          <select class="select" id="auth-region"><option value="">${t('auth.regionPlaceholder')}</option>
          ${REGIONS.map((r) => `<option value="${escape(r)}">${escape(r)}</option>`).join('')}</select></div>
      ` : ''}
      <div class="form-error" id="auth-error" hidden></div>
      <button class="btn btn--primary btn--block" id="auth-submit">${isReg ? t('auth.submitRegister') : t('auth.submitLogin')}</button>
      <p class="text-center mt-4" style="font-size:.875rem">
        ${isReg ? t('auth.hasAccount') : t('auth.noAccount')}
        <a href="#" class="text-link" id="auth-toggle">${isReg ? t('auth.toLogin') : t('auth.toRegister')}</a>
      </p>`;
    $('#modal-close').addEventListener('click', closeModal);
    $('#auth-toggle').addEventListener('click', (e) => { e.preventDefault(); mode = isReg ? 'login' : 'register'; draw(); });
    $('#auth-submit').addEventListener('click', () => submitAuth(mode, onSuccess));
    modalFocusOn();
  };
  const overlay = $('#modal-overlay');
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  draw();
}

async function submitAuth(mode, onSuccess) {
  clearError('auth-error');
  const email = $('#auth-email').value.trim();
  const password = $('#auth-password').value;
  if (!email || !password) { showError('auth-error', t('err.emailPassword')); return; }
  const btn = $('#auth-submit');
  btn.disabled = true;
  let res;
  if (mode === 'register') {
    const region = $('#auth-region').value;
    if (!region) { showError('auth-error', t('err.noRegion')); btn.disabled = false; return; }
    res = await signUp({
      email, password,
      display_name: $('#auth-name').value.trim(),
      phone: $('#auth-phone').value.trim(), region, tg: '',
    });
  } else {
    res = await signIn({ email, password });
  }
  btn.disabled = false;
  if (!res.ok) { showError('auth-error', t(res.error)); return; }
  state.user = res.user;
  state.profile = await currentProfile();
  state.share = seededShare(state.share, state.profile);
  closeModal();
  renderAuthNav();
  render();
  if (typeof onSuccess === 'function') onSuccess();
}

// ---------- hydration (async data fill after sync render) ----------
function feedEmpty(msg) { return `<div class="card text-center" style="padding:48px 24px"><div style="font-size:3rem;margin-bottom:12px">🌿</div><p class="text-muted">${escape(msg)}</p></div>`; }
function feedError(msg) { return `<div class="alert alert--warn">${escape(msg)}</div>`; }

let homeGen = 0;
let findGen = 0;
let ledgerGen = 0;

async function hydrateHome() {
  const myGen = ++homeGen;
  const res = await listLedger();
  if (myGen !== homeGen) return;
  const n = res.ok ? res.entries.length : 0;
  const a = $('#hero-stat-handoffs'); if (a) a.textContent = String(n);
  const b = $('#impact-handoffs'); if (b) b.textContent = String(n);
  const offers = await listActiveOffers();
  if (myGen !== homeGen) return;
  const feed = $('#home-feed');
  if (!feed) return;
  feed.setAttribute('aria-busy', 'false');
  feed.removeAttribute('aria-label');
  if (!offers.ok) { feed.innerHTML = feedError(t(offers.error)); return; }
  if (offers.offers.length === 0) { feed.innerHTML = feedEmpty(t('feed.emptyHome')); return; }
  feed.innerHTML = offers.offers.slice(0, 3).map((o) => renderOfferCard(o)).join('');
  bindCallButtons();
}

async function hydrateFind() {
  const myGen = ++findGen;
  const mode = state.filterFind === 'all' ? undefined : state.filterFind;
  const res = await listActiveOffers(mode ? { mode } : {});
  if (myGen !== findGen) return;
  const feed = $('#find-feed');
  if (!feed) return;
  feed.setAttribute('aria-busy', 'false');
  feed.removeAttribute('aria-label');
  if (!res.ok) { feed.innerHTML = feedError(t(res.error)); return; }
  if (res.offers.length === 0) {
    feed.innerHTML = feedEmpty(t('feed.emptyFind'));
    return;
  }
  const myId = state.user && state.user.id;
  feed.innerHTML = '<div class="grid" style="gap:14px">'
    + res.offers.map((o) => renderOfferCard(o, { owned: myId && o.author_id === myId })).join('')
    + '</div>';
  bindOwnerControls();
  bindCallButtons();
}

async function hydrateLedger() {
  const myGen = ++ledgerGen;
  const res = await listLedger();
  if (myGen !== ledgerGen) return;
  const feed = $('#ledger-feed');
  if (!feed) return;
  if (!res.ok) { feed.innerHTML = feedError(t(res.error)); return; }
  if (res.entries.length === 0) {
    feed.innerHTML = feedEmpty(t('feed.emptyLedger'));
    return;
  }
  const modeLabel = (m) => t('ledger.mode.' + m);
  feed.innerHTML = `<table class="ledger-table">
    <thead><tr><th>${t('ledger.col.when')}</th><th>${t('ledger.col.type')}</th><th>${t('ledger.col.what')}</th><th>${t('ledger.col.region')}</th></tr></thead>
    <tbody>${res.entries.map((e) => `
      <tr>
        <td data-label="${t('ledger.col.when')}">${escape(new Date(e.taken_at).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))}</td>
        <td data-label="${t('ledger.col.type')}"><span class="pill pill--${escape(e.mode)}">${modeLabel(e.mode)}</span></td>
        <td data-label="${t('ledger.col.what')}">${escape(e.what)}</td>
        <td data-label="${t('ledger.col.region')}">${escape(e.region)}</td>
      </tr>`).join('')}</tbody>
  </table>`;
}

// ---------- owner controls (in /find) ----------
function bindOwnerControls() {
  $$('[data-offer-action]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.offerId;
      const action = btn.dataset.offerAction;
      btn.disabled = true;
      const res = action === 'taken' ? await markTaken(id) : await removeOffer(id);
      if (!res.ok) {
        btn.disabled = false;
        showModal({
          icon: '⚠️', title: t('modal.failTitle'), body: t(res.error),
          secondary: { label: t('modal.failClose'), action: closeModal },
        });
        return;
      }
      hydrateFind();
    });
  });
}

// ---------- call buttons (offer cards) ----------
// The contact phone is not in the feed payload (finding H-2) — fetch it on
// demand via the get_offer_contact RPC, then hand off to the device dialer.
function bindCallButtons() {
  $$('[data-offer-call]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (btn.dataset.calling) return;
      btn.dataset.calling = '1';
      const res = await getOfferContact(btn.dataset.offerCall);
      delete btn.dataset.calling;
      if (!res.ok) {
        showModal({
          icon: '⚠️', title: t('modal.failTitle'), body: t(res.error),
          secondary: { label: t('modal.failClose'), action: closeModal },
        });
        return;
      }
      window.location.href = telHref(res.phone);
    });
  });
}

let offerSubmitting = false;

// ---------- event binding per route ----------
function bindViewEvents(route) {
  if (route === '/share') bindShareEvents();
  if (route === '/find') bindFindFilters();
}

function bindFindFilters() {
  $$('[data-find-filter]').forEach((el) => {
    el.addEventListener('click', () => { state.filterFind = el.dataset.findFilter; render(); });
  });
}

function bindShareEvents() {
  $$('[data-mode]').forEach((el) => {
    el.addEventListener('click', () => { state.share.mode = el.dataset.mode; render(); });
  });
  $$('[data-event-type]').forEach((el) => {
    el.addEventListener('click', () => { state.share.event_type = el.dataset.eventType; render(); });
  });
  $$('[data-expiry]').forEach((el) => {
    el.addEventListener('click', () => { state.share.expiry = el.dataset.expiry; render(); });
  });
  [['s-name', 'name'], ['s-region', 'region'], ['s-what', 'what'],
   ['s-pickup-from', 'pickup_from'], ['s-pickup-to', 'pickup_to'],
   ['s-contact-phone', 'contact_phone'], ['s-contact-tg', 'contact_tg']].forEach(([id, field]) => {
    const el = $('#' + id);
    if (el) {
      el.addEventListener('input', (e) => { state.share[field] = e.target.value; });
      el.addEventListener('change', (e) => { state.share[field] = e.target.value; });
    }
  });
  const photo = $('#s-photo');
  if (photo) photo.addEventListener('change', (e) => {
    state.share.photoFile = e.target.files[0] || null;
    const hint = $('#s-photo-name');
    if (hint && state.share.photoFile) hint.textContent = state.share.photoFile.name;
  });
  const editBtn = $('[data-contact-edit]');
  if (editBtn) editBtn.addEventListener('click', () => { state.share.contactExpanded = true; render(); });
  const submit = $('#s-submit');
  if (submit) submit.addEventListener('click', submitOffer);
}

async function submitOffer() {
  if (offerSubmitting) return;
  clearError('s-error');
  const s = state.share;
  const v = validateOffer({
    mode: s.mode, name: s.name, region: s.region, what: s.what,
    photoFile: s.photoFile, expiry: s.expiry, contact_phone: s.contact_phone,
    event_type: s.event_type,
  });
  if (!v.ok) { showError('s-error', t(v.error)); return; }
  if (!state.user) { openAuthModal(submitOffer); return; }
  offerSubmitting = true;
  setSubmitBtn('#s-submit', true, t('err.submitting'));
  try {
    const mine = await listMyOffers(state.user.id);
    if (mine.ok && mine.offers.filter((o) => o.status === 'active').length >= 10) {
      showError('s-error', t('err.tooManyOffers'));
      return;
    }
    let blob;
    try { blob = await resizeImage(s.photoFile); }
    catch (e) { showError('s-error', t('err.photoFailed')); return; }
    const up = await uploadPhoto(blob, state.user.id);
    if (!up.ok) { showError('s-error', t(up.error)); return; }
    const res = await createOffer({
      author_id: state.user.id, mode: s.mode,
      event_type: s.mode === 'event' ? s.event_type : null,
      name: s.name.trim(), region: s.region, what: s.what.trim(),
      photo_url: up.url,
      pickup_from: s.pickup_from || null, pickup_to: s.pickup_to || null,
      expires_at: computeExpiresAt(s.expiry).toISOString(),
      contact_phone: s.contact_phone.trim(), contact_tg: s.contact_tg.trim() || null,
      status: 'active',
    });
    if (!res.ok) { showError('s-error', t(res.error)); return; }
    state.share = seededShare(freshShare(s.mode), state.profile);
    showModal({
      icon: '🍽️', title: t('modal.publishedTitle'),
      bodyHtml: t('modal.published', { region: escape(res.offer.region) }),
      primary: { label: t('modal.publishedPrimary'), href: '#/find' },
      secondary: { label: t('modal.publishedSecondary'), action: () => render() },
    });
  } finally {
    offerSubmitting = false;
    setSubmitBtn('#s-submit', false, t('err.submitBtn'));
  }
}

// ---------- post-render hook ----------
setAfterRender((route) => {
  bindViewEvents(route);
  if (route === '' || route === '/') hydrateHome();
  if (route === '/find') hydrateFind();
  if (route === '/ledger') hydrateLedger();
});

// ---------- init ----------
async function init() {
  setTheme(state.theme);
  initLang();
  // Persistent-node listeners — bind synchronously, before any await,
  // so the static chrome (theme, menu, modal) is live from the first frame.
  window.addEventListener('hashchange', render);
  $('#theme-toggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    setTheme(state.theme);
  });
  $$('.lang-switch__btn').forEach((b) => {
    b.addEventListener('click', () => {
      if (setLang(b.dataset.lang)) applyLanguage();
    });
  });
  $('#menu-open').addEventListener('click', openMobileMenu);
  $('#menu-close').addEventListener('click', closeMobileMenu);
  $('#modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeMobileMenu(); }
  });
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
  // Cold-start: resolve the session BEFORE the first render (no guest flash).
  state.user = await currentUser();
  if (state.user) state.profile = await currentProfile();
  state.share = seededShare(state.share, state.profile);
  renderAuthNav();
  translateChrome();
  translateMeta();
  updateLangButtons();
  render();
  onAuthChange((user) => {
    // Defer: supabase-js holds an auth lock during this callback; awaiting
    // Supabase calls (currentProfile) inside it can deadlock. Run after release.
    setTimeout(async () => {
      state.user = user;
      state.profile = user ? await currentProfile() : null;
      state.share = seededShare(state.share, state.profile);
      if (!user) state.share.contactExpanded = false;
      renderAuthNav();
    }, 0);
  });
}

init();
