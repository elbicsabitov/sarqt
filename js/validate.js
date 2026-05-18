// js/validate.js — pure, dependency-free auth validators (TDD core).
// Mirrors js/offers.js: no DOM, no network, unit-tested directly.

/** True iff `pw` is a non-empty string of printable ASCII only (0x20–0x7E,
 *  space allowed). Blocks Cyrillic / emoji / accented / control chars —
 *  the cont #9 keyboard-layout lockout class. */
export function isAsciiPassword(pw) {
  return typeof pw === 'string' && /^[\x20-\x7E]+$/.test(pw);
}

/** Charset gate for passwords. Length is enforced server-side by Supabase
 *  (maps to err.auth.weakPassword) — not duplicated here (YAGNI). */
export function validatePassword(pw) {
  return isAsciiPassword(pw)
    ? { ok: true }
    : { ok: false, error: 'err.auth.asciiPassword' };
}
