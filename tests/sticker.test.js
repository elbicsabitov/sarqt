import { describe, it, expect } from 'vitest';
import { stickerModel } from '../js/sticker.js';

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
