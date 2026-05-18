// tests/otp-migration.test.js — pins the phone_otps migration contract:
// server-only (RLS enabled, NO client policy), hashed code, the columns
// the Edge Functions depend on. SQL isn't executed here (no PG in CI) —
// this is the project's source-string guard, like tests/csp.test.js.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const sql = readFileSync(
  fileURLToPath(new URL('../supabase/migrations/0009_phone_otps.sql', import.meta.url)), 'utf8');

describe('0009 phone_otps migration (spec §4)', () => {
  it('creates the phone_otps table with the spec columns', () => {
    expect(sql).toMatch(/create table public\.phone_otps/);
    for (const c of ['id', 'user_id', 'phone', 'code_hash', 'expires_at', 'attempts', 'created_at', 'consumed_at']) {
      expect(sql, c).toContain(c);
    }
  });
  it('stores a hash, never the raw code', () => {
    expect(sql).toContain('code_hash');
    expect(sql).not.toMatch(/\bcode\s+text\b/);
  });
  it('enables RLS and grants NO client policy (server-only via service role)', () => {
    expect(sql).toMatch(/alter table public\.phone_otps enable row level security/i);
    expect(sql).not.toMatch(/create policy .* on public\.phone_otps/i);
  });
  it('explicitly revokes all privileges from anon and authenticated (defense-in-depth)', () => {
    expect(sql).toMatch(/revoke all on table public\.phone_otps from anon,\s*authenticated/i);
  });
});
