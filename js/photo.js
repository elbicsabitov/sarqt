// js/photo.js — ресайз изображения перед загрузкой в Storage.
// Браузерное API (Image + canvas). Проверяется вручную в браузере.

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
          else reject(new Error('Не удалось обработать фото'));
        },
        'image/jpeg',
        quality,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Не удалось прочитать фото'));
    };
    img.src = url;
  });
}
