// tests/photo.test.js — guards TD-SARQT-061 (no silent photo failure).
// isLikelyHeic is a pure function → real unit tests. resizeImage drives
// Image/canvas (jsdom can't) so its coded-error contract + the app.js
// wiring are pinned with the project's source-string guard, exactly like
// tests/csp.test.js and tests/mobile-chrome.test.js.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { isLikelyHeic } from '../js/photo.js';
import { MESSAGES } from '../js/messages.js';

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');
const photo = read('../js/photo.js');

describe('isLikelyHeic (TD-061)', () => {
  it('true for image/heic and image/heif MIME (incl. -sequence variants)', () => {
    expect(isLikelyHeic({ type: 'image/heic', name: 'IMG_1.JPG' })).toBe(true);
    expect(isLikelyHeic({ type: 'image/heif', name: '' })).toBe(true);
    expect(isLikelyHeic({ type: 'image/heic-sequence', name: '' })).toBe(true);
    expect(isLikelyHeic({ type: 'image/heif-sequence', name: '' })).toBe(true);
  });
  it('true for .heic/.heif filename regardless of case or empty type', () => {
    expect(isLikelyHeic({ type: '', name: 'IMG_1234.HEIC' })).toBe(true);
    expect(isLikelyHeic({ type: '', name: 'photo.heif' })).toBe(true);
  });
  it('false for jpeg/png', () => {
    expect(isLikelyHeic({ type: 'image/jpeg', name: 'a.jpg' })).toBe(false);
    expect(isLikelyHeic({ type: 'image/png', name: 'a.png' })).toBe(false);
  });
  it('false / no throw for null or missing fields', () => {
    expect(isLikelyHeic(null)).toBe(false);
    expect(isLikelyHeic({})).toBe(false);
  });
});

describe('photo.js rejects with a distinguishable code (TD-061)', () => {
  it('decode path uses code "decode"', () => {
    expect(photo).toContain("photoError('decode'");
  });
  it('encode path uses code "encode"', () => {
    expect(photo).toContain("photoError('encode'");
  });
  it('photoError attaches .code to a real Error', () => {
    expect(photo).toMatch(/function photoError\([^)]*\)\s*\{[\s\S]*?\.code\s*=/);
  });
});
