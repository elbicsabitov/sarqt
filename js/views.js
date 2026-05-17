// js/views.js — synchronous HTML-string renderers for each route.
// Data views return a shell with an empty feed container; app.js hydrates it.
import { escape, ICONS, SIGIL_SVG } from './ui.js';
import { state } from './state.js';
import { REGIONS, EXPIRY_BUCKETS, EVENT_TYPES } from './config.js';
import { t } from './i18n.js';

export function renderRegionOptions(selected) {
  return REGIONS.map((r) => {
    const label = r === 'Другой город' ? t('offer.region.other') : r;
    return `<option value="${escape(r)}" ${selected === r ? 'selected' : ''}>${escape(label)}</option>`;
  }).join('');
}

export function viewAbout() {
  return `
    <section class="page">
      <div class="container">
        <div class="page__head">
          <span class="eyebrow">${t('about.head.eyebrow')}</span>
          <h1 class="h1">${t('about.head.title')}</h1>
          <p class="lead">${t('about.head.lead')}</p>
        </div>

        <div class="grid grid--2 mb-12">
          <div class="prose">
            <h2>${t('about.why.title')}</h2>
            <p>${t('about.why.p1')}</p>
            <p><strong>${t('about.why.p2.lead')}</strong> ${t('about.why.p2.body')}</p>

            <h2>${t('about.how.title')}</h2>
            <ul>
              <li>${t('about.how.sources')}</li>
              <li>${t('about.how.demand')}</li>
              <li>${t('about.how.contact')}</li>
              <li>${t('about.how.ledger')}</li>
              <li>${t('about.how.safety')}</li>
            </ul>

            <h2>${t('about.who.title')}</h2>
            <p>${t('about.who.body')}</p>

            <h2>${t('about.status.title')}</h2>
            <p>${t('about.status.body')}</p>
          </div>

          <div>
            <div class="card card--feature">
              <h3 class="h4 mb-4">${t('about.where.title')}</h3>
              <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px">
                <li style="display:flex;gap:12px"><span style="color:var(--color-yellow);font-weight:700;font-size:1.125rem">🥇</span><span style="font-size:.9375rem">${t('about.where.now')}</span></li>
                <li style="display:flex;gap:12px"><span style="color:var(--color-yellow);font-weight:700;font-size:1.125rem">📅</span><span style="font-size:.9375rem">${t('about.where.launch')}</span></li>
                <li style="display:flex;gap:12px"><span style="color:var(--color-yellow);font-weight:700;font-size:1.125rem">🇰🇿</span><span style="font-size:.9375rem">${t('about.where.next')}</span></li>
                <li style="display:flex;gap:12px"><span style="color:var(--color-yellow);font-weight:700;font-size:1.125rem">💰</span><span style="font-size:.9375rem">${t('about.where.budget')}</span></li>
                <li style="display:flex;gap:12px"><span style="color:var(--color-yellow);font-weight:700;font-size:1.125rem">🚫</span><span style="font-size:.9375rem">${t('about.where.never')}</span></li>
              </ul>
            </div>
            <div class="card mt-4">
              <h3 class="h4 mb-4">${t('about.contact.title')}</h3>
              <p class="text-muted mb-2" style="font-size:.9375rem">
                ${t('about.contact.channel')}: <a href="https://t.me/sarqt" target="_blank" rel="noopener" class="text-link">@sarqt</a><br>
                ${t('about.contact.bot')}: <a href="https://t.me/sarqt_bot" target="_blank" rel="noopener" class="text-link">@sarqt_bot</a> <span class="text-subtle">${t('about.contact.dev')}</span><br>
                Email: <a href="mailto:hello@sarqt.kz" class="text-link">hello@sarqt.kz</a><br>
                GitHub: <a href="https://github.com/elbicsabitov/sarqt" target="_blank" rel="noopener" class="text-link">elbicsabitov/sarqt</a>
              </p>
              <p class="text-subtle" style="font-size:.8125rem">${t('about.contact.nodirect')}</p>
            </div>
          </div>
        </div>

        <div class="anchor">
          <div class="anchor__sigil anchor__sigil--left">${SIGIL_SVG}</div>
          <div class="anchor__sigil anchor__sigil--right">${SIGIL_SVG}</div>
          <div class="anchor__content">
            <div class="anchor__eyebrow">${t('about.anchor.eyebrow')}</div>
            <h2 class="anchor__title">${t('about.anchor.quote')}</h2>
            <p class="anchor__lead">${t('about.anchor.lead')}</p>
            <div style="margin-top:24px">
              <a href="https://github.com/elbicsabitov/sarqt" class="btn btn--primary btn--lg" target="_blank" rel="noopener">${t('about.anchor.cta')} ${ICONS.arrow}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function viewHome() {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero__grid">
          <div class="fade-up">
            <div class="hero__eyebrow"><span class="dot"></span> ${t('home.hero.eyebrow')}</div>
            <h1 class="h1 hero__title text-balance">${t('home.hero.title')}</h1>
            <p class="hero__lead">${t('home.hero.lead')}</p>
            <div class="hero__cta">
              <a href="#/share" class="btn btn--primary btn--lg">${t('home.hero.cta.share')}</a>
              <a href="#/find" class="btn btn--ghost btn--lg">${t('home.hero.cta.find')}</a>
            </div>
            <div class="hero__stats">
              <div><div class="hero__stat-num"><span id="hero-stat-handoffs">—</span></div><div class="hero__stat-label">${t('home.hero.stat.handoffs.label')}</div></div>
              <div><div class="hero__stat-num"><em>${t('home.hero.stat.free.num')}</em></div><div class="hero__stat-label">${t('home.hero.stat.free.label')}</div></div>
            </div>
          </div>
          <div class="hero__visual fade-up">
            <div class="hero__circle"></div>
            <div class="hero__sigil-big">${SIGIL_SVG}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="impact">
      <div class="container">
        <div class="impact__grid">
          <div class="impact__item"><div class="impact__num"><em id="impact-handoffs">—</em></div><div class="impact__label">${t('home.impact.handoffs.label')}</div><div class="impact__sub">${t('home.impact.handoffs.sub')}</div></div>
          <div class="impact__item"><div class="impact__num"><em>${t('home.impact.free.num')}</em></div><div class="impact__label">${t('home.impact.free.label')}</div><div class="impact__sub">${t('home.impact.free.sub')}</div></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section__head">
          <span class="eyebrow">${t('home.sources.eyebrow')}</span>
          <h2 class="h2">${t('home.sources.title')}</h2>
          <p>${t('home.sources.lead')}</p>
        </div>
        <div class="grid grid--3">
          <div class="supply-card fade-up">
            <div class="supply-card__icon">${t('home.sources.s1.icon')}</div>
            <h3 class="supply-card__title">${t('home.sources.s1.title')}</h3>
            <p class="supply-card__body">${t('home.sources.s1.body')}</p>
            <div class="supply-card__example">${t('home.sources.s1.example')}</div>
          </div>
          <div class="supply-card fade-up">
            <div class="supply-card__icon">${t('home.sources.s2.icon')}</div>
            <h3 class="supply-card__title">${t('home.sources.s2.title')}</h3>
            <p class="supply-card__body">${t('home.sources.s2.body')}</p>
            <div class="supply-card__example">${t('home.sources.s2.example')}</div>
          </div>
          <div class="supply-card fade-up">
            <div class="supply-card__icon">${t('home.sources.s3.icon')}</div>
            <h3 class="supply-card__title">${t('home.sources.s3.title')}</h3>
            <p class="supply-card__body">${t('home.sources.s3.body')}</p>
            <div class="supply-card__example">${t('home.sources.s3.example')}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section__head">
          <span class="eyebrow">${t('home.steps.eyebrow')}</span>
          <h2 class="h2">${t('home.steps.title')}</h2>
        </div>
        <div class="steps">
          <div class="step fade-up">
            <div class="step__num">1</div>
            <h3 class="step__title">${t('home.steps.s1.title')}</h3>
            <p class="step__body">${t('home.steps.s1.body')}</p>
          </div>
          <div class="step fade-up">
            <div class="step__num">2</div>
            <h3 class="step__title">${t('home.steps.s2.title')}</h3>
            <p class="step__body">${t('home.steps.s2.body')}</p>
          </div>
          <div class="step fade-up">
            <div class="step__num">3</div>
            <h3 class="step__title">${t('home.steps.s3.title')}</h3>
            <p class="step__body">${t('home.steps.s3.body')}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section__head">
          <span class="eyebrow">${t('home.feed.eyebrow')}</span>
          <h2 class="h2">${t('home.feed.title')}</h2>
        </div>
        <div class="grid grid--3" id="home-feed"><div class="feed-loading">${t('home.feed.loading')}</div></div>
        <div class="text-center mt-8">
          <a href="#/find" class="btn btn--ghost">${t('home.feed.link')}</a>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="anchor">
          <div class="anchor__sigil anchor__sigil--left">${SIGIL_SVG}</div>
          <div class="anchor__sigil anchor__sigil--right">${SIGIL_SVG}</div>
          <div class="anchor__content">
            <div class="anchor__eyebrow">${t('home.anchor.eyebrow')}</div>
            <h2 class="anchor__title">${t('home.anchor.quote')}</h2>
            <p class="anchor__lead">${t('home.anchor.lead')}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-strip">
      <div class="container">
        <h2 class="h2">${t('home.cta.title')}</h2>
        <p>${t('home.cta.lead')}</p>
        <div class="cta-strip__buttons">
          <a href="https://t.me/sarqt" class="btn btn--dark btn--lg" target="_blank" rel="noopener">${t('home.cta.channel')} ${ICONS.arrow}</a>
          <a href="#/share" class="btn btn--ghost btn--lg">${t('home.cta.share')}</a>
        </div>
      </div>
    </section>
  `;
}

