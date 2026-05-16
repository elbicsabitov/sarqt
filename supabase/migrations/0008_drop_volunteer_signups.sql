-- 0008_drop_volunteer_signups.sql — удаление волонтёрского флоу.
-- Волонтёры убраны из scope: сервис работает напрямую между людьми.
-- cascade снимает RLS-политику volunteer_insert_any (0002) и любые
-- ограничения, добавленные в 0007.
--
-- ПРИМЕНЕНИЕ: выполнить в SQL editor Supabase `sarqt-eu` в Плане 3,
-- ПОСЛЕ деплоя фронта без волонтёрского флоу. Раньше нельзя — задеплоенный
-- старый main ещё отдаёт страницу /volunteer, пишущую в эту таблицу.
drop table if exists public.volunteer_signups cascade;
