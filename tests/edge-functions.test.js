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
  it('verify-otp checks expiry + attempts + hash and sets phone_verified', () => {
    expect(verify).toContain('isOtpExpired');
    expect(verify).toContain('attemptsExhausted');
    expect(verify).toContain('verifyOtpHash');
    expect(verify).toContain('phone_verified');
  });
  it('reuses the pure core (no re-implemented crypto)', () => {
    expect(send).toMatch(/from ['"]\.\.\/\.\.\/\.\.\/js\/otp\.js['"]/);
    expect(verify).toMatch(/from ['"]\.\.\/\.\.\/\.\.\/js\/otp\.js['"]/);
  });
});
