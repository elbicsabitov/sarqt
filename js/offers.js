// js/offers.js — чистые функции домена офферов. Без DOM, без сети. Полностью юнит-тестируемо.
import { REGIONS, EXPIRY_BUCKETS, SITE_ORIGIN } from './config.js';

const EXPIRY_KEYS = EXPIRY_BUCKETS.map((b) => b.key);
const ALMATY_OFFSET_MS = 5 * 60 * 60 * 1000; // Asia/Almaty = UTC+5, без DST

/**
 * Проверяет данные оффера из формы.
 * @returns {{ok: true}} | {{ok: false, error: string}} — error это i18n-ключ
 *          (caller переводит через t()), не готовая строка.
 */
export function validateOffer(o, now = new Date()) {
  if (!o.mode || !['restaurant', 'event', 'home'].includes(o.mode)) {
    return { ok: false, error: 'err.offer.badMode' };
  }
  if (!o.name || !o.name.trim()) {
    return { ok: false, error: 'err.offer.noName' };
  }
  if (!REGIONS.includes(o.region)) {
    return { ok: false, error: 'err.offer.noRegion' };
  }
  if (!o.what || o.what.trim().length < 5) {
    return { ok: false, error: 'err.offer.shortWhat' };
  }
  if (!o.photoFile) {
    return { ok: false, error: 'err.offer.noPhoto' };
  }
  if (!EXPIRY_KEYS.includes(o.expiry)) {
    return { ok: false, error: 'err.offer.noExpiry' };
  }
  if (o.expiry === 'exact') {
    const ms = exactDateMs(o.exactDate);
    if (Number.isNaN(ms)) return { ok: false, error: 'err.offer.noExactDate' };
    if (ms <= now.getTime()) return { ok: false, error: 'err.offer.pastDate' };
    if (ms > now.getTime() + 7 * 24 * 60 * 60 * 1000) return { ok: false, error: 'err.offer.tooFarDate' };
  }
  if (!o.contact_phone || !o.contact_phone.trim()) {
    return { ok: false, error: 'err.offer.noPhone' };
  }
  if (o.contact_phone.replace(/\D/g, '').length < 10) {
    return { ok: false, error: 'err.offer.shortPhone' };
  }
  if (o.mode === 'event' && (!o.event_type || !o.event_type.trim())) {
    return { ok: false, error: 'err.offer.noEventType' };
  }
  return { ok: true };
}

/** ms-инстант из datetime-local строки, трактуемой как алматинское время; NaN если строка кривая. */
function exactDateMs(exactDate) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(exactDate || ''));
  if (!m) return NaN;
  const ms = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) - ALMATY_OFFSET_MS;
  const back = new Date(ms + ALMATY_OFFSET_MS);
  if (back.getUTCFullYear() !== +m[1] || back.getUTCMonth() !== +m[2] - 1
      || back.getUTCDate() !== +m[3] || back.getUTCHours() !== +m[4]
      || back.getUTCMinutes() !== +m[5]) return NaN;
  return ms;
}

/**
 * Считает момент протухания оффера из выбранного expiry-чипа.
 * @param {string} bucketKey - 'today' | '24h' | '72h' | 'exact'
 * @param {Date} now
 * @param {string|null} exactDate - datetime-local строка для режима 'exact'
 * @returns {Date}
 */
export function computeExpiresAt(bucketKey, now = new Date(), exactDate = null) {
  if (bucketKey === '24h') return new Date(now.getTime() + 24 * 60 * 60 * 1000);
  if (bucketKey === '72h') return new Date(now.getTime() + 72 * 60 * 60 * 1000);
  if (bucketKey === 'today') {
    const almaty = new Date(now.getTime() + ALMATY_OFFSET_MS);
    const endOfAlmatyDayUTC = Date.UTC(
      almaty.getUTCFullYear(), almaty.getUTCMonth(), almaty.getUTCDate(), 23, 59, 59,
    );
    return new Date(endOfAlmatyDayUTC - ALMATY_OFFSET_MS);
  }
  if (bucketKey === 'exact') {
    const ms = exactDateMs(exactDate);
    if (Number.isNaN(ms)) throw new Error('bad exact date: ' + exactDate);
    return new Date(ms);
  }
  throw new Error('unknown expiry bucket: ' + bucketKey);
}

/** Протух ли оффер. */
export function isExpired(offer, now = new Date()) {
  return new Date(offer.expires_at).getTime() <= now.getTime();
}

/** Человекочитаемое окно pickup, либо '' если данных нет. */
export function formatWindow(from, to) {
  if (!from || !to) return '';
  return `${from}–${to}`;
}

/** tel:-ссылка из произвольно отформатированного телефона. */
export function telHref(phone) {
  return 'tel:' + String(phone).replace(/[^+\d]/g, '');
}

/** Счётчики по списку офферов. */
export function offerStats(offers) {
  return {
    active: offers.filter((o) => o.status === 'active').length,
    taken: offers.filter((o) => o.status === 'taken').length,
    total: offers.length,
  };
}

/** Публичный hash-URL страницы конкретного оффера (цель QR-кода наклейки). */
export function offerUrl(offerId) {
  return `${SITE_ORIGIN}/#/o/${offerId}`;
}

/**
 * Человекочитаемое «Годен до» в алматинском времени: «22:00 · 17 мая».
 * @param {string} expiresAtISO - ISO-строка из offers.expires_at
 * @param {string} lang - 'ru' | 'kk' | 'en'
 */
export function formatGoodUntil(expiresAtISO, lang) {
  const d = new Date(expiresAtISO == null ? NaN : expiresAtISO);
  if (Number.isNaN(d.getTime())) return '';
  const time = new Intl.DateTimeFormat(lang, {
    timeZone: 'Asia/Almaty', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(d);
  // Use formatToParts to keep genitive month inflection (e.g. 'мая' not 'май')
  // and guarantee day-first order regardless of locale.
  const parts = new Intl.DateTimeFormat(lang, {
    timeZone: 'Asia/Almaty', day: 'numeric', month: 'long',
  }).formatToParts(d);
  const day = parts.find((p) => p.type === 'day').value;
  const month = parts.find((p) => p.type === 'month').value;
  return `${time} · ${day} ${month}`;
}
