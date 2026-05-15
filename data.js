/* ============================================================
   MEDEU HOTEL — ДАННЫЕ САЙТА
   ============================================================
   ВСЕ ФОТО И ТЕКСТЫ В ОДНОМ МЕСТЕ.
   Когда придут реальные фотографии — меняйте только этот файл,
   остальной код трогать не нужно.

   Unsplash URLs сейчас — это плейсхолдеры. Параметры
   ?w=1920&q=80&auto=format&fit=crop отдают webp если браузер
   поддерживает и автоматически сжимают.

   Для прода замените на:
   - Прямые ссылки ibb.co (фото уже на CDN — оптимально)
   - Локальные WebP-файлы (если будете хостить сами)
   ============================================================ */

const DATA = {

  // ============================================================
  // ГЛАВНАЯ СТРАНИЦА — карусель на hero
  // ============================================================
  heroSlides: [
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80&auto=format&fit=crop',
  ],

  // 4 категории на главной
  facilities: [
    {
      id: 'rooms',
      name: 'Номера',
      desc: 'Шесть категорий — от стандарта до апартаментов',
      img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80&auto=format&fit=crop',
    },
    {
      id: 'restaurant',
      name: 'Ресторан',
      desc: 'Пространство сдержанной элегантности',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop',
    },
    {
      id: 'banquet',
      name: 'Банкетный зал',
      desc: 'Для торжеств и деловых событий',
      img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&auto=format&fit=crop',
    },
    {
      id: 'contacts',
      name: 'Контакты',
      desc: 'Связь и расположение',
      img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80&auto=format&fit=crop',
    },
  ],

  // ============================================================
  // НОМЕРА — 6 категорий
  // ============================================================
  rooms: [
    {
      name: 'Стандарт',
      area: '18 м²',
      price: '25 000 ₸',
      description: 'Уютный номер с одной двуспальной или двумя односпальными кроватями. Кондиционер, рабочая зона, бесплатный Wi-Fi. Завтрак включён.',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80&auto=format&fit=crop',
    },
    {
      name: 'Полулюкс',
      area: '24 м²',
      price: '40 000 ₸',
      description: 'Просторная комната с зоной отдыха. Двуспальная кровать, мини-бар, рабочее место, кабельное ТВ и проводной интернет.',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=80&auto=format&fit=crop',
    },
    {
      name: 'Двухместный полулюкс',
      area: '28 м²',
      price: '50 000 ₸',
      description: 'Идеален для двух гостей. Две раздельные кровати, расширенная зона отдыха, мини-бар, сейф.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=80&auto=format&fit=crop',
    },
    {
      name: 'Семейный',
      area: '40 м²',
      price: '75 000 ₸',
      description: 'Двухкомнатный номер для семьи. Спальня и гостиная, четыре спальных места, удобства для детей.',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&q=80&auto=format&fit=crop',
    },
    {
      name: 'Люкс',
      area: '65 м²',
      price: '100 000 ₸',
      description: 'Две комнаты: спальня и гостиная. Спальное место 180×200, мини-бар, кондиционер, кабельное ТВ. Комплимент от гостиницы.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80&auto=format&fit=crop',
    },
    {
      name: 'Апартамент',
      area: '85 м²',
      price: '150 000 ₸',
      description: 'Высшая категория. Просторная гостиная, отдельная спальня, рабочий кабинет. Премиальные удобства, индивидуальное обслуживание.',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1600&q=80&auto=format&fit=crop',
    },
  ],

  // ============================================================
  // РЕСТОРАН — 4 пространства
  // ============================================================
  venues: [
    {
      name: 'Летняя веранда',
      subtitle: 'Medeu',
      tagline: 'Оазис в сердце города',
      description: 'Первый этаж расположен в тени деревьев. Комфортные мягкие зоны, готовые принять самых искушённых гостей. Отлично подойдёт для семейного отдыха — у нас есть прекрасная детская зона с батутом, где маленьким гостям не будет скучно.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&auto=format&fit=crop',
    },
    {
      name: 'Ресторан',
      subtitle: 'Medeu',
      tagline: 'Пространство с атмосферой сдержанной элегантности',
      description: 'Создан для гастрономических встреч и деловых ужинов. Эффектное двухуровневое пространство с комфортной посадкой и атмосферой lounge-ресторана.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&auto=format&fit=crop',
    },
    {
      name: 'Lounge с караоке',
      subtitle: 'kazakhka',
      tagline: 'В атмосфере паназиатской эстетики',
      description: 'Камерное пространство с продуманным светом и звуком. Идеально для дружеских и корпоративных вечеров в кругу избранных гостей.',
      image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1600&q=80&auto=format&fit=crop',
    },
    {
      name: 'Камерный зал',
      subtitle: 'Бильярд',
      tagline: 'Пространство для приватных мероприятий',
      description: 'Элегантное пространство с атмосферой уединённого комфорта, идеально подходящее для частных встреч, семейных торжеств и закрытых мероприятий.',
      image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1600&q=80&auto=format&fit=crop',
    },
  ],

  // ============================================================
  // БАНКЕТНЫЙ ЗАЛ — карусель + конференц
  // ============================================================
  banquetSlides: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=1920&q=80&auto=format&fit=crop',
  ],
  conferenceImage: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1600&q=80&auto=format&fit=crop',

  // Restoplace widget ID (из ТЗ)
  restoplaceId: '57d0bcbf4b55ea8a0b4f',

  // ============================================================
  // КОНТАКТЫ
  // ============================================================
  contacts: {
    phone1: '+7 (7142) 545-845',
    phone2: '8 771 494 45 99',
    email: 'info@medeuhotel.kz',
    address: 'г. Костанай, центр города',
    waReception: '77714944599',     // WhatsApp общий — уточнить
    waRestaurant: '77714944599',    // WhatsApp ресторана — уточнить у клиента
    waBanquet: '77714944599',       // WhatsApp банкетного менеджера — уточнить
    gis2Url: 'https://2gis.kz/kostanay',
    googleUrl: 'https://maps.google.com',
    // mapEmbedUrl: '<iframe src="..."></iframe>'  // когда будет точная карта
  },

  // Большое фоновое изображение для map-секции
  mapBackgroundImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1600&q=80&auto=format&fit=crop',
};
