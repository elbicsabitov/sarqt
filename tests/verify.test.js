// tests/verify.test.js — TDD for js/verify.js (dormant phone-verify controller).
// The module calls supabase.functions.invoke; it returns i18n keys, never user text.
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/supabaseClient.js', async () => ({
  supabase: (await import('./helpers/mockSupabase.js')).mockSupabase,
}));

import { mockSupabase, resetMock } from './helpers/mockSupabase.js';
import { startPhoneVerification, confirmCode } from '../js/verify.js';

beforeEach(resetMock);

// Helper: build a real FunctionsHttpError-shaped error with an Edge JSON body.
// supabase-js v2: non-2xx responses come as { name:'FunctionsHttpError',
// message:'Edge Function returned a non-2xx status code', context: Response }.
// The Edge JSON body ({error:'...'}) is only in error.context.json().
function makeFunctionsHttpError(edgeErrorField) {
  return {
    name: 'FunctionsHttpError',
    message: 'Edge Function returned a non-2xx status code',
    context: { json: async () => ({ error: edgeErrorField }) },
  };
}

// Helper: FunctionsFetchError shape (network failure — no body).
function makeFetchError(msg = 'Failed to fetch') {
  return { name: 'FunctionsFetchError', message: msg };
}

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

  it('maps Edge rate_limited error (real FunctionsHttpError shape) to err.verify.rateLimited', async () => {
    mockSupabase.__setFunctionResult('send-otp', {
      data: null,
      error: makeFunctionsHttpError('rate_limited'),
    });
    const res = await startPhoneVerification();
    expect(res).toEqual({ ok: false, error: 'err.verify.rateLimited' });
  });

  it('maps any other Edge error (unreadable body) to err.verify.generic', async () => {
    // context.json() throws → falls through to generic
    const errorWithBrokenBody = {
      name: 'FunctionsHttpError',
      message: 'Edge Function returned a non-2xx status code',
      context: { json: async () => { throw new Error('not json'); } },
    };
    mockSupabase.__setFunctionResult('send-otp', { data: null, error: errorWithBrokenBody });
    const res = await startPhoneVerification();
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
  });

  it('maps network/relay throw (FunctionsFetchError, no context) to err.verify.generic', async () => {
    // FIX 4: scoped spy replaces manual monkey-patch
    vi.spyOn(mockSupabase.functions, 'invoke').mockRejectedValueOnce(makeFetchError('Failed to fetch'));
    const res = await startPhoneVerification();
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
  });

  it('returns an i18n key string, never raw user text', async () => {
    mockSupabase.__setFunctionResult('send-otp', {
      data: null,
      error: makeFunctionsHttpError('something unexpected'),
    });
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

  it('maps Edge bad_code (real FunctionsHttpError shape) to err.verify.badCode', async () => {
    mockSupabase.__setFunctionResult('verify-otp', {
      data: null,
      error: makeFunctionsHttpError('bad_code'),
    });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.badCode' });
  });

  it('maps Edge expired (real FunctionsHttpError shape) to err.verify.expired', async () => {
    mockSupabase.__setFunctionResult('verify-otp', {
      data: null,
      error: makeFunctionsHttpError('expired'),
    });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.expired' });
  });

  it('maps Edge locked (real FunctionsHttpError shape) to err.verify.rateLimited', async () => {
    mockSupabase.__setFunctionResult('verify-otp', {
      data: null,
      error: makeFunctionsHttpError('locked'),
    });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.rateLimited' });
  });

  it('maps Edge rate_limited (real FunctionsHttpError shape) to err.verify.rateLimited', async () => {
    mockSupabase.__setFunctionResult('verify-otp', {
      data: null,
      error: makeFunctionsHttpError('rate_limited'),
    });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.rateLimited' });
  });

  it('maps unknown Edge error body to err.verify.generic', async () => {
    mockSupabase.__setFunctionResult('verify-otp', {
      data: null,
      error: makeFunctionsHttpError('unexpected edge error'),
    });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
  });

  it('maps Edge error with unreadable body (context.json throws) to err.verify.generic', async () => {
    const errorWithBrokenBody = {
      name: 'FunctionsHttpError',
      message: 'Edge Function returned a non-2xx status code',
      context: { json: async () => { throw new Error('body already read'); } },
    };
    mockSupabase.__setFunctionResult('verify-otp', { data: null, error: errorWithBrokenBody });
    const res = await confirmCode('000000');
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
  });

  it('maps network/relay throw (FunctionsFetchError, no context) to err.verify.generic', async () => {
    // FIX 4: scoped spy replaces manual monkey-patch
    vi.spyOn(mockSupabase.functions, 'invoke').mockRejectedValueOnce(makeFetchError('Network error'));
    const res = await confirmCode('123456');
    expect(res).toEqual({ ok: false, error: 'err.verify.generic' });
  });

  it('returns an i18n key string, never raw user text', async () => {
    mockSupabase.__setFunctionResult('verify-otp', {
      data: null,
      error: makeFunctionsHttpError('anything'),
    });
    const res = await confirmCode('000000');
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/^err\./);
  });
});
