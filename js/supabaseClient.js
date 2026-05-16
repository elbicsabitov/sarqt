// js/supabaseClient.js — единый Supabase-клиент на всё приложение.
import { createClient } from './vendor/supabase.esm.js';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});
