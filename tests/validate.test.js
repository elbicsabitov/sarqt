// tests/validate.test.js — pure password charset validator (a).
import { describe, it, expect } from 'vitest';
import { isAsciiPassword, validatePassword } from '../js/validate.js';

describe('isAsciiPassword', () => {
  it('accepts printable ASCII (letters, digits, symbols, space)', () => {
    expect(isAsciiPassword('Abc123!@# xyz')).toBe(true);
    expect(isAsciiPassword(' ')).toBe(true);            // 0x20 boundary
    expect(isAsciiPassword('~')).toBe(true);            // 0x7E boundary
  });
  it('rejects Cyrillic (the cont #9 layout bug)', () => {
    expect(isAsciiPassword('Пароль123')).toBe(false);
    expect(isAsciiPassword('qwertyйцукен')).toBe(false);
  });
  it('rejects emoji and accented Latin', () => {
    expect(isAsciiPassword('pass😀')).toBe(false);
    expect(isAsciiPassword('café')).toBe(false);
    expect(isAsciiPassword('über')).toBe(false);
  });
  it('rejects control chars below 0x20 (tab/newline)', () => {
    expect(isAsciiPassword('ab\tcd')).toBe(false);
    expect(isAsciiPassword('ab\ncd')).toBe(false);
  });
  it('rejects non-string and empty', () => {
    expect(isAsciiPassword('')).toBe(false);
    expect(isAsciiPassword(null)).toBe(false);
    expect(isAsciiPassword(undefined)).toBe(false);
  });
});

describe('validatePassword', () => {
  it('ok for ASCII', () => {
    expect(validatePassword('Secret123!')).toEqual({ ok: true });
  });
  it('returns the i18n error key for non-ASCII', () => {
    expect(validatePassword('Пароль')).toEqual({ ok: false, error: 'err.auth.asciiPassword' });
  });
});
