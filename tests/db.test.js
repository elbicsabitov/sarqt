import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/supabaseClient.js', async () => ({
  supabase: (await import('./helpers/mockSupabase.js')).mockSupabase,
}));

import { mockSupabase, resetMock } from './helpers/mockSupabase.js';
import {
  uploadPhoto, createOffer, markTaken, removeOffer, getOfferContact,
  listActiveOffers, listMyOffers, listLedger,
} from '../js/db.js';

beforeEach(resetMock);

describe('uploadPhoto', () => {
  it('uploads into the user folder and returns the public URL', async () => {
    mockSupabase.__setStorageResult('getPublicUrl', { data: { publicUrl: 'https://cdn.test/photo.jpg' } });
    const res = await uploadPhoto(new Blob(['x']), 'user-9');
    expect(res.ok).toBe(true);
    expect(res.url).toBe('https://cdn.test/photo.jpg');
    const upload = mockSupabase.__calls().find((c) => c.method === 'upload');
    expect(upload.args[0]).toMatch(/^user-9\/.+\.jpg$/);
    expect(upload.args[2]).toMatchObject({ contentType: 'image/jpeg' });
  });
  it('returns an error result when upload fails', async () => {
    mockSupabase.__setStorageResult('upload', { data: null, error: { message: 'storage is full' } });
    const res = await uploadPhoto(new Blob(['x']), 'user-9');
    expect(res.ok).toBe(false);
    expect(res.error).toBeTruthy();
  });
});

describe('createOffer', () => {
  it('inserts the row into offers and returns the created offer', async () => {
    mockSupabase.__setQueryResult({ data: { id: 'o1', mode: 'home' }, error: null });
    const row = { author_id: 'u1', mode: 'home', name: 'Айгерим', region: 'Алмалы', what: '15 мантов',
      photo_url: 'https://cdn.test/p.jpg', expires_at: '2026-05-17T10:00:00Z', contact_phone: '+7 777 1112233', status: 'active' };
    const res = await createOffer(row);
    expect(res).toEqual({ ok: true, offer: { id: 'o1', mode: 'home' } });
    const calls = mockSupabase.__calls();
    expect(calls.find((c) => c.method === 'from').args[0]).toBe('offers');
    expect(calls.find((c) => c.method === 'insert').args[0]).toEqual(row);
    expect(calls.some((c) => c.method === 'single')).toBe(true);
  });
  it('returns an error result when insert fails (e.g. RLS rejects)', async () => {
    mockSupabase.__setQueryResult({ data: null, error: { message: 'new row violates row-level security policy' } });
    const res = await createOffer({ author_id: 'u1' });
    expect(res.ok).toBe(false);
    expect(res.error).toBe('err.db.forbidden');
  });
});

describe('markTaken', () => {
  it('updates status to taken with a taken_at timestamp', async () => {
    const res = await markTaken('o7');
    expect(res).toEqual({ ok: true });
    const calls = mockSupabase.__calls();
    const update = calls.find((c) => c.method === 'update').args[0];
    expect(update.status).toBe('taken');
    expect(typeof update.taken_at).toBe('string');
    expect(calls.find((c) => c.method === 'eq').args).toEqual(['id', 'o7']);
  });
  it('returns an error result on failure', async () => {
    mockSupabase.__setQueryResult({ data: null, error: { message: 'boom' } });
    expect((await markTaken('o7')).ok).toBe(false);
  });
});

describe('removeOffer', () => {
  it('soft-deletes by setting status to removed (never a hard delete)', async () => {
    const res = await removeOffer('o8');
    expect(res).toEqual({ ok: true });
    const calls = mockSupabase.__calls();
    expect(calls.find((c) => c.method === 'update').args[0]).toEqual({ status: 'removed' });
    expect(calls.some((c) => c.method === 'delete')).toBe(false);
    expect(calls.find((c) => c.method === 'eq').args).toEqual(['id', 'o8']);
  });
});

