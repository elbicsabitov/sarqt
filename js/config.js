// js/config.js — статическая конфигурация sarqt.
// Секретов нет: publishable key — public-safe by design (защита = RLS).
export const SUPABASE_URL = 'https://xufuatxahshbkfltghhu.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_58jKusSKlPPWkMnswGbi_Q_D7IOCsI4';

// Публичный адрес сайта — для QR-кода наклейки (ведёт на страницу оффера).
export const SITE_ORIGIN = 'https://sarqt.kz';

// 8 районов Алматы + Астана + «другой город»
export const REGIONS = [
  'Бостандык', 'Медеу', 'Алмалы', 'Ауэзов', 'Турксиб', 'Алатау', 'Жетысу',
  'Наурызбай', 'Астана (Yesil)', 'Астана (Алматинский)', 'Другой город',
];

// expiry-чипы для формы публикации (ключ → ключ i18n). Логика срока — offers.js computeExpiresAt.
export const EXPIRY_BUCKETS = [
  { key: 'today', labelKey: 'expiry.today' },
  { key: '24h', labelKey: 'expiry.24h' },
  { key: '72h', labelKey: 'expiry.72h' },
  { key: 'exact', labelKey: 'expiry.exact' },
];

// Типы события для режима «Той» формы публикации.
// value — каноническое значение (пишется в offers.event_type, НЕ менять —
// иначе расходятся существующие строки БД); labelKey — ключ i18n для лейбла.
export const EVENT_TYPES = [
  { value: 'Свадьба', labelKey: 'share.eventType.wedding' },
  { value: 'Той', labelKey: 'share.eventType.toi' },
  { value: 'Поминки', labelKey: 'share.eventType.memorial' },
  { value: 'Кiндiк-той', labelKey: 'share.eventType.kindik' },
  { value: 'Наречение', labelKey: 'share.eventType.naming' },
  { value: 'Другое', labelKey: 'share.eventType.other' },
];
