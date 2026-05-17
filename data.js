/* ============================================================
   MEDEU HOTEL — ДАННЫЕ САЙТА
   ============================================================
   ВСЕ ФОТО, ЦЕНЫ И ТЕКСТЫ В ОДНОМ МЕСТЕ.
   Чтобы заменить — меняйте только этот файл.
   ============================================================ */

const DATA = {

  // ============================================================
  // ГЛАВНАЯ — карусель hero
  // ============================================================
  heroSlides: [
    'assets/photos/home/home-4.webp',         // Главная 4 — фасад вечером
    'assets/photos/banquet/main-10.webp',          // Банкет 10 — белый зал с люстрами
    'assets/photos/restaurant/billiard-1.webp',         // Бильярд 1 — камин
    'assets/photos/restaurant/veranda-7.webp',         // Летняя веранда 7
  ],

  // 4 категории на главной
  facilities: [
    {
      id: 'rooms',
      name: 'Номера',
      nameKey: 'facilities.rooms_name',
      desc: 'Шесть категорий — от стандарта до апартаментов',
      descKey: 'facilities.rooms_desc',
      img: 'assets/photos/rooms/apartments-1.webp',  // Апартаменты 1
    },
    {
      id: 'restaurant',
      name: 'Гастрономия',
      nameKey: 'facilities.restaurant_name',
      desc: 'Пространство сдержанной элегантности',
      descKey: 'facilities.restaurant_desc',
      img: 'assets/photos/restaurant/veranda-11.webp', // Летняя веранда 11
    },
    {
      id: 'banquet',
      name: 'Банкетный зал',
      nameKey: 'facilities.banquet_name',
      desc: 'Для торжеств и деловых событий',
      descKey: 'facilities.banquet_desc',
      img: 'assets/photos/banquet/main-7.webp',   // Банкет 7
    },
    {
      id: 'contacts',
      name: 'Контакты',
      nameKey: 'facilities.contacts_name',
      desc: 'Связь и расположение',
      descKey: 'facilities.contacts_desc',
      img: 'assets/photos/restaurant/billiard-4.webp',    // Бильярд 4
    },
  ],

  // ============================================================
  // НОМЕРА — фотографии по выбору заказчика
  // ============================================================
  rooms: [
    {
      name: 'Стандарт',
      nameKey: 'rooms.standard_name',
      area: '27',
      price: '28 000 ₸',
      description: 'Одноместный номер с полуторной кроватью (140×200). Мини-бар, кондиционер, кабельное ТВ, беспроводной интернет, телефон с междугородним подключением, сейф. Завтрак включён в стоимость.',
      descKey: 'rooms.standard_desc',
      image: 'assets/photos/rooms/standard-2.webp', // Стандарт 2 — спальня
    },
    {
      name: 'Полулюкс',
      nameKey: 'rooms.polulux_name',
      area: '48',
      price: '34 000 ₸',
      description: 'Просторный номер с двуспальной кроватью 180×200. Возможно двухместное размещение с доплатой. Полный набор удобств: мини-бар, кондиционер, кабельное ТВ, интернет, сейф. Завтрак включён.',
      descKey: 'rooms.polulux_desc',
      image: 'assets/photos/rooms/polulux-1.webp', // Полулюкс 1
    },
    {
      name: 'Двухместный полулюкс',
      nameKey: 'rooms.polulux_twin_name',
      area: '27',
      price: '45 000 ₸',
      description: 'Две раздельные кровати 120×200 — идеально для двух гостей. Мини-бар, кондиционер, кабельное ТВ, интернет, сейф. Завтрак включён.',
      descKey: 'rooms.polulux_twin_desc',
      image: 'assets/photos/rooms/polulux-twin-2.webp', // Полулюкс с раздельными 2 ← по выбору заказчика
    },
    {
      name: 'Семейный',
      nameKey: 'rooms.family_name',
      area: '65',
      price: '55 000 ₸',
      description: 'Три комнаты: две спальни и гостиная. Трёхместное или четырёхместное размещение. Полный набор удобств. Завтрак включён в стоимость номера.',
      descKey: 'rooms.family_desc',
      image: 'assets/photos/rooms/family-1.webp', // Семейный 1 ← по выбору заказчика
    },
    {
      name: 'Люкс',
      nameKey: 'rooms.lux_name',
      area: '65',
      price: '44 000 ₸',
      description: 'Две комнаты: спальня и гостиная. Двуспальная кровать 180×200. Мини-бар, кондиционер, кабельное ТВ, интернет, сейф. Завтрак включён.',
      descKey: 'rooms.lux_desc',
      image: 'assets/photos/rooms/lux-1.webp', // Люкс 1 ← по выбору заказчика
    },
    {
      name: 'Апартамент',
      nameKey: 'rooms.apartments_name',
      area: '130',
      price: '100 000 ₸',
      description: 'Высшая категория. Три комнаты: спальня, гостиная с обеденной и мягкой зонами, отдельный кабинет. Душевая кабина и джакузи, двуспальная кровать 180×200. Полный набор удобств, комплимент от гостиницы — свежие фрукты по приезду.',
      descKey: 'rooms.apartments_desc',
      image: 'assets/photos/rooms/apartments-4.webp', // Апартаменты 4 ← по выбору заказчика
    },
  ],

  // ============================================================
  // РЕСТОРАН — 4 пространства, тексты от заказчика
  // ============================================================
  venues: [
    {
      name: 'Летняя веранда',
      nameKey: 'venues.veranda_name',
      subtitle: 'Medeu',
      subtitleKey: 'venues.veranda_subtitle',
      tagline: 'Оазис в самом центре города',
      taglineKey: 'venues.veranda_tagline',
      description: 'Первый этаж расположен в тени деревьев. Комфортные мягкие зоны готовы принять самых искушённых гостей. Отлично подходит для семейного отдыха — есть прекрасная детская зона с батутом, где маленьким гостям не будет скучно.',
      descKey: 'venues.veranda_desc',
      image: 'assets/photos/restaurant/veranda-7.webp',
    },
    {
      name: 'Lounge-ресторан',
      nameKey: 'venues.medeu_name',
      subtitle: 'Medeu',
      subtitleKey: 'venues.medeu_subtitle',
      tagline: 'Пространство с атмосферой сдержанной элегантности',
      taglineKey: 'venues.medeu_tagline',
      description: 'Эффектное двухуровневое пространство с комфортной посадкой и атмосферой lounge-ресторана. Создано для гастрономических встреч и деловых ужинов. Работаем ежедневно с 07:30 до 01:00. Шведский стол — 07:30–10:30 (5 000 ₸/чел). Бизнес-ланчи по будням 12:00–15:00.',
      descKey: 'venues.medeu_desc',
      image: 'assets/photos/restaurant/medeu-6.webp', // Ресторан Medeu 6 — горизонтальный кадр от заказчика
    },
    {
      name: 'Lounge-пространство с караоке',
      nameKey: 'venues.karaoke_name',
      subtitle: 'kazakhka',
      subtitleKey: 'venues.karaoke_subtitle',
      tagline: 'В атмосфере паназиатской эстетики',
      taglineKey: 'venues.karaoke_tagline',
      description: 'Уютное приватное пространство, сочетающее современный интерьер, атмосферу паназиатского стиля и комфортный формат отдыха для небольших компаний и закрытых мероприятий. Аренда — 6 000 ₸/час, после 24:00 — 10 000 ₸/час.',
      descKey: 'venues.karaoke_desc',
      image: 'assets/photos/restaurant/karaoke-1.webp',
    },
    {
      name: 'Камерный зал',
      nameKey: 'venues.billiard_name',
      subtitle: 'Бильярд',
      subtitleKey: 'venues.billiard_subtitle',
      tagline: 'Пространство для приватных мероприятий',
      taglineKey: 'venues.billiard_tagline',
      description: 'Элегантное пространство с атмосферой уединённого комфорта, идеально подходящее для частных встреч, семейных торжеств и закрытых мероприятий. Современный европейский интерьер с акцентом на комфорт и приватность.',
      descKey: 'venues.billiard_desc',
      image: 'assets/photos/restaurant/billiard-3.webp', // Бильярд 3 — гостиная с камином (выбор заказчика)
    },
  ],

  // ============================================================
  // БАНКЕТНЫЙ ЗАЛ — только подготовленные интерьеры
  // ============================================================
  banquetSlides: [
    'assets/photos/banquet/main-7.webp',
    'assets/photos/banquet/main-10.webp',
    'assets/photos/banquet/main-9.webp',
  ],
  conferenceImage: 'assets/photos/banquet/conference-1.webp',

  // ============================================================
  // УСЛУГИ — отдельная страница (#services)
  // ============================================================
  services: [
    {
      name: 'Thai SPA',
      nameKey: 'services.spa_name',
      subtitle: 'Тайский массаж и СПА',
      subtitleKey: 'services.spa_subtitle',
      description: 'Тайский массаж, СПА-программы, хамам, бассейн. Работают мастера из Таиланда. Гостям гостиницы — скидка 10%.',
      descKey: 'services.spa_desc',
      phone: '+7 (707) 587-90-90',
      waNumber: '77075879090',
      icon: 'spa',
    },
    {
      name: 'Химчистка',
      nameKey: 'services.laundry_name',
      subtitle: 'Услуги прачечной',
      subtitleKey: 'services.laundry_subtitle',
      description: 'Стирка, химчистка, глажка одежды. Работаем ежедневно с 8:00 до 20:00. Срочные заказы — по согласованию.',
      descKey: 'services.laundry_desc',
      phone: '+7 (707) 317-88-95',
      waNumber: '77073178895',
      hours: '8:00 – 20:00 ежедневно',
      hoursKey: 'services.laundry_hours',
      icon: 'laundry',
    },
    {
      name: 'Трансфер',
      nameKey: 'services.transfer_name',
      subtitle: 'Аэропорт, вокзал, выезды',
      subtitleKey: 'services.transfer_subtitle',
      description: 'Трансфер «гостиница ↔ аэропорт», встреча с табличкой, почасовая аренда автомобиля с водителем, выезды по области.',
      descKey: 'services.transfer_desc',
      phone: '+7 (7142) 545-845',
      waNumber: '77714944599',
      icon: 'transfer',
    },
    {
      name: 'Прокат велосипедов',
      nameKey: 'services.bike_name',
      subtitle: 'Для прогулок по городу',
      subtitleKey: 'services.bike_subtitle',
      description: 'Прокат велосипедов для прогулок по Костанаю. Удобный способ познакомиться с городом в тёплое время года.',
      descKey: 'services.bike_desc',
      phone: '+7 (7142) 545-845',
      waNumber: '77714944599',
      icon: 'bike',
    },
    {
      name: 'Оформление праздничного стола',
      nameKey: 'services.decor_name',
      subtitle: 'Декор для торжеств',
      subtitleKey: 'services.decor_subtitle',
      description: 'Оформление праздничного стола цветами и декором для дней рождения, юбилеев, корпоративов в нашем ресторане или банкетном зале.',
      descKey: 'services.decor_desc',
      phone: '+7 (775) 521-57-06',
      waNumber: '77755215706',
      icon: 'decor',
    },
  ],

  // Restoplace widget ID (из ТЗ)
  restoplaceId: '57d0bcbf4b55ea8a0b4f',

  // ============================================================
  // PAGE-HERO фоны для подстраниц
  // ============================================================
  pageHero: {
    rooms:      'assets/photos/rooms/lux-1.webp',
    restaurant: 'assets/photos/restaurant/veranda-7.webp',
    banquet:    'assets/photos/banquet/main-10.webp',
    services:   'assets/photos/restaurant/billiard-4.webp', // Бильярд 4 — элегантный интерьер
  },

  // ============================================================
  // КОНТАКТЫ
  // ============================================================
  contacts: {
    address: 'Республика Казахстан, г. Костанай, ул. Баймагамбетова 166а',

    phone1: '+7 (7142) 545-845',
    phone2: '+7 (771) 494-45-99',
    email:  'info@medeuhotel.kz',

    hotelPhones: [
      { label: 'Ресепшн',       number: '+7 (7142) 545-845' },
      { label: 'Факс',          number: '+7 (7142) 545-945' },
      { label: 'Моб. ресепшн',  number: '+7 (771) 494-45-99' },
    ],
    restaurantPhones: [
      { label: 'Администратор',      number: '+7 (7142) 545-884' },
      { label: 'Моб. администратор', number: '+7 (707) 329-16-35' },
      { label: 'Банкетный зал',      number: '+7 (775) 521-57-06' },
    ],
    laundry: {
      hours: '8:00 – 20:00 ежедневно',
      phone: '+7 (707) 317-88-95',
    },

    waReception:  '77714944599',
    waRestaurant: '77073291635',
    waBanquet:    '77755215706',

    // ============================================================
    // FORMSPREE — endpoint для отправки заявок на email
    // ============================================================
    // 1. Зарегистрируйся на https://formspree.io (5 минут)
    // 2. Создай форму, укажи email менеджера (например info@medeuhotel.kz)
    // 3. Скопируй URL формы вида https://formspree.io/f/xxxxxxx
    // 4. Подставь ниже — и форма реально начнёт слать на почту
    //
    // Пока строка пустая — форма открывает почтовый клиент пользователя (mailto:)
    formspreeUrl: '',
    bookingEmail: 'info@medeuhotel.kz',

    instagram: 'https://www.instagram.com/hotel_medeu_kostanay/',
    facebook:  '',

    // Карты — прямые ссылки на отель
    gis2Url:   'https://go.2gis.com/M2V07',
    googleUrl: 'https://maps.app.goo.gl/ndN3XnVWUE4iur318',
  },
};
