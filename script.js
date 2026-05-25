(function() {
  'use strict';
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
    decor: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-1.5-3-4-3-4-3s0 2.5 3 4"/><path d="M12 8c1.5-3 4-3 4-3s0 2.5-3 4"/><path d="M12 8c-3 0-3 2-3 2s2 0 3-1.5"/><path d="M12 8c3 0 3 2 3 2s-2 0-3-1.5"/><circle cx="12" cy="9.5" r="1.5"/><path d="M12 11v9M9 20h6"/></svg>'
  };
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
    try {
      localStorage.setItem('medeu-theme', theme);
    } catch (e) {}
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#FAF7F0' : '#0A0908');
  }
  setTheme(getStoredTheme());
  themeToggle.addEventListener('click', function() {
    const current = html.classList.contains('theme-light') ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
  const menuMobileIcon = document.getElementById('menu-mobile-icon');
  menuMobileIcon.innerHTML = ICONS.menu;
  const pages = {
    home: document.getElementById('page-home'),
    rooms: document.getElementById('page-rooms'),
    restaurant: document.getElementById('page-restaurant'),
    banquet: document.getElementById('page-banquet'),
    services: document.getElementById('page-services'),
    contacts: document.getElementById('page-contacts')
  };
  function navigate(pageId) {
    if (!pages[pageId]) pageId = 'home';
    Object.keys(pages).forEach(function(k) {
      pages[k].classList.toggle('page--active', k === pageId);
    });
    document.querySelectorAll('[data-nav]').forEach(function(el) {
      el.classList.toggle('is-active', el.dataset.nav === pageId);
    });
    const waFloat = document.getElementById('wa-float');
    let waNumber = DATA.contacts.waReception;
    if (pageId === 'restaurant') waNumber = DATA.contacts.waRestaurant;
    if (pageId === 'banquet') waNumber = DATA.contacts.waBanquet;
    if (waFloat) waFloat.href = 'https://wa.me/' + waNumber.replace(/[^0-9]/g, '');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    triggerLazyLoad();
  }
  document.addEventListener('click', function(e) {
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
  window.addEventListener('hashchange', function() {
    const pageId = window.location.hash.slice(1) || 'home';
    navigate(pageId);
  });
  const header = document.getElementById('header');
  const headerGradient = document.querySelector('.header-gradient');
  function onScroll() {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('header--scrolled', scrolled);
    header.classList.toggle('header--on-hero', !scrolled);
  }
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
  onScroll();
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navDropdown = document.getElementById('nav-dropdown');
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    menuMobileIcon.innerHTML = ICONS.menu;
  }
  menuBtn.addEventListener('click', function() {
    if (window.innerWidth >= 768) return;
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuMobileIcon.innerHTML = isOpen ? ICONS.close : ICONS.menu;
  });
  menuBtn.addEventListener('mouseenter', function() {
    if (window.innerWidth >= 768) navDropdown.classList.add('is-open');
  });
  navDropdown.addEventListener('mouseenter', function() {
    navDropdown.classList.add('is-open');
  });
  navDropdown.addEventListener('mouseleave', function() {
    navDropdown.classList.remove('is-open');
  });
  const langWrap = document.getElementById('lang-wrap');
  const currentLangEl = document.getElementById('current-lang');
  const LANG_LABELS = {
    ru: 'РУ',
    kz: 'ҚЗ',
    en: 'EN'
  };
  function applyLang(lang) {
    if (!window.I18N || !I18N[lang]) return;
    I18N.current = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.dataset.i18n;
      const val = I18N.t(key);
      if (val && val !== key) {
        if (/<[a-z]+/i.test(val)) el.innerHTML = val; else el.textContent = val;
      }
    });
    [ 'placeholder', 'aria-label', 'title' ].forEach(function(attr) {
      const dataKey = 'data-i18n-' + attr;
      document.querySelectorAll('[' + dataKey + ']').forEach(function(el) {
        const key = el.getAttribute(dataKey);
        const val = I18N.t(key);
        if (val && val !== key) el.setAttribute(attr, val);
      });
    });
    if (currentLangEl) currentLangEl.textContent = LANG_LABELS[lang] || lang.toUpperCase();
    document.querySelectorAll('.lang-item').forEach(function(i) {
      i.classList.toggle('is-active', i.dataset.lang === lang);
    });
    if (typeof renderDynamic === 'function') renderDynamic();
    if (typeof renderPayments === 'function') renderPayments();
    try {
      localStorage.setItem('medeu_lang', lang);
    } catch (e) {}
  }
  window.applyLang = applyLang;
  langWrap.addEventListener('mouseenter', function() {
    langWrap.classList.add('is-open');
  });
  langWrap.addEventListener('mouseleave', function() {
    langWrap.classList.remove('is-open');
  });
  document.querySelectorAll('.lang-item').forEach(function(item) {
    item.addEventListener('click', function() {
      const lang = item.dataset.lang;
      applyLang(lang);
      langWrap.classList.remove('is-open');
    });
  });
  function initCarousel(containerId, slides, dotsId, interval) {
    const container = document.getElementById(containerId);
    if (!container) return;
    slides.forEach(function(src, i) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide' + (i === 0 ? ' is-active' : '');
      slide.style.backgroundImage = 'url(' + src + ')';
      container.insertBefore(slide, container.firstChild);
    });
    if (slides.length <= 1) return;
    const dotsWrap = document.getElementById(dotsId);
    slides.forEach(function(_, i) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
      dot.addEventListener('click', function() {
        setActive(i);
      });
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
    setInterval(function() {
      setActive((active + 1) % slides.length);
    }, interval || 6e3);
  }
  initCarousel('hero-carousel', DATA.heroSlides, 'hero-dots', 6e3);
  initCarousel('banquet-carousel', DATA.banquetSlides, 'banquet-dots', 6e3);
  if (DATA.heroVideo) {
    const heroVideo = document.getElementById('hero-video');
    const heroCarousel = document.getElementById('hero-carousel');
    if (heroVideo && heroCarousel) {
      heroVideo.src = DATA.heroVideo;
      heroVideo.style.display = '';
      heroCarousel.classList.add('hero-carousel--has-video');
      const playPromise = heroVideo.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function() {});
      }
    }
  }
  function renderDynamic() {
    const facilityGrid = document.getElementById('facility-grid');
    facilityGrid.innerHTML = DATA.facilities.map(function(f) {
      return '' + '<a href="#' + f.id + '" data-nav="' + f.id + '" class="facility-card">' + '<div class="facility-card__image" style="background-image: url(' + f.img + ');"></div>' + '<div class="facility-card__overlay"></div>' + '<div class="facility-card__content">' + '<div class="hero-overline" style="margin-bottom: 12px; font-size: 10px;">' + (window.I18N ? I18N.t('facilities.categoryLabel') : 'Категория') + '</div>' + '<h3 class="facility-card__title">' + (window.I18N && f.nameKey ? I18N.t(f.nameKey) : f.name) + '</h3>' + '<p class="facility-card__desc">' + (window.I18N && f.descKey ? I18N.t(f.descKey) : f.desc) + '</p>' + '<div class="facility-card__cta"><span>' + (window.I18N ? I18N.t('facilities.cta') : 'Перейти') + '</span>' + ICONS.arrow + '</div>' + '</div>' + '</a>';
    }).join('');
    const roomsStack = document.getElementById('rooms-stack');
    roomsStack.innerHTML = DATA.rooms.map(function(room, idx) {
      const num = idx + 1 < 10 ? '0' + (idx + 1) : '' + (idx + 1);
      const reverse = idx % 2 === 1;
      const imgs = room.images && room.images.length ? room.images : [ room.image ];
      const isSingle = imgs.length <= 1;
      const slidesHtml = imgs.map(function(src, i) {
        return '' + '<div class="room-gallery-slide' + (i === 0 ? ' is-active' : '') + '">' + '<div class="room-image lazy-bg' + (i === 0 ? ' img-skeleton' : '') + '" data-bg="' + src + '"></div>' + '</div>';
      }).join('');
      const dotsHtml = imgs.map(function(_, i) {
        return '<button class="room-gallery-dot' + (i === 0 ? ' is-active' : '') + '" aria-label="Слайд ' + (i + 1) + '" data-idx="' + i + '"></button>';
      }).join('');
      return '' + '<div class="room-row' + (reverse ? ' room-row--reverse' : '') + '">' + '<div class="room-image-wrap">' + '<div class="room-gallery' + (isSingle ? ' is-single' : '') + '" data-gallery="room-' + idx + '">' + '<div class="room-gallery-track">' + slidesHtml + '</div>' + '<button class="room-gallery-arrow room-gallery-arrow--prev" aria-label="Назад" data-dir="-1">' + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' + '</button>' + '<button class="room-gallery-arrow room-gallery-arrow--next" aria-label="Вперёд" data-dir="1">' + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' + '</button>' + '<div class="room-gallery-dots">' + dotsHtml + '</div>' + '</div>' + '</div>' + '<div class="room-info">' + '<div class="overline" style="margin-bottom: 12px;">' + room.area + ' ' + (window.I18N ? I18N.t('rooms.area') : 'м²') + '</div>' + '<h3 class="display-h3">' + (window.I18N && room.nameKey ? I18N.t(room.nameKey) : room.name) + '</h3>' + '<div class="vignette my-6">' + '<span class="vignette-line"></span>' + '<svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true">' + '<path d="M14 1 L20 5 L14 9 L8 5 Z" fill="none" stroke="currentColor" stroke-width="0.6" style="color: var(--c-gold);"/>' + '<circle cx="14" cy="5" r="0.8" fill="currentColor" style="color: var(--c-gold);"/>' + '</svg>' + '<span class="vignette-line"></span>' + '</div>' + '<p class="body-prose">' + (window.I18N && room.descKey ? I18N.t(room.descKey) : room.description) + '</p>' + '<div class="room-bottom">' + '<div><div class="overline">' + (window.I18N ? I18N.t('rooms.pricePerNight') : 'Цена за сутки') + '</div><div class="price">' + room.price + '</div></div>' + '<a href="javascript:void(0)" class="gold-btn gold-btn--sm booking-open" data-room="' + room.name + '">' + '<span class="gold-btn__bg"></span>' + '<span class="gold-btn__label">' + (window.I18N ? I18N.t('venues.book') : 'Забронировать') + '</span>' + '</a>' + '</div>' + '<div class="payments-strip payments-strip--mini"></div>' + '</div>' + '</div>';
    }).join('');
    const venuesStack = document.getElementById('venues-stack');
    venuesStack.innerHTML = DATA.venues.map(function(venue, idx) {
      const num = '0' + (idx + 1);
      const reverse = idx % 2 === 1;
      const imgs = venue.images && venue.images.length ? venue.images : [ venue.image ];
      const isSingle = imgs.length <= 1;
      const slidesHtml = imgs.map(function(src, i) {
        return '' + '<div class="room-gallery-slide' + (i === 0 ? ' is-active' : '') + '">' + '<div class="venue-image lazy-bg' + (i === 0 ? ' img-skeleton' : '') + '" data-bg="' + src + '"></div>' + '</div>';
      }).join('');
      const dotsHtml = imgs.map(function(_, i) {
        return '<button class="room-gallery-dot' + (i === 0 ? ' is-active' : '') + '" aria-label="Слайд ' + (i + 1) + '" data-idx="' + i + '"></button>';
      }).join('');
      return '' + '<div class="venue-row' + (reverse ? ' venue-row--reverse' : '') + '">' + '<div class="venue-image-wrap">' + '<div class="room-gallery venue-gallery' + (isSingle ? ' is-single' : '') + '" data-gallery="venue-' + idx + '">' + '<div class="room-gallery-track">' + slidesHtml + '</div>' + '<button class="room-gallery-arrow room-gallery-arrow--prev" aria-label="Назад" data-dir="-1">' + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' + '</button>' + '<button class="room-gallery-arrow room-gallery-arrow--next" aria-label="Вперёд" data-dir="1">' + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' + '</button>' + '<div class="room-gallery-dots">' + dotsHtml + '</div>' + '</div>' + '</div>' + '<div class="venue-info">' + '<h3 class="display-h3">' + (window.I18N && venue.nameKey ? I18N.t(venue.nameKey) : venue.name) + '</h3>' + '<div class="vignette my-6">' + '<span class="vignette-line"></span>' + '<svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true">' + '<path d="M14 1 L20 5 L14 9 L8 5 Z" fill="none" stroke="currentColor" stroke-width="0.6" style="color: var(--c-gold);"/>' + '<circle cx="14" cy="5" r="0.8" fill="currentColor" style="color: var(--c-gold);"/>' + '</svg>' + '<span class="vignette-line"></span>' + '</div>' + '<p class="venue-tagline">' + (window.I18N && venue.taglineKey ? I18N.t(venue.taglineKey) : venue.tagline) + '</p>' + '<p class="body-prose">' + (window.I18N && venue.descKey ? I18N.t(venue.descKey) : venue.description) + '</p>' + '<div style="margin-top: 32px;">' + '<a href="javascript:void(0)" class="gold-btn gold-btn--sm restoplace-click-open">' + '<span class="gold-btn__bg"></span>' + '<span class="gold-btn__label">' + (window.I18N ? I18N.t('venues.book') : 'Забронировать') + '</span>' + '</a>' + '</div>' + '</div>' + '</div>';
    }).join('');
    function initGallery(gallery) {
      if (gallery.classList.contains('is-single')) return;
      if (gallery.dataset.initialized === '1') return;
      gallery.dataset.initialized = '1';
      const track = gallery.querySelector('.room-gallery-track');
      const slides = gallery.querySelectorAll('.room-gallery-slide');
      const dots = gallery.querySelectorAll('.room-gallery-dot');
      const arrows = gallery.querySelectorAll('.room-gallery-arrow');
      let active = 0;
      function loadSlideBg(i) {
        const slide = slides[i];
        if (!slide) return;
        const img = slide.querySelector('[data-bg]');
        if (!img || img.classList.contains('is-loaded')) return;
        const url = img.dataset.bg;
        const tmp = new Image;
        tmp.onload = function() {
          img.style.backgroundImage = 'url(' + url + ')';
          img.classList.add('is-loaded');
          img.classList.remove('img-skeleton');
        };
        tmp.src = url;
      }
      function go(i) {
        const total = slides.length;
        const next = (i + total) % total;
        slides[active].classList.remove('is-active');
        if (dots[active]) dots[active].classList.remove('is-active');
        active = next;
        slides[active].classList.add('is-active');
        if (dots[active]) dots[active].classList.add('is-active');
        track.style.transform = 'translateX(-' + active * 100 + '%)';
        loadSlideBg(active);
        loadSlideBg((active + 1) % slides.length);
        loadSlideBg((active - 1 + slides.length) % slides.length);
      }
      dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() {
          go(i);
        });
      });
      arrows.forEach(function(arr) {
        arr.addEventListener('click', function() {
          const dir = parseInt(arr.dataset.dir, 10) || 1;
          go(active + dir);
        });
      });
      let touchStartX = null;
      track.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
      }, {
        passive: true
      });
      track.addEventListener('touchend', function(e) {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
        touchStartX = null;
      });
    }
    window.initGallery = initGallery;
    document.querySelectorAll('.room-gallery').forEach(initGallery);
    const servicesList = document.getElementById('services-list');
    if (servicesList && DATA.services) {
      servicesList.innerHTML = DATA.services.map(function(service, idx) {
        const num = '0' + (idx + 1);
        const icon = ICONS[service.icon] || ICONS.phone;
        const hoursLine = (window.I18N && service.hoursKey ? I18N.t(service.hoursKey) : service.hours) ? '<div class="service-meta-row"><span class="overline">' + (window.I18N ? I18N.t('services.hoursLabel') : 'Часы') + '</span> ' + (window.I18N && service.hoursKey ? I18N.t(service.hoursKey) : service.hours) + '</div>' : '';
        const phoneClean = service.phone.replace(/[^\d+]/g, '');
        const waText = encodeURIComponent((window.I18N ? I18N.t('whatsapp.serviceInquiry') : 'Здравствуйте! Хочу узнать подробнее об услуге «') + (window.I18N && service.nameKey ? I18N.t(service.nameKey) : service.name) + '».');
        return '' + '<div class="service-card">' + '<div class="service-card-num">№ ' + num + '</div>' + '<div class="service-icon">' + icon + '</div>' + '<h3 class="service-name">' + (window.I18N && service.nameKey ? I18N.t(service.nameKey) : service.name) + '</h3>' + '<p class="service-subtitle">' + (window.I18N && service.subtitleKey ? I18N.t(service.subtitleKey) : service.subtitle) + '</p>' + '<div class="service-divider"></div>' + '<p class="service-desc">' + (window.I18N && service.descKey ? I18N.t(service.descKey) : service.description) + '</p>' + hoursLine + '<div class="service-actions">' + '<a href="tel:' + phoneClean + '" class="service-phone">' + service.phone + '</a>' + '<a href="https://wa.me/' + service.waNumber + '?text=' + waText + '" target="_blank" rel="noopener noreferrer" class="service-wa" aria-label="WhatsApp">' + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' + '</a>' + '</div>' + '</div>';
      }).join('');
    }
    const contactsGrid = document.getElementById('contacts-grid');
    const labelMap = {
      'Ресепшн': 'contacts.reception',
      'Факс': 'contacts.fax',
      'Моб. ресепшн': 'contacts.mobReception',
      'Администратор': 'contacts.restaurantAdmin',
      'Моб. администратор': 'contacts.restaurantMob',
      'Банкетный зал': 'contacts.banquetMgr'
    };
    const phoneRowsHtml = function(rows) {
      return rows.map(function(r) {
        const clean = r.number.replace(/[^0-9+]/g, '');
        const labelText = window.I18N && labelMap[r.label] ? I18N.t(labelMap[r.label]) : r.label;
        return '<div class="contact-row">' + '<span class="contact-row-label">' + labelText + '</span>' + '<a href="tel:' + clean + '" class="contact-row-value">' + r.number + '</a>' + '</div>';
      }).join('');
    };
    contactsGrid.innerHTML = '' + '<div class="contact-card contact-card--list">' + '<div style="color: var(--c-gold); margin: 0 auto 20px;">' + ICONS.phone + '</div>' + '<div class="overline" style="margin-bottom: 16px;">' + (window.I18N ? I18N.t('contacts.hotelTitle') : 'Гостиница') + '</div>' + phoneRowsHtml(DATA.contacts.hotelPhones) + '</div>' + '<div class="contact-card contact-card--list">' + '<div style="color: var(--c-gold); margin: 0 auto 20px;">' + ICONS.phone + '</div>' + '<div class="overline" style="margin-bottom: 16px;">' + (window.I18N ? I18N.t('contacts.restaurantTitle') : 'Ресторан и банкет') + '</div>' + phoneRowsHtml(DATA.contacts.restaurantPhones) + '</div>' + '<div class="contact-card">' + '<div style="color: var(--c-gold); margin: 0 auto 24px;">' + ICONS.pin + '</div>' + '<div class="overline" style="margin-bottom: 12px;">' + (window.I18N ? I18N.t('contacts.addressTitle') : 'Адрес') + '</div>' + '<div class="contact-value">' + DATA.contacts.address + '</div>' + '<div class="contact-secondary">' + (window.I18N ? I18N.t('contacts.addressCenter') : 'центр города') + '</div>' + '</div>' + '<div class="contact-card">' + '<div style="color: var(--c-gold); margin: 0 auto 24px;">' + ICONS.mail + '</div>' + '<div class="overline" style="margin-bottom: 12px;">' + (window.I18N ? I18N.t('contacts.emailTitle') : 'Почта') + '</div>' + '<a href="mailto:' + DATA.contacts.email + '" class="contact-value contact-value--link">' + DATA.contacts.email + '</a>' + '<div class="contact-secondary">' + (window.I18N ? I18N.t('contacts.emailCaption') : 'круглосуточно') + '</div>' + '</div>';
    triggerLazyLoad();
  }
  renderDynamic();
  const PAYMENT_METHODS = [
    { key: 'visa',       name: 'Visa',             color: '#1A1F71', aspect: 'wide'   },
    { key: 'mastercard', name: 'Mastercard',       color: '#EB001B', aspect: 'square' },
    { key: 'amex',       name: 'American Express', color: '#006FCF', aspect: 'square' },
    { key: 'mir',        name: 'МИР',              color: '#0F754E', aspect: 'wide'   },
    { key: 'kaspi',      name: 'Kaspi QR',         color: '#F14635', aspect: 'square' },
    { key: 'wechat-pay', name: 'WeChat Pay',       color: '#1AAD19', aspect: 'wide'   }
  ];
  function fillSlotWithImg(slot, m) {
    // Используем обычный <img>: браузер сам корректно держит пропорции SVG
    // по его intrinsic-размерам, одинаково на file:// и https://.
    // Чтобы не словить гонку с onerror, навешиваем обработчики ДО присвоения src,
    // а сразу после присвоения проверяем img.complete + naturalWidth (вдруг
    // уже всё упало из кэша).
    const img = document.createElement('img');
    img.alt = m.name;
    let settled = false;
    function onFail() {
      if (settled) return;
      settled = true;
      slot.innerHTML = '<span class="payments-fallback" style="background:' +
                       m.color + '">' + m.name + '</span>';
    }
    function onOk() { settled = true; }
    img.addEventListener('error', onFail);
    img.addEventListener('load', onOk);
    slot.innerHTML = '';
    slot.appendChild(img);
    img.src = 'assets/payments/' + m.key + '.svg';
    // Догоняем кэш-гонку
    if (img.complete) {
      if (img.naturalWidth === 0) onFail(); else onOk();
    }
  }

  function renderPayments() {
    const wraps = document.querySelectorAll('.payments-strip');
    if (!wraps.length) return;
    const title = window.I18N ? I18N.t('payments.title') : '— Способы оплаты —';

    const itemsHtml = PAYMENT_METHODS.map(function(m) {
      return '<span class="payments-logo payments-logo--' + m.aspect + '" ' +
             'data-key="' + m.key + '" ' +
             'title="' + m.name + '" aria-label="' + m.name + '"></span>';
    }).join('');

    const html = '<div class="payments-strip__title">' + title + '</div>' +
                 '<div class="payments-strip__list">' + itemsHtml + '</div>';

    wraps.forEach(function(w) { w.innerHTML = html; });

    // Всегда отрисовываем через <img> — одинаково и локально, и на сервере.
    PAYMENT_METHODS.forEach(function(m) {
      const slots = document.querySelectorAll('.payments-logo[data-key="' + m.key + '"]');
      slots.forEach(function(slot) { fillSlotWithImg(slot, m); });
    });
  }
  renderPayments();

  document.getElementById('addr-value').textContent = DATA.contacts.address;
  document.getElementById('phone1-value').textContent = DATA.contacts.phone1;
  document.getElementById('phone2-value').textContent = DATA.contacts.phone2;
  document.getElementById('email-value').textContent = DATA.contacts.email;
  document.getElementById('btn-yandex').href = DATA.contacts.yandexUrl;
  document.getElementById('btn-google').href = DATA.contacts.googleUrl;
  document.getElementById('footer-contacts').innerHTML = DATA.contacts.phone1 + '<br>' + DATA.contacts.phone2 + '<br>' + DATA.contacts.email;
  document.getElementById('year').textContent = (new Date).getFullYear();
  const confImgWrap = document.getElementById('conference-image');
  if (confImgWrap) {
    const confImgs = DATA.conferenceImages && DATA.conferenceImages.length ? DATA.conferenceImages : DATA.conferenceImage ? [ DATA.conferenceImage ] : [];
    if (confImgs.length > 1) {
      const parent = confImgWrap.parentElement;
      parent.removeChild(confImgWrap);
      const isSingle = confImgs.length <= 1;
      const slidesHtml = confImgs.map(function(src, i) {
        return '' + '<div class="room-gallery-slide' + (i === 0 ? ' is-active' : '') + '">' + '<div class="conference-image lazy-bg' + (i === 0 ? ' img-skeleton' : '') + '" data-bg="' + src + '"></div>' + '</div>';
      }).join('');
      const dotsHtml = confImgs.map(function(_, i) {
        return '<button class="room-gallery-dot' + (i === 0 ? ' is-active' : '') + '" aria-label="Слайд ' + (i + 1) + '" data-idx="' + i + '"></button>';
      }).join('');
      parent.innerHTML = '' + '<div class="room-gallery conference-gallery' + (isSingle ? ' is-single' : '') + '">' + '<div class="room-gallery-track">' + slidesHtml + '</div>' + '<button class="room-gallery-arrow room-gallery-arrow--prev" aria-label="Назад" data-dir="-1">' + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' + '</button>' + '<button class="room-gallery-arrow room-gallery-arrow--next" aria-label="Вперёд" data-dir="1">' + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' + '</button>' + '<div class="room-gallery-dots">' + dotsHtml + '</div>' + '</div>';
      const newGallery = parent.querySelector('.conference-gallery');
      if (newGallery && window.initGallery) window.initGallery(newGallery);
    } else if (confImgs.length === 1) {
      confImgWrap.classList.add('lazy-bg', 'img-skeleton');
      confImgWrap.dataset.bg = confImgs[0];
    }
  }
  document.querySelectorAll('.page-hero[data-page-hero]').forEach(function(el) {
    const pageId = el.dataset.pageHero;
    const slides = DATA.pageHeroSlides && DATA.pageHeroSlides[pageId];
    if (slides && slides.length > 1) {
      const carousel = document.createElement('div');
      carousel.className = 'page-hero-carousel';
      slides.forEach(function(src, i) {
        const s = document.createElement('div');
        s.className = 'ph-slide' + (i === 0 ? ' is-active' : '');
        if (i === 0) {
          s.style.backgroundImage = 'url(' + src + ')';
        } else {
          s.dataset.bgSrc = src;
        }
        carousel.appendChild(s);
      });
      const dots = document.createElement('div');
      dots.className = 'page-hero-carousel-dots';
      slides.forEach(function(_, i) {
        const b = document.createElement('button');
        b.className = i === 0 ? 'is-active' : '';
        b.setAttribute('aria-label', 'Слайд ' + (i + 1));
        dots.appendChild(b);
      });
      el.insertBefore(carousel, el.firstChild);
      el.appendChild(dots);
      el.classList.add('page-hero--carousel');
      const slideEls = carousel.querySelectorAll('.ph-slide');
      const dotEls = dots.querySelectorAll('button');
      let active = 0;
      function go(i) {
        const next = (i + slideEls.length) % slideEls.length;
        slideEls[active].classList.remove('is-active');
        dotEls[active].classList.remove('is-active');
        active = next;
        slideEls[active].classList.add('is-active');
        dotEls[active].classList.add('is-active');
        const target = slideEls[active];
        if (target.dataset.bgSrc) {
          const url = target.dataset.bgSrc;
          const tmp = new Image;
          tmp.onload = function() {
            target.style.backgroundImage = 'url(' + url + ')';
            delete target.dataset.bgSrc;
          };
          tmp.src = url;
        }
      }
      dotEls.forEach(function(d, i) {
        d.addEventListener('click', function() {
          go(i);
        });
      });
      const interval = setInterval(function() {
        go(active + 1);
      }, 6e3);
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) clearInterval(interval);
      });
    } else {
      const bg = DATA.pageHero && DATA.pageHero[pageId];
      if (bg) {
        el.dataset.bg = bg;
        el.dataset.bgOverlay = 'linear-gradient(180deg, rgba(10,9,8,0.4), rgba(10,9,8,0.85))';
        el.classList.add('lazy-bg');
      }
    }
  });
  function triggerLazyLoad() {
    const targets = document.querySelectorAll('.lazy-bg:not(.is-loaded)');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(loadBg);
      return;
    }
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          loadBg(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '200px'
    });
    targets.forEach(function(el) {
      observer.observe(el);
    });
  }
  function loadBg(el) {
    const url = el.dataset.bg;
    const overlay = el.dataset.bgOverlay;
    if (!url) return;
    const img = new Image;
    img.onload = function() {
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
  const bookingModal = document.getElementById('booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const bookingRoomSelect = document.getElementById('booking-room');
  function openBookingModal(prefRoom) {
    if (!bookingModal) return;
    if (prefRoom && bookingRoomSelect) {
      Array.from(bookingRoomSelect.options).forEach(function(opt) {
        if (opt.value === prefRoom) opt.selected = true;
      });
    }
    bookingModal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
    const today = new Date;
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1e3);
    const fmt = function(d) {
      return d.toISOString().slice(0, 10);
    };
    const dateIn = document.getElementById('booking-date-in');
    const dateOut = document.getElementById('booking-date-out');
    if (dateIn && !dateIn.value) dateIn.value = fmt(today);
    if (dateOut && !dateOut.value) dateOut.value = fmt(tomorrow);
  }
  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('modal--open');
    document.body.style.overflow = '';
  }
  if (bookingModal) {
    const transferCheckbox = document.getElementById('booking-transfer');
    const transferBlock = document.getElementById('booking-transfer-block');
    if (transferCheckbox && transferBlock) {
      transferCheckbox.addEventListener('change', function() {
        transferBlock.style.display = transferCheckbox.checked ? '' : 'none';
      });
    }
    document.addEventListener('click', function(e) {
      const trigger = e.target.closest('.booking-open');
      if (!trigger) return;
      e.preventDefault();
      const prefRoom = trigger.dataset.room || '';
      openBookingModal(prefRoom);
    });

    // Виджет Restoplace навешивает свои обработчики на .restoplace-click-open
    // ровно один раз при загрузке. Кнопки внутри #venues-stack и #rooms-stack
    // пересоздаются функцией renderDynamic() при смене языка — на новых
    // элементах обработчиков уже нет. То же самое относится к кнопке внутри
    // промо-окна — оно рендерится после загрузки виджета. Во всех таких
    // случаях проксируем клик на статическую кнопку из #page-banquet, у
    // которой обработчик Restoplace жив.
    document.addEventListener('click', function(e) {
      const trigger = e.target.closest('.restoplace-click-open');
      if (!trigger) return;
      if (trigger.dataset.rpProxying === '1') return; // защита от рекурсии
      const venues = document.getElementById('venues-stack');
      const rooms = document.getElementById('rooms-stack');
      const promo = document.getElementById('promo-modal');
      const needsProxy = (venues && venues.contains(trigger)) ||
                        (rooms && rooms.contains(trigger)) ||
                        (promo && promo.contains(trigger));
      if (!needsProxy) return; // на статических кнопках виджет сам сработает
      const all = document.querySelectorAll('.restoplace-click-open');
      for (let i = 0; i < all.length; i++) {
        const btn = all[i];
        if (btn === trigger) continue;
        if (venues && venues.contains(btn)) continue;
        if (rooms && rooms.contains(btn)) continue;
        if (promo && promo.contains(btn)) continue;
        e.preventDefault();
        btn.dataset.rpProxying = '1';
        btn.click();
        delete btn.dataset.rpProxying;
        return;
      }
    });

    bookingModal.addEventListener('click', function(e) {
      if (e.target.closest('[data-close]') || e.target === bookingModal) {
        closeBookingModal();
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && bookingModal.classList.contains('modal--open')) {
        closeBookingModal();
      }
    });
    function collectBookingData() {
      const fd = new FormData(bookingForm);
      const fmtDate = function(s) {
        if (!s) return '—';
        const d = new Date(s);
        return d.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      };
      return {
        name: fd.get('name') || '—',
        phone: fd.get('phone') || '—',
        email: fd.get('email') || '',
        roomType: fd.get('roomType') || '—',
        dateIn: fmtDate(fd.get('dateIn')),
        timeIn: fd.get('timeIn') || '—',
        dateOut: fmtDate(fd.get('dateOut')),
        timeOut: fd.get('timeOut') || '—',
        adults: fd.get('adults') || '1',
        children: fd.get('children') || '0',
        payment: fd.get('payment') || 'Кредитная карта',
        transfer: !!fd.get('transfer'),
        transferLocation: fd.get('transferLocation') || '',
        transferNumber: fd.get('transferNumber') || '',
        transferTime: fd.get('transferTime') || '',
        note: fd.get('note') || ''
      };
    }
    function formatBookingMessage(d) {
      const lines = [ 'Заявка на бронирование номера с сайта medeuhotel.kz', '', 'Имя: ' + d.name, 'Телефон: ' + d.phone ];
      if (d.email) lines.push('E-mail: ' + d.email);
      lines.push('Кол-во взрослых: ' + d.adults, 'Кол-во детей: ' + d.children, 'Дата прибытия: ' + d.dateIn + ' - ' + d.timeIn, 'Дата убытия: ' + d.dateOut + ' - ' + d.timeOut, 'Тип номера: ' + d.roomType, 'Способ оплаты: ' + d.payment);
      if (d.transfer) {
        lines.push('');
        lines.push('Услуги трансфера: ДА');
        if (d.transferLocation) lines.push('Место прибытия: ' + d.transferLocation);
        if (d.transferNumber) lines.push('Номер рейса/поезда/автобуса: ' + d.transferNumber);
        if (d.transferTime) lines.push('Время прибытия: ' + d.transferTime);
      }
      lines.push('', 'Примечание:', d.note || '—');
      return lines.join('\n');
    }
    function showBookingSuccess() {
      const form = bookingForm;
      const success = document.getElementById('booking-success');
      if (form && success) {
        form.style.display = 'none';
        success.style.display = 'block';
      }
    }
    function resetBookingForm() {
      const form = bookingForm;
      const success = document.getElementById('booking-success');
      if (form && success) {
        form.style.display = '';
        success.style.display = 'none';
        form.reset();
        const tb = document.getElementById('booking-transfer-block');
        if (tb) tb.style.display = 'none';
      }
    }
    if (bookingForm) {
      bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = collectBookingData();
        const message = formatBookingMessage(data);
        const subject = 'Бронирование номера — ' + data.name + ' (' + data.roomType + ')';
        const formspreeUrl = (DATA.contacts.formspreeUrl || '').trim();
        if (formspreeUrl) {
          const submitBtn = bookingForm.querySelector('[type="submit"]');
          if (submitBtn) submitBtn.disabled = true;
          fetch(formspreeUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              _subject: subject,
              _replyto: data.email || undefined,
              message: message
            })
          }).then(function(res) {
            if (res.ok) showBookingSuccess(); else fallbackMailto();
          }).catch(function() {
            fallbackMailto();
          }).finally(function() {
            if (submitBtn) submitBtn.disabled = false;
          });
        } else {
          fallbackMailto();
        }
        function fallbackMailto() {
          const email = DATA.contacts.bookingEmail || DATA.contacts.email;
          const href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);
          window.location.href = href;
          setTimeout(function() {
            showBookingSuccess();
          }, 500);
        }
      });
    }
    const waBookBtn = document.getElementById('booking-wa-btn');
    if (waBookBtn) {
      waBookBtn.addEventListener('click', function() {
        if (!bookingForm.checkValidity()) {
          bookingForm.reportValidity();
          return;
        }
        const data = collectBookingData();
        const text = encodeURIComponent('Здравствуйте! ' + formatBookingMessage(data));
        const phone = (DATA.contacts.waReception || '77714944599').replace(/[^0-9]/g, '');
        window.open('https://wa.me/' + phone + '?text=' + text, '_blank', 'noopener');
        showBookingSuccess();
      });
    }
    bookingModal.addEventListener('click', function(e) {
      if (e.target.closest('[data-close]') || e.target === bookingModal) {
        setTimeout(resetBookingForm, 300);
      }
    });
  }
  const initialPage = window.location.hash.slice(1) || 'home';
  navigate(initialPage);
  var savedLang = null;
  try {
    savedLang = localStorage.getItem('medeu_lang');
  } catch (e) {}
  if (savedLang && window.I18N && I18N[savedLang]) {
    applyLang(savedLang);
  }
})();