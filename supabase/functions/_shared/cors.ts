// CORS — единственный разрешённый origin: прод-сайт.
export const ALLOWED_ORIGIN = 'https://sarqt.kz';
export const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
