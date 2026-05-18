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
    const body = app.slice(s); // whole submitAuth body — no brittle fixed window
    const guard = body.indexOf('validatePassword(password)');
    const signup = body.indexOf('signUp(');
    const signin = body.indexOf('signIn(');
    expect(guard).toBeGreaterThan(-1);
    expect(guard).toBeLessThan(signup);
    expect(guard).toBeLessThan(signin);
  });
});

describe('show/hide-password toggle (Task 4)', () => {
  it('modal markup wraps the password input with a toggle button', () => {
    expect(app).toContain('class="pw-field"');
    expect(app).toContain('id="auth-pw-toggle"');
    expect(app).toContain("t('auth.showPassword')");
  });
  it('toggle handler is wired in draw()', () => {
    expect(app).toMatch(/#auth-pw-toggle'\)\.addEventListener\('click'/);
  });
  it('index.html styles the toggle with existing tokens', () => {
    const html = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
    expect(html).toMatch(/\.pw-toggle\{[^}]*position:absolute|\.pw-field>\.pw-toggle\{[^}]*position:absolute/);
  });
});
