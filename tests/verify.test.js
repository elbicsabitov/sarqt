// tests/verify.test.js — TDD for js/verify.js (dormant phone-verify controller).
// The module calls supabase.functions.invoke; it returns i18n keys, never user text.
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/supabaseClient.js', async () => ({
  supabase: (await import('./helpers/mockSupabase.js')).mockSupabase,
}));

import { mockSupabase, resetMock } from './helpers/mockSupabase.js';
import { startPhoneVerification, confirmCode } from '../js/verify.js';

beforeEach(resetMock);

// ---- startPhoneVerification ----

describe('startPhoneVerification', () => {
  it('returns { ok: true } when Edge Function returns { data: { ok: true } }', async () => {
    mockSupabase.__setFunctionResult('send-otp', { data: { ok: true }, error: null });
    const res = await startPhoneVerification();
    expect(res).toEqual({ ok: true });
  });

  it('calls supabase.functions.invoke("send-otp")', async () => {
    mockSupabase.__setFunctionResult('send-otp', { data: { ok: true }, error: null });
    await startPhoneVerification();
    const call = mockSupabase.__calls().find((c) => c.scope === 'functions' && c.method === 'invoke');
    expect(call).toBeTruthy();
    expect(call.args[0]).toBe('send-otp');
  });

  it('maps Edge rate_limited error to err.verify.rateLimited', async () => {
    mockSupabase.__setFunctionResult('send-otp', { data: null, error: { message: 'rate_limited' } });
    const res = await startPhoneVerification();
    expect(res).toEqual({ ok: false, error: 'err.verify.rateLimited' });
  });

  it('maps any other Edge error to err.verify.generic', async () => {
    mockSupabase.__setFunctionResult('send-otp', { data: null, error: { message: 'internal server error' } });
    const res = await startPhoneVerification();
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
  });

  it('maps invoke/network throw to err.verify.generic', async () => {
    // Override invoke to throw synchronously to simulate network failure
    const orig = mockSupabase.functions.invoke;
    mockSupabase.functions.invoke = () => Promise.reject(new Error('Failed to fetch'));
    const res = await startPhoneVerification();
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
    mockSupabase.functions.invoke = orig;
  });

  it('returns an i18n key string, never raw user text', async () => {
    mockSupabase.__setFunctionResult('send-otp', { data: null, error: { message: 'something unexpected' } });
    const res = await startPhoneVerification();
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/^err\./);
  });
});

// ---- confirmCode ----

describe('confirmCode', () => {
  it('returns { ok: true } when Edge Function returns { data: { ok: true } }', async () => {
    mockSupabase.__setFunctionResult('verify-otp', { data: { ok: true }, error: null });
    const res = await confirmCode('123456');
    expect(res).toEqual({ ok: true });
  });

  it('passes { body: { code } } to supabase.functions.invoke("verify-otp")', async () => {
    mockSupabase.__setFunctionResult('verify-otp', { data: { ok: true }, error: null });
    await confirmCode('654321');
    const call = mockSupabase.__calls().find(
      (c) => c.scope === 'functions' && c.method === 'invoke' && c.args[0] === 'verify-otp',
    );
    expect(call).toBeTruthy();
    expect(call.args[1]).toEqual({ body: { code: '654321' } });
  });

  it('maps Edge bad_code to err.verify.badCode', async () => {
    mockSupabase.__setFunctionResult('verify-otp', { data: null, error: { message: 'bad_code' } });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.badCode' });
  });

  it('maps Edge expired to err.verify.expired', async () => {
    mockSupabase.__setFunctionResult('verify-otp', { data: null, error: { message: 'expired' } });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.expired' });
  });

  it('maps Edge locked to err.verify.rateLimited', async () => {
    mockSupabase.__setFunctionResult('verify-otp', { data: null, error: { message: 'locked' } });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.rateLimited' });
  });

  it('maps Edge rate_limited to err.verify.rateLimited', async () => {
    mockSupabase.__setFunctionResult('verify-otp', { data: null, error: { message: 'rate_limited' } });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.rateLimited' });
  });

  it('maps any other Edge error to err.verify.generic', async () => {
    mockSupabase.__setFunctionResult('verify-otp', { data: null, error: { message: 'unexpected edge error' } });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
  });

  it('maps invoke/network throw to err.verify.generic', async () => {
    const orig = mockSupabase.functions.invoke;
    mockSupabase.functions.invoke = () => Promise.reject(new Error('Network error'));
    const res = await confirmCode('123456');
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
    mockSupabase.functions.invoke = orig;
  });

  it('returns an i18n key string, never raw user text', async () => {
    mockSupabase.__setFunctionResult('verify-otp', { data: null, error: { message: 'anything' } });
    const res = await confirmCode('000000');
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/^err\./);
  });
});
