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
  it('send-otp defaults to Mobizon test-mode and never silently passes a rejected send', () => {
    expect(send).toContain("Deno.env.get('MOBIZON_TEST_MODE')");
    expect(send).toContain("'params[test]'");
    // default-safe: real send only when explicitly opted out
    expect(send).toMatch(/MOBIZON_TEST_MODE'\)\s*!==\s*'0'/);
    // result is inspected, not assumed: success requires Mobizon code 0
    expect(send).toMatch(/\.code\s*!==\s*0/);
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
