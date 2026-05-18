// tests/auth-hardening.test.js — structural guards for sub-project (a).
// submitAuth/the modal are DOM+Supabase glue (no unit harness in this repo,
// per tests/db.test.js pattern); the pure rule is unit-tested in
// tests/validate.test.js. These pin that the glue actually uses it.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const app = readFileSync(fileURLToPath(new URL('../js/app.js', import.meta.url)), 'utf8');

describe('submitAuth password gate (Task 3)', () => {
  it('imports validatePassword from the pure module', () => {
    expect(app).toMatch(/import\s*\{[^}]*\bvalidatePassword\b[^}]*\}\s*from\s*'\.\/validate\.js'/);
  });
  it('runs validatePassword and bails before signUp/signIn', () => {
    const s = app.indexOf('async function submitAuth');
    expect(s).toBeGreaterThan(-1);
    const body = app.slice(s, s + 1200);
    const guard = body.indexOf('validatePassword(password)');
    const signup = body.indexOf('signUp(');
    const signin = body.indexOf('signIn(');
    expect(guard).toBeGreaterThan(-1);
    expect(guard).toBeLessThan(signup);
    expect(guard).toBeLessThan(signin);
  });
});