/**
 * Render one offer card. opts.owned=true adds the owner controls panel.
 * offer = a row from the `offers` table.
 */
export function renderOfferCard(offer, opts = {}) {
  const win = (offer.pickup_from && offer.pickup_to)
    ? `${escape(offer.pickup_from)}–${escape(offer.pickup_to)}` : '';
  const owner = opts.owned ? `
    <div class="offer-card__owner" data-owner-id="${escape(offer.id)}">
      <button class="btn btn--sm btn--ghost" data-offer-action="taken" data-offer-id="${escape(offer.id)}">${t('offer.taken')}</button>
      <button class="btn btn--sm btn--ghost" data-offer-action="remove" data-offer-id="${escape(offer.id)}">${t('offer.remove')}</button>
    </div>` : '';
  return `
    <article class="offer-card fade-up">
      <div class="offer-card__media offer-card__media--photo">
        <img src="${escape(offer.photo_url)}" alt="${escape(offer.what)}" loading="lazy">
      </div>
      <div class="offer-card__body">
        <div class="offer-card__name">${escape(offer.what)}</div>
        <div class="offer-card__address">${escape(offer.name)} · ${escape(offer.region)}</div>
        <div class="offer-card__meta">
          ${win ? `<span class="offer-card__meta-item"><span class="offer-card__meta-icon">${ICONS.clock}</span> ${win}</span>` : ''}
        </div>
        ${owner}
      </div>
      <button class="offer-card__action" type="button" data-offer-call="${escape(offer.id)}" aria-label="${t('offer.callAria', { name: escape(offer.name) })}">${ICONS.phone}</button>
    </article>`;
}

