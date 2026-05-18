// tests/otp-shared-drift.test.js — TD-065 guard. The Edge mirror
// supabase/functions/_shared/otp.js MUST stay byte-identical to the
// canonical js/otp.js. We compare the Git BLOB hash (git hash-object),
// not working-tree bytes, so the guard reflects exactly what Supabase
// deploys and is invariant to any local core.autocrlf setting.
import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const blob = (rel) =>
  execFileSync('git', ['hash-object', rel], { cwd: root, encoding: 'utf8' }).trim();

describe('otp.js Edge mirror never drifts (TD-065)', () => {
  it('supabase/functions/_shared/otp.js has the same Git blob as js/otp.js', () => {
    expect(blob('supabase/functions/_shared/otp.js')).toBe(blob('js/otp.js'));
  });
});