describe('getOfferContact', () => {
  it('calls the get_offer_contact RPC and returns the phone', async () => {
    mockSupabase.__setQueryResult({ data: [{ contact_phone: '+7 777 111 22 33', contact_tg: '@n' }], error: null });
    const res = await getOfferContact('o5');
    expect(res).toEqual({ ok: true, phone: '+7 777 111 22 33', tg: '@n' });
    const rpc = mockSupabase.__calls().find((c) => c.method === 'rpc');
    expect(rpc.args).toEqual(['get_offer_contact', { p_offer_id: 'o5' }]);
  });
  it('returns an error result when the offer is not accessible', async () => {
    mockSupabase.__setQueryResult({ data: [], error: null });
    expect((await getOfferContact('o5')).ok).toBe(false);
  });
  it('returns an error result on RPC failure', async () => {
    mockSupabase.__setQueryResult({ data: null, error: { message: 'boom' } });
    expect((await getOfferContact('o5')).ok).toBe(false);
  });
});

describe('listActiveOffers', () => {
  it('queries active, unexpired offers newest-first', async () => {
    mockSupabase.__setQueryResult({ data: [{ id: 'o1' }], error: null });
    const res = await listActiveOffers();
    expect(res).toEqual({ ok: true, offers: [{ id: 'o1' }] });
    const calls = mockSupabase.__calls();
    expect(calls.find((c) => c.method === 'from').args[0]).toBe('offers');
    expect(calls.filter((c) => c.method === 'eq').map((c) => c.args)).toEqual([['status', 'active']]);
    const gt = calls.find((c) => c.method === 'gt');
    expect(gt.args[0]).toBe('expires_at');
    expect(new Date(gt.args[1]).toISOString()).toBe(gt.args[1]);
    expect(calls.find((c) => c.method === 'order').args).toEqual(['created_at', { ascending: false }]);
  });
  it('adds a mode filter in addition to the status filter when a mode is given', async () => {
    mockSupabase.__setQueryResult({ data: [], error: null });
    await listActiveOffers({ mode: 'event' });
    const eqCalls = mockSupabase.__calls().filter((c) => c.method === 'eq');
    expect(eqCalls.map((c) => c.args)).toEqual([['status', 'active'], ['mode', 'event']]);
  });
  it('does NOT add a mode filter when mode is omitted', async () => {
    mockSupabase.__setQueryResult({ data: [], error: null });
    await listActiveOffers();
    const eqCalls = mockSupabase.__calls().filter((c) => c.method === 'eq');
    expect(eqCalls.some((c) => c.args[0] === 'mode')).toBe(false);
  });
  it('returns an error result on failure', async () => {
    mockSupabase.__setQueryResult({ data: null, error: { message: 'boom' } });
    expect((await listActiveOffers()).ok).toBe(false);
  });
  it('maps a network failure to a friendly message', async () => {
    mockSupabase.__setQueryResult({ data: null, error: { message: 'Failed to fetch' } });
    expect((await listActiveOffers()).error).toBe('err.network');
  });
});

describe('listMyOffers', () => {
  it('queries every offer for the given author newest-first', async () => {
    mockSupabase.__setQueryResult({ data: [{ id: 'o2' }], error: null });
    const res = await listMyOffers('user-5');
    expect(res).toEqual({ ok: true, offers: [{ id: 'o2' }] });
    const calls = mockSupabase.__calls();
    expect(calls.find((c) => c.method === 'from').args[0]).toBe('offers');
    expect(calls.find((c) => c.method === 'eq').args).toEqual(['author_id', 'user-5']);
    expect(calls.find((c) => c.method === 'order').args).toEqual(['created_at', { ascending: false }]);
  });
});

describe('listLedger', () => {
  it('queries the ledger view newest-handoff-first', async () => {
    mockSupabase.__setQueryResult({ data: [{ id: 'l1', what: 'плов' }], error: null });
    const res = await listLedger();
    expect(res).toEqual({ ok: true, entries: [{ id: 'l1', what: 'плов' }] });
    const calls = mockSupabase.__calls();
    expect(calls.find((c) => c.method === 'from').args[0]).toBe('ledger');
    expect(calls.find((c) => c.method === 'order').args).toEqual(['taken_at', { ascending: false }]);
  });
  it('returns an error result on failure', async () => {
    mockSupabase.__setQueryResult({ data: null, error: { message: 'boom' } });
    expect((await listLedger()).ok).toBe(false);
  });
});

