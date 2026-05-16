/* ============================================================
   MEDEU HOTEL — SCRIPT
   ============================================================
   Делает:
   1. Переключение темы (с сохранением в localStorage)
   2. SPA-роутинг через #hash
   3. Реакция шапки на скролл
   4. Мобильное меню и dropdown языка
   5. Карусели (hero + banquet)
   6. Рендер списков (номера, заведения, карточки) из data.js
   7. Lazy-loading фоновых картинок через IntersectionObserver
   ============================================================ */

(function () {
  'use strict';

  // ===== ИКОНКИ (lucide-style SVG как строки) =====
  const ICONS = {
    sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
    pin: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    spa: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c1.25-1.25 2.5-3 2.5-5.5 0-2-1-3.5-2.5-5-1.5 1.5-2.5 3-2.5 5 0 2.5 1.25 4.25 2.5 5.5z"/><path d="M5 12c1.5-1.5 4-2.5 7-2.5s5.5 1 7 2.5c-1.5 1.5-4 2.5-7 2.5s-5.5-1-7-2.5z"/><path d="M12 9.5c.5-2 2-4 4.5-5.5-.5 2.5-2 4.5-4.5 5.5z"/><path d="M12 9.5c-.5-2-2-4-4.5-5.5.5 2.5 2 4.5 4.5 5.5z"/></svg>',
    laundry: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="13" r="5"/><circle cx="12" cy="13" r="2"/><circle cx="8" cy="6.5" r="0.5" fill="currentColor"/><circle cx="11" cy="6.5" r="0.5" fill="currentColor"/></svg>',
    transfer: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h2l1.5-7.5a2 2 0 0 1 2-1.5h7a2 2 0 0 1 2 1.5L19 17h2"/><path d="M3 17v3h2v-3M19 17v3h2v-3"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/><line x1="9" y1="13" x2="15" y2="13"/></svg>',
    bike: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l2 8M8.5 14h6l-3-8H10"/><circle cx="11.5" cy="6" r="0.5" fill="currentColor"/></svg>',
    decor: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-1.5-3-4-3-4-3s0 2.5 3 4"/><path d="M12 8c1.5-3 4-3 4-3s0 2.5-3 4"/><path d="M12 8c-3 0-3 2-3 2s2 0 3-1.5"/><path d="M12 8c3 0 3 2 3 2s-2 0-3-1.5"/><circle cx="12" cy="9.5" r="1.5"/><path d="M12 11v9M9 20h6"/></svg>',
  };

  // ===== ТЕМА =====
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  function getStoredTheme() {
    try {
      return localStorage.getItem('medeu-theme') || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function setTheme(theme) {
    html.classList.remove('theme-light', 'theme-dark');
    html.classList.add('theme-' + theme);
    themeToggle.innerHTML = theme === 'light' ? ICONS.moon : ICONS.sun;
    try { localStorage.setItem('medeu-theme', theme); } catch (e) {}

    // Поменять theme-color мету (для мобильной адресной строки)
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#FAF7F0' : '#0A0908');
  }

  setTheme(getStoredTheme());

  themeToggle.addEventListener('click', function () {
    const current = html.classList.contains('theme-light') ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });

  // ===== ИКОНКА МОБИЛЬНОГО МЕНЮ =====
  const menuMobileIcon = document.getElementById('menu-mobile-icon');
  menuMobileIcon.innerHTML = ICONS.menu;

  // ===== РОУТИНГ =====
  const pages = {
    home: document.getElementById('page-home'),
    rooms: document.getElementById('page-rooms'),
    restaurant: document.getElementById('page-restaurant'),
    banquet: document.getElementById('page-banquet'),
    services: document.getElementById('page-services'),
    contacts: document.getElementById('page-contacts'),
  };

  const waLabels = {
    home: 'Связь',
    rooms: 'Связь',
    restaurant: 'Ресторан',
    banquet: 'Банкетный менеджер',
    contacts: 'Связь',
  };

  function navigate(pageId) {
    if (!pages[pageId]) pageId = 'home';

    Object.keys(pages).forEach(function (k) {
      pages[k].classList.toggle('page--active', k === pageId);
    });

    document.querySelectorAll('[data-nav]').forEach(function (el) {
      el.classList.toggle('is-active', el.dataset.nav === pageId);
    });

    // WhatsApp кнопка
    const waLabel = document.getElementById('wa-label');
    const waFloat = document.getElementById('wa-float');
    waLabel.textContent = waLabels[pageId] || 'Связь';

    let waNumber = DATA.contacts.waReception;
    if (pageId === 'restaurant') waNumber = DATA.contacts.waRestaurant;
    if (pageId === 'banquet') waNumber = DATA.contacts.waBanquet;
    waFloat.href = 'https://wa.me/' + waNumber.replace(/[^0-9]/g, '');

    // Прокрутка в верх
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Запустить lazy-load для новой страницы
    triggerLazyLoad();
  }

  // Клик по любому элементу с data-nav
  document.addEventListener('click', function (e) {
    const target = e.target.closest('[data-nav]');
    if (!target) return;
    e.preventDefault();
    const pageId = target.dataset.nav;
    if (window.location.hash !== '#' + pageId) {
      window.location.hash = pageId;
    } else {
      navigate(pageId);
    }
    closeMobileMenu();
  });

  // Реакция на смену hash в URL
  window.addEventListener('hashchange', function () {
    const pageId = window.location.hash.slice(1) || 'home';
    navigate(pageId);
  });

  // ===== СКРОЛЛ ШАПКИ =====
  const header = document.getElementById('header');
  const headerGradient = document.querySelector('.header-gradient');

  function onScroll() {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('header--scrolled', scrolled);
    header.classList.toggle('header--on-hero', !scrolled);
    // header-gradient теперь всегда видим — он всегда поверх всех слоёв (carltonmoscow.com style)
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== МОБИЛЬНОЕ МЕНЮ =====
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navDropdown = document.getElementById('nav-dropdown');

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    menuMobileIcon.innerHTML = ICONS.menu;
  }

  menuBtn.addEventListener('click', function () {
    if (window.innerWidth >= 768) return; // десктоп: hover открывает nav-dropdown
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuMobileIcon.innerHTML = isOpen ? ICONS.close : ICONS.menu;
  });

  // Hover на меню на десктопе → открывает nav-dropdown
  menuBtn.addEventListener('mouseenter', function () {
    if (window.innerWidth >= 768) navDropdown.classList.add('is-open');
  });
  navDropdown.addEventListener('mouseenter', function () {
    navDropdown.classList.add('is-open');
  });
  navDropdown.addEventListener('mouseleave', function () {
    navDropdown.classList.remove('is-open');
  });

  // ===== ЯЗЫКОВОЙ DROPDOWN =====
  const langWrap = document.getElementById('lang-wrap');
  const currentLangEl = document.getElementById('current-lang');

  langWrap.addEventListener('mouseenter', function () {
    langWrap.classList.add('is-open');
  });
  langWrap.addEventListener('mouseleave', function () {
    langWrap.classList.remove('is-open');
  });

  document.querySelectorAll('.lang-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.lang-item').forEach(function (i) {
        i.classList.remove('is-active');
      });
      item.classList.add('is-active');
      currentLangEl.textContent = item.dataset.lang;
      langWrap.classList.remove('is-open');
      // Реальное переключение языков пока не реализовано (только RU в v1)
    });
  });

  // ===== КАРУСЕЛЬ (универсальная) =====
  function initCarousel(containerId, slides, dotsId, interval) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Создать слайды
    slides.forEach(function (src, i) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide' + (i === 0 ? ' is-active' : '');
      slide.style.backgroundImage = 'url(' + src + ')';
      container.insertBefore(slide, container.firstChild);
    });

    // Создать точки
    const dotsWrap = document.getElementById(dotsId);
    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
      dot.addEventListener('click', function () { setActive(i); });
      dotsWrap.appendChild(dot);
    });

    let active = 0;
    const slideEls = container.querySelectorAll('.carousel-slide');
    const dotEls = dotsWrap.querySelectorAll('.carousel-dot');

    function setActive(i) {
      slideEls[active].classList.remove('is-active');
      dotEls[active].classList.remove('is-active');
      active = i;
      slideEls[active].classList.add('is-active');
      dotEls[active].classList.add('is-active');
    }

    setInterval(function () {
      setActive((active + 1) % slides.length);
    }, interval || 6000);
  }

  // Запуск каруселей
  initCarousel('hero-carousel', DATA.heroSlides, 'hero-dots', 6000);
  initCarousel('banquet-carousel', DATA.banquetSlides, 'banquet-dots', 6000);

  // ===== РЕНДЕР: 4 категории на главной =====
  const facilityGrid = document.getElementById('facility-grid');
  facilityGrid.innerHTML = DATA.facilities.map(function (f) {
    return ''
      + '<a href="#' + f.id + '" data-nav="' + f.id + '" class="facility-card">'
      +   '<div class="facility-card__image lazy-bg img-skeleton" data-bg="' + f.img + '"></div>'
      +   '<div class="facility-card__overlay"></div>'
      +   '<div class="facility-card__content">'
      +     '<div class="hero-overline" style="margin-bottom: 12px; font-size: 10px;">Категория</div>'
      +     '<h3 class="facility-card__title">' + f.name + '</h3>'
      +     '<p class="facility-card__desc">' + f.desc + '</p>'
      +     '<div class="facility-card__cta"><span>Перейти</span>' + ICONS.arrow + '</div>'
      +   '</div>'
      + '</a>';
  }).join('');

  // ===== РЕНДЕР: НОМЕРА =====
  const roomsStack = document.getElementById('rooms-stack');
  roomsStack.innerHTML = DATA.rooms.map(function (room, idx) {
    const num = idx + 1 < 10 ? '0' + (idx + 1) : '' + (idx + 1);
    const reverse = idx % 2 === 1;
    return ''
      + '<div class="room-row' + (reverse ? ' room-row--reverse' : '') + '">'
      +   '<div class="room-image-wrap">'
      +     '<div class="room-image lazy-bg img-skeleton" data-bg="' + room.image + '"></div>'
      +     '<div class="room-number">' + num + '</div>'
      +   '</div>'
      +   '<div class="room-info">'
      +     '<div class="overline" style="margin-bottom: 12px;">Категория · ' + room.area + '</div>'
      +     '<h3 class="display-h3">' + room.name + '</h3>'
      +     '<div class="vignette my-6">'
      +       '<span class="vignette-line"></span>'
      +       '<svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true">'
      +         '<path d="M14 1 L20 5 L14 9 L8 5 Z" fill="none" stroke="currentColor" stroke-width="0.6" style="color: var(--c-gold);"/>'
      +         '<circle cx="14" cy="5" r="0.8" fill="currentColor" style="color: var(--c-gold);"/>'
      +       '</svg>'
      +       '<span class="vignette-line"></span>'
      +     '</div>'
      +     '<p class="body-prose">' + room.description + '</p>'
      +     '<div class="room-bottom">'
      +       '<div><div class="overline">Цена за сутки</div><div class="price">' + room.price + '</div></div>'
      +       '<button class="gold-btn gold-btn--sm" onclick="alert(\'Бронирование: ' + room.name + '\')">'
      +         '<span class="gold-btn__bg"></span>'
      +         '<span class="gold-btn__label">Забронировать</span>'
      +       '</button>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }).join('');

  // ===== РЕНДЕР: РЕСТОРАН =====
  const venuesStack = document.getElementById('venues-stack');
  venuesStack.innerHTML = DATA.venues.map(function (venue, idx) {
    const num = '0' + (idx + 1);
    const reverse = idx % 2 === 1;
    return ''
      + '<div class="venue-row' + (reverse ? ' venue-row--reverse' : '') + '">'
      +   '<div class="venue-image-wrap">'
      +     '<div class="venue-image lazy-bg img-skeleton" data-bg="' + venue.image + '"></div>'
      +     '<div class="venue-image-meta">'
      +       '<span class="venue-number">№ ' + num + '</span>'
      +       '<span class="venue-image-subtitle">' + venue.subtitle + '</span>'
      +     '</div>'
      +   '</div>'
      +   '<div class="venue-info">'
      +     '<h3 class="display-h3">' + venue.name + '<span class="venue-subtitle">«' + venue.subtitle + '»</span></h3>'
      +     '<div class="vignette my-6">'
      +       '<span class="vignette-line"></span>'
      +       '<svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true">'
      +         '<path d="M14 1 L20 5 L14 9 L8 5 Z" fill="none" stroke="currentColor" stroke-width="0.6" style="color: var(--c-gold);"/>'
      +         '<circle cx="14" cy="5" r="0.8" fill="currentColor" style="color: var(--c-gold);"/>'
      +       '</svg>'
      +       '<span class="vignette-line"></span>'
      +     '</div>'
      +     '<p class="venue-tagline">' + venue.tagline + '</p>'
      +     '<p class="body-prose">' + venue.description + '</p>'
      +     '<div style="margin-top: 32px;">'
      +       '<a href="https://wa.me/' + DATA.contacts.waRestaurant + '?text=' + encodeURIComponent('Здравствуйте! Хочу забронировать «' + venue.name + '».') + '" target="_blank" rel="noopener noreferrer" class="gold-btn gold-btn--sm">'
      +         '<span class="gold-btn__bg"></span>'
      +         '<span class="gold-btn__label">Забронировать</span>'
      +       '</a>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }).join('');

  // ===== РЕНДЕР: УСЛУГИ =====
  const servicesList = document.getElementById('services-list');
  if (servicesList && DATA.services) {
    servicesList.innerHTML = DATA.services.map(function (service, idx) {
      const num = '0' + (idx + 1);
      const icon = ICONS[service.icon] || ICONS.phone;
      const hoursLine = service.hours
        ? '<div class="service-meta-row"><span class="overline">Часы</span> ' + service.hours + '</div>'
        : '';
      const phoneClean = service.phone.replace(/[^\d+]/g, '');
      const waText = encodeURIComponent('Здравствуйте! Хочу узнать подробнее об услуге «' + service.name + '».');
      return ''
        + '<div class="service-card">'
        +   '<div class="service-card-num">№ ' + num + '</div>'
        +   '<div class="service-icon">' + icon + '</div>'
        +   '<h3 class="service-name">' + service.name + '</h3>'
        +   '<p class="service-subtitle">' + service.subtitle + '</p>'
        +   '<div class="service-divider"></div>'
        +   '<p class="service-desc">' + service.description + '</p>'
        +   hoursLine
        +   '<div class="service-actions">'
        +     '<a href="tel:' + phoneClean + '" class="service-phone">' + service.phone + '</a>'
        +     '<a href="https://wa.me/' + service.waNumber + '?text=' + waText + '" target="_blank" rel="noopener noreferrer" class="service-wa" aria-label="WhatsApp">'
        +       '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>'
        +     '</a>'
        +   '</div>'
        + '</div>';
    }).join('');
  }

  // ===== РЕНДЕР: КОНТАКТЫ =====
  const contactsGrid = document.getElementById('contacts-grid');
  contactsGrid.innerHTML = ''
    + '<div class="contact-card">'
    +   '<div style="color: var(--c-gold); margin: 0 auto 24px; display: inline-block;">' + ICONS.phone + '</div>'
    +   '<div class="overline" style="margin-bottom: 12px;">Телефон</div>'
    +   '<div class="contact-value">' + DATA.contacts.phone1 + '</div>'
    +   '<div class="contact-secondary">' + DATA.contacts.phone2 + '</div>'
    + '</div>'
    + '<div class="contact-card">'
    +   '<div style="color: var(--c-gold); margin: 0 auto 24px; display: inline-block;">' + ICONS.pin + '</div>'
    +   '<div class="overline" style="margin-bottom: 12px;">Адрес</div>'
    +   '<div class="contact-value">' + DATA.contacts.address + '</div>'
    +   '<div class="contact-secondary">центр города</div>'
    + '</div>'
    + '<div class="contact-card">'
    +   '<div style="color: var(--c-gold); margin: 0 auto 24px; display: inline-block;">' + ICONS.mail + '</div>'
    +   '<div class="overline" style="margin-bottom: 12px;">Почта</div>'
    +   '<div class="contact-value">' + DATA.contacts.email + '</div>'
    +   '<div class="contact-secondary">круглосуточно</div>'
    + '</div>';

  // ===== Заполнение контактов на главной =====
  document.getElementById('addr-value').textContent = DATA.contacts.address;
  document.getElementById('phone1-value').textContent = DATA.contacts.phone1;
  document.getElementById('phone2-value').textContent = DATA.contacts.phone2;
  document.getElementById('email-value').textContent = DATA.contacts.email;
  document.getElementById('btn-2gis').href = DATA.contacts.gis2Url;
  document.getElementById('btn-google').href = DATA.contacts.googleUrl;

  // ===== Контакты в футере =====
  document.getElementById('footer-contacts').innerHTML =
    DATA.contacts.phone1 + '<br>' +
    DATA.contacts.phone2 + '<br>' +
    DATA.contacts.email;

  // ===== Год в футере =====
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== Конференц-зал фон =====
  const confImg = document.getElementById('conference-image');
  if (confImg) {
    confImg.classList.add('lazy-bg', 'img-skeleton');
    confImg.dataset.bg = DATA.conferenceImage;
  }

  // ===== Map-visual: теперь 2GIS виджет (вставлен в HTML, фон не нужен) =====

  // ===== Page-hero фоны (берутся из DATA.pageHero) =====
  document.querySelectorAll('.page-hero[data-page-hero]').forEach(function (el) {
    const pageId = el.dataset.pageHero;
    const bg = DATA.pageHero && DATA.pageHero[pageId];
    if (bg) {
      el.dataset.bg = bg;
      el.dataset.bgOverlay = 'linear-gradient(180deg, rgba(10,9,8,0.4), rgba(10,9,8,0.85))';
      el.classList.add('lazy-bg');
    }
  });

  // ===== LAZY LOADING фоновых картинок =====
  // Грузим изображение только когда блок появляется в viewport
  function triggerLazyLoad() {
    const targets = document.querySelectorAll('.lazy-bg:not(.is-loaded)');

    if (!('IntersectionObserver' in window)) {
      // Старый браузер — грузим всё сразу
      targets.forEach(loadBg);
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          loadBg(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  function loadBg(el) {
    const url = el.dataset.bg;
    const overlay = el.dataset.bgOverlay;
    if (!url) return;

    const img = new Image();
    img.onload = function () {
      if (overlay) {
        el.style.backgroundImage = overlay + ', url(' + url + ')';
      } else {
        el.style.backgroundImage = 'url(' + url + ')';
      }
      el.classList.add('is-loaded');
      el.classList.remove('img-skeleton');
    };
    img.src = url;
  }

  triggerLazyLoad();

  // ===== Стартовая навигация (по hash из URL) =====
  const initialPage = window.location.hash.slice(1) || 'home';
  navigate(initialPage);

})();
