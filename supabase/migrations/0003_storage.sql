-- 0003_storage.sql — sarqt v1 storage: bucket 'offer-photos' + policies

-- публичный бакет для фото офферов (idempotent)
insert into storage.buckets (id, name, public)
values ('offer-photos', 'offer-photos', true)
on conflict (id) do nothing;

-- бакет public → чтение объектов публичное.
-- запись/изменение/удаление — только в свою папку {auth.uid()}/...
create policy offer_photos_insert on storage.objects
  for insert to authenticated with check (
    bucket_id = 'offer-photos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

create policy offer_photos_update on storage.objects
  for update to authenticated using (
    bucket_id = 'offer-photos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

create policy offer_photos_delete on storage.objects
  for delete to authenticated using (
    bucket_id = 'offer-photos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );
