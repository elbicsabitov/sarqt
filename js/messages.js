// js/messages.js — словарь UI-строк sarqt по языкам.
// ru заполняется в задачах 5-8 этого плана; kk и en — в Плане 2.
export const MESSAGES = {
  ru: {
    // --- meta (translateMeta() обновляет <title> и meta-теги) ---
    'meta.title': 'sarqt — раздай и забери лишнюю еду',
    'meta.description': 'sarqt — делимся лишней едой между соседями в Алматы. Кафе, тои и соседи отдают то, что осталось, тем, кто рядом. Бесплатно, без комиссий, без посредников.',

    // --- beta bar ---
    'beta.notice': '⚠️ Это тестовая версия sarqt — сервис ещё не запущен официально. Идёт подготовка к релизу.',

    // --- nav: brand ---
    'nav.brandHome': 'sarqt — на главную',

    // --- nav: links ---
    'nav.share': 'Поделиться',
    'nav.find': 'Найти рядом',
    'nav.ledger': 'Хроника',
    'nav.about': 'О нас',

    // --- nav: icon buttons ---
    'nav.theme': 'Переключить тему',
    'nav.menuOpen': 'Открыть меню',
    'nav.fab': 'поделиться',

    // --- mobile menu ---
    'menu.close': 'Закрыть меню',
    'menu.home': 'Главная',
    'menu.share': 'Поделиться едой',
    'menu.find': 'Найти рядом',
    'menu.ledger': 'Хроника',
    'menu.about': 'О проекте',

    // --- footer: brand column ---
    'footer.tagline': 'Лишняя еда не идёт в мусор. Кафе, тои и соседи отдают то, что осталось, тем, кто рядом. Бесплатно, без комиссий.',

    // --- footer: column headings ---
    'footer.colAct': 'Действовать',
    'footer.colLearn': 'Узнать',
    'footer.colContact': 'Связь',

    // --- footer: "Действовать" links ---
    'footer.shareFood': 'Поделиться едой',
    'footer.findNearby': 'Найти рядом',
    'footer.ledger': 'Открытая хроника',

    // --- footer: "Узнать" links ---
    'footer.about': 'О проекте',
    'footer.tgChannel': 'Telegram-канал',

    // --- footer: "Связь" links ---
    'footer.github': 'Код на GitHub',

    // --- footer: bottom bar ---
    'footer.copyright': '© 2026 sarqt. Открытый код, лицензия MIT.',
    'footer.oferta': 'Публичная оферта',
    'footer.geo': 'Алматы → Астана → СНГ',

    // --- noscript (ключи для полноты схемы; translateChrome() не запускается
    //     без JS — литерал в HTML служит единственным фолбэком) ---
    'noscript.title': 'sarqt требует JavaScript',
    'noscript.body': 'Для работы платформы sarqt включите JavaScript в браузере.',

    // --- home: hero ---
    'home.hero.eyebrow': 'Делимся едой с соседями · 0% комиссия',
    'home.hero.title': 'Раздай и забери <em>еду</em> бесплатно',
    'home.hero.lead': 'У кафе осталась свежая еда к концу дня. У соседей после тоя — лишний бешбармак. Дома приготовили слишком много плова. Выложи в sarqt — кто-то рядом заберёт. Бесплатно, без посредников.',
    'home.hero.cta.share': '+ Поделиться едой',
    'home.hero.cta.find': 'Найти рядом',
    'home.hero.stat.handoffs.label': 'передач за месяц',
    'home.hero.stat.free.num': '0%',
    'home.hero.stat.free.label': 'комиссия платформы',

    // --- home: impact ---
    'home.impact.handoffs.label': 'передач',
    'home.impact.handoffs.sub': 'через sarqt',
    'home.impact.free.num': '0 ₸',
    'home.impact.free.label': 'комиссия',
    'home.impact.free.sub': 'всегда',

    // --- home: sources section ---
    'home.sources.eyebrow': '3 источника еды',
    'home.sources.title': 'Кто делится едой',
    'home.sources.lead': 'Любой, у кого осталась лишняя. Никаких «правильных» оснований не нужно — есть еда, ты её отдаёшь, сосед забирает.',
    'home.sources.s1.icon': '🍽️',
    'home.sources.s1.title': 'Рестораны и кафе',
    'home.sources.s1.body': 'В конце дня осталась еда, которую завтра нельзя продать? Выложи в sarqt — соседи заберут до закрытия.',
    'home.sources.s1.example': 'Например: непроданный хлеб и выпечка, готовые блюда к концу дня.',
    'home.sources.s2.icon': '🎉',
    'home.sources.s2.title': 'Свадьбы и тои',
    'home.sources.s2.body': 'После тоя в багажнике машины 8 кг бешбармака? Поминки, кiндiк-той, наречение, день рождения — выложи остатки в sarqt.',
    'home.sources.s2.example': 'Например: бешбармак, баурсаки, салаты и сладкое со стола.',
    'home.sources.s3.icon': '🏠',
    'home.sources.s3.title': 'Дом и соседи',
    'home.sources.s3.body': 'Приготовила слишком много плова? Свекровь напекла 50 баурсаков, а съели 10? Расскажи соседу — он зайдёт, заберёт.',
    'home.sources.s3.example': 'Например: лишняя кастрюля плова, домашняя выпечка, фрукты.',

    // --- home: steps section ---
    'home.steps.eyebrow': 'Три шага',
    'home.steps.title': 'Как это работает',
    'home.steps.s1.title': 'Выложи или найди',
    'home.steps.s1.body': 'Есть лишняя еда — зайди в <strong>Поделиться</strong>. Голоден или хочется домашнего — <strong>Найти рядом</strong>.',
    'home.steps.s2.title': 'Свяжись напрямую',
    'home.steps.s2.body': 'sarqt показывает контакт — позвони или напиши в Telegram. Договариваешься, когда забрать. Без посредников.',
    'home.steps.s3.title': 'Забери, скажи спасибо',
    'home.steps.s3.body': 'Пешком (≤1,5 км). Забрал — короткое «спасибо» хозяину. Платформа фиксирует факт передачи в открытой хронике — публично, без имён.',

    // --- home: feed section ---
    'home.feed.eyebrow': 'Доступно сейчас',
    'home.feed.title': 'Что есть рядом',
    'home.feed.loading': 'Загружаем…',
    'home.feed.link': 'Все предложения рядом →',

    // --- home: anchor-quote ---
    'home.anchor.eyebrow': 'Зачем',
    'home.anchor.quote': '«В Алматы каждый день выкидывают свежую еду. Параллельно соседи рядом не знают, что у соседа лишний бешбармак. sarqt просто их соединяет.»',
    'home.anchor.lead': 'Кафе после закрытия. Тои после праздника. Дома после ужина. Еда есть — выкидывать жалко, искать кому отдать — лень. sarqt = одна форма для хозяина, один список для соседей, прямой звонок. Без денег, без посредников, без условий.',

    // --- home: cta-strip ---
    'home.cta.title': 'Подпишись на канал',
    'home.cta.lead': 'Telegram-бот в разработке. Подпишись на канал @sarqt — узнаешь первым, когда сервис по-настоящему заработает в Алматы (~август 2026).',
    'home.cta.channel': 'Канал @sarqt',
    'home.cta.share': '+ Поделиться едой',

    // --- about: head ---
    'about.head.eyebrow': 'О проекте',
    'about.head.title': 'sarqt — обмен едой между соседями',
    'about.head.lead': 'Простой сервис, чтобы лишняя еда не шла в мусор. Кафе, тои и соседи отдают избытки тем, кто рядом. Бесплатно. Без посредников. Без денежного потока через платформу.',

    // --- about: why section ---
    'about.why.title': 'Зачем',
    'about.why.p1': 'В Алматы каждый день десятки тонн свежей еды идут в мусор. Кафе не успели продать к закрытию. После тоя осталось 8 кг бешбармака. Дома наготовили на 10, съели на 5. Соседи рядом про это не знают — и каждая сторона теряет.',
    'about.why.p2.lead': 'sarqt просто их соединяет.',
    'about.why.p2.body': 'Хозяин публикует, что есть и до какого часа. Сосед в радиусе ≤1,5 км видит список, звонит напрямую, забирает. Никаких комиссий, никакого реестра получателей, никакого денежного потока через платформу.',

    // --- about: how section ---
    'about.how.title': 'Как это работает',
    'about.how.sources': '<strong>3 источника еды:</strong> рестораны / кафе / пекарни (остатки конца дня), тои / события (остатки со стола), дом / соседи (приготовлено лишнее).',
    'about.how.demand': '<strong>Кто забирает:</strong> соседи в радиусе ≤1,5 км, которые могут прийти пешком.',
    'about.how.contact': '<strong>Контакт напрямую:</strong> звонок хозяину, договариваешься, когда забрать. sarqt не посредник.',
    'about.how.ledger': '<strong>Открытая хроника:</strong> каждая передача публично видна (имена анонимизированы до района) — прозрачность с первого дня.',
    'about.how.safety': '<strong>Безопасность еды:</strong> нельзя передавать сырое мясо, рыбу, молочку дольше 4 часов вне холодильника. Только: выпечка, готовое горячее (в течение 4 часов), фрукты/овощи, упакованное, баурсак, хлеб.',

    // --- about: who-makes-it section ---
    'about.who.title': 'Кто делает',
    'about.who.body': 'sarqt — некоммерческий проект, сделанный в Алматы. Платформа ничего не зарабатывает и не берёт комиссий: еда передаётся между соседями бесплатно и напрямую. Через сервис не проходит ни одного тенге.',

    // --- about: status section ---
    'about.status.title': 'Статус',
    'about.status.body': 'Сейчас — бета. Сайт — первая публичная версия для сбора отзывов. Живой обмен едой через Telegram-бот (<a href="https://t.me/sarqt_bot" target="_blank" rel="noopener">@sarqt_bot</a>) откроется летом 2026. Запуск в Алматы — август 2026. Код откроется публично (MIT) после выхода v1.',

    // --- about: where card ---
    'about.where.title': '📍 Где работает',
    'about.where.now': '<strong>Сейчас:</strong> Алматы — 3 пилотных района (Бостандык + Медеу + Алмалы)',
    'about.where.launch': '<strong>Запуск:</strong> август 2026',
    'about.where.next': '<strong>Дальше:</strong> Астана → региональные города',
    'about.where.budget': '<strong>Бюджет:</strong> ≤$15/мес — GH Pages бесплатно, домен ~$15/год',
    'about.where.never': '<strong>Никогда:</strong> комиссии, платные тарифы, продажа данных',

    // --- about: contact card ---
    'about.contact.title': '📩 Связь',
    'about.contact.channel': 'Канал',
    'about.contact.bot': 'Бот',
    'about.contact.dev': '(в разработке)',
    'about.contact.nodirect': 'Никаких форм для контакта на сайте — пиши напрямую. sarqt не собирает email-базы.',

    // --- about: anchor (open source) ---
    'about.anchor.eyebrow': 'Открытый код · MIT',
    'about.anchor.quote': '«sarqt — это не приложение. Это простой протокол: у соседа осталась еда, я забираю.»',
    'about.anchor.lead': 'Код откроется публично после выхода v1 (Q3 2026). Форкни, изучи, построй своё — для своего города или своего района.',
    'about.anchor.cta': 'Код на GitHub',

    // --- share: page head ---
    'share.head.eyebrow': 'Поделиться едой',
    'share.head.title': 'Что у тебя есть?',
    'share.head.lead': 'Выбери источник, заполни короткую форму с фото. После публикации соседи увидят твою еду в «Найти рядом» и позвонят напрямую.',

    // --- share: mode tabs ---
    'share.modeTab.ariaLabel': 'Тип источника еды',
    'share.modeTab.restaurant': 'Ресторан / кафе',
    'share.modeTab.restaurant.sub': 'остатки к концу дня',
    'share.modeTab.event': 'Той / событие',
    'share.modeTab.event.sub': 'остатки с тоя',
    'share.modeTab.home': 'Дом',
    'share.modeTab.home.sub': 'приготовлено лишнее',

    // --- share: food-safety notice ---
    'share.safety': '🍽️ <strong>Безопасность еды:</strong> нельзя передавать сырое мясо, рыбу, молочку дольше 4 часов вне холодильника. Только: <strong>выпечка, готовое горячее до 4 часов, фрукты/овощи, упакованное, баурсак, хлеб</strong>. <a href="#/about" class="text-link">Подробнее</a>.',

    // --- form: event type ---
    'form.eventType.label': 'Тип события',

    // --- share: event type options ---
    'share.eventType.wedding': 'Свадьба',
    'share.eventType.toi': 'Той',
    'share.eventType.memorial': 'Поминки',
    'share.eventType.kindik': 'Кiндiк-той',
    'share.eventType.naming': 'Наречение',
    'share.eventType.other': 'Другое',

    // --- form: name labels (mode-aware) ---
    'form.name.restaurant': 'Название заведения',
    'form.name.event': 'Имя / семья (показывается в карточке)',
    'form.name.home': 'Имя или ник',

    // --- form: name field ---
    'form.name.placeholder': 'например: Кафе «Кезен» · Айгерим',

    // --- form: region ---
    'form.region.label': 'Район',
    'form.region.placeholder': 'Выбери район…',

    // --- form: what field ---
    'form.what.label': 'Что есть (минимум 5 символов)',
    'form.what.placeholder': 'например: 8 круассанов + 4 капучино',

    // --- form: photo ---
    'form.photo.label': 'Фото еды',
    'form.photo.hint': 'Фото обязательно — соседи должны видеть, что забирают.',

    // --- form: expiry ---
    'form.expiry.label': 'Годен до',
    'form.expiry.hint': 'Это время попадёт на наклейку-пломбу и уберёт оффер из ленты, когда срок выйдет. Указывайте реальный срок годности еды.',
    'form.expiry.exactLabel': 'Дата и время',
    'expiry.exact': 'Точно',

    // --- form: pickup window ---
    'form.pickup.from': 'Забрать с',
    'form.pickup.to': 'до',

    // --- form: contact ---
    'form.phone.label': 'Телефон для звонка',
    'form.phone.placeholder': '+7 (777) 123 45 67',
    'form.tg.label': 'Telegram (необязательно)',
    'form.tg.placeholder': '@username',

    // --- form: two-tier sections ---
    'form.tier.offer': 'Что отдаёте',
    'form.tier.contact': 'Контакт хозяина',
    'form.contact.edit': 'Изменить',

    // --- share: auth-signpost (guest notice) ---
    'share.guest.notice': 'Чтобы опубликовать оффер, нужен аккаунт.',
    'share.guest.signin': 'Войти',

    // --- share: seal attestation ---
    'share.seal.attest': 'Я запечатаю наклейкой sarqt каждый контейнер с едой и укажу честный срок.',
    'share.seal.whatToggle': 'Что это?',
    'share.seal.what': 'Наклейка-пломба печатается после публикации. Показывает соседу: еда из системы, со сроком, упаковка не вскрыта.',

    // --- call modal ---
    'call.number.label': 'Номер хозяина',
    'call.btn.dial': 'Позвонить',
    'call.btn.copy': 'Скопировать',
    'call.btn.copied': 'Скопировано ✓',

    // --- form: submit ---
    'form.submit': '+ Опубликовать',

    // --- find: page ---
    'find.head.eyebrow': 'Найти рядом',
    'find.head.title': 'Что доступно сейчас',
    'find.head.lead': 'Свежие предложения в Алматы. Тапни на телефон — позвонишь хозяину напрямую. sarqt без посредников.',

    // --- find: filter chips ---
    'find.filter.all': 'Все',
    'find.filter.restaurant': '🍽️ Кафе',
    'find.filter.event': '🎉 Тои',
    'find.filter.home': '🏠 Дом',

    // --- find: feed states ---
    'find.loading': 'Загружаем предложения…',

    // --- ledger: page ---
    'ledger.head.eyebrow': 'Открытая хроника',
    'ledger.head.title': 'Каждая передача — публично',
    'ledger.head.lead': 'sarqt не работает с деньгами. Эта хроника показывает физический поток еды: тип, что именно, район, когда. Имена и контакты не публикуются.',

    // --- ledger: feed states ---
    'ledger.loading': 'Загружаем хронику…',

    // --- ledger: table columns ---
    'ledger.col.when': 'Когда',
    'ledger.col.type': 'Тип',
    'ledger.col.what': 'Что',
    'ledger.col.region': 'Район',

    // --- ledger: mode labels ---
    'ledger.mode.restaurant': '🍽️ Кафе',
    'ledger.mode.event': '🎉 Тои',
    'ledger.mode.home': '🏠 Дом',

    // --- offer: region options ---
    'offer.region.other': 'Другой город',

    // --- offer: card actions ---
    'offer.callAria': 'Позвонить — {name}',
    'offer.taken': '✓ забрали',
    'offer.remove': '🗑 убрать',

    // --- offer: per-offer page + seal sticker ---
    'offer.goodUntil': 'Годен до',
    'offer.call': 'Позвонить хозяину',
    'offer.trust': 'Это реальный оффер sarqt',
    'offer.more': 'Ещё офферы рядом',
    'offer.gone': 'Оффер недоступен — возможно, еду уже забрали или срок вышел.',
    'offer.retry': 'Повторить',
    'offer.published.banner': 'Оффер опубликован 🎉 Теперь запечатайте еду.',
    'sticker.cardBtn': '🏷 Наклейка',
    'sticker.block.title': 'Наклейка-пломба',
    'sticker.print': '🖨 Печать',
    'sticker.showOnPhone': '📱 Показать на телефоне',
    'sticker.fullscreen.close': 'Закрыть',
    'sticker.seal': 'ЗАПЕЧАТАНО',
    'sticker.goodUntil': 'Годен до',
    'sticker.footer': 'Наведите камеру на QR — проверьте оффер на sarqt.kz',
    'sticker.howto.title': 'Как клеить и зачем',
    'sticker.howto.why': 'Наклейка — пломба доверия: сосед видит, что еда из sarqt, со сроком, упаковка не вскрыта. Без неё крупные заведения не отдают еду — пломба защищает их репутацию и здоровье получателя.',
    'sticker.howto.step1': 'Запечатайте наклейкой каждый контейнер или коробку — заклейте место открытия (стык крышки, шов пакета).',
    'sticker.howto.step2': 'Нужно несколько наклеек — укажите число копий в окне печати.',
    'sticker.howto.step3': 'Следите, чтобы срок «Годен до» был честным для того, что внутри.',
    'sticker.howto.step4': 'Нет принтера? Нажмите «Показать на телефоне» и покажите наклейку получателю — он наведёт камеру на QR.',

    // --- expiry: chip labels ---
    'expiry.today': 'до конца дня',
    'expiry.24h': '24 часа',
    'expiry.72h': '3 дня',

    // --- auth: modal ---
    'auth.closeAria': 'Закрыть',
    'auth.loginTitle': 'Вход',
    'auth.registerTitle': 'Регистрация',
    'auth.loginBody': 'Войди, чтобы опубликовать еду.',
    'auth.registerBody': 'Аккаунт нужен только чтобы публиковать еду — за неё отвечает хозяин. Смотреть и звонить можно без входа.',
    'auth.email': 'Почта',
    'auth.password': 'Пароль',
    'auth.showPassword': 'Показать пароль',
    'auth.hidePassword': 'Скрыть пароль',
    'auth.name': 'Имя',
    'auth.phone': 'Телефон',
    'auth.region': 'Район',
    'auth.regionPlaceholder': 'Выбери район…',
    'auth.submitLogin': 'Войти',
    'auth.submitRegister': 'Создать аккаунт',
    'auth.hasAccount': 'Уже есть аккаунт?',
    'auth.noAccount': 'Нет аккаунта?',
    'auth.toLogin': 'Войти',
    'auth.toRegister': 'Зарегистрироваться',

    // --- modal: generic close button ---
    'modal.close': 'Закрыть',

    // --- modal: success (offer published) ---
    'modal.published': 'Твоя еда теперь видна соседям в районе <strong>{region}</strong>. Они позвонят напрямую.',
    'modal.publishedTitle': 'Опубликовано!',
    'modal.publishedPrimary': 'Смотреть ленту',
    'modal.publishedSecondary': 'Опубликовать ещё',

    // --- modal: owner controls / call errors ---
    'modal.failTitle': 'Не получилось',
    'modal.failClose': 'Закрыть',

    // --- err: auth validation ---
    'err.emailPassword': 'Введи почту и пароль',
    'err.noRegion': 'Выбери район',

    // --- err: offer validation (offers.js validateOffer — возвращает ключ) ---
    'err.offer.badMode': 'Неизвестный тип источника',
    'err.offer.noName': 'Укажи название / имя',
    'err.offer.noRegion': 'Выбери район',
    'err.offer.shortWhat': 'Опиши что есть (мин. 5 символов)',
    'err.offer.noPhoto': 'Добавь фото еды',
    'err.offer.noExpiry': 'Выбери срок',
    'err.offer.noPhone': 'Укажи телефон для звонка',
    'err.offer.shortPhone': 'Телефон выглядит неполным',
    'err.offer.noEventType': 'Выбери тип события',
    'err.offer.noSeal': 'Отметьте, что запечатаете еду наклейкой sarqt.',
    'err.offer.noExactDate': 'Укажите дату и время «годен до».',
    'err.offer.pastDate': 'Срок «годен до» уже прошёл.',
    'err.offer.tooFarDate': 'Срок «годен до» — не дальше 7 дней.',

    // --- err: network (общий для auth + db) ---
    'err.network': 'Нет связи с сервером. Проверь интернет',

    // --- err: auth (auth.js authMessage — возвращает ключ) ---
    'err.auth.badCredentials': 'Неверная почта или пароль',
    'err.auth.emailTaken': 'Эта почта уже зарегистрирована',
    'err.auth.weakPassword': 'Пароль слишком короткий — минимум 6 символов',
    'err.auth.asciiPassword': 'Пароль — только латиница (английская раскладка), цифры и символы',
    'err.auth.badEmail': 'Проверь формат почты',
    'err.auth.notConfirmed': 'Почта ещё не подтверждена',
    'err.auth.generic': 'Не удалось выполнить запрос. Попробуй ещё раз',

    // --- err: db (db.js dbMessage — возвращает ключ) ---
    'err.db.forbidden': 'Недостаточно прав для этого действия',
    'err.db.duplicate': 'Такая запись уже существует',
    'err.db.badData': 'Проверь поля формы — данные не прошли проверку',
    'err.db.generic': 'Ошибка сохранения. Попробуй ещё раз',
    'err.db.contactUnavailable': 'Контакт недоступен — обнови ленту',

    // --- err: offer submit ---
    'err.tooManyOffers': 'У тебя уже 10 активных публикаций — заверши или убери одну.',
    'err.photoFailed': 'Не удалось обработать фото. Выбери другое.',
    'err.photo.unreadable': 'Не удалось открыть это фото — формат не распознан. Попробуй другое или сделай новый снимок.',
    'err.photo.encode': 'Не удалось обработать фото. Попробуй ещё раз или выбери другое.',
    'err.photo.heic': 'Фото в формате HEIC (iPhone) не поддерживается. На iPhone: Настройки → Камера → Форматы → «Наиболее совместимый», либо выбери фото в JPEG.',
    'verify.title': 'Подтвердите телефон',
    'verify.lead': 'Чтобы опубликовать еду, подтвердите номер — придёт SMS с кодом.',
    'verify.send': 'Отправить код',
    'verify.codeLabel': 'Код из SMS',
    'verify.confirm': 'Подтвердить',
    'verify.sent': 'Код отправлен. Введите его ниже.',
    'err.verify.rateLimited': 'Слишком много попыток. Попробуйте позже.',
    'err.verify.badCode': 'Неверный код. Попробуйте ещё раз.',
    'err.verify.expired': 'Код истёк. Запросите новый.',
    'err.verify.generic': 'Не удалось подтвердить телефон. Попробуйте позже.',
    'err.verify.noCode': 'Введите код из SMS.',

    // --- err: submit button states ---
    'err.submitting': 'Публикуем…',
    'err.submitBtn': '+ Опубликовать',

    // --- feed: empty / error ---
    'feed.emptyHome': 'Пока ничего рядом. Будь первым — опубликуй еду.',
    'feed.emptyFind': 'В этой категории пока тихо. Попробуй другой фильтр.',
    'feed.emptyLedger': 'Хроника пока пуста. Первая передача появится здесь автоматически.',

    // --- auth: nav button ---
    'auth.navProfile': 'Профиль',
    'auth.navSignOut': 'Выйти',
    'auth.navSignIn': 'Войти',
  },
  kk: {
    // --- meta (translateMeta() обновляет <title> и meta-теги) ---
    'meta.title': 'sarqt — артық тамақты бер де ал',
    'meta.description': 'sarqt — Алматыдағы көршілер артық тамағымен бөліседі. Кафелер, тойлар мен көршілер артып қалғанын жақын тұрғандарға береді. Тегін, комиссиясыз, делдалсыз.',

    // --- beta bar ---
    'beta.notice': '⚠️ Бұл — sarqt-тың сынақ нұсқасы, сервис ресми түрде әлі іске қосылған жоқ. Шығаруға дайындық жүріп жатыр.',

    // --- nav: brand ---
    'nav.brandHome': 'sarqt — басты бетке',

    // --- nav: links ---
    'nav.share': 'Бөлісу',
    'nav.find': 'Жақыннан табу',
    'nav.ledger': 'Тарих',
    'nav.about': 'Біз туралы',

    // --- nav: icon buttons ---
    'nav.theme': 'Тақырыпты ауыстыру',
    'nav.menuOpen': 'Мәзірді ашу',
    'nav.fab': 'бөлісу',

    // --- mobile menu ---
    'menu.close': 'Мәзірді жабу',
    'menu.home': 'Басты бет',
    'menu.share': 'Тамақпен бөлісу',
    'menu.find': 'Жақыннан табу',
    'menu.ledger': 'Тарих',
    'menu.about': 'Жоба туралы',

    // --- footer: brand column ---
    'footer.tagline': 'Артық тамақ қоқысқа кетпейді. Кафелер, тойлар мен көршілер артып қалғанын жақын тұрғандарға береді. Тегін, комиссиясыз.',

    // --- footer: column headings ---
    'footer.colAct': 'Әрекет ету',
    'footer.colLearn': 'Білу',
    'footer.colContact': 'Байланыс',

    // --- footer: "Действовать" links ---
    'footer.shareFood': 'Тамақпен бөлісу',
    'footer.findNearby': 'Жақыннан табу',
    'footer.ledger': 'Ашық тарих',

    // --- footer: "Узнать" links ---
    'footer.about': 'Жоба туралы',
    'footer.tgChannel': 'Telegram-арна',

    // --- footer: "Связь" links ---
    'footer.github': 'GitHub-тағы код',

    // --- footer: bottom bar ---
    'footer.copyright': '© 2026 sarqt. Ашық код, MIT лицензиясы.',
    'footer.oferta': 'Көпшілік оферта',
    'footer.geo': 'Алматы → Астана → ТМД',

    // --- home: hero ---
    'home.hero.eyebrow': 'Көршілермен тамақпен бөлісеміз · 0% комиссия',
    'home.hero.title': 'Тегін <em>тамақ</em> бер де ал',
    'home.hero.lead': 'Кафеде күн соңында балғын тамақ артып қалды. Көршілерде тойдан кейін — артық бешбармақ. Үйде тым көп палау пісіріп қойды. sarqt-қа жарияла — жақындағы біреу алып кетеді. Тегін, делдалсыз.',
    'home.hero.cta.share': '+ Тамақпен бөлісу',
    'home.hero.cta.find': 'Жақыннан табу',
    'home.hero.stat.handoffs.label': 'айдағы беру саны',
    'home.hero.stat.free.num': '0%',
    'home.hero.stat.free.label': 'платформа комиссиясы',

    // --- home: impact ---
    'home.impact.handoffs.label': 'беру',
    'home.impact.handoffs.sub': 'sarqt арқылы',
    'home.impact.free.num': '0 ₸',
    'home.impact.free.label': 'комиссия',
    'home.impact.free.sub': 'әрқашан',

    // --- home: sources section ---
    'home.sources.eyebrow': 'Тамақтың 3 көзі',
    'home.sources.title': 'Тамақпен кім бөліседі',
    'home.sources.lead': 'Артығы бар кез келген адам. Ешқандай «дұрыс» себеп керек емес — тамақ бар, сен оны бересің, көрші алып кетеді.',
    'home.sources.s1.icon': '🍽️',
    'home.sources.s1.title': 'Мейрамханалар мен кафелер',
    'home.sources.s1.body': 'Күн соңында ертең сатуға болмайтын тамақ артып қалды ма? sarqt-қа жарияла — көршілер жабылғанша алып кетеді.',
    'home.sources.s1.example': 'Мысалы: сатылмаған нан мен нан-тоқаш, күн соңындағы дайын тағамдар.',
    'home.sources.s2.icon': '🎉',
    'home.sources.s2.title': 'Үйлену тойлары мен тойлар',
    'home.sources.s2.body': 'Тойдан кейін көліктің жүк салғышында 8 кг бешбармақ па? Ас, кіндік той, шілдехана, туған күн — артып қалғанын sarqt-қа жарияла.',
    'home.sources.s2.example': 'Мысалы: бешбармақ, бауырсақ, үстелдегі салаттар мен тәтті.',
    'home.sources.s3.icon': '🏠',
    'home.sources.s3.title': 'Үй мен көршілер',
    'home.sources.s3.body': 'Тым көп палау пісіріп қойдың ба? Ене 50 бауырсақ пісірді, 10-ын ғана жеді ме? Көршіге айт — кіріп, алып кетеді.',
    'home.sources.s3.example': 'Мысалы: артық қазан палау, үй нан-тоқашы, жеміс.',

    // --- home: steps section ---
    'home.steps.eyebrow': 'Үш қадам',
    'home.steps.title': 'Бұл қалай жұмыс істейді',
    'home.steps.s1.title': 'Жарияла немесе тап',
    'home.steps.s1.body': 'Артық тамағың бар болса — <strong>Бөлісу</strong>-ге кір. Қарның ашты немесе үй тамағын қаладың ба — <strong>Жақыннан табу</strong>.',
    'home.steps.s2.title': 'Тікелей байланыс',
    'home.steps.s2.body': 'sarqt байланысты көрсетеді — қоңырау шал немесе Telegram-ға жаз. Қашан алып кетуді келісесің. Делдалсыз.',
    'home.steps.s3.title': 'Алып кет, рақмет айт',
    'home.steps.s3.body': 'Жаяу (≤1,5 км). Алып кеттің — иесіне қысқа «рақмет». Платформа берудің фактісін ашық тарихта тіркейді — есімсіз, көпшілікке ашық.',

    // --- home: feed section ---
    'home.feed.eyebrow': 'Қазір қолжетімді',
    'home.feed.title': 'Жақын маңда не бар',
    'home.feed.loading': 'Жүктеп жатырмыз…',
    'home.feed.link': 'Жақындағы барлық ұсыныс →',

    // --- home: anchor-quote ---
    'home.anchor.eyebrow': 'Не үшін',
    'home.anchor.quote': '«Алматыда күн сайын балғын тамақ лақтырылады. Сонымен қатар жақын тұрған көршілер іргедегі көршіде артық бешбармақ барын білмейді. sarqt оларды жай ғана қосады.»',
    'home.anchor.lead': 'Жабылғаннан кейінгі кафелер. Мерекеден кейінгі тойлар. Кешкі астан кейінгі үйлер. Тамақ бар — лақтыруға қимайсың, кімге беруді іздеуге ерінесің. sarqt = иесіне бір форма, көршілерге бір тізім, тікелей қоңырау. Ақшасыз, делдалсыз, шартсыз.',

    // --- home: cta-strip ---
    'home.cta.title': 'Арнаға жазыл',
    'home.cta.lead': 'Telegram-бот әзірленіп жатыр. @sarqt арнасына жазыл — сервис Алматыда шын мәнінде іске қосылғанда (~2026 тамыз) бірінші болып білесің.',
    'home.cta.channel': '@sarqt арнасы',
    'home.cta.share': '+ Тамақпен бөлісу',

    // --- about: head ---
    'about.head.eyebrow': 'Жоба туралы',
    'about.head.title': 'sarqt — көршілер арасында тамақ алмасу',
    'about.head.lead': 'Артық тамақ қоқысқа кетпеуі үшін жасалған қарапайым сервис. Кафелер, тойлар мен көршілер артығын жақын тұрғандарға береді. Тегін. Делдалсыз. Платформа арқылы ақша айналымысыз.',

    // --- about: why section ---
    'about.why.title': 'Не үшін',
    'about.why.p1': 'Алматыда күн сайын ондаған тонна балғын тамақ қоқысқа кетеді. Кафелер жабылғанша сатып үлгермеді. Тойдан кейін 8 кг бешбармақ артып қалды. Үйде 10 адамға пісірді, 5-еуі жеді. Жақын тұрған көршілер мұны білмейді — әр жақ ұтылады.',
    'about.why.p2.lead': 'sarqt оларды жай ғана қосады.',
    'about.why.p2.body': 'Иесі нелігі бар екенін және қай сағатқа дейін екенін жариялайды. ≤1,5 км аумақтағы көрші тізімді көреді, тікелей қоңырау шалады, алып кетеді. Ешқандай комиссия жоқ, алушылар тізімі жоқ, платформа арқылы ақша айналымы жоқ.',

    // --- about: how section ---
    'about.how.title': 'Бұл қалай жұмыс істейді',
    'about.how.sources': '<strong>Тамақтың 3 көзі:</strong> мейрамханалар / кафелер / нан зауыттары (күн соңының артығы), тойлар / оқиғалар (үстел артығы), үй / көршілер (артық пісірілген).',
    'about.how.demand': '<strong>Кім алып кетеді:</strong> жаяу келе алатын ≤1,5 км аумақтағы көршілер.',
    'about.how.contact': '<strong>Тікелей байланыс:</strong> иесіне қоңырау шал, қашан алып кетуді келіс. sarqt — делдал емес.',
    'about.how.ledger': '<strong>Ашық тарих:</strong> әр беру көпшілікке көрінеді (есімдер ауданға дейін жасырылған) — бірінші күннен ашықтық.',
    'about.how.safety': '<strong>Тамақ қауіпсіздігі:</strong> шикі ет, балық, тоңазытқыштан тыс 4 сағаттан көп тұрған сүт өнімін беруге болмайды. Тек: нан-тоқаш, дайын ыстық (4 сағат ішінде), жеміс/көкөніс, қапталған, бауырсақ, нан.',

    // --- about: who-makes-it section ---
    'about.who.title': 'Кім жасайды',
    'about.who.body': 'sarqt — Алматыда жасалған коммерциялық емес жоба. Платформа ештеңе таппайды және комиссия алмайды: тамақ көршілер арасында тегін әрі тікелей беріледі. Қызмет арқылы бірде-бір теңге өтпейді.',

    // --- about: status section ---
    'about.status.title': 'Мәртебе',
    'about.status.body': 'Қазір — бета. Сайт — пікір жинауға арналған алғашқы көпшілік нұсқа. Telegram-бот (<a href="https://t.me/sarqt_bot" target="_blank" rel="noopener">@sarqt_bot</a>) арқылы тірі тамақ алмасу 2026 жазда ашылады. Алматыдағы іске қосылу — 2026 тамыз. Код v1 шыққаннан кейін көпшілікке ашылады (MIT).',

    // --- about: where card ---
    'about.where.title': '📍 Қайда жұмыс істейді',
    'about.where.now': '<strong>Қазір:</strong> Алматы — 3 пилоттық аудан (Бостандық + Медеу + Алмалы)',
    'about.where.launch': '<strong>Іске қосылу:</strong> 2026 тамыз',
    'about.where.next': '<strong>Әрі қарай:</strong> Астана → өңірлік қалалар',
    'about.where.budget': '<strong>Бюджет:</strong> ≤$15/ай — GH Pages тегін, домен ~$15/жыл',
    'about.where.never': '<strong>Ешқашан:</strong> комиссия, ақылы тарифтер, дерек сатуы',

    // --- about: contact card ---
    'about.contact.title': '📩 Байланыс',
    'about.contact.channel': 'Арна',
    'about.contact.bot': 'Бот',
    'about.contact.dev': '(әзірленуде)',
    'about.contact.nodirect': 'Сайтта байланысуға арналған форма жоқ — тікелей жаз. sarqt email-база жинамайды.',

    // --- about: anchor (open source) ---
    'about.anchor.eyebrow': 'Ашық код · MIT',
    'about.anchor.quote': '«sarqt — қосымша емес. Бұл — қарапайым хаттама: көршіде тамақ артып қалды, мен алып кетемін.»',
    'about.anchor.lead': 'Код v1 шыққаннан кейін көпшілікке ашылады (2026 Q3). Форкта, зертте, өзіңдікін құр — өз қалаң немесе өз ауданың үшін.',
    'about.anchor.cta': 'GitHub-тағы код',

    // --- share: page head ---
    'share.head.eyebrow': 'Тамақпен бөлісу',
    'share.head.title': 'Сенде не бар?',
    'share.head.lead': 'Көзін таңда, фотосы бар қысқа форманы толтыр. Жариялаған соң көршілер тамағыңды «Жақыннан табу»-да көреді де, тікелей қоңырау шалады.',

    // --- share: mode tabs ---
    'share.modeTab.ariaLabel': 'Тамақ көзінің түрі',
    'share.modeTab.restaurant': 'Мейрамхана / кафе',
    'share.modeTab.restaurant.sub': 'күн соңының артығы',
    'share.modeTab.event': 'Той / оқиға',
    'share.modeTab.event.sub': 'тойдың артығы',
    'share.modeTab.home': 'Үй',
    'share.modeTab.home.sub': 'артық пісірілген',

    // --- share: food-safety notice ---
    'share.safety': '🍽️ <strong>Тамақ қауіпсіздігі:</strong> шикі ет, балық, тоңазытқыштан тыс 4 сағаттан көп тұрған сүт өнімін беруге болмайды. Тек: <strong>нан-тоқаш, 4 сағатқа дейінгі дайын ыстық, жеміс/көкөніс, қапталған, бауырсақ, нан</strong>. <a href="#/about" class="text-link">Толығырақ</a>.',

    // --- form: event type ---
    'form.eventType.label': 'Оқиға түрі',

    // --- share: event type options ---
    'share.eventType.wedding': 'Үйлену тойы',
    'share.eventType.toi': 'Той',
    'share.eventType.memorial': 'Ас',
    'share.eventType.kindik': 'Кіндік той',
    'share.eventType.naming': 'Шілдехана',
    'share.eventType.other': 'Басқа',

    // --- form: name labels (mode-aware) ---
    'form.name.restaurant': 'Мекеме атауы',
    'form.name.event': 'Есім / отбасы (карточкада көрінеді)',
    'form.name.home': 'Есім немесе ник',

    // --- form: name field ---
    'form.name.placeholder': 'мысалы: «Кезен» кафесі · Айгерім',

    // --- form: region ---
    'form.region.label': 'Аудан',
    'form.region.placeholder': 'Ауданды таңда…',

    // --- form: what field ---
    'form.what.label': 'Нелігі бар (кемінде 5 таңба)',
    'form.what.placeholder': 'мысалы: 8 круассан + 4 капучино',

    // --- form: photo ---
    'form.photo.label': 'Тамақ фотосы',
    'form.photo.hint': 'Фото міндетті — көршілер нені алып жатқанын көруі керек.',

    // --- form: expiry ---
    'form.expiry.label': 'Жарамды мерзімі',
    'form.expiry.hint': 'Бұл уақыт пломба-жапсырмаға түседі және мерзімі өткенде ұсынысты таспадан алып тастайды. Тағамның нақты жарамдылық мерзімін көрсетіңіз.',
    'form.expiry.exactLabel': 'Күні мен уақыты',
    'expiry.exact': 'Дәл',

    // --- form: pickup window ---
    'form.pickup.from': 'Қашаннан алу',
    'form.pickup.to': 'дейін',

    // --- form: contact ---
    'form.phone.label': 'Қоңырауға арналған телефон',
    'form.phone.placeholder': '+7 (777) 123 45 67',
    'form.tg.label': 'Telegram (міндетті емес)',
    'form.tg.placeholder': '@username',

    // --- form: two-tier sections ---
    'form.tier.offer': 'Не бересіз',
    'form.tier.contact': 'Иесінің байланысы',
    'form.contact.edit': 'Өзгерту',

    // --- share: auth-signpost (guest notice) ---
    'share.guest.notice': 'Ұсыныс жариялау үшін аккаунт қажет.',
    'share.guest.signin': 'Кіру',

    // --- share: seal attestation ---
    'share.seal.attest': 'Мен әр тағам контейнерін sarqt жапсырмасымен пломбалаймын және адал мерзім көрсетемін.',
    'share.seal.whatToggle': 'Бұл не?',
    'share.seal.what': 'Пломба-жапсырма жарияланғаннан кейін басып шығарылады. Көршіге көрсетеді: тағам жүйеден, мерзімі бар, орамы ашылмаған.',

    // --- call modal ---
    'call.number.label': 'Иесінің нөмірі',
    'call.btn.dial': 'Қоңырау шалу',
    'call.btn.copy': 'Көшіру',
    'call.btn.copied': 'Көшірілді ✓',

    // --- form: submit ---
    'form.submit': '+ Жариялау',

    // --- find: page ---
    'find.head.eyebrow': 'Жақыннан табу',
    'find.head.title': 'Қазір не қолжетімді',
    'find.head.lead': 'Алматыдағы балғын ұсыныстар. Телефонды бас — иесіне тікелей қоңырау шаласың. sarqt делдалсыз.',

    // --- find: filter chips ---
    'find.filter.all': 'Барлығы',
    'find.filter.restaurant': '🍽️ Кафе',
    'find.filter.event': '🎉 Той',
    'find.filter.home': '🏠 Үй',

    // --- find: feed states ---
    'find.loading': 'Ұсыныстарды жүктеп жатырмыз…',

    // --- ledger: page ---
    'ledger.head.eyebrow': 'Ашық тарих',
    'ledger.head.title': 'Әр беру — көпшілікке',
    'ledger.head.lead': 'sarqt ақшамен жұмыс істемейді. Бұл тарих тамақтың нақты ағынын көрсетеді: түрі, нелігі, ауданы, қашан. Есімдер мен байланыстар жарияланбайды.',

    // --- ledger: feed states ---
    'ledger.loading': 'Тарихты жүктеп жатырмыз…',

    // --- ledger: table columns ---
    'ledger.col.when': 'Қашан',
    'ledger.col.type': 'Түрі',
    'ledger.col.what': 'Нелігі',
    'ledger.col.region': 'Аудан',

    // --- ledger: mode labels ---
    'ledger.mode.restaurant': '🍽️ Кафе',
    'ledger.mode.event': '🎉 Той',
    'ledger.mode.home': '🏠 Үй',

    // --- offer: region options ---
    'offer.region.other': 'Басқа қала',

    // --- offer: card actions ---
    'offer.callAria': '{name} — қоңырау шалу',
    'offer.taken': '✓ алып кетті',
    'offer.remove': '🗑 алып тастау',

    // --- offer: per-offer page + seal sticker ---
    'offer.goodUntil': 'Жарамды мерзімі',
    'offer.call': 'Иесіне қоңырау шалу',
    'offer.trust': 'Бұл — нақты sarqt ұсынысы',
    'offer.more': 'Жақын маңдағы басқа ұсыныстар',
    'offer.gone': 'Ұсыныс қолжетімсіз — тағамды алып қойған немесе мерзімі өткен болуы мүмкін.',
    'offer.retry': 'Қайталау',
    'offer.published.banner': 'Ұсыныс жарияланды 🎉 Енді тағамды пломбалаңыз.',
    'sticker.cardBtn': '🏷 Жапсырма',
    'sticker.block.title': 'Пломба-жапсырма',
    'sticker.print': '🖨 Басып шығару',
    'sticker.showOnPhone': '📱 Телефоннан көрсету',
    'sticker.fullscreen.close': 'Жабу',
    'sticker.seal': 'ПЛОМБАЛАНҒАН',
    'sticker.goodUntil': 'Жарамды мерзімі',
    'sticker.footer': 'Камераны QR-ға бағыттаңыз — sarqt.kz-тен ұсынысты тексеріңіз',
    'sticker.howto.title': 'Қалай жапсыру керек және не үшін',
    'sticker.howto.why': 'Жапсырма — сенім пломбасы: көрші тағам sarqt-тен, мерзімі бар, орамы ашылмағанын көреді. Онсыз ірі мекемелер тағам бермейді — пломба олардың беделін де, алушының денсаулығын да қорғайды.',
    'sticker.howto.step1': 'Әр контейнерді немесе қорапты жапсырмамен пломбалаңыз — ашылатын жерін жабыстырыңыз (қақпақ жігі, пакет тігісі).',
    'sticker.howto.step2': 'Бірнеше жапсырма керек болса — басып шығару терезесінде көшірме санын көрсетіңіз.',
    'sticker.howto.step3': '«Жарамды мерзімі» ішіндегі тағамға шынайы болуын қадағалаңыз.',
    'sticker.howto.step4': 'Принтер жоқ па? «Телефоннан көрсету» түймесін басып, жапсырманы алушыға көрсетіңіз — ол камераны QR-ға бағыттайды.',

    // --- expiry: chip labels ---
    'expiry.today': 'күн соңына дейін',
    'expiry.24h': '24 сағат',
    'expiry.72h': '3 күн',

    // --- auth: modal ---
    'auth.closeAria': 'Жабу',
    'auth.loginTitle': 'Кіру',
    'auth.registerTitle': 'Тіркелу',
    'auth.loginBody': 'Тамақ жариялау үшін кір.',
    'auth.registerBody': 'Аккаунт тек тамақ жариялау үшін керек — оған иесі жауапты. Қарау мен қоңырау шалуды кірмей-ақ жасауға болады.',
    'auth.email': 'Пошта',
    'auth.password': 'Құпиясөз',
    'auth.showPassword': 'Құпиясөзді көрсету',
    'auth.hidePassword': 'Құпиясөзді жасыру',
    'auth.name': 'Есім',
    'auth.phone': 'Телефон',
    'auth.region': 'Аудан',
    'auth.regionPlaceholder': 'Ауданды таңда…',
    'auth.submitLogin': 'Кіру',
    'auth.submitRegister': 'Аккаунт жасау',
    'auth.hasAccount': 'Аккаунтың бар ма?',
    'auth.noAccount': 'Аккаунтың жоқ па?',
    'auth.toLogin': 'Кіру',
    'auth.toRegister': 'Тіркелу',

    // --- modal: generic close button ---
    'modal.close': 'Жабу',

    // --- modal: success (offer published) ---
    'modal.published': 'Тамағың енді <strong>{region}</strong> ауданындағы көршілерге көрінеді. Олар тікелей қоңырау шалады.',
    'modal.publishedTitle': 'Жарияланды!',
    'modal.publishedPrimary': 'Лентаны қарау',
    'modal.publishedSecondary': 'Тағы жариялау',

    // --- modal: owner controls / call errors ---
    'modal.failTitle': 'Болмады',
    'modal.failClose': 'Жабу',

    // --- err: auth validation ---
    'err.emailPassword': 'Пошта мен құпиясөзді енгіз',
    'err.noRegion': 'Ауданды таңда',

    // --- err: offer validation (offers.js validateOffer — возвращает ключ) ---
    'err.offer.badMode': 'Тамақ көзінің түрі белгісіз',
    'err.offer.noName': 'Атауын / есімін көрсет',
    'err.offer.noRegion': 'Ауданды таңда',
    'err.offer.shortWhat': 'Нелігі бар екенін сипатта (кемінде 5 таңба)',
    'err.offer.noPhoto': 'Тамақ фотосын қос',
    'err.offer.noExpiry': 'Мерзімін таңда',
    'err.offer.noPhone': 'Қоңырауға арналған телефонды көрсет',
    'err.offer.shortPhone': 'Телефон толық емес сияқты',
    'err.offer.noEventType': 'Оқиға түрін таңда',
    'err.offer.noSeal': 'Тағамды sarqt жапсырмасымен пломбалайтыныңызды белгілеңіз.',
    'err.offer.noExactDate': '«Жарамды» күні мен уақытын көрсетіңіз.',
    'err.offer.pastDate': '«Жарамды» мерзімі өтіп кеткен.',
    'err.offer.tooFarDate': '«Жарамды» мерзімі — 7 күннен аспауы керек.',

    // --- err: network (общий для auth + db) ---
    'err.network': 'Сервермен байланыс жоқ. Интернетті тексер',

    // --- err: auth (auth.js authMessage — возвращает ключ) ---
    'err.auth.badCredentials': 'Пошта немесе құпиясөз қате',
    'err.auth.emailTaken': 'Бұл пошта тіркеліп қойған',
    'err.auth.weakPassword': 'Құпиясөз тым қысқа — кемінде 6 таңба',
    'err.auth.asciiPassword': 'Құпиясөз тек латын әріптері (ағылшын орналасуы), сандар мен таңбалар',
    'err.auth.badEmail': 'Пошта пішімін тексер',
    'err.auth.notConfirmed': 'Пошта әлі расталмаған',
    'err.auth.generic': 'Сұранысты орындау мүмкін болмады. Тағы көр',

    // --- err: db (db.js dbMessage — возвращает ключ) ---
    'err.db.forbidden': 'Бұл әрекетке құқығың жеткіліксіз',
    'err.db.duplicate': 'Мұндай жазба бұрыннан бар',
    'err.db.badData': 'Форма өрістерін тексер — деректер тексеруден өтпеді',
    'err.db.generic': 'Сақтау қатесі. Тағы көр',
    'err.db.contactUnavailable': 'Байланыс қолжетімсіз — лентаны жаңарт',

    // --- err: offer submit ---
    'err.tooManyOffers': 'Сенде қазірдің өзінде 10 белсенді жарияланым бар — біреуін аяқта немесе алып таста.',
    'err.photoFailed': 'Фотоны өңдеу мүмкін болмады. Басқасын таңда.',
    'err.photo.unreadable': 'Бұл фотоны ашу мүмкін болмады — формат танылмады. Басқасын таңда немесе жаңа сурет түсір.',
    'err.photo.encode': 'Фотоны өңдеу мүмкін болмады. Қайта көр немесе басқасын таңда.',
    'err.photo.heic': 'HEIC форматындағы фото (iPhone) қолданылмайды. iPhone-да: Параметрлер → Камера → Форматтар → «Барынша үйлесімді», немесе JPEG фотосын таңда.',
    'verify.title': 'Телефонды растаңыз',
    'verify.lead': 'Тамақ жариялау үшін нөміріңізді растаңыз — SMS-код келеді.',
    'verify.send': 'Код жіберу',
    'verify.codeLabel': 'SMS-код',
    'verify.confirm': 'Растау',
    'verify.sent': 'Код жіберілді. Төменге енгізіңіз.',
    'err.verify.rateLimited': 'Тым көп әрекет. Кейінірек қайталаңыз.',
    'err.verify.badCode': 'Код қате. Қайта көріңіз.',
    'err.verify.expired': 'Кодтың мерзімі бітті. Жаңасын сұраңыз.',
    'err.verify.generic': 'Телефонды растау мүмкін болмады. Кейінірек көріңіз.',
    'err.verify.noCode': 'SMS кодын енгізіңіз.',

    // --- err: submit button states ---
    'err.submitting': 'Жариялап жатырмыз…',
    'err.submitBtn': '+ Жариялау',

    // --- feed: empty / error ---
    'feed.emptyHome': 'Жақын маңда әзірге ештеңе жоқ. Бірінші бол — тамақ жарияла.',
    'feed.emptyFind': 'Бұл санатта әзірге тыныш. Басқа сүзгіні көр.',
    'feed.emptyLedger': 'Тарих әзірге бос. Алғашқы беру осында автоматты түрде пайда болады.',

    // --- auth: nav button ---
    'auth.navProfile': 'Профиль',
    'auth.navSignOut': 'Шығу',
    'auth.navSignIn': 'Кіру',
  },
  en: {
    // --- meta (translateMeta() обновляет <title> и meta-теги) ---
    'meta.title': 'sarqt — give and take spare food',
    'meta.description': 'sarqt — sharing spare food between neighbours in Almaty. Cafés, tois and neighbours give away what is left to people nearby. Free, no fees, no middlemen.',

    // --- beta bar ---
    'beta.notice': '⚠️ This is a test version of sarqt — the service has not launched officially yet. We are getting ready for release.',

    // --- nav: brand ---
    'nav.brandHome': 'sarqt — home',

    // --- nav: links ---
    'nav.share': 'Share',
    'nav.find': 'Find nearby',
    'nav.ledger': 'Log',
    'nav.about': 'About',

    // --- nav: icon buttons ---
    'nav.theme': 'Toggle theme',
    'nav.menuOpen': 'Open menu',
    'nav.fab': 'share',

    // --- mobile menu ---
    'menu.close': 'Close menu',
    'menu.home': 'Home',
    'menu.share': 'Share food',
    'menu.find': 'Find nearby',
    'menu.ledger': 'Log',
    'menu.about': 'About',

    // --- footer: brand column ---
    'footer.tagline': 'Spare food does not go in the bin. Cafés, tois and neighbours give away what is left to people nearby. Free, no fees.',

    // --- footer: column headings ---
    'footer.colAct': 'Act',
    'footer.colLearn': 'Learn',
    'footer.colContact': 'Contact',

    // --- footer: "Действовать" links ---
    'footer.shareFood': 'Share food',
    'footer.findNearby': 'Find nearby',
    'footer.ledger': 'Open log',

    // --- footer: "Узнать" links ---
    'footer.about': 'About',
    'footer.tgChannel': 'Telegram channel',

    // --- footer: "Связь" links ---
    'footer.github': 'Code on GitHub',

    // --- footer: bottom bar ---
    'footer.copyright': '© 2026 sarqt. Open source, MIT licence.',
    'footer.oferta': 'Public offer',
    'footer.geo': 'Almaty → Astana → CIS',

    // --- home: hero ---
    'home.hero.eyebrow': 'Sharing food with neighbours · 0% fee',
    'home.hero.title': 'Give and take <em>food</em> for free',
    'home.hero.lead': 'A café has fresh food left at the end of the day. Neighbours have spare beshbarmak after a toi. Someone at home cooked far too much plov. Post it on sarqt — someone nearby will pick it up. Free, no middlemen.',
    'home.hero.cta.share': '+ Share food',
    'home.hero.cta.find': 'Find nearby',
    'home.hero.stat.handoffs.label': 'handoffs this month',
    'home.hero.stat.free.num': '0%',
    'home.hero.stat.free.label': 'platform fee',

    // --- home: impact ---
    'home.impact.handoffs.label': 'handoffs',
    'home.impact.handoffs.sub': 'through sarqt',
    'home.impact.free.num': '0 ₸',
    'home.impact.free.label': 'fee',
    'home.impact.free.sub': 'always',

    // --- home: sources section ---
    'home.sources.eyebrow': '3 sources of food',
    'home.sources.title': 'Who shares food',
    'home.sources.lead': 'Anyone with food to spare. You do not need any "proper" reason — there is food, you give it away, a neighbour picks it up.',
    'home.sources.s1.icon': '🍽️',
    'home.sources.s1.title': 'Restaurants and cafés',
    'home.sources.s1.body': 'Food left at the end of the day that you cannot sell tomorrow? Post it on sarqt — neighbours will pick it up before closing.',
    'home.sources.s1.example': 'For example: unsold bread and baked goods, ready meals at the end of the day.',
    'home.sources.s2.icon': '🎉',
    'home.sources.s2.title': 'Weddings and tois',
    'home.sources.s2.body': '8 kg of beshbarmak in the car boot after a toi? A memorial, kindik-toi, naming, birthday — post the leftovers on sarqt.',
    'home.sources.s2.example': 'For example: beshbarmak, baursaks, salads and sweets from the table.',
    'home.sources.s3.icon': '🏠',
    'home.sources.s3.title': 'Home and neighbours',
    'home.sources.s3.body': 'Cooked too much plov? Your mother-in-law baked 50 baursaks and only 10 got eaten? Tell a neighbour — they will drop by and pick it up.',
    'home.sources.s3.example': 'For example: a spare pot of plov, home baked goods, fruit.',

    // --- home: steps section ---
    'home.steps.eyebrow': 'Three steps',
    'home.steps.title': 'How it works',
    'home.steps.s1.title': 'Post or find',
    'home.steps.s1.body': 'Got spare food — go to <strong>Share</strong>. Hungry or in the mood for home cooking — <strong>Find nearby</strong>.',
    'home.steps.s2.title': 'Get in touch directly',
    'home.steps.s2.body': 'sarqt shows the contact — call or message on Telegram. You agree when to pick up. No middlemen.',
    'home.steps.s3.title': 'Pick it up, say thanks',
    'home.steps.s3.body': 'On foot (≤1.5 km). Picked it up — a quick "thanks" to the owner. The platform records the handoff in an open log — publicly, without names.',

    // --- home: feed section ---
    'home.feed.eyebrow': 'Available now',
    'home.feed.title': 'What is nearby',
    'home.feed.loading': 'Loading…',
    'home.feed.link': 'All offers nearby →',

    // --- home: anchor-quote ---
    'home.anchor.eyebrow': 'Why',
    'home.anchor.quote': '"In Almaty fresh food gets thrown out every single day. Meanwhile neighbours nearby have no idea the family next door has spare beshbarmak. sarqt simply connects them."',
    'home.anchor.lead': 'Cafés after closing. Tois after the celebration. Homes after dinner. There is food — too good to bin, too much hassle to find someone for it. sarqt = one form for the owner, one list for neighbours, a direct call. No money, no middlemen, no conditions.',

    // --- home: cta-strip ---
    'home.cta.title': 'Follow the channel',
    'home.cta.lead': 'A Telegram bot is in the works. Follow the @sarqt channel — you will be first to know when the service truly goes live in Almaty (~August 2026).',
    'home.cta.channel': '@sarqt channel',
    'home.cta.share': '+ Share food',

    // --- about: head ---
    'about.head.eyebrow': 'About',
    'about.head.title': 'sarqt — sharing food between neighbours',
    'about.head.lead': 'A simple service so that spare food does not go in the bin. Cafés, tois and neighbours give their surplus to people nearby. Free. No middlemen. No money flow through the platform.',

    // --- about: why section ---
    'about.why.title': 'Why',
    'about.why.p1': 'In Almaty dozens of tonnes of fresh food go in the bin every day. Cafés did not sell out before closing. 8 kg of beshbarmak was left after a toi. Someone cooked for 10 at home and 5 ate. Neighbours nearby have no idea — and everyone loses.',
    'about.why.p2.lead': 'sarqt simply connects them.',
    'about.why.p2.body': 'The owner posts what they have and until what time. A neighbour within ≤1.5 km sees the list, calls directly, picks it up. No fees, no register of recipients, no money flow through the platform.',

    // --- about: how section ---
    'about.how.title': 'How it works',
    'about.how.sources': '<strong>3 sources of food:</strong> restaurants / cafés / bakeries (end-of-day leftovers), tois / events (leftovers from the table), home / neighbours (cooked too much).',
    'about.how.demand': '<strong>Who picks it up:</strong> neighbours within ≤1.5 km who can come on foot.',
    'about.how.contact': '<strong>Direct contact:</strong> call the owner and agree when to pick up. sarqt is not a middleman.',
    'about.how.ledger': '<strong>Open log:</strong> every handoff is publicly visible (names anonymised to the district) — transparency from day one.',
    'about.how.safety': '<strong>Food safety:</strong> you may not hand over raw meat, fish, or dairy kept longer than 4 hours out of the fridge. Only: baked goods, hot ready food (within 4 hours), fruit/vegetables, packaged items, baursak, bread.',

    // --- about: who-makes-it section ---
    'about.who.title': 'Who builds it',
    'about.who.body': 'sarqt is a non-commercial project, made in Almaty. The platform earns nothing and takes no fee — food is handed over between neighbours for free and directly. Not a single tenge passes through the service.',

    // --- about: status section ---
    'about.status.title': 'Status',
    'about.status.body': 'Right now — beta. The site is the first public version for collecting feedback. Live food sharing through the Telegram bot (<a href="https://t.me/sarqt_bot" target="_blank" rel="noopener">@sarqt_bot</a>) opens in summer 2026. Launch in Almaty — August 2026. The code goes public (MIT) after v1 ships.',

    // --- about: where card ---
    'about.where.title': '📍 Where it works',
    'about.where.now': '<strong>Now:</strong> Almaty — 3 pilot districts (Bostandyk + Medeu + Almaly)',
    'about.where.launch': '<strong>Launch:</strong> August 2026',
    'about.where.next': '<strong>Next:</strong> Astana → regional cities',
    'about.where.budget': '<strong>Budget:</strong> ≤$15/month — GH Pages free, domain ~$15/year',
    'about.where.never': '<strong>Never:</strong> fees, paid plans, selling data',

    // --- about: contact card ---
    'about.contact.title': '📩 Contact',
    'about.contact.channel': 'Channel',
    'about.contact.bot': 'Bot',
    'about.contact.dev': '(in development)',
    'about.contact.nodirect': 'No contact forms on the site — message us directly. sarqt does not collect email lists.',

    // --- about: anchor (open source) ---
    'about.anchor.eyebrow': 'Open source · MIT',
    'about.anchor.quote': '"sarqt is not an app. It is a simple protocol: a neighbour has food left over, I pick it up."',
    'about.anchor.lead': 'The code goes public after v1 ships (Q3 2026). Fork it, study it, build your own — for your city or your district.',
    'about.anchor.cta': 'Code on GitHub',

    // --- share: page head ---
    'share.head.eyebrow': 'Share food',
    'share.head.title': 'What have you got?',
    'share.head.lead': 'Pick a source, fill in the short form with a photo. Once posted, neighbours will see your food in "Find nearby" and call you directly.',

    // --- share: mode tabs ---
    'share.modeTab.ariaLabel': 'Food source type',
    'share.modeTab.restaurant': 'Restaurant / café',
    'share.modeTab.restaurant.sub': 'end-of-day leftovers',
    'share.modeTab.event': 'Toi / event',
    'share.modeTab.event.sub': 'leftovers from a toi',
    'share.modeTab.home': 'Home',
    'share.modeTab.home.sub': 'cooked too much',

    // --- share: food-safety notice ---
    'share.safety': '🍽️ <strong>Food safety:</strong> you may not hand over raw meat, fish, or dairy kept longer than 4 hours out of the fridge. Only: <strong>baked goods, hot ready food within 4 hours, fruit/vegetables, packaged items, baursak, bread</strong>. <a href="#/about" class="text-link">More</a>.',

    // --- form: event type ---
    'form.eventType.label': 'Type of event',

    // --- share: event type options ---
    'share.eventType.wedding': 'Wedding',
    'share.eventType.toi': 'Toi',
    'share.eventType.memorial': 'Memorial',
    'share.eventType.kindik': 'Kindik-toi',
    'share.eventType.naming': 'Naming',
    'share.eventType.other': 'Other',

    // --- form: name labels (mode-aware) ---
    'form.name.restaurant': 'Name of the venue',
    'form.name.event': 'Name / family (shown on the card)',
    'form.name.home': 'Name or nickname',

    // --- form: name field ---
    'form.name.placeholder': 'for example: Kezen Café · Aigerim',

    // --- form: region ---
    'form.region.label': 'District',
    'form.region.placeholder': 'Pick a district…',

    // --- form: what field ---
    'form.what.label': 'What you have (at least 5 characters)',
    'form.what.placeholder': 'for example: 8 croissants + 4 cappuccinos',

    // --- form: photo ---
    'form.photo.label': 'Photo of the food',
    'form.photo.hint': 'A photo is required — neighbours need to see what they are picking up.',

    // --- form: expiry ---
    'form.expiry.label': 'Good until',
    'form.expiry.hint': 'This time goes on the seal sticker and removes the offer from the feed when it passes. Set the real shelf life of the food.',
    'form.expiry.exactLabel': 'Date and time',
    'expiry.exact': 'Exact',

    // --- form: pickup window ---
    'form.pickup.from': 'Pick up from',
    'form.pickup.to': 'to',

    // --- form: contact ---
    'form.phone.label': 'Phone for calls',
    'form.phone.placeholder': '+7 (777) 123 45 67',
    'form.tg.label': 'Telegram (optional)',
    'form.tg.placeholder': '@username',

    // --- form: two-tier sections ---
    'form.tier.offer': 'What you\'re giving',
    'form.tier.contact': 'Owner\'s contact',
    'form.contact.edit': 'Edit',

    // --- share: auth-signpost (guest notice) ---
    'share.guest.notice': 'You need an account to publish an offer.',
    'share.guest.signin': 'Sign in',

    // --- share: seal attestation ---
    'share.seal.attest': 'I will seal every food container with a sarqt sticker and state an honest date.',
    'share.seal.whatToggle': 'What is this?',
    'share.seal.what': 'The seal sticker is printed after you publish. It shows the neighbour: the food is from the system, dated, packaging unopened.',

    // --- call modal ---
    'call.number.label': 'Owner\'s number',
    'call.btn.dial': 'Call',
    'call.btn.copy': 'Copy',
    'call.btn.copied': 'Copied ✓',

    // --- form: submit ---
    'form.submit': '+ Post',

    // --- find: page ---
    'find.head.eyebrow': 'Find nearby',
    'find.head.title': 'What is available now',
    'find.head.lead': 'Fresh offers in Almaty. Tap the phone — you will call the owner directly. No middlemen.',

    // --- find: filter chips ---
    'find.filter.all': 'All',
    'find.filter.restaurant': '🍽️ Cafés',
    'find.filter.event': '🎉 Tois',
    'find.filter.home': '🏠 Home',

    // --- find: feed states ---
    'find.loading': 'Loading offers…',

    // --- ledger: page ---
    'ledger.head.eyebrow': 'Open log',
    'ledger.head.title': 'Every handoff — public',
    'ledger.head.lead': 'sarqt does not deal with money. This log shows the physical flow of food: type, what exactly, district, when. Names and contacts are not published.',

    // --- ledger: feed states ---
    'ledger.loading': 'Loading the log…',

    // --- ledger: table columns ---
    'ledger.col.when': 'When',
    'ledger.col.type': 'Type',
    'ledger.col.what': 'What',
    'ledger.col.region': 'District',

    // --- ledger: mode labels ---
    'ledger.mode.restaurant': '🍽️ Cafés',
    'ledger.mode.event': '🎉 Tois',
    'ledger.mode.home': '🏠 Home',

    // --- offer: region options ---
    'offer.region.other': 'Another city',

    // --- offer: card actions ---
    'offer.callAria': 'Call — {name}',
    'offer.taken': '✓ picked up',
    'offer.remove': '🗑 remove',

    // --- offer: per-offer page + seal sticker ---
    'offer.goodUntil': 'Good until',
    'offer.call': 'Call the host',
    'offer.trust': 'This is a real sarqt offer',
    'offer.more': 'More offers nearby',
    'offer.gone': 'This offer is unavailable — the food may already be taken or the time has passed.',
    'offer.retry': 'Retry',
    'offer.published.banner': 'Offer published 🎉 Now seal the food.',
    'sticker.cardBtn': '🏷 Sticker',
    'sticker.block.title': 'Seal sticker',
    'sticker.print': '🖨 Print',
    'sticker.showOnPhone': '📱 Show on phone',
    'sticker.fullscreen.close': 'Close',
    'sticker.seal': 'SEALED',
    'sticker.goodUntil': 'Good until',
    'sticker.footer': 'Point your camera at the QR — verify the offer on sarqt.kz',
    'sticker.howto.title': 'How to seal, and why',
    'sticker.howto.why': 'The sticker is a seal of trust: the neighbour sees the food is from sarqt, dated, with packaging unopened. Without it large venues will not give food away — the seal protects their reputation and the recipient’s health.',
    'sticker.howto.step1': 'Seal every container or box with a sticker — cover the opening point (lid seam, bag seal).',
    'sticker.howto.step2': 'Need several stickers — set the number of copies in the print dialog.',
    'sticker.howto.step3': 'Keep the "Good until" time honest for what is inside.',
    'sticker.howto.step4': 'No printer? Tap "Show on phone" and show the sticker to the recipient — they point their camera at the QR.',

    // --- expiry: chip labels ---
    'expiry.today': 'until end of day',
    'expiry.24h': '24 hours',
    'expiry.72h': '3 days',

    // --- auth: modal ---
    'auth.closeAria': 'Close',
    'auth.loginTitle': 'Sign in',
    'auth.registerTitle': 'Sign up',
    'auth.loginBody': 'Sign in to post food.',
    'auth.registerBody': 'An account is only needed to post food — whoever posts it answers for that food. You can browse and call without signing in.',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.showPassword': 'Show password',
    'auth.hidePassword': 'Hide password',
    'auth.name': 'Name',
    'auth.phone': 'Phone',
    'auth.region': 'District',
    'auth.regionPlaceholder': 'Pick a district…',
    'auth.submitLogin': 'Sign in',
    'auth.submitRegister': 'Create account',
    'auth.hasAccount': 'Already have an account?',
    'auth.noAccount': 'No account?',
    'auth.toLogin': 'Sign in',
    'auth.toRegister': 'Sign up',

    // --- modal: generic close button ---
    'modal.close': 'Close',

    // --- modal: success (offer published) ---
    'modal.published': 'Your food is now visible to neighbours in the <strong>{region}</strong> district. They will call you directly.',
    'modal.publishedTitle': 'Posted!',
    'modal.publishedPrimary': 'View the feed',
    'modal.publishedSecondary': 'Post another',

    // --- modal: owner controls / call errors ---
    'modal.failTitle': 'Something went wrong',
    'modal.failClose': 'Close',

    // --- err: auth validation ---
    'err.emailPassword': 'Enter your email and password',
    'err.noRegion': 'Pick a district',

    // --- err: offer validation (offers.js validateOffer — возвращает ключ) ---
    'err.offer.badMode': 'Unknown source type',
    'err.offer.noName': 'Enter the name',
    'err.offer.noRegion': 'Pick a district',
    'err.offer.shortWhat': 'Describe what you have (min. 5 characters)',
    'err.offer.noPhoto': 'Add a photo of the food',
    'err.offer.noExpiry': 'Pick how long it is available',
    'err.offer.noPhone': 'Enter a phone for calls',
    'err.offer.shortPhone': 'The phone number looks incomplete',
    'err.offer.noEventType': 'Pick a type of event',
    'err.offer.noSeal': 'Confirm that you will seal the food with a sarqt sticker.',
    'err.offer.noExactDate': 'Set the good-until date and time.',
    'err.offer.pastDate': 'The good-until time is already in the past.',
    'err.offer.tooFarDate': 'The good-until time must be within 7 days.',

    // --- err: network (общий для auth + db) ---
    'err.network': 'No connection to the server. Check your internet',

    // --- err: auth (auth.js authMessage — возвращает ключ) ---
    'err.auth.badCredentials': 'Wrong email or password',
    'err.auth.emailTaken': 'This email is already registered',
    'err.auth.weakPassword': 'The password is too short — at least 6 characters',
    'err.auth.asciiPassword': 'Password must use Latin letters (English layout), digits and symbols only',
    'err.auth.badEmail': 'Check the email format',
    'err.auth.notConfirmed': 'The email is not confirmed yet',
    'err.auth.generic': 'Could not complete the request. Try again',

    // --- err: db (db.js dbMessage — возвращает ключ) ---
    'err.db.forbidden': 'You do not have permission to do this',
    'err.db.duplicate': 'A record like this already exists',
    'err.db.badData': 'Check the form fields — the data did not pass validation',
    'err.db.generic': 'Save failed. Try again',
    'err.db.contactUnavailable': 'Contact unavailable — refresh the feed',

    // --- err: offer submit ---
    'err.tooManyOffers': 'You already have 10 active posts — finish or remove one.',
    'err.photoFailed': 'Could not process the photo. Pick another one.',
    'err.photo.unreadable': 'Could not open this photo - the format was not recognised. Try another or take a new picture.',
    'err.photo.encode': 'Could not process the photo. Try again or pick another one.',
    'err.photo.heic': 'HEIC photos (iPhone) are not supported. On iPhone: Settings -> Camera -> Formats -> "Most Compatible", or pick a JPEG photo.',
    'verify.title': 'Verify your phone',
    'verify.lead': 'To post food, verify your number — an SMS code will arrive.',
    'verify.send': 'Send code',
    'verify.codeLabel': 'SMS code',
    'verify.confirm': 'Confirm',
    'verify.sent': 'Code sent. Enter it below.',
    'err.verify.rateLimited': 'Too many attempts. Try again later.',
    'err.verify.badCode': 'Wrong code. Try again.',
    'err.verify.expired': 'The code expired. Request a new one.',
    'err.verify.generic': 'Could not verify the phone. Try again later.',
    'err.verify.noCode': 'Enter the SMS code.',

    // --- err: submit button states ---
    'err.submitting': 'Posting…',
    'err.submitBtn': '+ Post',

    // --- feed: empty / error ---
    'feed.emptyHome': 'Nothing nearby yet. Be the first — post some food.',
    'feed.emptyFind': 'Quiet in this category for now. Try another filter.',
    'feed.emptyLedger': 'The log is empty for now. The first handoff will appear here automatically.',

    // --- auth: nav button ---
    'auth.navProfile': 'Profile',
    'auth.navSignOut': 'Sign out',
    'auth.navSignIn': 'Sign in',
  },
};
