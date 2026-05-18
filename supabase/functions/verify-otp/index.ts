// verify-otp — спека §4. Код → последний неиспользованный OTP юзера →
// expiry/attempts/hash → phone_verified=true. Ключ Mobizon не нужен.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { isOtpExpired, attemptsExhausted, verifyOtpHash } from '../_shared/otp.js';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const json = (b: unknown, s = 200) =>
    new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, 'content-type': 'application/json' } });
  try {
    const { code } = await req.json().catch(() => ({ code: '' }));
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

    const { data: row } = await admin.from('phone_otps')
      .select('id, code_hash, expires_at, attempts, consumed_at')
      .eq('user_id', u.user.id).is('consumed_at', null)
      .order('created_at', { ascending: false }).limit(1).single();
    if (!row) return json({ error: 'no_otp' }, 400);
    if (isOtpExpired(row.expires_at)) return json({ error: 'expired' }, 400);
    if (attemptsExhausted(row.attempts)) return json({ error: 'locked' }, 429);

    if (!(await verifyOtpHash(String(code), row.id, row.code_hash))) {
      await admin.from('phone_otps').update({ attempts: row.attempts + 1 }).eq('id', row.id);
      return json({ error: 'bad_code' }, 400);
    }
    await admin.from('phone_otps').update({ consumed_at: new Date().toISOString() }).eq('id', row.id);
    await admin.from('profiles').update({ phone_verified: true }).eq('id', u.user.id);
    return json({ ok: true });
  } catch (e) {
    console.error('[verify-otp] internal', e);
    return json({ error: 'internal' }, 500);
  }
});
