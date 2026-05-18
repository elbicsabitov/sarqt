// tests/csp.test.js — страж Content-Security-Policy в index.html.
//
// Регрессионный гард для бага cont #9 (2026-05-18): cont #3 добавил CSP без
// `blob:` в `img-src`. resizeImage() (js/photo.js) делает
// URL.createObjectURL(file) → img.src = "blob:…"; без `blob:` в img-src
// браузер блокирует картинку → img.onerror → "Не удалось обработать фото".
// Так как фото обязательно у каждого оффера, публикация ломалась для ВСЕХ.
// jsdom не применяет CSP — единственный автоматизируемый гард это проверка
// самой политики.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const html = readFileSync(
  fileURLToPath(new URL('../index.html', import.meta.url)),
  'utf8',
);

/** Достаёт content CSP-меты и парсит в { directive: [sources] }. */
function parseCsp(source) {
  const m = source.match(
    /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i,
  );
  if (!m) return null;
  const policy = {};
  for (const part of m[1].split(';')) {
    const [name, ...sources] = part.trim().split(/\s+/);
    if (name) policy[name] = sources;
  }
  return policy;
}

describe('Content-Security-Policy в index.html', () => {
  const csp = parseCsp(html);

  it('CSP-мета присутствует и парсится', () => {
    expect(csp).not.toBeNull();
  });

  it('img-src разрешает blob: — иначе resizeImage ломает публикацию', () => {
    // КОРЕНЬ бага cont #9: img.src = blob:-URL из URL.createObjectURL.
    expect(csp['img-src']).toContain('blob:');
  });

  it('img-src сохраняет источники, нужные для отображения фото', () => {
    // Supabase Storage отдаёт фото офферов; data: — инлайн-плейсхолдеры;
    // 'self' — og-image/favicon. Не регрессировать вместе с фиксом.
    expect(csp['img-src']).toEqual(
      expect.arrayContaining(["'self'", 'data:', 'blob:', 'https://*.supabase.co']),
    );
  });

  it('фикс узкий: script-src/object-src/base-uri не ослаблены', () => {
    // blob: добавляется ТОЛЬКО в img-src. Намерение security-аудита cont #3
    // (блок внешних/скриптовых/SVG-as-script источников) сохранено.
    expect(csp['script-src']).toEqual(["'self'"]);
    expect(csp['object-src']).toEqual(["'none'"]);
    expect(csp['base-uri']).toEqual(["'self'"]);
  });
});
