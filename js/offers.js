// js/offers.js — чистые функции домена офферов. Без DOM, без сети. Полностью юнит-тестируемо.
import { REGIONS, EXPIRY_BUCKETS, SITE_ORIGIN } from './config.js';

const EXPIRY_KEYS = EXPIRY_BUCKETS.map((b) => b.key);
const ALMATY_OFFSET_MS = 5 * 60 * 60 * 1000; // Asia/Almaty = UTC+5, без DST

/**
 * Проверяет данные оффера из формы.
 * @returns {{ok: true}} | {{ok: false, error: string}} — error это i18n-ключ
 *          (caller переводит через t()), не готовая строка.
 */
export function validateOffer(o) {
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

/**
 * Считает момент протухания оффера из выбранного expiry-чипа.
 * @param {string} bucketKey - 'today' | '24h' | '72h'
 * @param {Date} now
 * @returns {Date}
 */
export function computeExpiresAt(bucketKey, now = new Date()) {
  if (bucketKey === '24h') return new Date(now.getTime() + 24 * 60 * 60 * 1000);
  if (bucketKey === '72h') return new Date(now.getTime() + 72 * 60 * 60 * 1000);
  if (bucketKey === 'today') {
    const almaty = new Date(now.getTime() + ALMATY_OFFSET_MS);
    const endOfAlmatyDayUTC = Date.UTC(
      almaty.getUTCFullYear(), almaty.getUTCMonth(), almaty.getUTCDate(), 23, 59, 59,
    );
    return new Date(endOfAlmatyDayUTC - ALMATY_OFFSET_MS);
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
