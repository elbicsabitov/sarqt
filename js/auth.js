// js/auth.js — Supabase auth wrappers. Uniform { ok, ... } / { ok:false, error } result.
import { supabase } from './supabaseClient.js';

// Map a raw Supabase auth error to an i18n key (app.js translates via t()).
function authMessage(error) {
  const m = (error && error.message) || '';
  if (/invalid login credentials/i.test(m)) return 'err.auth.badCredentials';
  if (/already registered|already been registered/i.test(m)) return 'err.auth.emailTaken';
  if (/password should be at least/i.test(m)) return 'err.auth.weakPassword';
  if (/unable to validate email|invalid format/i.test(m)) return 'err.auth.badEmail';
  if (/email not confirmed/i.test(m)) return 'err.auth.notConfirmed';
  if (/Failed to fetch|NetworkError|fetch failed/i.test(m)) return 'err.network';
  if (m) console.warn('[sarqt] unmapped auth error:', m);
  return 'err.auth.generic';
}

/** Register a new account; profile metadata is read by the handle_new_user trigger. */
export async function signUp({ email, password, display_name, phone, region, tg }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name, phone, region, tg } },
  });
  if (error) return { ok: false, error: authMessage(error) };
  return { ok: true, user: data.user, session: data.session };
}

/** Sign in with email + password. */
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: authMessage(error) };
  return { ok: true, user: data.user, session: data.session };
}

/** Sign the current user out. */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, error: authMessage(error) };
  return { ok: true };
}

/** The currently logged-in user object, or null. */
export async function currentUser() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return null;
  return data.session.user;
}

/** The profiles row for the logged-in user, or null. */
export async function currentProfile() {
  const user = await currentUser();
  if (!user) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) return null;
  return data;
}

/** Subscribe to auth changes; callback receives the user object or null. Returns the subscription. */
export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session ? session.user : null);
  });
  return data.subscription;
}
