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

/** QR-матрица для текста: boolean[][] (true = тёмный модуль). null если энкодер не справился. */
function qrModules(text) {
  try {
    const qr = qrcode(0, 'M'); // 0 = автоподбор версии, 'M' = коррекция ошибок ~15%
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    const rows = [];
    for (let r = 0; r < n; r++) {
      const row = [];
      for (let c = 0; c < n; c++) row.push(qr.isDark(r, c));
      rows.push(row);
    }
    return rows;
  } catch (e) {
    return null;
  }
}

/** QR как SVG-строка, либо '' если энкодер не справился. */
function qrSvg(text) {
  const mods = qrModules(text);
  if (!mods) return '';
  const n = mods.length;
  let rects = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (mods[r][c]) rects += `<rect x="${c}" y="${r}" width="1" height="1"/>`;
    }
  }
  return `<svg class="stk__qr" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" `
    + `xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`
    + `<rect width="${n}" height="${n}" fill="#fff"/><g fill="#212121">${rects}</g></svg>`;
}

/**
 * Наклейка-пломба как HTML-строка. Если QR не собрался — вместо него URL текстом
 * (наклейка деградирует, не остаётся пустой).
 */
export function renderSticker(model) {
  const qr = qrSvg(model.url);
  const qrBlock = qr || `<div class="stk__qr-fallback">${escape(model.url)}</div>`;
  return `
    <div class="stk">
      <div class="stk__bar"></div>
      <div class="stk__body">
        <div class="stk__sigil">${SIGIL_SVG}</div>
        <div class="stk__wm">${escape(model.wordmark)}</div>
        <div class="stk__seal">${escape(model.seal)}</div>
        <div class="stk__date">
          <div class="stk__date-lbl">${escape(model.dateLabel)}</div>
          <div class="stk__date-val">${escape(model.dateValue)}</div>
        </div>
        ${qrBlock}
        <div class="stk__foot">${escape(model.footer)}</div>
      </div>
    </div>`;
}
