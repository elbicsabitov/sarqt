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
