// tests/mobile-chrome.test.js — structural regression guard for the cont #9
// mobile-audit batch (iPhone XR, TD-046 + TD-060). jsdom can't assert real
// responsive rendering, so we pin the structural hooks the fixes depend on —
// if any is removed the mobile header overflow / lost-controls regress.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');
const html = read('../index.html');
const app = read('../js/app.js');
const views = read('../js/views.js');
const sw = read('../sw.js');

describe('mobile header collapses (F1/F2)', () => {
  it('≤900px media hides inline auth-slot / lang / theme from the header', () => {
    expect(html).toMatch(
      /@media\(max-width:900px\)\{\s*\.nav__tools>\.lang-switch,\.nav__tools>#theme-toggle,#auth-slot\{display:none\}/,
    );
  });
  it('brand cannot be overlapped (ellipsis + min-width:0)', () => {
    expect(html).toMatch(/\.brand\{[^}]*min-width:0/);
    expect(html).toMatch(/\.brand__name\{[^}]*text-overflow:ellipsis/);
  });
  it('off-canvas menu hosts theme + account so they survive the collapse', () => {
    expect(html).toContain('id="theme-toggle-menu"');
    expect(html).toContain('id="auth-slot-menu"');
    expect(html).toContain('class="mobile-menu__tools"');
  });
});

describe('menu/account JS wiring', () => {
  it('renderAuthNav fills both header and menu slots (DRY)', () => {
    expect(app).toContain('function fillAuthSlot(');
    expect(app).toContain("$('#auth-slot-menu')");
  });
  it('theme toggle bound to both buttons; menu links close the menu (F10)', () => {
    expect(app).toContain("$('#theme-toggle-menu')");
    expect(app).toMatch(/\.mobile-menu__link[\s\S]*closeMobileMenu/);
  });
});

describe('overlays are viewport/keyboard safe (F5/F9)', () => {
  it('modal scrolls within the dynamic viewport (iOS keyboard)', () => {
    expect(html).toMatch(/\.modal\{[^}]*max-height:calc\(100dvh - 32px\)/);
    expect(html).toMatch(/\.modal\{[^}]*overflow-y:auto/);
  });
  it('sticker fullscreen scrolls + scales down on small screens', () => {
    expect(html).toMatch(/\.sticker-fs\{[^}]*overflow-y:auto/);
    expect(html).toMatch(/@media\(max-width:430px\)\{\.sticker-fs__inner\{transform:scale\(1\.05\)\}\}/);
  });
});

describe('share time/date pickers (F11 / TD-060)', () => {
  it('exact-date input is bounded to the Almaty valid range', () => {
    expect(views).toContain('function almatyLocal(');
    expect(views).toMatch(/id="s-exact"[^>]*min="\$\{almatyLocal\(\)\}"[^>]*max="\$\{almatyLocal\(7 \* 864e5\)\}"/);
  });
  it('pickers carry a visible affordance icon', () => {
    expect(views).toContain('class="picker"');
    expect(views).toContain('class="picker__icon"');
    expect(html).toMatch(/\.picker>\.input\{[^}]*min-height:52px/);
  });
});

describe('service worker — no HTML/JS version skew (cont #9 iOS regression)', () => {
  it('CACHE_NAME advanced (v8)', () => {
    expect(sw).toContain("const CACHE_NAME = 'sarqt-v8'");
  });
  it('app JS is network-first so fresh index.html never runs stale JS', () => {
    // Guards the root-cause fix: /js/*.js (excluding vendored libs) must NOT
    // be served cache-first, or a deploy skews HTML vs JS again on iOS.
    expect(sw).toMatch(/url\.pathname\.includes\('\/js\/'\)/);
    expect(sw).toMatch(/!url\.pathname\.includes\('\/js\/vendor\/'\)/);
    expect(sw).toMatch(/Network-first for our own app modules/);
  });
});
