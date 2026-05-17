// js/sticker.js — модуль наклейки-пломбы: сборка данных + рендер HTML/SVG.
// Чистый: без DOM, без сети. QR-энкодер — вендоренный.
import { offerUrl, formatGoodUntil } from './offers.js';
import { escape, SIGIL_SVG } from './ui.js';
import qrcode from './vendor/qrcode.esm.js';

/**
 * Данные наклейки из оффера.
 * @param {object} offer - строка offers (нужны id, expires_at)
 * @param {string} lang - 'ru' | 'kk' | 'en'
 * @param {{seal:string, goodUntil:string, footer:string}} strings - переведённые подписи
 */
export function stickerModel(offer, lang, strings) {
  return {
    wordmark: 'sarqt',
    seal: strings.seal,
    dateLabel: strings.goodUntil,
    dateValue: formatGoodUntil(offer.expires_at, lang),
    url: offerUrl(offer.id),
    footer: strings.footer,
  };
}
