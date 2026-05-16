import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/supabaseClient.js', async () => ({
  supabase: (await import('./helpers/mockSupabase.js')).mockSupabase,
}));

import { mockSupabase, resetMock } from './helpers/mockSupabase.js';
import { signUp, signIn, signOut, currentUser, currentProfile, onAuthChange } from '../js/auth.js';

beforeEach(resetMock);

describe('signUp', () => {
  it('passes email, password and profile metadata to supabase', async () => {
    mockSupabase.__setAuthResult('signUp', { data: { user: { id: 'u1' }, session: { access_token: 'tok' } }, error: null });
    const res = await signUp({
      email: 'a@b.kz', password: 'secret12', display_name: 'Айгерим',
      phone: '+7 777 000 11 22', region: 'Алмалы', tg: '@aigerim',
    });
    expect(res).toEqual({ ok: true, user: { id: 'u1' }, session: { access_token: 'tok' } });
    const call = mockSupabase.__calls().find((c) => c.method === 'signUp');
    expect(call.args[0].email).toBe('a@b.kz');
    expect(call.args[0].password).toBe('secret12');
    expect(call.args[0].options.data).toEqual({
      display_name: 'Айгерим', phone: '+7 777 000 11 22', region: 'Алмалы', tg: '@aigerim',
    });
  });
  it('maps an "already registered" error to a friendly message', async () => {
    mockSupabase.__setAuthResult('signUp', { data: {}, error: { message: 'User already registered' } });
    const res = await signUp({ email: 'a@b.kz', password: 'secret12' });
    expect(res.ok).toBe(false);
    expect(res.error).toBe('err.auth.emailTaken');
  });
});

describe('signIn', () => {
  it('returns the user and session on success', async () => {
    mockSupabase.__setAuthResult('signInWithPassword', { data: { user: { id: 'u2' }, session: { access_token: 'tok2' } }, error: null });
    const res = await signIn({ email: 'a@b.kz', password: 'secret12' });
    expect(res).toEqual({ ok: true, user: { id: 'u2' }, session: { access_token: 'tok2' } });
  });
  it('maps invalid credentials to a friendly message', async () => {
    mockSupabase.__setAuthResult('signInWithPassword', { data: {}, error: { message: 'Invalid login credentials' } });
    const res = await signIn({ email: 'a@b.kz', password: 'wrong' });
    expect(res.ok).toBe(false);
    expect(res.error).toBe('err.auth.badCredentials');
  });
  it('maps "email not confirmed" to a friendly message', async () => {
    mockSupabase.__setAuthResult('signInWithPassword', { data: {}, error: { message: 'Email not confirmed' } });
    expect((await signIn({ email: 'a@b.kz', password: 'x' })).error).toBe('err.auth.notConfirmed');
  });
  it('maps a network failure to a friendly message', async () => {
    mockSupabase.__setAuthResult('signInWithPassword', { data: {}, error: { message: 'Failed to fetch' } });
    expect((await signIn({ email: 'a@b.kz', password: 'x' })).error).toBe('err.network');
  });
});

describe('signOut', () => {
  it('returns ok on success', async () => {
    const res = await signOut();
    expect(res).toEqual({ ok: true });
  });
});

describe('currentUser', () => {
  it('returns the user when a session exists', async () => {
    mockSupabase.__setAuthResult('getSession', { data: { session: { user: { id: 'u3' } } }, error: null });
    expect(await currentUser()).toEqual({ id: 'u3' });
  });
  it('returns null when there is no session', async () => {
    expect(await currentUser()).toBeNull();
  });
});

describe('currentProfile', () => {
  it('returns null when not logged in', async () => {
    expect(await currentProfile()).toBeNull();
  });
  it('fetches the profile row for the logged-in user', async () => {
    mockSupabase.__setAuthResult('getSession', { data: { session: { user: { id: 'u4' } } }, error: null });
    mockSupabase.__setQueryResult({ data: { id: 'u4', display_name: 'Дана' }, error: null });
    const profile = await currentProfile();
    expect(profile).toEqual({ id: 'u4', display_name: 'Дана' });
    const calls = mockSupabase.__calls();
    expect(calls.find((c) => c.method === 'from').args[0]).toBe('profiles');
    expect(calls.find((c) => c.method === 'eq').args).toEqual(['id', 'u4']);
  });
});

describe('onAuthChange', () => {
  it('invokes the callback with the user (or null) on auth events', () => {
    const seen = [];
    onAuthChange((user) => seen.push(user));
    mockSupabase.__fireAuthChange('SIGNED_IN', { user: { id: 'u5' } });
    mockSupabase.__fireAuthChange('SIGNED_OUT', null);
    expect(seen).toEqual([{ id: 'u5' }, null]);
  });
  it('treats INITIAL_SESSION like any other event', () => {
    const seen = [];
    onAuthChange((user) => seen.push(user));
    mockSupabase.__fireAuthChange('INITIAL_SESSION', { user: { id: 'u6' } });
    mockSupabase.__fireAuthChange('INITIAL_SESSION', null);
    expect(seen).toEqual([{ id: 'u6' }, null]);
  });
});
