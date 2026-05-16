// tests/messages.test.js — страж: kk/en зеркалят набор ключей ru.
import { describe, it, expect } from 'vitest';
import { MESSAGES } from '../js/messages.js';

// noscript.* намеренно ru-only: рендерится только без JS, когда
// translateChrome() не работает — ru-литерал в index.html единственный фолбэк.
const RU_ONLY = ['noscript.title', 'noscript.body'];
const expectedKeys = Object.keys(MESSAGES.ru)
  .filter((k) => !RU_ONLY.includes(k))
  .sort();

describe('MESSAGES.en', () => {
  it('зеркалит каждый ключ ru, кроме noscript', () => {
    expect(Object.keys(MESSAGES.en).sort()).toEqual(expectedKeys);
  });
  it('каждое значение — непустая строка', () => {
    for (const [k, v] of Object.entries(MESSAGES.en)) {
      expect(typeof v, `en[${k}]`).toBe('string');
      expect(v.trim().length, `en[${k}] пустой`).toBeGreaterThan(0);
    }
  });
  it('не содержит кириллицы (каждая ru-строка переведена)', () => {
    for (const [k, v] of Object.entries(MESSAGES.en)) {
      expect(/[Ѐ-ӿ]/.test(v), `en[${k}] кириллица: "${v}"`).toBe(false);
    }
  });
});

describe('MESSAGES.kk', () => {
  it('зеркалит каждый ключ ru, кроме noscript', () => {
    expect(Object.keys(MESSAGES.kk).sort()).toEqual(expectedKeys);
  });
  it('каждое значение — непустая строка', () => {
    for (const [k, v] of Object.entries(MESSAGES.kk)) {
      expect(typeof v, `kk[${k}]`).toBe('string');
      expect(v.trim().length, `kk[${k}] пустой`).toBeGreaterThan(0);
    }
  });
});
