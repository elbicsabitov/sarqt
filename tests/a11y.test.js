// tests/a11y.test.js — source-string structural guard for the pre-pilot
// accessibility batch (TD-SARQT-062 auth labels, TD-SARQT-058 /share tabs).
// jsdom can't assert real ARIA rendering, so — like tests/csp.test.js and
// tests/mobile-chrome.test.js — we pin the structural hooks in source. If a
// fix is reverted, the matching assertion fails.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { MESSAGES } from '../js/messages.js';

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');
const app = read('../js/app.js');

describe('auth-form labels are associated with inputs (TD-062)', () => {
  for (const f of ['email', 'password', 'name', 'phone', 'region']) {
    it(`label for auth-${f} carries for="auth-${f}" and the input keeps its id`, () => {
      expect(app).toContain(`<label class="label" for="auth-${f}">`);
      expect(app).toContain(`id="auth-${f}"`);
    });
  }
});

describe('i18n key share.modeTab.ariaLabel (TD-058)', () => {
  for (const loc of ['ru', 'kk', 'en']) {
    it(`exists and is a non-empty string in ${loc}`, () => {
      const v = MESSAGES[loc]['share.modeTab.ariaLabel'];
      expect(typeof v, `${loc}`).toBe('string');
      expect(v.trim().length, `${loc} empty`).toBeGreaterThan(0);
    });
  }
});

describe('/share mode selector is a conformant ARIA tablist (TD-058)', () => {
  const views = read('../js/views.js');

  it('tablist has an accessible name', () => {
    expect(views).toContain(
      `<div class="mode-tabs" role="tablist" aria-label="\${t('share.modeTab.ariaLabel')}">`,
    );
  });

  for (const m of ['restaurant', 'event', 'home']) {
    it(`tab ${m} has a stable id and controls the panel`, () => {
      expect(views).toContain(
        `data-mode="${m}" id="mode-tab-${m}" role="tab" aria-selected="\${mode === '${m}'}" aria-controls="share-panel"`,
      );
    });
  }

  it('the form is wrapped in a tabpanel labelled by the active tab', () => {
    expect(views).toContain(
      '<div id="share-panel" role="tabpanel" aria-labelledby="mode-tab-${mode}">',
    );
  });
});
