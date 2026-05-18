// tests/otp-shared-drift.test.js — TD-065 guard. The Edge mirror
// supabase/functions/_shared/otp.js MUST stay byte-identical to the
// canonical js/otp.js. If they ever diverge, fail the build loudly
// (the front tests exercise js/otp.js; Edge runs the mirror).
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');

describe('otp.js Edge mirror never drifts (TD-065)', () => {
  it('supabase/functions/_shared/otp.js is byte-identical to js/otp.js', () => {
    const front = read('../js/otp.js');
    const mirror = read('../supabase/functions/_shared/otp.js');
    expect(mirror).toBe(front);
  });
});
