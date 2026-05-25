/* =========================================================================
   MEDEU · Аналитика (Яндекс.Метрика + Google Analytics 4)
   -------------------------------------------------------------------------
   Куда нужно вставить ID счётчиков перед запуском в продакшн:
     1) YM_ID  — номер счётчика Яндекс.Метрики
                  (https://metrika.yandex.ru → Создать счётчик → берём число из URL)
     2) GA4_ID — идентификатор потока GA4 в формате G-XXXXXXXXXX
                  (https://analytics.google.com → Администратор → Потоки данных)

   Если ID не заполнен — соответствующий счётчик просто не подгружается.
   Никакой ошибки в консоль не пишется.

   ВСЕ СОБЫТИЯ дублируются в обе системы автоматически. Список целей
   и инструкция по их настройке — в файле ИНСТРУКЦИЯ.md, раздел «Аналитика».
   ========================================================================= */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // КОНФИГУРАЦИЯ — ВСТАВИТЬ СВОИ ID
  // ─────────────────────────────────────────────────────────────────────────
  var YM_ID  = '109403193';      // Medeu Hotel · medeuhotel.kz · создан 25.05.2026
  var GA4_ID = 'G-P13EXT4SZQ';   // medeuhotel.kz · GA4 поток · создан 25.05.2026

  // ─────────────────────────────────────────────────────────────────────────
  // 1. ЯНДЕКС.МЕТРИКА — стандартный счётчик 2024+
  //    Включён вебвизор, карта кликов, точный показатель отказов.
  // ─────────────────────────────────────────────────────────────────────────
  if (YM_ID) {
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) return;
      }
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.webvisor.org/metrika/tag_ww.js', 'ym');

    window.ym(YM_ID, 'init', {
      defer: false,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: 'dataLayer'
    });

    // noscript-пиксель добавляется автоматически
    try {
      var ns = document.createElement('noscript');
      ns.innerHTML = '<div><img src="https://mc.yandex.ru/watch/' + YM_ID +
                     '" style="position:absolute; left:-9999px;" alt="" /></div>';
      document.body && document.body.appendChild(ns);
    } catch (e) {}
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. GOOGLE ANALYTICS 4 (gtag.js)
  // ─────────────────────────────────────────────────────────────────────────
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (GA4_ID) {
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(ga);
    gtag('js', new Date());
    gtag('config', GA4_ID, {
      anonymize_ip: false,
      send_page_view: true
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. UTM-МЕТКИ: ловим из URL, запоминаем, прикрепляем к каждому событию
  //    ----------------------------------------------------------------------
  //    Когда человек переходит по ссылке с разметкой
  //      https://medeuhotel.kz/?utm_source=instagram&utm_medium=cpc&utm_campaign=tasso
  //    мы сохраняем все utm_* в двух местах:
  //
  //      sessionStorage  → текущая сессия (до закрытия вкладки)
  //      localStorage    → первое касание на 30 дней
  //
  //    Дальше при каждом track() параметры utm автоматически добавляются
  //    в событие. В отчётах Метрики и GA4 видно, ИЗ КАКОГО канала пришёл
  //    конкретный человек, который оставил бронь.
  //    ----------------------------------------------------------------------
  var UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  var UTM_FIRST_KEY = 'medeu_utm_first';   // localStorage — первое касание (30 дней)
  var UTM_LAST_KEY  = 'medeu_utm_last';    // sessionStorage — текущая сессия
  var UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000;

  function readUtmFromUrl() {
    try {
      var p = new URLSearchParams(window.location.search);
      var out = {}, has = false;
      UTM_KEYS.forEach(function (k) {
        var v = p.get(k);
        if (v) { out[k] = v.slice(0, 100); has = true; }
      });
      // Если utm нет — берём referrer как fallback (домен сайта не считаем)
      if (!has && document.referrer) {
        try {
          var ref = new URL(document.referrer);
          if (ref.hostname && ref.hostname !== window.location.hostname) {
            out.utm_source = ref.hostname.replace(/^www\./, '').slice(0, 100);
            out.utm_medium = 'referral';
            has = true;
          }
        } catch (e) {}
      }
      return has ? out : null;
    } catch (e) { return null; }
  }

  function saveUtm(utm) {
    if (!utm) return;
    try { sessionStorage.setItem(UTM_LAST_KEY, JSON.stringify(utm)); } catch (e) {}
    try {
      var raw = localStorage.getItem(UTM_FIRST_KEY);
      var stale = true;
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.at && (Date.now() - parsed.at) < UTM_TTL_MS) stale = false;
      }
      if (stale) {
        localStorage.setItem(UTM_FIRST_KEY, JSON.stringify({ at: Date.now(), utm: utm }));
      }
    } catch (e) {}
  }

  function getStoredUtm() {
    var last = {}, first = {};
    try {
      var rawL = sessionStorage.getItem(UTM_LAST_KEY);
      if (rawL) last = JSON.parse(rawL) || {};
    } catch (e) {}
    try {
      var rawF = localStorage.getItem(UTM_FIRST_KEY);
      if (rawF) {
        var parsed = JSON.parse(rawF);
        if (parsed && parsed.at && (Date.now() - parsed.at) < UTM_TTL_MS) {
          first = parsed.utm || {};
        }
      }
    } catch (e) {}
    var out = {};
    Object.keys(last).forEach(function (k)  { out['last_' + k]  = last[k]; });
    Object.keys(first).forEach(function (k) { out['first_' + k] = first[k]; });
    return out;
  }

  // Запускаем сразу при загрузке скрипта
  var freshUtm = readUtmFromUrl();
  if (freshUtm) saveUtm(freshUtm);

  // ─────────────────────────────────────────────────────────────────────────
  // 4. УНИВЕРСАЛЬНАЯ ОТПРАВКА СОБЫТИЯ
  //    track('booking_room_submit', { room_type: 'Люкс' })
  //    → улетит и в Метрику (как reachGoal), и в GA4 (как event).
  //    UTM-метки добавляются автоматически — не надо передавать руками.
  // ─────────────────────────────────────────────────────────────────────────
  function track(eventName, params) {
    params = params || {};
    var enriched = Object.assign({}, getStoredUtm(), params);

    if (YM_ID && window.ym) {
      try { window.ym(YM_ID, 'reachGoal', eventName, enriched); } catch (e) {}
    }
    if (GA4_ID && window.gtag) {
      try { window.gtag('event', eventName, enriched); } catch (e) {}
    }
    try {
      window.dataLayer.push(Object.assign({ event: eventName }, enriched));
    } catch (e) {}
  }
  window.MedeuAnalytics = { track: track, getUtm: getStoredUtm };

  // Если зашли по UTM-ссылке — отдельное событие «campaign_visit» (раз за сессию)
  if (freshUtm) {
    try {
      if (!sessionStorage.getItem('medeu_campaign_sent')) {
        setTimeout(function () { track('campaign_visit', freshUtm); }, 600);
        sessionStorage.setItem('medeu_campaign_sent', '1');
      }
    } catch (e) {}
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. АВТОМАТИЧЕСКИЕ СОБЫТИЯ — без правок остального кода сайта
  //    Все хуки через делегирование на document — работают даже для элементов,
  //    которые рендерятся динамически из data.js.
  // ─────────────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {

    // ────────── 5.1 ОТКРЫТИЕ ФОРМЫ БРОНИРОВАНИЯ НОМЕРА ──────────
    // Кнопки .booking-open есть и в герое, и под каждой карточкой номера.
    // На карточках номеров у них есть data-room="Стандарт" (см. script.js:235)
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.booking-open');
      if (!btn) return;
      track('booking_room_open', {
        room_type: btn.getAttribute('data-room') || 'general',
        source: btn.closest('.room-row') ? 'room_card' : 'hero'
      });
    }, true);

    // ────────── 5.2 ОТКРЫТИЕ БРОНИ РЕСТОРАНА / БАНКЕТА (Restoplace) ──────────
    // Кнопка .restoplace-click-open ловится виджетом — мы перехватываем клик
    // в фазе capture, чтобы наше событие ушло раньше.
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.restoplace-click-open');
      if (!btn) return;
      // Если это синтетический клик из proxy-логики script.js
      // (промо-окно / динамические карточки залов) — пропускаем,
      // событие уже было отправлено для исходной кнопки.
      if (btn.dataset.rpProxying === '1') return;
      // Пытаемся определить контекст: банкет / летняя веранда / lounge / караоке / бильярд
      var ctx = btn.closest('.venue-row, .banquet-info, #page-banquet, #page-restaurant, #promo-modal');
      var venueName = '';
      if (ctx) {
        if (ctx.id === 'promo-modal') {
          venueName = 'promo';
        } else {
          var h = ctx.querySelector('h3, .display-h3, .modal-title');
          if (h) venueName = (h.textContent || '').trim().slice(0, 80);
        }
      }
      track('booking_venue_open', {
        venue: venueName || 'general',
        page: document.querySelector('.page--active') ? document.querySelector('.page--active').id : ''
      });
    }, true);

    // ────────── 5.3 УСПЕШНАЯ ОТПРАВКА ФОРМЫ БРОНИРОВАНИЯ НОМЕРА ──────────
    // Слушаем не сабмит формы (он может уйти в ошибку), а появление блока успеха.
    // Появление #booking-success c display!=none — наш сигнал «бронь оформлена».
    var bookingSuccess = document.getElementById('booking-success');
    if (bookingSuccess) {
      var observer = new MutationObserver(function () {
        if (bookingSuccess.style.display === 'block') {
          var roomSel = document.getElementById('booking-room');
          var dateIn  = document.getElementById('booking-date-in');
          var dateOut = document.getElementById('booking-date-out');
          var adults  = document.querySelector('[name="adults"]');
          var children = document.querySelector('[name="children"]');
          var nights = 0;
          try {
            if (dateIn && dateOut && dateIn.value && dateOut.value) {
              nights = Math.max(1, Math.round(
                (new Date(dateOut.value) - new Date(dateIn.value)) / 86400000
              ));
            }
          } catch (e) {}
          track('booking_room_submit', {
            room_type: roomSel ? roomSel.value : '',
            nights: nights,
            adults: adults ? Number(adults.value) || 0 : 0,
            children: children ? Number(children.value) || 0 : 0
          });
        }
      });
      observer.observe(bookingSuccess, { attributes: true, attributeFilter: ['style'] });
    }

    // ────────── 5.4 ОТПРАВКА БРОНИ ЧЕРЕЗ WHATSAPP ИЗ ФОРМЫ ──────────
    var waBookBtn = document.getElementById('booking-wa-btn');
    if (waBookBtn) {
      waBookBtn.addEventListener('click', function () {
        var form = document.getElementById('booking-form');
        if (form && !form.checkValidity()) return;          // невалидная форма — не считаем
        var roomSel = document.getElementById('booking-room');
        track('booking_room_wa', {
          room_type: roomSel ? roomSel.value : ''
        });
      });
    }

    // ────────── 5.5 КЛИКИ ПО ТЕЛЕФОНАМ ──────────
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      track('phone_click', {
        phone: a.getAttribute('href').replace('tel:', ''),
        location: pageContext(a)
      });
    });

    // ────────── 5.6 КЛИКИ ПО E-MAIL ──────────
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="mailto:"]');
      if (!a) return;
      track('email_click', {
        email: a.getAttribute('href').replace('mailto:', '').split('?')[0]
      });
    });

    // ────────── 5.7 КЛИКИ ПО WHATSAPP ──────────
    // Плавающая кнопка + сервисные ссылки + любые wa.me / api.whatsapp.com
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp"]');
      if (!a) return;
      track('whatsapp_click', {
        location: pageContext(a),
        is_float: a.id === 'wa-float'
      });
    });

    // ────────── 5.8 ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ──────────
    document.querySelectorAll('.lang-item').forEach(function (item) {
      item.addEventListener('click', function () {
        track('language_change', { lang: item.dataset.lang });
      });
    });

    // ────────── 5.9 ПЕРЕХОДЫ ПО ВНУТРЕННИМ РАЗДЕЛАМ ──────────
    // На случай если маркетологу нужны цели «дошёл до раздела X»
    document.querySelectorAll('[data-nav]').forEach(function (link) {
      link.addEventListener('click', function () {
        track('section_view', { section: link.dataset.nav });
      });
    });
  });

  // ────────── HELPER: определить, в каком блоке стоит элемент ──────────
  function pageContext(el) {
    if (!el) return 'unknown';
    if (el.closest('.modal--open, #booking-modal')) return 'booking_modal';
    if (el.closest('header')) return 'header';
    if (el.closest('footer')) return 'footer';
    if (el.closest('#page-contacts'))  return 'contacts';
    if (el.closest('#page-services'))  return 'services';
    if (el.closest('#page-banquet'))   return 'banquet';
    if (el.closest('#page-restaurant')) return 'restaurant';
    if (el.closest('#page-rooms'))     return 'rooms';
    if (el.closest('#page-home'))      return 'home';
    return 'unknown';
  }
})();
