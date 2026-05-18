import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');
const send = read('../supabase/functions/send-otp/index.ts');
const verify = read('../supabase/functions/verify-otp/index.ts');

describe('Edge Functions security invariants (spec §4)', () => {
  it('Mobizon key only via Deno.env, never echoed', () => {
    expect(send).toContain("Deno.env.get('MOBIZON_API_KEY')");
    expect(send).not.toMatch(/console\.(log|error|warn)\([^)]*MOBIZON/);
    expect(verify).not.toContain('MOBIZON');
  });
  it('uses service-role key from env (server-only table access)', () => {
    expect(send).toContain("Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')");
    expect(verify).toContain("Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')");
  });
  it('CORS restricted to https://sarqt.kz', () => {
    expect(read('../supabase/functions/_shared/cors.ts')).toContain("'https://sarqt.kz'");
  });
  it('send-otp enforces rate limit before sending', () => {
    expect(send).toContain('withinRateLimit');
    expect(send).toMatch(/429/);
  });
  it('send-otp defaults to test-mode (skips Mobizon dispatch before any fetch) and never silently passes a rejected real send', () => {
    expect(send).toContain("Deno.env.get('MOBIZON_TEST_MODE')");
    // default-safe: real send only when explicitly opted out with '0'
    expect(send).toMatch(/MOBIZON_TEST_MODE'\)\s*!==\s*'0'/);
    // test-mode returns BEFORE any Mobizon fetch (guaranteed zero side-effect)
    const testIdx = send.indexOf('if (testMode)');
    const fetchIdx = send.indexOf('await fetch(');
    expect(testIdx).toBeGreaterThan(-1);
    expect(fetchIdx).toBeGreaterThan(testIdx);
    expect(send).toMatch(/test-mode:[^\n]*skipped/);
    // params[test] (unverified vendor flag) must be gone
    expect(send).not.toContain("'params[test]'");
    // real path: result inspected, not assumed; dead row consumed on failure
    expect(send).toMatch(/\.code\s*!==\s*0/);
    expect(send).toMatch(/sms-rejected/);
    expect(send).toMatch(/consumed_at:[\s\S]{0,80}eq\('id', row\.id\)/);
    expect(send).not.toMatch(/console\.(log|error|warn)\([^)]*MOBIZON/);
  });
  it('verify-otp checks expiry + attempts + hash and sets phone_verified', () => {
    expect(verify).toContain('isOtpExpired');
    expect(verify).toContain('attemptsExhausted');
    expect(verify).toContain('verifyOtpHash');
    expect(verify).toContain('phone_verified');
  });
  it('reuses the pure core via the bundled _shared mirror (TD-065)', () => {
    expect(send).toMatch(/from ['"]\.\.\/_shared\/otp\.js['"]/);
    expect(verify).toMatch(/from ['"]\.\.\/_shared\/otp\.js['"]/);
    expect(send).not.toContain('../../../js/otp.js');
    expect(verify).not.toContain('../../../js/otp.js');
  });
  it('errors are logged server-side, not silently swallowed (no bare catch (_e))', () => {
    expect(send).not.toContain('catch (_e)');
    expect(verify).not.toContain('catch (_e)');
    expect(send).toContain("console.error('[send-otp] internal', e)");
    expect(verify).toContain("console.error('[verify-otp] internal', e)");
  });
});
