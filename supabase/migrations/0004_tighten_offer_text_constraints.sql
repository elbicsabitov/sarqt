-- 0004_tighten_offer_text_constraints.sql — sarqt v1
-- Plan 1 final code review: the `what` length check used raw char_length while
-- validateOffer (js/offers.js) trims before counting — the DB backstop was
-- looser than the client contract. Tighten it to match (defense in depth), and
-- reject blank/whitespace-only `name` (NOT NULL alone still allows '').

alter table public.offers drop constraint offers_what_check;
alter table public.offers add constraint offers_what_check
  check (char_length(trim(what)) >= 5);

alter table public.offers add constraint offers_name_not_blank
  check (char_length(trim(name)) > 0);
