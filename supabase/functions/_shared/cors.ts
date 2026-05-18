// CORS — единственный разрешённый origin: прод-сайт.
export const ALLOWED_ORIGIN = 'https://sarqt.kz';
export const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  // supabase-js functions.invoke sends apikey + x-client-info on top of
  // authorization/content-type — all four must be allowed or the CORS
  // preflight rejects the call (TD-067; breaks verify.js at Фаза-L).
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
