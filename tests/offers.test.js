import { describe, it, expect } from 'vitest';
import {
  validateOffer, computeExpiresAt, isExpired, formatWindow, telHref, offerStats, offerUrl,
  formatGoodUntil,
} from '../js/offers.js';

const validOffer = {
  mode: 'home', name: 'Айгерим', region: 'Алмалы',
  what: '15 мантов с тыквой', photoFile: {}, expiry: '24h',
  contact_phone: '+7 777 123 45 67', event_type: '',
};

describe('validateOffer', () => {
  it('accepts a valid offer', () => {
    expect(validateOffer(validOffer)).toEqual({ ok: true });
  });
  it('accepts restaurant mode', () => {
    expect(validateOffer({ ...validOffer, mode: 'restaurant' })).toEqual({ ok: true });
  });
  it('rejects whitespace-only name', () => {
    expect(validateOffer({ ...validOffer, name: '   ' }).ok).toBe(false);
  });
  it('rejects whitespace-only "what"', () => {
    expect(validateOffer({ ...validOffer, what: '     ' }).ok).toBe(false);
  });
  it('rejects missing name', () => {
    expect(validateOffer({ ...validOffer, name: '' }).ok).toBe(false);
  });
  it('rejects region not in list', () => {
    expect(validateOffer({ ...validOffer, region: 'Марс' }).ok).toBe(false);
  });
  it('rejects "what" shorter than 5 chars', () => {
    expect(validateOffer({ ...validOffer, what: 'мёд' }).ok).toBe(false);
  });
  it('rejects missing photo', () => {
    expect(validateOffer({ ...validOffer, photoFile: null }).ok).toBe(false);
  });
  it('rejects missing contact phone', () => {
    expect(validateOffer({ ...validOffer, contact_phone: '' }).ok).toBe(false);
  });
  it('rejects a phone with too few digits', () => {
    expect(validateOffer({ ...validOffer, contact_phone: '+7 777' }).ok).toBe(false);
  });
  it('rejects unknown expiry bucket', () => {
    expect(validateOffer({ ...validOffer, expiry: 'never' }).ok).toBe(false);
  });
  it('requires event_type when mode is event', () => {
    expect(validateOffer({ ...validOffer, mode: 'event', event_type: '' }).ok).toBe(false);
    expect(validateOffer({ ...validOffer, mode: 'event', event_type: 'Той' }).ok).toBe(true);
  });
  it('accepts exact expiry with a valid future date', () => {
    const now = new Date('2026-05-17T10:00:00Z');
    expect(validateOffer({ ...validOffer, expiry: 'exact', exactDate: '2026-05-18T20:00' }, now).ok).toBe(true);
  });
  it('rejects exact expiry with no date', () => {
    const now = new Date('2026-05-17T10:00:00Z');
    expect(validateOffer({ ...validOffer, expiry: 'exact', exactDate: '' }, now).error).toBe('err.offer.noExactDate');
  });
  it('rejects an exact date in the past', () => {
    const now = new Date('2026-05-17T10:00:00Z');
    expect(validateOffer({ ...validOffer, expiry: 'exact', exactDate: '2026-05-16T20:00' }, now).error).toBe('err.offer.pastDate');
  });
  it('rejects an exact date more than 7 days ahead', () => {
    const now = new Date('2026-05-17T10:00:00Z');
    expect(validateOffer({ ...validOffer, expiry: 'exact', exactDate: '2026-06-01T20:00' }, now).error).toBe('err.offer.tooFarDate');
  });
});