/** The /share publish form — one form, mode-aware. */
export function renderShareForm() {
  const s = state.share;
  const eventBlock = s.mode === 'event' ? `
    <div class="form-group">
      <label class="label">${t('form.eventType.label')}</label>
      <div class="radio-grid">
        ${EVENT_TYPES.map((et) => `
          <label class="radio-card ${s.event_type === et.value ? 'is-selected' : ''}" data-event-type="${escape(et.value)}">
            <input type="radio" name="event_type" value="${escape(et.value)}" ${s.event_type === et.value ? 'checked' : ''}>
            <span class="radio-card__title">${escape(t(et.labelKey))}</span>
          </label>`).join('')}
      </div>
    </div>` : '';
  const nameLabel = s.mode === 'restaurant' ? t('form.name.restaurant')
    : s.mode === 'event' ? t('form.name.event') : t('form.name.home');
  return `
    ${eventBlock}
    <div class="form-group">
      <label class="label">${nameLabel}</label>
      <input type="text" class="input" id="s-name" placeholder="${t('form.name.placeholder')}" value="${escape(s.name)}">
    </div>
    <div class="form-group">
      <label class="label">${t('form.region.label')}</label>
      <select class="select" id="s-region">
        <option value="">${t('form.region.placeholder')}</option>
        ${renderRegionOptions(s.region)}
      </select>
    </div>
    <div class="form-group">
      <label class="label">${t('form.what.label')}</label>
      <textarea class="textarea" id="s-what" placeholder="${t('form.what.placeholder')}">${escape(s.what)}</textarea>
    </div>
    <div class="form-group">
      <label class="label">${t('form.photo.label')}</label>
      <input type="file" class="input" id="s-photo" accept="image/*" capture="environment">
      <span class="input-hint" id="s-photo-name">${s.photoFile ? escape(s.photoFile.name) : t('form.photo.hint')}</span>
    </div>
    <div class="form-group">
      <label class="label">${t('form.expiry.label')}</label>
      <div class="flex gap-2" style="flex-wrap:wrap">
        ${EXPIRY_BUCKETS.map((b) => `
          <button type="button" class="btn btn--sm ${s.expiry === b.key ? 'btn--primary' : 'btn--ghost'}" data-expiry="${b.key}" aria-pressed="${s.expiry === b.key}">${escape(t(b.labelKey))}</button>`).join('')}
      </div>
    </div>
    <div class="grid grid--2" style="margin-bottom:20px;gap:12px">
      <div><label class="label">${t('form.pickup.from')}</label>
        <input type="time" class="input" id="s-pickup-from" value="${escape(s.pickup_from)}"></div>
      <div><label class="label">${t('form.pickup.to')}</label>
        <input type="time" class="input" id="s-pickup-to" value="${escape(s.pickup_to)}"></div>
    </div>
    <div class="form-group">
      <label class="label">${t('form.phone.label')}</label>
      <input type="tel" class="input" id="s-contact-phone" placeholder="${t('form.phone.placeholder')}" value="${escape(s.contact_phone)}">
    </div>
    <div class="form-group">
      <label class="label">${t('form.tg.label')}</label>
      <input type="text" class="input" id="s-contact-tg" placeholder="${t('form.tg.placeholder')}" value="${escape(s.contact_tg)}">
    </div>
    <div class="form-error" id="s-error" hidden></div>
    <button class="btn btn--primary btn--block btn--lg" id="s-submit">${t('form.submit')}</button>`;
}

