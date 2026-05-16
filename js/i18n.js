// js/i18n.js — клиентская i18n: текущий язык + t() с фолбэком и подстановкой.
import { MESSAGES } from './messages.js';

export const LANGS = ['ru', 'kk', 'en'];
const STORAGE_KEY = 'sarqt.lang';
const FALLBACK = 'ru';

let currentLang = FALLBACK;

/** Текущий язык интерфейса. */
export function getLang() {
  return currentLang;
}

/**
 * Определить стартовый язык: localStorage → язык браузера → ru.
 * Вызывается один раз при инициализации (app.js).
 */
export function initLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (LANGS.includes(stored)) {
    currentLang = stored;
  } else {
    const nav = (navigator.language || '').slice(0, 2).toLowerCase();
    currentLang = LANGS.includes(nav) ? nav : FALLBACK;
  }
  document.documentElement.lang = currentLang;
  return currentLang;
}

/** Сменить язык: валидирует, персистит, обновляет <html lang>. */
export function setLang(lang) {
  if (!LANGS.includes(lang)) return false;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  return true;
}

/**
 * Перевод по ключу. Фолбэк: текущий язык → ru → сам ключ.
 * vars — объект для подстановки {name}-плейсхолдеров.
 */
export function t(key, vars) {
  let str = MESSAGES[currentLang] && MESSAGES[currentLang][key];
  if (str == null) str = MESSAGES[FALLBACK] && MESSAGES[FALLBACK][key];
  if (str == null) return key;
  if (vars) {
    str = str.replace(/\{(\w+)\}/g, (m, name) =>
      (vars[name] != null ? String(vars[name]) : m));
  }
  return str;
}