describe('computeExpiresAt', () => {
  it('24h adds 24 hours', () => {
    const now = new Date('2026-05-16T10:00:00Z');
    expect(computeExpiresAt('24h', now).toISOString()).toBe('2026-05-17T10:00:00.000Z');
  });
  it('72h adds 72 hours', () => {
    const now = new Date('2026-05-16T10:00:00Z');
    expect(computeExpiresAt('72h', now).toISOString()).toBe('2026-05-19T10:00:00.000Z');
  });
  it('today is end of Almaty day (UTC+5 → 18:59:59Z)', () => {
    const now = new Date('2026-05-16T10:00:00Z'); // 15:00 Almaty
    expect(computeExpiresAt('today', now).toISOString()).toBe('2026-05-16T18:59:59.000Z');
  });
  it('today late in the Almaty day still ends at 18:59:59Z', () => {
    const now = new Date('2026-05-16T18:30:00Z'); // 23:30 Almaty
    expect(computeExpiresAt('today', now).toISOString()).toBe('2026-05-16T18:59:59.000Z');
  });
  it('today just past Almaty midnight rolls to the next day', () => {
    const now = new Date('2026-05-16T19:30:00Z'); // 00:30 Almaty, May 17
    expect(computeExpiresAt('today', now).toISOString()).toBe('2026-05-17T18:59:59.000Z');
  });
  it('throws on unknown bucket', () => {
    expect(() => computeExpiresAt('never', new Date())).toThrow();
  });
  it('exact: parses an Almaty datetime-local string to UTC', () => {
    // 22:00 Almaty (UTC+5) = 17:00 UTC
    expect(computeExpiresAt('exact', new Date(), '2026-05-17T22:00').toISOString())
      .toBe('2026-05-17T17:00:00.000Z');
  });
  it('exact: throws on a malformed exact date', () => {
    expect(() => computeExpiresAt('exact', new Date(), 'not-a-date')).toThrow();
  });
  it('exact: throws when exactDate is missing', () => {
    expect(() => computeExpiresAt('exact', new Date(), null)).toThrow();
  });
});

describe('isExpired', () => {
  it('true when expires_at is in the past', () => {
    expect(isExpired({ expires_at: '2026-05-16T09:00:00Z' }, new Date('2026-05-16T10:00:00Z'))).toBe(true);
  });
  it('false when expires_at is in the future', () => {
    expect(isExpired({ expires_at: '2026-05-16T11:00:00Z' }, new Date('2026-05-16T10:00:00Z'))).toBe(false);
  });
  it('true when expires_at equals now (boundary is inclusive)', () => {
    expect(isExpired({ expires_at: '2026-05-16T10:00:00Z' }, new Date('2026-05-16T10:00:00Z'))).toBe(true);
  });
});

describe('formatWindow', () => {
  it('joins from and to with en-dash', () => {
    expect(formatWindow('19:00', '21:00')).toBe('19:00–21:00');
  });
  it('returns empty string when either side missing', () => {
    expect(formatWindow('', '21:00')).toBe('');
    expect(formatWindow('19:00', '')).toBe('');
  });
});

describe('telHref', () => {
  it('strips formatting, keeps + and digits', () => {
    expect(telHref('+7 (777) 123-45-67')).toBe('tel:+77771234567');
  });
});

describe('offerStats', () => {
  it('counts active / taken / total', () => {
    const offers = [
      { status: 'active' }, { status: 'active' }, { status: 'taken' }, { status: 'removed' },
    ];
    expect(offerStats(offers)).toEqual({ active: 2, taken: 1, total: 4 });
  });
  it('handles empty list', () => {
    expect(offerStats([])).toEqual({ active: 0, taken: 0, total: 0 });
  });
});

describe('offerUrl', () => {
  it('builds the public per-offer hash URL', () => {
    expect(offerUrl('abc-123')).toBe('https://sarqt.kz/#/o/abc-123');
  });
});

describe('formatGoodUntil', () => {
  it('formats an instant in Almaty time, ru', () => {
    // 17:00 UTC = 22:00 Almaty (UTC+5)
    expect(formatGoodUntil('2026-05-17T17:00:00Z', 'ru')).toBe('22:00 · 17 мая');
  });
  it('formats in English', () => {
    expect(formatGoodUntil('2026-05-17T17:00:00Z', 'en')).toBe('22:00 · 17 May');
  });
  it('crosses midnight into the next Almaty day', () => {
    // 20:00 UTC = 01:00 Almaty, May 18
    expect(formatGoodUntil('2026-05-17T20:00:00Z', 'ru')).toBe('01:00 · 18 мая');
  });
});
