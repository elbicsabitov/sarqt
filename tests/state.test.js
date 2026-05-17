import { describe, it, expect } from 'vitest';
import { seededShare, freshShare } from '../js/state.js';

describe('seededShare', () => {
  const profile = { region: 'Алмалы', phone: '+77071234567', tg: '@host' };

  it('fills empty contact fields from the profile', () => {
    const out = seededShare(freshShare('home'), profile);
    expect(out.region).toBe('Алмалы');
    expect(out.contact_phone).toBe('+77071234567');
    expect(out.contact_tg).toBe('@host');
  });

  it('keeps fields the user already filled', () => {
    const share = { ...freshShare('home'), region: 'Медеу', contact_phone: '+77079999999' };
    const out = seededShare(share, profile);
    expect(out.region).toBe('Медеу');
    expect(out.contact_phone).toBe('+77079999999');
    expect(out.contact_tg).toBe('@host');
  });

  it('returns empty contact fields when profile is null', () => {
    const out = seededShare(freshShare('home'), null);
    expect(out.region).toBe('');
    expect(out.contact_phone).toBe('');
    expect(out.contact_tg).toBe('');
  });

  it('does not mutate the input share', () => {
    const share = freshShare('home');
    seededShare(share, profile);
    expect(share.region).toBe('');
  });

  it('tolerates a profile missing some fields', () => {
    const out = seededShare(freshShare('home'), { region: 'Алмалы' });
    expect(out.region).toBe('Алмалы');
    expect(out.contact_phone).toBe('');
    expect(out.contact_tg).toBe('');
  });
});
