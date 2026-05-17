// js/ui.js — DOM helpers, modal, theme toggle, mobile menu.
// Extracted from index.html inline script.
import { t } from './i18n.js';

export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
export const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

const FOCUSABLE_SEL = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Keep Tab/Shift+Tab focus within `container` until the returned fn is called.
// Caller owns initial focus + focus restoration.
export function trapFocus(container) {
  const onKey = (e) => {
    if (e.key !== 'Tab') return;
    const f = Array.from(container.querySelectorAll(FOCUSABLE_SEL));
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  container.addEventListener('keydown', onKey);
  return () => container.removeEventListener('keydown', onKey);
}

// ----- shared modal focus lifecycle (#modal-overlay is shared by showModal + the auth modal) -----
let _modalReleaseTrap = null;
let _modalOpener = null;

// Call BEFORE building modal content — records the element to restore focus to.
export function modalCaptureOpener() {
  _modalOpener = document.activeElement;
}
// Call AFTER modal content is in the DOM and the overlay is open (and after any re-render).
export function modalFocusOn() {
  _modalReleaseTrap?.();
  const content = $('#modal-content');
  _modalReleaseTrap = trapFocus(content);
  ($('#modal-close') || content.querySelector(FOCUSABLE_SEL))?.focus();
}
// Call when closing the modal — releases the trap and restores focus.
export function modalFocusOff() {
  _modalReleaseTrap?.();
  _modalReleaseTrap = null;
  _modalOpener?.focus?.();
  _modalOpener = null;
}

export const ICONS = {
  arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
};

// Big sigil for hero & anchor decorations — Figma V1 vector paths (frame 6056:4317)
export const SIGIL_SVG = `<svg viewBox="0 0 142 116" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M 85.24 34.57 C 93.11 26.66 93.11 13.84 85.24 5.93 C 77.38 -1.98 64.62 -1.98 56.76 5.93 C 48.89 13.84 48.89 26.66 56.76 34.57 C 64.62 42.48 77.38 42.48 85.24 34.57 Z M 76.75 26.03 C 79.92 22.84 79.92 17.66 76.75 14.47 C 73.57 11.28 68.43 11.28 65.25 14.47 C 62.08 17.66 62.08 22.84 65.25 26.03 C 68.43 29.22 73.57 29.22 76.75 26.03 Z"/><path d="M 4.42 79.23 C 4.48 80.16 3.24 80.68 2.81 79.84 C 1.01 76.32 0 72.34 0 68.12 C 0 50.24 18.4 38.63 35.04 38.63 C 50.52 38.63 63.89 47.56 70.17 60.48 C 70.5 61.16 71.5 61.16 71.83 60.48 C 78.11 47.56 91.48 38.63 106.96 38.63 C 123.6 38.63 142 50.24 142 68.12 C 142 72.34 140.99 76.32 139.19 79.84 C 138.76 80.68 137.52 80.16 137.58 79.23 C 138.48 65.51 126.02 54.44 111.72 54.44 C 97.38 54.44 85.76 64.59 85.76 77.1 C 85.76 84.83 90.2 91.65 96.97 95.74 C 97.73 96.2 98.63 95.17 98.3 94.34 C 97.74 92.97 97.44 91.48 97.44 89.92 C 97.44 83.31 103.3 77.95 109.99 77.95 C 118.85 77.95 123.6 84.86 123.38 93.32 C 122.87 104.26 112.42 113 99.61 113 C 87.06 113 77 104.32 71.83 93.43 C 71.51 92.74 70.49 92.74 70.17 93.43 C 65 104.32 54.94 113 42.39 113 C 29.58 113 19.13 104.26 18.62 93.32 C 18.4 84.86 23.15 77.95 32.01 77.95 C 38.7 77.95 44.56 83.31 44.56 89.92 C 44.56 91.48 44.26 92.97 43.7 94.34 C 43.37 95.17 44.27 96.2 45.03 95.74 C 51.8 91.65 56.24 84.83 56.24 77.1 C 56.24 64.59 44.62 54.44 30.28 54.44 C 15.98 54.44 3.52 65.51 4.42 79.23 Z"/></svg>`;

export function showModal({ icon, title, body, bodyHtml, primary, secondary }) {
  modalCaptureOpener();
  const overlay = $('#modal-overlay');
  const content = $('#modal-content');
  // `body` is escaped by default (XSS-safe). `bodyHtml` is for trusted markup only.
  const bodyContent = bodyHtml != null ? bodyHtml : escape(body || '');
  content.innerHTML = `
    <button class="modal__close" id="modal-close" aria-label="${t('modal.close')}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <div class="modal__icon">${icon || '🍽️'}</div>
    <h2 class="modal__title">${escape(title || '')}</h2>
    <p class="modal__body">${bodyContent}</p>
    <div class="flex gap-3" style="flex-wrap:wrap">
      ${primary ? `<a href="${escape(primary.href || '#')}" class="btn btn--primary" ${primary.href && !primary.href.startsWith('tel:') ? 'target="_blank" rel="noopener"' : ''}>${escape(primary.label)} ${ICONS.arrow}</a>` : ''}
      ${secondary ? `<button class="btn btn--ghost" id="modal-secondary">${escape(secondary.label)}</button>` : ''}
    </div>
  `;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-secondary')?.addEventListener('click', () => {
    if (secondary?.action) secondary.action();
    closeModal();
  });
  modalFocusOn();
}

export function closeModal() {
  modalFocusOff();
  const overlay = $('#modal-overlay');
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sarqt.theme', theme);
  const sun = $('#icon-sun');
  if (sun) {
    sun.innerHTML = theme === 'dark'
      ? '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  }
}

let _menuReleaseTrap = null;
let _menuOpener = null;

export function openMobileMenu() {
  _menuOpener = document.activeElement;
  const menu = $('#mobile-menu');
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  $('#menu-open').setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  _menuReleaseTrap = trapFocus(menu);
  menu.querySelector(FOCUSABLE_SEL)?.focus();
}
export function closeMobileMenu() {
  _menuReleaseTrap?.();
  _menuReleaseTrap = null;
  $('#mobile-menu')?.classList.remove('is-open');
  $('#mobile-menu')?.setAttribute('aria-hidden', 'true');
  $('#menu-open')?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  _menuOpener?.focus?.();
  _menuOpener = null;
}
