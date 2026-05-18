// js/otp.js — чистое OTP-ядро SMS-верификации. ТОЛЬКО Web Crypto + чистый JS:
// импортируется и фронт-тестами (Vitest/Node), и Edge Functions (Deno).
// Никаких DOM/Node/Deno-специфичных API — кроссрантайм по контракту.
// Спека: docs/superpowers/specs/2026-05-18-auth-recovery-identity-design.md §4.
// MIRRORED → supabase/functions/_shared/otp.js — edit BOTH; tests/otp-shared-drift.test.js enforces byte-identity.

/** Криптослучайный 6-значный код, zero-padded. */
export function generateOtp() {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000;
  return String(n).padStart(6, '0');
}

/** sha-256(code + ':' + salt) → hex. salt = otp-row id (уникальный). */
export async function hashOtp(code, salt) {
  const data = new TextEncoder().encode(`${code}:${salt}`);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Постоянное по длине сравнение хешей (оба — hex sha-256). */
export async function verifyOtpHash(code, salt, expectedHash) {
  const got = await hashOtp(code, salt);
  if (got.length !== expectedHash.length) return false;
  let diff = 0;
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ expectedHash.charCodeAt(i);
  return diff === 0;
}

export function isOtpExpired(expiresAtIso, now = new Date()) {
  return new Date(expiresAtIso).getTime() <= now.getTime();
}

export function attemptsExhausted(attempts, max = 5) {
  return attempts >= max;
}

/** Anti-abuse + circuit-breaker. true = разрешено слать SMS. */
export function withinRateLimit({ last10min, last24h, globalToday, globalCap }) {
  if (last10min >= 4) return false;   // ≤3 / 10 мин
  if (last24h >= 6) return false;     // ≤5 / сут
  if (globalToday >= globalCap) return false; // дневной потолок (breaker)
  return true;
}
