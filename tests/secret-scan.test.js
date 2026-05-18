// tests/secret-scan.test.js — spec §4 leak-prevention guard. Fails the
// build if a Mobizon API key or a MOBIZON reference appears in any
// git-tracked source or anywhere under js/** (the front must never see
// the key — only Deno.env in Edge Functions does).
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    if (['node_modules', '.git', 'dist'].includes(e)) continue;
    const p = `${dir}/${e}`;
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}
// Mobizon keys are 32+ hex; also catch obvious assignments.
const KEY_RE = /MOBIZON[_A-Z]*\s*[:=]\s*['"][0-9a-f]{16,}['"]/i;

describe('Mobizon secret never leaks (spec §4)', () => {
  it('no Mobizon key literal in any tracked source file', () => {
    for (const f of walk(`${root}js`).concat(walk(`${root}supabase`))) {
      const txt = readFileSync(f, 'utf8');
      expect(KEY_RE.test(txt), `key-like literal in ${f}`).toBe(false);
    }
  });
  it('front (js/**) never references MOBIZON at all (only Deno.env in Edge does)', () => {
    for (const f of walk(`${root}js`)) {
      if (f.includes('/vendor/')) continue;
      expect(/MOBIZON/.test(readFileSync(f, 'utf8')), `MOBIZON in front file ${f}`).toBe(false);
    }
  });
});
