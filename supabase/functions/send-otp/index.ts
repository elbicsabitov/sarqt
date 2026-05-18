// send-otp — спека §4. JWT → телефон → rate-limit → OTP → hash+store →
// Mobizon REST. Ключ ТОЛЬКО из Deno.env. Не логирует ключ/код.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { generateOtp, hashOtp, withinRateLimit } from '../_shared/otp.js';

const OTP_TTL_MS = 10 * 60 * 1000;
const GLOBAL_DAILY_CAP = 500;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const json = (b: unknown, s = 200) =>
    new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, 'content-type': 'application/json' } });
  try {
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    );
    const authClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } },
    );
    const { data: u } = await authClient.auth.getUser();
    if (!u?.user) return json({ error: 'unauthorized' }, 401);
    const userId = u.user.id;

    const { data: prof } = await admin.from('profiles').select('phone').eq('id', userId).single();
    const phone = (prof?.phone ?? '').trim();
    if (!phone) return json({ error: 'no_phone' }, 400);

    const now = Date.now();
    const since10 = new Date(now - 10 * 60 * 1000).toISOString();
    const since24 = new Date(now - 24 * 60 * 60 * 1000).toISOString();
    const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
    const [{ count: last10min }, { count: last24h }, { count: globalToday }] = await Promise.all([
      admin.from('phone_otps').select('id', { count: 'exact', head: true }).eq('user_id', userId).gte('created_at', since10),
      admin.from('phone_otps').select('id', { count: 'exact', head: true }).eq('user_id', userId).gte('created_at', since24),
      admin.from('phone_otps').select('id', { count: 'exact', head: true }).gte('created_at', startOfDay),
    ]);
    if (!withinRateLimit({
      last10min: last10min ?? 0, last24h: last24h ?? 0,
      globalToday: globalToday ?? 0, globalCap: GLOBAL_DAILY_CAP,
    })) return json({ error: 'rate_limited' }, 429);

    const code = generateOtp();
    const { data: row, error: insErr } = await admin.from('phone_otps')
      .insert({ user_id: userId, phone, code_hash: 'pending', expires_at: new Date(now + OTP_TTL_MS).toISOString() })
      .select('id').single();
    if (insErr || !row) return json({ error: 'store_failed' }, 500);
    const { error: hashErr } = await admin.from('phone_otps')
      .update({ code_hash: await hashOtp(code, row.id) }).eq('id', row.id);
    if (hashErr) {
      // Dead OTP: never ship an SMS code we can't verify. Consume the row so
      // it neither verifies nor counts against the user's rate limit on retry.
      await admin.from('phone_otps').update({ consumed_at: new Date().toISOString() }).eq('id', row.id);
      return json({ error: 'store_failed' }, 500);
    }

    // Default-safe: real send ONLY when explicitly opted out (MOBIZON_TEST_MODE=0).
    // Unset / anything-but-'0' → test-mode.
    const testMode = Deno.env.get('MOBIZON_TEST_MODE') !== '0';
    if (testMode) {
      // Test-mode skips the Mobizon dispatch entirely → guaranteed zero delivery,
      // zero charge, no approved alpha-name needed. Everything above (JWT,
      // rate-limit, OTP insert+hash via ../_shared/otp.js) still ran, so this
      // exercises the deploy/bundle path (TD-065). No verifiable code is sent.
      console.log('[send-otp] test-mode: SMS dispatch skipped');
      return json({ ok: true, test: true });
    }
    const mobizonKey = Deno.env.get('MOBIZON_API_KEY');
    if (!mobizonKey) return json({ error: 'sms_unconfigured' }, 503);
    const smsRes = await fetch(
      `https://api.mobizon.kz/service/message/sendsmsmessage?apiKey=${mobizonKey}&output=json`,
      { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ recipient: phone, text: `sarqt: код ${code}` }) },
    );
    const smsJson = await smsRes.json().catch(() => null) as { code?: number; message?: string } | null;
    if (!smsRes.ok || !smsJson || smsJson.code !== 0) {
      // No silent pass (CLAUDE.md §6.4). Consume the dead OTP row so it can't be
      // verified later — consistent with the hashErr cleanup above. Never log the key.
      await admin.from('phone_otps')
        .update({ consumed_at: new Date().toISOString() }).eq('id', row.id);
      console.error('[send-otp] sms-rejected', smsRes.status, smsJson?.code, smsJson?.message);
      return json({ error: 'sms_failed' }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    console.error('[send-otp] internal', e);
    return json({ error: 'internal' }, 500);
  }
});
