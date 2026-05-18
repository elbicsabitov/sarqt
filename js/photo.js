// js/photo.js — ресайз изображения перед загрузкой в Storage + детект HEIC.
// resizeImage использует браузерное API (Image + canvas) — проверяется
// вручную в браузере; ошибки реджектятся с .code для диагностики (TD-061).
// isLikelyHeic — чистая функция, покрыта юнит-тестами.

/**
 * Ошибка обработки фото с машиночитаемым кодом.
 * @param {'decode'|'encode'} code
 * @param {string} message
 * @returns {Error & {code: string}}
 */
function photoError(code, message) {
  const e = new Error(message);
  e.code = code;
  return e;
}

/**
 * Похоже ли, что файл — HEIC/HEIF (формат камеры iPhone, который
 * <img>/canvas не декодируют в большинстве браузеров). Чистая проверка
 * по MIME-типу и расширению — без чтения файла.
 * @param {{type?: string, name?: string}|null|undefined} file
 * @returns {boolean}
 */
export function isLikelyHeic(file) {
  const type = ((file && file.type) || '').toLowerCase();
  const name = ((file && file.name) || '').toLowerCase();
  return type.startsWith('image/heic') || type.startsWith('image/heif')
    || name.endsWith('.heic') || name.endsWith('.heif');
}

/**
 * Ужимает картинку до maxDim по большей стороне, отдаёт JPEG-Blob.
 * @param {File|Blob} file - исходный файл из <input type="file">
 * @param {number} maxDim - макс. сторона в px
 * @param {number} quality - 0..1, качество JPEG
 * @returns {Promise<Blob>}
 */
export function resizeImage(file, maxDim = 1280, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(photoError('encode', 'canvas encode failed'));
        },
        'image/jpeg',
        quality,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(photoError('decode', 'image decode failed'));
    };
    img.src = url;
  });
}
