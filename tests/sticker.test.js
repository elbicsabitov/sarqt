import { describe, it, expect } from 'vitest';
import { stickerModel, renderSticker } from '../js/sticker.js';

const offer = { id: 'off-7', expires_at: '2026-05-17T17:00:00Z' };
const strings = { seal: 'ЗАПЕЧАТАНО', goodUntil: 'Годен до', footer: 'Наведите камеру на QR' };

describe('stickerModel', () => {
  it('assembles the sticker data from an offer', () => {
    const m = stickerModel(offer, 'ru', strings);
    expect(m).toEqual({
      wordmark: 'sarqt',
      seal: 'ЗАПЕЧАТАНО',
      dateLabel: 'Годен до',
      dateValue: '22:00 · 17 мая',
      url: 'https://sarqt.kz/#/o/off-7',
      footer: 'Наведите камеру на QR',
    });
  });
});

describe('renderSticker', () => {
  const html = renderSticker(stickerModel(offer, 'ru', strings));
  it('renders the wordmark, seal label, date and footer', () => {
    expect(html).toContain('sarqt');
    expect(html).toContain('ЗАПЕЧАТАНО');
    expect(html).toContain('Годен до');
    expect(html).toContain('22:00 · 17 мая');
    expect(html).toContain('Наведите камеру на QR');
  });
  it('embeds an SVG QR code', () => {
    expect(html).toMatch(/<svg[^>]*class="stk__qr"/);
  });
  it('escapes dynamic text', () => {
    const evil = renderSticker(stickerModel(offer, 'ru', { ...strings, footer: '<x>' }));
    expect(evil).toContain('&lt;x&gt;');
    expect(evil).not.toContain('<x>');
  });
  it('falls back to URL text when the QR encoder fails', () => {
    const tooLong = { id: 'x'.repeat(3000), expires_at: '2026-05-17T17:00:00Z' };
    const html = renderSticker(stickerModel(tooLong, 'ru', strings));
    expect(html).toContain('stk__qr-fallback');
    expect(html).not.toMatch(/<svg[^>]*class="stk__qr"/);
  });
});
