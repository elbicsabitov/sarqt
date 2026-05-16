import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('../js/messages.js', () => ({
  MESSAGES: {
    ru: { greet: 'Привет, {name}', bye: 'Пока' },
    kk: { greet: 'Сәлем, {name}' },
    en: { greet: 'Hi, {name}' },
  },
}));

import { t, getLang, setLang, initLang, LANGS } from '../js/i18n.js';

function memStorage() {
  let store = {};
  return {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
  };
}

beforeEach(() => {
  vi.stubGlobal('localStorage', memStorage());
  vi.stubGlobal('document', { documentElement: {} });
  vi.stubGlobal('navigator', { language: 'en-US' });
  setLang('ru'); // детерминированный старт currentLang
  localStorage.removeItem('sarqt.lang'); // …не оставляя 'ru' в storage
});
afterEach(() => { vi.unstubAllGlobals(); });

describe('LANGS', () => {
  it('lists the three supported languages', () => {
    expect(LANGS).toEqual(['ru', 'kk', 'en']);
  });
});

describe('t', () => {
  it('returns the string for the current language', () => {
    setLang('kk');
    expect(t('greet', { name: 'Аян' })).toBe('Сәлем, Аян');
  });
  it('interpolates {vars}', () => {
    expect(t('greet', { name: 'Айгерим' })).toBe('Привет, Айгерим');
  });
  it('falls back to ru when the key is missing in the current language', () => {
    setLang('en'); // en has no 'bye'
    expect(t('bye')).toBe('Пока');
  });
  it('returns the key itself when it is missing everywhere', () => {
    expect(t('nope.key')).toBe('nope.key');
  });
  it('leaves an unmatched placeholder untouched', () => {
    expect(t('greet', {})).toBe('Привет, {name}');
  });
});

describe('setLang', () => {
  it('switches and persists the language', () => {
    expect(setLang('kk')).toBe(true);
    expect(getLang()).toBe('kk');
    expect(localStorage.getItem('sarqt.lang')).toBe('kk');
  });
  it('rejects an unknown language and keeps the current one', () => {
    expect(setLang('de')).toBe(false);
    expect(getLang()).toBe('ru');
  });
  it('updates <html lang>', () => {
    setLang('en');
    expect(document.documentElement.lang).toBe('en');
  });
});

describe('initLang', () => {
  it('uses a stored language when present', () => {
    localStorage.setItem('sarqt.lang', 'kk');
    expect(initLang()).toBe('kk');
  });
  it('falls back to the browser language when nothing is stored', () => {
    vi.stubGlobal('navigator', { language: 'kk-KZ' });
    expect(initLang()).toBe('kk');
  });
  it('falls back to ru when the browser language is unsupported', () => {
    vi.stubGlobal('navigator', { language: 'de-DE' });
    expect(initLang()).toBe('ru');
  });
});
