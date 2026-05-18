import { describe, it, expect } from 'vitest';
import { generateOtp, hashOtp, verifyOtpHash, isOtpExpired, attemptsExhausted, withinRateLimit } from '../js/otp.js';
import { MESSAGES } from '../js/messages.js';

describe('generateOtp', () => {
  it('is a 6-digit numeric string, zero-padded', () => {
    for (let i = 0; i < 200; i++) {
      const c = generateOtp();
      expect(c).toMatch(/^\d{6}$/);
    }
  });
});
describe('hashOtp / verifyOtpHash', () => {
  it('hash is deterministic hex and verifies the same code', async () => {
    const h = await hashOtp('123456', 'salt-x');
    expect(h).toMatch(/^[0-9a-f]{64}$/);
    expect(await verifyOtpHash('123456', 'salt-x', h)).toBe(true);
  });
  it('rejects a wrong code or wrong salt', async () => {
    const h = await hashOtp('123456', 'salt-x');
    expect(await verifyOtpHash('000000', 'salt-x', h)).toBe(false);
    expect(await verifyOtpHash('123456', 'salt-y', h)).toBe(false);
  });
});
describe('isOtpExpired', () => {
  it('true at/after expires_at, false before', () => {
    const now = new Date('2026-05-18T12:00:00Z');
    expect(isOtpExpired('2026-05-18T11:59:59Z', now)).toBe(true);
    expect(isOtpExpired('2026-05-18T12:00:01Z', now)).toBe(false);
  });
});
describe('attemptsExhausted', () => {
  it('true at >=5', () => {
    expect(attemptsExhausted(4)).toBe(false);
    expect(attemptsExhausted(5)).toBe(true);
  });
});
describe('withinRateLimit', () => {
  it('false when >3 in 10min OR >5 in 24h OR global cap hit', () => {
    expect(withinRateLimit({ last10min: 3, last24h: 5, globalToday: 100, globalCap: 500 })).toBe(true);
    expect(withinRateLimit({ last10min: 4, last24h: 5, globalToday: 100, globalCap: 500 })).toBe(false);
    expect(withinRateLimit({ last10min: 0, last24h: 6, globalToday: 1, globalCap: 500 })).toBe(false);
    expect(withinRateLimit({ last10min: 0, last24h: 0, globalToday: 500, globalCap: 500 })).toBe(false);
  });
});
describe('phone-verify i18n keys ×3 (spec §4)', () => {
  const KEYS = ['verify.title','verify.lead','verify.send','verify.codeLabel','verify.confirm',
    'verify.sent','err.verify.rateLimited','err.verify.badCode','err.verify.expired','err.verify.generic'];
  for (const k of KEYS) for (const loc of ['ru','kk','en']) {
    it(`${k} in ${loc}`, () => {
      const v = MESSAGES[loc][k];
      expect(typeof v, `${loc} ${k}`).toBe('string');
      expect(v.trim().length, `${loc} ${k}`).toBeGreaterThan(0);
    });
  }
});
