// js/verify.js — dormant front controller for SMS phone-verification (Фаза-L).
// Returns i18n keys (never user-visible text); app.js translates via t().
// Calls Supabase Edge Functions send-otp / verify-otp via supabase.functions.invoke.
// This module is DORMANT: PHONE_VERIFY_ENABLED=false in config.js; the guarded
// hook in app.js is unreachable until the Фаза-L RLS flip activates the flag.
import { supabase } from './supabaseClient.js';

// Map an Edge Function error message to an i18n key.
function verifyMessage(message) {
  const m = message || '';
  if (m === 'rate_limited') return 'err.verify.rateLimited';
  if (m === 'bad_code') return 'err.verify.badCode';
  if (m === 'expired') return 'err.verify.expired';
  if (m === 'locked') return 'err.verify.rateLimited';
  return 'err.verify.generic';
}

// supabase-js wraps a non-2xx Edge response as FunctionsHttpError whose
// .message is a fixed generic string; the Edge JSON body (with our
// {error:'...'} field) is only in error.context (a Response). Network/
// relay errors have no body → fall through to the generic message.
async function extractEdgeError(error) {
  try {
    if (error && error.context && typeof error.context.json === 'function') {
      const body = await error.context.json();
      if (body && typeof body.error === 'string') return body.error;
    }
  } catch (_) { /* unreadable body → generic */ }
  return (error && error.message) || '';
}

/**
 * Start phone verification: calls the send-otp Edge Function.
 * Returns { ok: true } on success, or { ok: false, error: '<i18n key>' } on failure.
 */
export async function startPhoneVerification() {
  try {
    const { data, error } = await supabase.functions.invoke('send-otp');
    if (error) return { ok: false, error: verifyMessage(await extractEdgeError(error)) };
    if (data && data.ok) return { ok: true };
    return { ok: false, error: 'err.verify.generic' };
  } catch (e) {
    return { ok: false, error: 'err.verify.generic' };
  }
}

/**
 * Confirm the OTP code the user entered: calls the verify-otp Edge Function.
 * Returns { ok: true } on success, or { ok: false, error: '<i18n key>' } on failure.
 * @param {string} code — the 6-digit code the user entered
 */
export async function confirmCode(code) {
  try {
    const { data, error } = await supabase.functions.invoke('verify-otp', { body: { code } });
    if (error) return { ok: false, error: verifyMessage(await extractEdgeError(error)) };
    if (data && data.ok) return { ok: true };
    return { ok: false, error: 'err.verify.generic' };
  } catch (e) {
    return { ok: false, error: 'err.verify.generic' };
  }
}
