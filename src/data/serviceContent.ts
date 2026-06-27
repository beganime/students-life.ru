export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceDetail {
  title: string;
  subtitle: string;
  intro: string;
  countries?: { name: string; note?: string; flag: string }[];
  features: ServiceFeature[];
  process?: { step: string; title: string; desc: string }[];
  cta: string;
}

export type ServiceSlug = 'university' | 'visa' | 'transport' | 'translation' | 'support' | 'work-visa' | 'rvp';

export const serviceContent: Record<string, Record<ServiceSlug, ServiceDetail>> = {
  ru: {
    university: {
      title: 'Поступление в ВУЗ',
      subtitle: 'Полное сопровождение от выбора факультета до зачисления',
      intro:
        'Мы помогаем студентам поступить в ведущие университеты по всему миру. Наши специалисты сопровождают вас на каждом этапе — от выбора факультета до получения приглашения.',
      countries: [
        { name: 'Россия',     note: 'бюджет и контракт', flag: 'ru' },
        { name: 'Кипр',       flag: 'cy' },
        { name: 'Китай',      flag: 'cn' },
        { name: 'Турция',     flag: 'tr' },
        { name: 'Узбекистан', flag: 'uz' },
        { name: 'Беларусь',   flag: 'by' },
        { name: 'Казахстан',  flag: 'kz' },
        { name: 'Малайзия',   flag: 'my' },
        { name: 'Румыния',    flag: 'ro' },
        { name: 'Венгрия',    flag: 'hu' },
        { name: 'Болгария',   flag: 'bg' },
      ],
      features: [
        {
          title: 'Подбор университета и факультета',
          desc: 'Анализируем ваш аттестат, интересы и бюджет, подбираем оптимальный вуз и направление обучения.',
        },
        {
          title: 'Подготовка документов',
          desc: 'Помогаем собрать полный пакет: нотариальные переводы, апостиль, мотивационное письмо, рекомендации.',
        },
        {
          title: 'Прямая подача заявки',
          desc: 'Напрямую взаимодействуем с приёмными комиссиями, контролируем статус заявки на каждом этапе.',
        },
        {
          title: 'Языковые курсы',
          desc: 'Организуем обучение на языковых курсах в стране назначения — русский, китайский, английский.',
        },
        {
          title: 'Подготовительный факультет',
          desc: 'Зачисление на подфак для адаптации к системе образования страны обучения.',
        },
        {
          title: 'Колледж (после языковых курсов)',
          desc: 'Помогаем с поступлением в колледжи — отличная ступень перед бакалавриатом.',
        },
        {
          title: 'Бакалавриат и магистратура',
          desc: 'Поступление на очную форму обучения в государственные и частные вузы.',
        },
        {
          title: 'Общежитие и жильё',
          desc: 'Помогаем с оформлением места в общежитии или подбором квартиры вблизи учебного заведения.',
        },
      ],
      process: [
        { step: '01', title: 'Консультация', desc: 'Бесплатная консультация: определяем страну, специальность и бюджет.' },
        { step: '02', title: 'Документы', desc: 'Собираем и переводим пакет документов для подачи.' },
        { step: '03', title: 'Подача', desc: 'Подаём заявку в выбранные университеты, ждём ответа.' },
        { step: '04', title: 'Приглашение', desc: 'Получаем официальное приглашение и готовимся к визе.' },
      ],
      cta: 'Получить бесплатную консультацию',
    },
    visa: {
      title: 'Визы',
      subtitle: '99% успешных кейсов — доверьте визу профессионалам',
      intro:
        'Получение студенческой визы — один из самых ответственных этапов. Мы берём на себя все бюрократические процессы и обеспечиваем 99% успешный результат за 5+ лет работы.',
      features: [
        {
          title: 'Анализ ситуации',
          desc: 'Определяем нужный тип визы в зависимости от страны обучения и гражданства.',
        },
        {
          title: 'Точный список документов',
          desc: 'Составляем актуальный список требований для посольства и помогаем подготовить каждый документ.',
        },
        {
          title: 'Подача в посольство',
          desc: 'Сопровождаем при подаче документов, отслеживаем статус заявки.',
        },
        {
          title: 'Студенческая виза',
          desc: 'Оформление студенческих виз для России, Китая, Турции, Кипра, Беларуси и других стран.',
        },
        {
          title: 'Продление визы',
          desc: 'Помогаем своевременно продлить визу во время обучения, чтобы избежать штрафов.',
        },
        {
          title: 'Срочное оформление',
          desc: 'В экстренных случаях организуем ускоренную процедуру подачи и получения визы.',
        },
      ],
      process: [
        { step: '01', title: 'Консультация', desc: 'Определяем тип визы и необходимые документы.' },
        { step: '02', title: 'Подготовка', desc: 'Собираем и проверяем пакет документов.' },
        { step: '03', title: 'Подача', desc: 'Подаём документы в посольство или консульство.' },
        { step: '04', title: 'Получение', desc: 'Получаем готовую визу и уведомляем вас.' },
      ],
      cta: 'Записаться на консультацию по визе',
    },
    transport: {
      title: 'Транспорт и Встреча',
      subtitle: 'Авиабилеты и трансфер — вы не останетесь одни',
      intro:
        'Организуем авиабилеты по выгодным ценам и встречаем студентов в аэропорту. С первых минут в новой стране рядом с вами будет наш представитель.',
      features: [
        {
          title: 'Авиабилеты по лучшим ценам',
          desc: 'Подбираем оптимальные рейсы с удобными стыковками и минимальной ценой.',
        },
        {
          title: 'Встреча в аэропорту',
          desc: 'Наш представитель встретит вас с именной табличкой и поможет добраться до места.',
        },
        {
          title: 'Трансфер до жилья',
          desc: 'Организуем комфортный трансфер от аэропорта до общежития или квартиры.',
        },
        {
          title: 'Групповые поездки',
          desc: 'Для групп студентов организуем совместные трансферы с комфортом и безопасностью.',
        },
        {
          title: 'Помощь с багажом',
          desc: 'Помогаем разобраться с правилами провоза багажа и при необходимости организуем его доставку.',
        },
        {
          title: 'Обратные билеты',
          desc: 'Помогаем с покупкой билетов домой на каникулы и по окончании учёбы.',
        },
      ],
      cta: 'Забронировать встречу и билеты',
    },
    translation: {
      title: 'Переводы и Документы',
      subtitle: 'Нотариальный перевод, нострификация и апостиль',
      intro:
        'Профессиональный перевод и нотариальное заверение документов для поступления, оформления визы и регистрации. Нострификация, апостиль, легализация — всё под ключ.',
      features: [
        {
          title: 'Нотариальный перевод',
          desc: 'Переводим аттестаты, дипломы, паспорта, свидетельства о рождении и другие документы с нотариальным заверением.',
        },
        {
          title: 'Нострификация (академическое признание)',
          desc: 'Помогаем с признанием иностранных документов об образовании в российских органах.',
        },
        {
          title: 'Апостиль',
          desc: 'Содействуем в оформлении апостиля для международного применения официальных документов.',
        },
        {
          title: 'Консульская легализация',
          desc: 'Легализация документов через консульство для использования за рубежом.',
        },
        {
          title: 'Перевод на несколько языков',
          desc: 'Русский, английский, туркменский, узбекский, китайский и другие языки.',
        },
        {
          title: 'Срочный перевод',
          desc: 'При необходимости выполним перевод в сжатые сроки без потери качества.',
        },
      ],
      cta: 'Заказать перевод документов',
    },
    support: {
      title: 'Адаптация и Поддержка',
      subtitle: 'Круглосуточная поддержка — вы не одни в новой стране',
      intro:
        'Переезд в новую страну — это всегда стресс. Наша команда работает круглосуточно, помогает быстро адаптироваться, решить бытовые вопросы и чувствовать себя уверенно.',
      features: [
        {
          title: 'Подбор жилья',
          desc: 'Помогаем найти место в общежитии или подобрать квартиру рядом с университетом.',
        },
        {
          title: 'Регистрация по месту жительства',
          desc: 'Сопровождаем при постановке на миграционный учёт — без очередей и стресса.',
        },
        {
          title: 'Медицинская страховка',
          desc: 'Помогаем оформить полис ДМС или ОМС, необходимый для обучения и жизни в России.',
        },
        {
          title: 'Открытие банковского счёта',
          desc: 'Консультируем и помогаем открыть счёт в российском банке для получения стипендии и переводов.',
        },
        {
          title: 'Линия поддержки 24/7',
          desc: 'Наши менеджеры всегда на связи — звоните в любое время суток по любому вопросу.',
        },
        {
          title: 'Ориентация в городе',
          desc: 'Рассказываем о транспорте, магазинах, больницах и всём необходимом для комфортной жизни.',
        },
      ],
      cta: 'Получить поддержку',
    },
    'work-visa': {
      title: 'Рабочая Виза',
      subtitle: 'РВП, РВПО, ВНЖ и разрешение на работу в России',
      intro:
        'Помогаем иностранным гражданам легально работать и проживать в России. Полное юридическое сопровождение при оформлении РВП, РВПО, ВНЖ и разрешений на работу.',
      features: [
        {
          title: 'РВП (Разрешение на временное проживание)',
          desc: 'Полное сопровождение при подаче и получении РВП для иностранных граждан.',
        },
        {
          title: 'РВПО (для студентов)',
          desc: 'Оформление РВПО — упрощённая процедура для студентов российских вузов.',
        },
        {
          title: 'ВНЖ (Вид на жительство)',
          desc: 'Помощь в получении вида на жительство для долгосрочного пребывания в России.',
        },
        {
          title: 'Патент на работу',
          desc: 'Оформление патента для граждан стран с безвизовым режимом въезда в Россию.',
        },
        {
          title: 'Помощь в подготовке документов',
          desc: 'Составляем точный список, проверяем каждый документ до подачи.',
        },
        {
          title: 'Получение талона (кроме Москвы)',
          desc: 'Помогаем записаться на подачу документов в МФЦ или ГУВМ МВД. В Москве данная услуга недоступна.',
        },
      ],
      process: [
        { step: '01', title: 'Консультация', desc: 'Анализируем ситуацию и выбираем оптимальный статус.' },
        { step: '02', title: 'Документы', desc: 'Собираем и проверяем весь пакет документов.' },
        { step: '03', title: 'Подача', desc: 'Подаём документы в соответствующий орган.' },
        { step: '04', title: 'Получение', desc: 'Получаем готовый документ и передаём вам.' },
      ],
      cta: 'Записаться на консультацию',
    },
    rvp: {
      title: 'РВПО / РВП / ВНЖ',
      subtitle: 'Оформление разрешений на проживание в России для иностранных граждан',
      intro:
        'Помогаем студентам и иностранным гражданам оформить РВПО, РВП или ВНЖ в России. Наши специалисты сопровождают вас на каждом этапе — от консультации до получения документа на руки.',
      features: [
        {
          title: 'РВПО (для студентов)',
          desc: 'Оформление разрешения на временное проживание в целях обучения — упрощённая процедура для студентов российских вузов.',
        },
        {
          title: 'РВП (Разрешение на временное проживание)',
          desc: 'Полное сопровождение при подаче и получении РВП для иностранных граждан любой категории.',
        },
        {
          title: 'ВНЖ (Вид на жительство)',
          desc: 'Помощь в получении вида на жительство для долгосрочного легального проживания в России.',
        },
        {
          title: 'Подготовка документов',
          desc: 'Составляем точный список необходимых документов и проверяем каждый из них до подачи.',
        },
        {
          title: 'Получение талона',
          desc: 'Помогаем записаться на подачу документов в МФЦ или ГУВМ МВД (кроме Москвы).',
        },
        {
          title: 'Консультация по основаниям',
          desc: 'Определяем наиболее подходящее основание для подачи и объясняем все нюансы процедуры.',
        },
      ],
      process: [
        { step: '01', title: 'Консультация', desc: 'Анализируем ситуацию и выбираем подходящий статус: РВПО, РВП или ВНЖ.' },
        { step: '02', title: 'Документы', desc: 'Помогаем собрать и проверить полный пакет документов.' },
        { step: '03', title: 'Подача', desc: 'Подаём документы в уполномоченный орган, получаем талон.' },
        { step: '04', title: 'Получение', desc: 'Забираем готовый документ и передаём вам.' },
      ],
      cta: 'Получить консультацию',
    },
  },

  en: {
    university: {
      title: 'University Admissions',
      subtitle: 'Full support from faculty selection to enrollment',
      intro:
        'We help students gain admission to top universities in Russia, China, Turkey, Cyprus, Kazakhstan, Malaysia, Romania, and more. Our specialists guide you through every stage — from faculty selection to receiving your invitation letter.',
      features: [
        { title: 'University & Program Selection', desc: 'We analyze your grades, interests, and budget to match you with the ideal university and program.' },
        { title: 'Document Preparation', desc: 'We help compile a complete package: certified translations, apostille, motivation letters, and references.' },
        { title: 'Direct Application Submission', desc: 'We liaise directly with admissions offices and monitor your application status at every step.' },
        { title: 'Language Courses', desc: 'We arrange language course enrollment in the destination country — Russian, Chinese, or English.' },
        { title: 'Preparatory Faculty', desc: 'Enrollment in a prep faculty to adapt to the education system of your destination country.' },
        { title: 'College (after language courses)', desc: 'We assist with college admissions — a great stepping stone before a bachelor\'s degree.' },
        { title: 'Bachelor\'s & Master\'s', desc: 'Enrollment in full-time programs at state and private universities.' },
        { title: 'Dormitory & Housing', desc: 'We help secure dormitory placement or find private accommodation near your university.' },
      ],
      process: [
        { step: '01', title: 'Consultation', desc: 'Free consultation: we define country, specialty, and budget.' },
        { step: '02', title: 'Documents', desc: 'We collect and translate the full document package.' },
        { step: '03', title: 'Application', desc: 'We submit applications to selected universities.' },
        { step: '04', title: 'Invitation', desc: 'We receive the official invitation and prepare for the visa.' },
      ],
      cta: 'Get a Free Consultation',
    },
    visa: {
      title: 'Visas',
      subtitle: '99% success rate — trust your visa to professionals',
      intro: 'Obtaining a student visa is one of the most critical steps. We handle all bureaucratic processes and achieve a 99% success rate across 5+ years of work.',
      features: [
        { title: 'Situation Analysis', desc: 'We determine the correct visa type based on your destination country and citizenship.' },
        { title: 'Exact Document List', desc: 'We compile the current embassy requirements and help prepare every document.' },
        { title: 'Embassy Submission', desc: 'We accompany you during document submission and track application status.' },
        { title: 'Student Visa', desc: 'Visa processing for Russia, China, Turkey, Cyprus, Belarus, and other countries.' },
        { title: 'Visa Extension', desc: 'We help you renew your visa on time during your studies to avoid penalties.' },
        { title: 'Express Processing', desc: 'In urgent cases, we organize an accelerated application and visa receipt procedure.' },
      ],
      process: [
        { step: '01', title: 'Consultation', desc: 'We determine visa type and required documents.' },
        { step: '02', title: 'Preparation', desc: 'We collect and verify the document package.' },
        { step: '03', title: 'Submission', desc: 'We submit documents to the embassy or consulate.' },
        { step: '04', title: 'Receipt', desc: 'We receive the ready visa and notify you.' },
      ],
      cta: 'Book a Visa Consultation',
    },
    transport: {
      title: 'Transport & Meet',
      subtitle: 'Flights and airport transfers — you are never alone',
      intro: 'We arrange affordable flights and meet students at the airport. From your very first minute in a new country, our representative will be by your side.',
      features: [
        { title: 'Best-Price Flights', desc: 'We find optimal flights with convenient connections at the lowest price.' },
        { title: 'Airport Pickup', desc: 'Our representative meets you with a personalized sign and takes you to your destination.' },
        { title: 'Transfer to Accommodation', desc: 'Comfortable transfer from the airport to your dormitory or apartment.' },
        { title: 'Group Transfers', desc: 'For groups of students, we arrange comfortable and safe shared transfers.' },
        { title: 'Luggage Assistance', desc: 'We help with baggage rules and can organize delivery if needed.' },
        { title: 'Return Tickets', desc: 'We assist with purchasing tickets home for holidays and after graduation.' },
      ],
      cta: 'Book Transfer & Tickets',
    },
    translation: {
      title: 'Translations & Documents',
      subtitle: 'Notarized translation, nostrification, and apostille',
      intro: 'Professional translation and notarization of documents for university admission, visa processing, and registration. Nostrification, apostille, legalization — all-inclusive.',
      features: [
        { title: 'Notarized Translation', desc: 'We translate diplomas, passports, birth certificates, and other documents with notarial certification.' },
        { title: 'Nostrification', desc: 'We assist with academic recognition of foreign education documents in Russian authorities.' },
        { title: 'Apostille', desc: 'We facilitate apostille certification for international use of official documents.' },
        { title: 'Consular Legalization', desc: 'Legalization through the consulate for documents to be used abroad.' },
        { title: 'Multi-Language Translation', desc: 'Russian, English, Turkmen, Uzbek, Chinese, and other languages.' },
        { title: 'Express Translation', desc: 'Urgent translation available within tight deadlines without compromising quality.' },
      ],
      cta: 'Order Document Translation',
    },
    support: {
      title: 'Adaptation & Support',
      subtitle: '24/7 support — you are never alone in a new country',
      intro: 'Moving to a new country is always stressful. Our team works around the clock, helping you adapt quickly, resolve everyday issues, and feel confident.',
      features: [
        { title: 'Housing Search', desc: 'We help find a dormitory spot or apartment near your university.' },
        { title: 'Address Registration', desc: 'We accompany you for migration registration — no queues, no stress.' },
        { title: 'Medical Insurance', desc: 'We help arrange a voluntary or mandatory health insurance policy required for study.' },
        { title: 'Bank Account Opening', desc: 'We advise and help you open an account at a Russian bank.' },
        { title: '24/7 Support Line', desc: 'Our managers are always available — call at any time for any question.' },
        { title: 'City Orientation', desc: 'We guide you on transport, shops, hospitals, and everything needed for comfortable life.' },
      ],
      cta: 'Get Support',
    },
    'work-visa': {
      title: 'Work Visa',
      subtitle: 'RVP, RVPO, VNZ and work permits in Russia',
      intro: 'We help foreign citizens legally work and reside in Russia. Full legal support for RVP, RVPO, VNZ, and work permit applications.',
      features: [
        { title: 'RVP (Temporary Residence Permit)', desc: 'Full support for submitting and obtaining RVP for foreign citizens.' },
        { title: 'RVPO (for students)', desc: 'Simplified RVPO procedure for students of Russian universities.' },
        { title: 'VNZ (Residence Permit)', desc: 'Assistance obtaining a long-term residence permit in Russia.' },
        { title: 'Work Patent', desc: 'Patent processing for citizens of visa-free countries.' },
        { title: 'Document Preparation', desc: 'We compile the exact list and verify every document before submission.' },
        { title: 'Appointment Scheduling (excl. Moscow)', desc: 'We help schedule a submission appointment at MFC or GUVM MVD. This service is unavailable in Moscow.' },
      ],
      process: [
        { step: '01', title: 'Consultation', desc: 'We analyze your situation and choose the optimal legal status.' },
        { step: '02', title: 'Documents', desc: 'We collect and verify the full document package.' },
        { step: '03', title: 'Submission', desc: 'We submit documents to the relevant authority.' },
        { step: '04', title: 'Receipt', desc: 'We receive the ready document and hand it over to you.' },
      ],
      cta: 'Book a Consultation',
    },
    rvp: {
      title: 'RVPO / RVP / VNZ',
      subtitle: 'Russian residence permit assistance for foreign nationals',
      intro:
        'We help students and foreign nationals obtain RVPO, RVP, or VNZ in Russia. Our specialists guide you through every step — from initial consultation to receiving your permit.',
      features: [
        {
          title: 'RVPO (for students)',
          desc: 'Simplified temporary residence permit for study purposes — available to students enrolled in Russian universities.',
        },
        {
          title: 'RVP (Temporary Residence Permit)',
          desc: 'Full support for submitting and obtaining a temporary residence permit for any category of foreign national.',
        },
        {
          title: 'VNZ (Residence Permit)',
          desc: 'Assistance obtaining a long-term residence permit for legal permanent residence in Russia.',
        },
        {
          title: 'Document Preparation',
          desc: 'We compile the exact list of required documents and verify each one before submission.',
        },
        {
          title: 'Appointment Scheduling',
          desc: 'We help you schedule a submission appointment at MFC or GUVM MVD (outside Moscow).',
        },
        {
          title: 'Grounds Consultation',
          desc: 'We determine the most suitable grounds for your application and explain all procedural details.',
        },
      ],
      process: [
        { step: '01', title: 'Consultation', desc: 'We assess your situation and choose the right permit type: RVPO, RVP, or VNZ.' },
        { step: '02', title: 'Documents', desc: 'We help gather and verify the full document package.' },
        { step: '03', title: 'Submission', desc: 'We submit documents to the relevant authority and obtain an appointment ticket.' },
        { step: '04', title: 'Receipt', desc: 'We collect the ready document and hand it over to you.' },
      ],
      cta: 'Get a Consultation',
    },
  },

  tk: {
    university: {
      title: 'Ýokary okuw mekdebine okuwa girmek',
      subtitle: 'Fakultet saýlamakdan kabul edilmäge çenli doly goldaw',
      intro: 'Russiýa, Hytaý, Türkiýe, Kipr, Gazagystan, Malaýziýa, Rumyniýa we beýleki ýurtlaryň öňdebaryjy ýokary okuw mekdeplerine okuwa girmäge kömek edýäris.',
      features: [
        { title: 'Uniwersitet we fakultet saýlamak', desc: 'Attestatyňyzy, gyzyklanmalaryňyzy we býudjetiňizi seljereris, iň amatly ýokary okuw mekdebini we ugry saýlaýarys.' },
        { title: 'Resminamalary taýýarlamak', desc: 'Doly toplumyny ýygnamagy kömek edýäris: notarial terjimeler, apostil, motivasiýa haty.' },
        { title: 'Dil kurslary', desc: 'Barmaly ýurduňda dil kurslaryna ýazylmagy gurnaýarys — rus, hytaý, iňlis.' },
        { title: 'Taýýarlyk fakulteti', desc: 'Barmaly ýurduň bilim ulgamyna uýgunlaşmak üçin taýýarlyk bölümine kabul edilmek.' },
        { title: 'Kolleç (dil kurslaryndan soň)', desc: 'Kolleçlere kabul edilmäge kömek edýäris — bakalawr derejesinden öň ajaýyp ädim.' },
        { title: 'Bakalawr we magistratura', desc: 'Döwlet we hususy ýokary okuw mekdeplerinde gündiziň okamagy.' },
        { title: 'Ýatakhana we ýaşaýyş jaý', desc: 'Ýatakhanada ýer almaga ýa-da uniwersitete golaý kwartira tapmaga kömek edýäris.' },
        { title: 'Resminamalary iberme', desc: 'Kabul ediş toparlary bilen gönüden-göni aragatnaşyk saklaýarys.' },
      ],
      cta: 'Mugt maslahat alyň',
    },
    visa: {
      title: 'Wizalar',
      subtitle: '99% üstünlikli netijeler — wizany hünärmenlere ynanýarys',
      intro: 'Talyp wizasyny almak iň jogapkärli tapgyrlaryň biridir. Ähli bürokratik işleri öz üstümize alýarys we 99% üstünlikli netijäni üpjün edýäris.',
      features: [
        { title: 'Ýagdaýy seljermek', desc: 'Okaýan ýurduňyza we raýatlygyna görä dogry wiza görnüşini kesgitleýäris.' },
        { title: 'Resminamalaryň sanawy', desc: 'Ilçihananyň talaplary boýunça anyk sanaw düzýäris we taýýarlamagyna kömek edýäris.' },
        { title: 'Ilçihanä bermek', desc: 'Resminalaryň berilmeginde ýanýarys we ýüztutmanyň ýagdaýyny yzarlaýarys.' },
        { title: 'Talyplar üçin wiza', desc: 'Russiýa, Hytaý, Türkiýe, Kipr we beýleki ýurtlar üçin talyp wizasy.' },
        { title: 'Wizany uzaltmak', desc: 'Okaýan döwrüňizde wizaňyzy wagtynda uzaltmaga kömek edýäris.' },
        { title: 'Adatdan daşary ýagdaý', desc: 'Gyssagly ýagdaýlarda çaltlandyrylan wiza tertibini guraýarys.' },
      ],
      cta: 'Wiza boýunça maslahat alyň',
    },
    transport: {
      title: 'Ulag we Garşylamak',
      subtitle: 'Uçar petekleri we aeroportdan geçiriş',
      intro: 'Amatly bahadan uçar peteklerini guraýarys we talyplary aeroportda garşylaýarys. Täze ýurtdaky ilkinji minutlarda biziň wekilimiz ýanyňyzda bolar.',
      features: [
        { title: 'Iň arzan uçar petekleri', desc: 'Amatly baglanyşykly we iň arzan baha bilen ýörite uçuşlary saýlaýarys.' },
        { title: 'Aeroportda garşylamak', desc: 'Wekilimiz adyňyz ýazylgy tagtajyk bilen sizi garşylar we barmaly ýeriňize eltär.' },
        { title: 'Ýaşaýan ýere geçiriş', desc: 'Aeroportdan ýatakhanäňyza ýa-da kwartiraňyza amatly geçiriş.' },
        { title: 'Topar geçirişleri', desc: 'Talyp toparlary üçin bilelikde amatly we howpsuz geçirişler.' },
        { title: 'Yzyna gaýtmak üçin petekler', desc: 'Dynç alyş döwrüne we okuw tamamlanandan soň öýe gaýtmak üçin peteklere kömek.' },
      ],
      cta: 'Petekleri we garşylamany bronlaň',
    },
    translation: {
      title: 'Terjimeler we Resminamalar',
      subtitle: 'Notarial terjime, nostrifkasiýa we apostil',
      intro: 'Okuwa girmek, wiza almak we hasaba durmak üçin hünärmen terjime we notarial tassyklama. Nostrifikasiýa, apostil, kanunilaşdyrma — doly hyzmat.',
      features: [
        { title: 'Notarial terjime', desc: 'Attestatlar, diplomlar, pasportlar we beýleki resminamalary notarial tassyklama bilen terjime edýäris.' },
        { title: 'Nostrifikasiýa', desc: 'Daşary ýurtda alnan bilim resminamalarynyň ykrar edilmegine kömek edýäris.' },
        { title: 'Apostil', desc: 'Resminamalaryň halkara ulanylmagy üçin apostil resmileşdirmäge kömek edýäris.' },
        { title: 'Köp dilli terjime', desc: 'Rus, iňlis, türkmen, özbek, hytaý we beýleki diller.' },
        { title: 'Gyssagly terjime', desc: 'Zerur ýagdaýda gysga möhletde ýokary hilli terjime.' },
      ],
      cta: 'Resminamalary terjime sargyt etmek',
    },
    support: {
      title: 'Uýgunlaşma we Goldaw',
      subtitle: '24/7 goldaw — täze ýurtda ýeke däl',
      intro: 'Täze ýurda göçmek elmydama stresidir. Toparymyz gije-gündiz işleýär, çalt uýgunlaşmagyňyza we özüňizi rahat duýmagyňyza kömek edýär.',
      features: [
        { title: 'Ýaşaýyş jaý tapmak', desc: 'Uniwersitete golaý ýatakhanada ýer ýa-da kwartira tapmaga kömek edýäris.' },
        { title: 'Hasaba durmak', desc: 'Migrasiýa hasabyna durmak üçin ýanýarys — nobatsyz we stressiz.' },
        { title: 'Saglyk ätiýaçlandyrmasy', desc: 'Okuw we Russiýada ýaşamak üçin zerur ätiýaçlandyrmany resmileşdirmäge kömek edýäris.' },
        { title: 'Bank hasabyny açmak', desc: 'Rus bankynda hasap açmaga maslahat berýäris we kömek edýäris.' },
        { title: '24/7 goldaw liniýasy', desc: 'Dolandyryjylarymyz her wagt elýeterli — islendik wagt jaň ediň.' },
        { title: 'Şäherde ugrukdyrma', desc: 'Ulag, dükanlar, hassahanalar we amatly durmuş üçin ähli zerur maglumat.' },
      ],
      cta: 'Goldaw alyň',
    },
    'work-visa': {
      title: 'Iş Wizasy',
      subtitle: 'RWP, RWPO, WNŽ we iş rugsady',
      intro: 'Daşary ýurt raýatlaryna Russiýada kanuny iş we ýaşamak hukugyny almaga kömek edýäris. RWP, RWPO, WNŽ we iş rugsadyny resmileşdirmekde doly hukuk goldawy.',
      features: [
        { title: 'RWP (Wagtlaýyn ýaşamak rugsady)', desc: 'Daşary ýurt raýatlary üçin RWP almak we bermek üçin doly goldaw.' },
        { title: 'RWPO (talyp üçin)', desc: 'Rus ýokary okuw mekdepleriniň talyplary üçin ýönekeýleşdirilen RWPO.' },
        { title: 'WNŽ (Ýaşaýyş rugsady)', desc: 'Russiýada uzak wagtlyk ýaşamak üçin ýaşaýyş rugsadyny almaga kömek.' },
        { title: 'Iş patenti', desc: 'Wiza rejesiz ýurtlaryň raýatlary üçin patent resmileşdirmek.' },
        { title: 'Resminamalary taýýarlamak', desc: 'Anyk sanawy düzýäris we bermezden ozal her resminamany barlaýarys.' },
        { title: 'Talon almak (Moskwadan başga)', desc: 'MFC ýa-da GUWM MWD-a bermek üçin nobat almaga kömek edýäris. Moskwada bu hyzmat elýeterli däl.' },
      ],
      cta: 'Maslahat alyň',
    },
    rvp: {
      title: 'RWPO / RWP / WNŽ',
      subtitle: 'Russiýada daşary ýurt raýatlary üçin ýaşamak rugsadyny almak',
      intro:
        'Talyplar we daşary ýurt raýatlary üçin Russiýada RWPO, RWP ýa-da WNŽ almaga kömek edýäris. Hünärmenlerimiz her ädimde — maslahatdan resminamany almaga çenli ýanýarlar.',
      features: [
        {
          title: 'RWPO (talyp üçin)',
          desc: 'Okuw maksatly wagtlaýyn ýaşamak rugsady — rus ýokary okuw mekdepleriniň talyplary üçin ýönekeýleşdirilen tertip.',
        },
        {
          title: 'RWP (Wagtlaýyn ýaşamak rugsady)',
          desc: 'Islendik kategoriýadaky daşary ýurt raýatlary üçin RWP almak üçin doly goldaw.',
        },
        {
          title: 'WNŽ (Ýaşaýyş rugsady)',
          desc: 'Russiýada uzak wagtlyk kanuny ýaşamak üçin ýaşaýyş rugsadyny almaga kömek.',
        },
        {
          title: 'Resminamalary taýýarlamak',
          desc: 'Zerur resminamalaryň anyk sanawyny düzýäris we bermezden ozal her birini barlaýarys.',
        },
        {
          title: 'Talon almak',
          desc: 'MFC ýa-da GUWM MWD-a bermek üçin nobat almaga kömek edýäris (Moskwadan başga).',
        },
        {
          title: 'Esaslar boýunça maslahat',
          desc: 'Iň amatly esasy kesgitleýäris we ähli hukuk çärelerini düşündirýäris.',
        },
      ],
      process: [
        { step: '01', title: 'Maslahat', desc: 'Ýagdaýy seljerip, dogry resminama görnüşini saýlaýarys: RWPO, RWP ýa-da WNŽ.' },
        { step: '02', title: 'Resminamalar', desc: 'Doly resminama toplumyny ýygnamaga we barlamaga kömek edýäris.' },
        { step: '03', title: 'Bermek', desc: 'Resminamalary ygtyýarly organa berýäris, talon alýarys.' },
        { step: '04', title: 'Almak', desc: 'Taýýar resminamany alýarys we size gowşurýarys.' },
      ],
      cta: 'Maslahat alyň',
    },
  },

  oz: {
    university: {
      title: 'Oliy o\'quv yurtiga kirish',
      subtitle: 'Fakultet tanlashdan qabul qilinguncha to\'liq qo\'llab-quvvatlash',
      intro: 'Rossiya, Xitoy, Turkiya, Kipr, Qozog\'iston, Malayziya, Ruminiya va boshqa mamlakatlarning yetakchi universitetlariga kirishga yordam beramiz.',
      features: [
        { title: 'Universitet va yo\'nalish tanlash', desc: 'Attestatingiz, qiziqishlaringiz va byudjetingizni tahlil qilib, eng mos universitet va yo\'nalishni tanlaymiz.' },
        { title: 'Hujjatlarni tayyorlash', desc: 'To\'liq to\'plam yig\'ishga yordam beramiz: notarial tarjimalar, apostil, motivatsion xat.' },
        { title: 'Til kurslari', desc: 'Boradigan mamlakatdagi til kurslariga yozilishni tashkil etamiz — rus, xitoy, ingliz.' },
        { title: 'Tayyorlov fakulteti', desc: 'Boradigan mamlakatning ta\'lim tizimiga moslashish uchun tayyorlov bo\'limiga qabul.' },
        { title: 'Kollej (til kurslaridan keyin)', desc: 'Kollej qabuliga yordam beramiz — bakalavrgacha ajoyib qadam.' },
        { title: 'Bakalavr va magistratura', desc: 'Davlat va xususiy universitetlarda kunduzgi o\'qishga qabul.' },
        { title: 'Yotoqxona va uy-joy', desc: 'Universitetga yaqin yotoqxona o\'rni yoki kvartira topishga yordam beramiz.' },
        { title: 'Ariza topshirish', desc: 'Qabul komissiyalari bilan to\'g\'ridan-to\'g\'ri aloqa qilamiz.' },
      ],
      cta: 'Bepul maslahat oling',
    },
    visa: {
      title: 'Vizalar',
      subtitle: '99% muvaffaqiyatli natijalar — vizangizni mutaxassislarga ishoning',
      intro: 'Talaba vizasini olish eng mas\'uliyatli bosqichlardan biridir. Barcha byurokratik jarayonlarni o\'zimizga olamiz va 99% muvaffaqiyatli natijani ta\'minlaymiz.',
      features: [
        { title: 'Vaziyatni tahlil qilish', desc: 'O\'qiydigan mamlakatga va fuqaroligingizga qarab to\'g\'ri viza turini aniqlaymiz.' },
        { title: 'Hujjatlar ro\'yxati', desc: 'Elchixona talablariga muvofiq aniq ro\'yxat tuzamiz va tayyorlashga yordam beramiz.' },
        { title: 'Elchixonaga topshirish', desc: 'Hujjatlar topshirishda yoningizda bo\'lamiz va ariza holatini kuzatamiz.' },
        { title: 'Talaba vizasi', desc: 'Rossiya, Xitoy, Turkiya, Kipr va boshqa mamlakatlar uchun talaba vizasi.' },
        { title: 'Vizani uzaytirish', desc: 'O\'qish davrida vizangizni o\'z vaqtida uzaytirishga yordam beramiz.' },
        { title: 'Shoshilinch holat', desc: 'Favqulodda holatlarda tezlashtirilgan viza tartibini tashkil etamiz.' },
      ],
      cta: 'Viza bo\'yicha maslahat oling',
    },
    transport: {
      title: 'Transport va Kutib olish',
      subtitle: 'Aviabiletlar va aeroport transferi',
      intro: 'Qulay narxlarda aviabiletlarni tashkil etamiz va talabalarni aeroportda kutib olamiz. Yangi mamlakatdagi birinchi daqiqalaringizda vakilimiz yoningizda bo\'ladi.',
      features: [
        { title: 'Eng arzon aviabiletlar', desc: 'Qulay ulanishli va eng past narxda optimal parvozlarni topamiz.' },
        { title: 'Aeroportda kutib olish', desc: 'Vakilimiz ismingiz yozilgan tablichka bilan sizi kutib oladi va boradigan joyingizga eltadi.' },
        { title: 'Yashash joyiga transfer', desc: 'Aeroportdan yotoqxona yoki kvartiraga qulay transfer.' },
        { title: 'Guruh transferlari', desc: 'Talabalar guruhi uchun qulay va xavfsiz birgalikdagi transfer.' },
        { title: 'Qaytish bileti', desc: 'Ta\'til va o\'qish tugagandan so\'ng uyga qaytish uchun bilet olishda yordam.' },
      ],
      cta: 'Bilet va kutib olishni band qiling',
    },
    translation: {
      title: 'Tarjimalar va Hujjatlar',
      subtitle: 'Notarial tarjima, nostrifikatsiya va apostil',
      intro: 'O\'qishga kirish, viza va ro\'yxatdan o\'tish uchun professional tarjima va notarial tasdiqlash. Nostrifikatsiya, apostil, legalizatsiya — to\'liq xizmat.',
      features: [
        { title: 'Notarial tarjima', desc: 'Attestat, diplom, pasport va boshqa hujjatlarni notarial tasdiqlash bilan tarjima qilamiz.' },
        { title: 'Nostrifikatsiya', desc: 'Xorij ta\'lim hujjatlarini Rossiyada tan olinishiga yordam beramiz.' },
        { title: 'Apostil', desc: 'Hujjatlarning xalqaro miqyosda qo\'llanilishi uchun apostil rasmiylashtirish.' },
        { title: 'Ko\'p tilli tarjima', desc: 'Rus, ingliz, turkman, o\'zbek, xitoy va boshqa tillar.' },
        { title: 'Shoshilinch tarjima', desc: 'Zarur holatlarda qisqa muddatda sifatli tarjima.' },
      ],
      cta: 'Hujjat tarjimasi buyurtma qiling',
    },
    support: {
      title: 'Moslashuv va Qo\'llab-quvvatlash',
      subtitle: '24/7 qo\'llab-quvvatlash — yangi mamlakatda yolg\'iz emas',
      intro: 'Yangi mamlakatga ko\'chish har doim stress. Jamoamiz kechayu-kunduz ishlaydi, tez moslashishingizga va o\'zingizni ishonchli his etishingizga yordam beradi.',
      features: [
        { title: 'Uy-joy topish', desc: 'Universitetga yaqin yotoqxona o\'rni yoki kvartira topishga yordam beramiz.' },
        { title: 'Ro\'yxatdan o\'tish', desc: 'Migratsiya hisobiga turish uchun yoningizda bo\'lamiz — navbatsiz va stresssiz.' },
        { title: 'Tibbiy sug\'urta', desc: 'O\'qish va Rossiyada yashash uchun zarur sug\'urtani rasmiylashtirishga yordam.' },
        { title: 'Bank hisobi ochish', desc: 'Rossiya bankida hisob ochishga maslahat beramiz va yordam ko\'rsatamiz.' },
        { title: '24/7 qo\'llab-quvvatlash liniyasi', desc: 'Menejerlarimiz har doim mavjud — istalgan vaqtda qo\'ng\'iroq qiling.' },
        { title: 'Shaharda yo\'nalish', desc: 'Transport, do\'konlar, kasalxonalar va qulay hayot uchun zarur ma\'lumotlar.' },
      ],
      cta: 'Yordam oling',
    },
    'work-visa': {
      title: 'Ish Vizasi',
      subtitle: 'RVP, RVPO, VNJ va ish ruxsatnomasi',
      intro: 'Xorijiy fuqarolarga Rossiyada qonuniy ishlash va yashash huquqini olishga yordam beramiz. RVP, RVPO, VNJ va ish ruxsatnomasini rasmiylashtirishda to\'liq huquqiy qo\'llab-quvvatlash.',
      features: [
        { title: 'RVP (Vaqtinchalik yashash ruxsati)', desc: 'Xorijiy fuqarolar uchun RVP olish va topshirish bo\'yicha to\'liq qo\'llab-quvvatlash.' },
        { title: 'RVPO (talabalar uchun)', desc: 'Rossiya universitetlari talabalari uchun soddalashtirilgan RVPO.' },
        { title: 'VNJ (Yashash guvohnomasi)', desc: 'Rossiyada uzoq muddatli yashash uchun yashash guvohnomasi olishga yordam.' },
        { title: 'Ish patenti', desc: 'Vizasiz rejim mamlakatlarining fuqarolari uchun patent rasmiylashtirish.' },
        { title: 'Hujjatlarni tayyorlash', desc: 'Aniq ro\'yxat tuzamiz va topshirishdan oldin har bir hujjatni tekshiramiz.' },
        { title: 'Talon olish (Moskvadan tashqari)', desc: 'MFC yoki GUVM MVDga topshirish uchun navbat olishga yordam. Moskvada bu xizmat mavjud emas.' },
      ],
      cta: 'Maslahat oling',
    },
    rvp: {
      title: 'RVPO / RVP / VNJ',
      subtitle: "Rossiyada chet el fuqarolari uchun yashash ruxsatnomasini olish",
      intro:
        "Talabalarga va chet el fuqarolariga Rossiyada RVPO, RVP yoki VNJ olishga yordam beramiz. Mutaxassislarimiz har bir bosqichda — konsultatsiyadan hujjatni olishgacha — yoningizda bo'ladi.",
      features: [
        {
          title: "RVPO (talabalar uchun)",
          desc: "O'qish maqsadidagi vaqtinchalik yashash ruxsati — Rossiya universitetlari talabalari uchun soddalashtirilgan tartib.",
        },
        {
          title: "RVP (Vaqtinchalik yashash ruxsati)",
          desc: "Har qanday toifadagi chet el fuqarolari uchun RVP olish bo'yicha to'liq qo'llab-quvvatlash.",
        },
        {
          title: "VNJ (Yashash guvohnomasi)",
          desc: "Rossiyada uzoq muddatli qonuniy yashash uchun yashash guvohnomasi olishga yordam.",
        },
        {
          title: "Hujjatlarni tayyorlash",
          desc: "Zarur hujjatlarning aniq ro'yxatini tuzamiz va topshirishdan oldin har birini tekshiramiz.",
        },
        {
          title: "Talon olish",
          desc: "MFC yoki GUVM MVDga hujjat topshirish uchun navbat olishga yordam (Moskvadan tashqari).",
        },
        {
          title: "Asoslar bo'yicha konsultatsiya",
          desc: "Ariza berish uchun eng qulay asosni aniqlaymiz va barcha huquqiy nozikliklarni tushuntiramiz.",
        },
      ],
      process: [
        { step: '01', title: 'Konsultatsiya', desc: "Vaziyatni tahlil qilib, to'g'ri hujjat turini tanlaymiz: RVPO, RVP yoki VNJ." },
        { step: '02', title: 'Hujjatlar', desc: "To'liq hujjat to'plamini yig'ish va tekshirishga yordam beramiz." },
        { step: '03', title: 'Topshirish', desc: "Hujjatlarni vakolatli organga topshiramiz, talon olamiz." },
        { step: '04', title: 'Olish', desc: "Tayyor hujjatni olamiz va sizga topshiramiz." },
      ],
      cta: 'Konsultatsiya oling',
    },
  },
};

export const serviceSlugMap: Record<string, ServiceSlug> = {
  university: 'university',
  visa: 'visa',
  transport: 'transport',
  translation: 'translation',
  support: 'support',
  'work-visa': 'work-visa',
  rvp: 'rvp',
};

export const serviceIconMap: Record<ServiceSlug, string> = {
  university: '/assets/core_services/1.png',
  visa: '/assets/core_services/2.png',
  transport: '/assets/core_services/3.png',
  translation: '/assets/core_services/4.png',
  support: '/assets/core_services/5.png',
  'work-visa': '/assets/core_services/6.png',
  rvp: '/assets/contact_icons/rvp.png',
};