export function viewShare() {
  const mode = state.share.mode;
  return `
    <section class="page">
      <div class="container">
        <div class="page__head">
          <span class="eyebrow">${t('share.head.eyebrow')}</span>
          <h1 class="h1">${t('share.head.title')}</h1>
          <p class="lead">${t('share.head.lead')}</p>
        </div>
        <div class="card card--feature" style="max-width:760px;margin:0 auto">
          <div class="mode-tabs" role="tablist">
            <button class="mode-tab ${mode === 'restaurant' ? 'is-active' : ''}" data-mode="restaurant" role="tab" aria-selected="${mode === 'restaurant'}">
              <span class="mode-tab__icon">🍽️</span><span>${t('share.modeTab.restaurant')}</span>
              <span class="mode-tab__sub">${t('share.modeTab.restaurant.sub')}</span>
            </button>
            <button class="mode-tab ${mode === 'event' ? 'is-active' : ''}" data-mode="event" role="tab" aria-selected="${mode === 'event'}">
              <span class="mode-tab__icon">🎉</span><span>${t('share.modeTab.event')}</span>
              <span class="mode-tab__sub">${t('share.modeTab.event.sub')}</span>
            </button>
            <button class="mode-tab ${mode === 'home' ? 'is-active' : ''}" data-mode="home" role="tab" aria-selected="${mode === 'home'}">
              <span class="mode-tab__icon">🏠</span><span>${t('share.modeTab.home')}</span>
              <span class="mode-tab__sub">${t('share.modeTab.home.sub')}</span>
            </button>
          </div>
          ${renderShareForm()}
        </div>
        <div class="text-center mt-12" style="font-size:.875rem;color:var(--color-text-muted);max-width:720px;margin:0 auto">
          ${t('share.safety')}
        </div>
      </div>
    </section>`;
}

export function viewFind() {
  const filter = state.filterFind;
  const chipKeys = { all: 'find.filter.all', restaurant: 'find.filter.restaurant', event: 'find.filter.event', home: 'find.filter.home' };
  const chips = ['all', 'restaurant', 'event', 'home'].map((f) => `
    <button class="btn ${filter === f ? 'btn--primary' : 'btn--ghost'} btn--sm" data-find-filter="${f}" aria-pressed="${filter === f}">
      ${t(chipKeys[f])}
    </button>`).join('');
  return `
    <section class="page">
      <div class="container">
        <div class="page__head">
          <span class="eyebrow">${t('find.head.eyebrow')}</span>
          <h1 class="h1">${t('find.head.title')}</h1>
          <p class="lead">${t('find.head.lead')}</p>
        </div>
        <div class="flex gap-2 mb-8" style="flex-wrap:wrap">${chips}</div>
        <div id="find-feed"><div class="feed-loading">${t('find.loading')}</div></div>
      </div>
    </section>`;
}

export function viewLedger() {
  return `
    <section class="page">
      <div class="container">
        <div class="page__head">
          <span class="eyebrow">${t('ledger.head.eyebrow')}</span>
          <h1 class="h1">${t('ledger.head.title')}</h1>
          <p class="lead">${t('ledger.head.lead')}</p>
        </div>
        <div id="ledger-feed"><div class="feed-loading">${t('ledger.loading')}</div></div>
      </div>
    </section>`;
}
