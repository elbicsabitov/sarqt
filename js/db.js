// js/db.js — Supabase data operations. Uniform { ok, ... } / { ok:false, error } result.
import { supabase } from './supabaseClient.js';

const PHOTO_BUCKET = 'offer-photos';

// Columns the feed/cards may read. contact_phone / contact_tg are deliberately
// excluded — migration 0007 (finding H-2) revokes column SELECT on them so they
// cannot be bulk-harvested; a single offer's contact is fetched on demand via
// getOfferContact() (the get_offer_contact RPC).
const OFFER_COLS = 'id, author_id, mode, event_type, name, region, what, amount, photo_url, pickup_from, pickup_to, expires_at, status, created_at, taken_at';

// Map a raw Supabase / network error to an i18n key (app.js translates via t()).
function dbMessage(error) {
  const m = (error && error.message) || '';
  if (/row-level security|violates row-level/i.test(m)) return 'err.db.forbidden';
  if (/duplicate key|already exists/i.test(m)) return 'err.db.duplicate';
  if (/Failed to fetch|NetworkError|fetch failed/i.test(m)) return 'err.network';
  if (/violates check constraint/i.test(m)) return 'err.db.badData';
  if (m) console.warn('[sarqt] unmapped db error:', m);
  return 'err.db.generic';
}

/** Upload a resized photo Blob into the user's storage folder; returns its public URL. */
export async function uploadPhoto(blob, userId) {
  const path = `${userId}/${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: false,
  });
  if (error) return { ok: false, error: dbMessage(error) };
  const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}

/** Insert a fully-formed offer row; returns the created offer (without contact columns). */
export async function createOffer(row) {
  const { data, error } = await supabase.from('offers').insert(row).select(OFFER_COLS).single();
  if (error) return { ok: false, error: dbMessage(error) };
  return { ok: true, offer: data };
}

/** Mark an offer taken (moves it into the public ledger). */
export async function markTaken(offerId) {
  const { error } = await supabase.from('offers')
    .update({ status: 'taken', taken_at: new Date().toISOString() })
    .eq('id', offerId);
  if (error) return { ok: false, error: dbMessage(error) };
  return { ok: true };
}

/** Soft-delete an offer (status='removed'); never a hard delete. */
export async function removeOffer(offerId) {
  const { error } = await supabase.from('offers').update({ status: 'removed' }).eq('id', offerId);
  if (error) return { ok: false, error: dbMessage(error) };
  return { ok: true };
}

/**
 * Fetch one offer's contact details via the get_offer_contact RPC (finding H-2).
 * The RPC enforces the same visibility rule as the feed (active+unexpired, or own).
 */
export async function getOfferContact(offerId) {
  const { data, error } = await supabase.rpc('get_offer_contact', { p_offer_id: offerId });
  if (error) return { ok: false, error: dbMessage(error) };
  const row = Array.isArray(data) ? data[0] : data;
  if (!row || !row.contact_phone) return { ok: false, error: 'err.db.contactUnavailable' };
  return { ok: true, phone: row.contact_phone, tg: row.contact_tg || null };
}

/** List active, unexpired offers (optionally filtered by mode), newest first. */
export async function listActiveOffers({ mode } = {}) {
  let query = supabase.from('offers').select(OFFER_COLS)
    .eq('status', 'active')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });
  if (mode) query = query.eq('mode', mode);
  const { data, error } = await query;
  if (error) return { ok: false, error: dbMessage(error) };
  return { ok: true, offers: data };
}

/** Fetch one offer by id. RLS gates visibility (active+unexpired, or own). */
export async function getOfferById(id) {
  const { data, error } = await supabase.from('offers').select(OFFER_COLS).eq('id', id).maybeSingle();
  if (error) return { ok: false, error: dbMessage(error) };
  return { ok: true, offer: data };
}

/** List every offer authored by the given user (any status), newest first. */
export async function listMyOffers(userId) {
  const { data, error } = await supabase.from('offers').select(OFFER_COLS)
    .eq('author_id', userId)
    .order('created_at', { ascending: false });
  if (error) return { ok: false, error: dbMessage(error) };
  return { ok: true, offers: data };
}

/** List the anonymized public ledger (taken offers), newest handoff first. */
export async function listLedger() {
  const { data, error } = await supabase.from('ledger').select('*')
    .order('taken_at', { ascending: false });
  if (error) return { ok: false, error: dbMessage(error) };
  return { ok: true, entries: data };
}
