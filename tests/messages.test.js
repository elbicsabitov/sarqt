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

// tests/messages.test.js — (cont) TD-063 value-snapshot guard. messages.test
// parity sorts keys so it catches a dropped/added key but NOT a value
// swapped between two existing keys during the regroup line-moves. Pin the
// exact values of the moved/anchor keys ×3 so the refactor cannot corrupt
// them. Cosmetic *position* is verified by the spec reviewer reading source.
describe('TD-063 regroup keeps auth values byte-exact (×3 locales)', () => {
  const EXPECT = {
    ru: {
      'auth.password': 'Пароль',
      'auth.showPassword': 'Показать пароль',
      'auth.hidePassword': 'Скрыть пароль',
      'err.auth.weakPassword': 'Пароль слишком короткий — минимум 6 символов',
      'err.auth.asciiPassword': 'Пароль — только латиница (английская раскладка), цифры и символы',
    },
    kk: {
      'auth.password': 'Құпиясөз',
      'auth.showPassword': 'Құпиясөзді көрсету',
      'auth.hidePassword': 'Құпиясөзді жасыру',
      'err.auth.weakPassword': 'Құпиясөз тым қысқа — кемінде 6 таңба',
      'err.auth.asciiPassword': 'Құпиясөз тек латын әріптері (ағылшын орналасуы), сандар мен таңбалар',
    },
    en: {
      'auth.password': 'Password',
      'auth.showPassword': 'Show password',
      'auth.hidePassword': 'Hide password',
      'err.auth.weakPassword': 'The password is too short — at least 6 characters',
      'err.auth.asciiPassword': 'Password must use Latin letters (English layout), digits and symbols only',
    },
  };
  for (const [loc, pairs] of Object.entries(EXPECT)) {
    for (const [k, v] of Object.entries(pairs)) {
      it(`${loc} ${k} value unchanged`, () => {
        expect(MESSAGES[loc][k]).toBe(v);
      });
    }
  }
});
