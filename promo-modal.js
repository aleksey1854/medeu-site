/* =========================================================================
   MEDEU · Промо-окно (всплывающее окно с акцией)
   -------------------------------------------------------------------------
   Контент окна редактируется в файле data.js, блок window.DATA.promoModal.
   Этот скрипт берёт данные оттуда, рисует HTML и показывает окно
   по правилам:
       • один раз за указанный интервал (см. hideAfterCloseDays)
       • с задержкой после загрузки страницы (см. showDelayMs)
       • НЕ показывать, если открыта другая модалка (бронь и т.п.)
       • НЕ показывать, если в URL стоит ?promo=off

   Никаких правок остальных файлов сайта НЕ требуется.
   ========================================================================= */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Сначала проверяем, есть ли вообще данные про окно
  // ─────────────────────────────────────────────────────────────────────────
  function getCfg() {
    if (!window.DATA || !window.DATA.promoModal) return null;
    var cfg = window.DATA.promoModal;
    if (cfg.enabled === false) return null;
    return cfg;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Локализация: достать поля под текущий язык, с fallback на ru
  // ─────────────────────────────────────────────────────────────────────────
  function getLocale(cfg) {
    var lang = (window.I18N && window.I18N.current) || 'ru';
    return cfg[lang] || cfg.ru || {};
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. localStorage — запоминаем, что юзер закрыл окно
  // ─────────────────────────────────────────────────────────────────────────
  var STORAGE_KEY = 'medeu_promo_closed_at';

  function shouldShow(cfg) {
    // Управление через URL:
    //   ?promo=off     — скрыть окно (нужно для скриншотов / тестов)
    //   ?promo=preview — показать всегда, даже если уже закрывали
    try {
      var p = new URLSearchParams(window.location.search);
      if (p.get('promo') === 'off') return false;
      if (p.get('promo') === 'preview') return true;
    } catch (e) {}

    var hideDays = Number(cfg.hideAfterCloseDays);
    if (!isFinite(hideDays) || hideDays < 0) hideDays = 7;

    // hideAfterCloseDays: 0 — показывать окно при каждом открытии сайта (без кулдауна).
    // В этом случае localStorage не проверяем и не пишем.
    if (hideDays === 0) return true;

    // Версионирование: меняем version в data.js — все увидят новое окно
    // даже если закрывали предыдущее. Это удобно, когда меняется акция.
    var version = String(cfg.version || '1');
    var ttlMs = hideDays * 24 * 60 * 60 * 1000;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        if (data.version === version && (Date.now() - data.at) < ttlMs) {
          return false;
        }
      }
    } catch (e) {}
    return true;
  }

  function rememberClosed(cfg) {
    // Если кулдаун 0 — ничего не сохраняем, окно появится снова при следующем заходе
    var hideDays = Number(cfg.hideAfterCloseDays);
    if (hideDays === 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: String(cfg.version || '1'),
        at: Date.now()
      }));
    } catch (e) {}
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Построение HTML
  // ─────────────────────────────────────────────────────────────────────────
  function build(cfg, loc) {
    var modal = document.createElement('div');
    modal.className = 'modal promo-modal';
    modal.id = 'promo-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'promo-modal-title');

    var imgHtml = cfg.image
      ? '<div class="promo-modal-image-wrap">' +
          '<img src="' + esc(cfg.image) + '" alt="' + esc(loc.title || 'Promo') + '" class="promo-modal-image">' +
        '</div>'
      : '';

    // Если есть только картинка, без полей — рендерим режим image-only:
    // вся карточка кликабельна, дополнительного блока с текстом нет.
    var hasText = !!(loc.overline || loc.title || loc.description || loc.cta);

    var bodyHtml = '';
    if (hasText) {
      bodyHtml = '<div class="promo-modal-body">' +
        (loc.overline ? '<div class="overline promo-modal-overline">' + esc(loc.overline) + '</div>' : '') +
        (loc.title ? '<h2 id="promo-modal-title" class="promo-modal-title">' + esc(loc.title) + '</h2>' : '') +
        (loc.title ? '<div class="vignette my-6">' +
          '<span class="vignette-line"></span>' +
          '<svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true">' +
            '<path d="M14 1 L20 5 L14 9 L8 5 Z" fill="none" stroke="currentColor" stroke-width="0.6" style="color: var(--c-gold);"/>' +
            '<circle cx="14" cy="5" r="0.8" fill="currentColor" style="color: var(--c-gold);"/>' +
          '</svg>' +
          '<span class="vignette-line"></span>' +
        '</div>' : '') +
        (loc.description ? '<p class="promo-modal-desc">' + esc(loc.description) + '</p>' : '') +
        (loc.cta ? renderCta(cfg, loc) : '') +
      '</div>';
    } else {
      modal.classList.add('promo-modal--image-only');
      // Если только картинка — оборачиваем в кликабельную ссылку
      if (cfg.ctaUrl) {
        imgHtml = wrapAsLink(imgHtml, cfg.ctaUrl, loc.title || 'Promo', cfg);
      }
    }

    modal.innerHTML =
      '<div class="modal-overlay" data-close></div>' +
      '<div class="modal-window promo-modal-window">' +
        '<button type="button" class="modal-close" data-close aria-label="Закрыть">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
        imgHtml +
        bodyHtml +
      '</div>';

    return modal;
  }

  // Собирает ссылку на WhatsApp из «человеческих» полей waNumber + waMessage.
  // Админу не нужно возиться с кодированием — он пишет номер и текст как есть,
  // а эта функция превращает их в корректную ссылку wa.me/...?text=...
  function buildWaUrl(cfg) {
    var num = String(cfg.waNumber || '').replace(/[^0-9]/g, '');
    if (!num) return '';
    var msg = cfg.waMessage ? ('?text=' + encodeURIComponent(cfg.waMessage)) : '';
    return 'https://wa.me/' + num + msg;
  }

  function renderCta(cfg, loc) {
    var url = cfg.ctaUrl || '';
    var isAnchorBooking = url === '#booking' || url === '#book';
    var isAnchorVenue = url === '#booking-venue' || url === '#venue';
    var isWhatsapp = url === '#whatsapp' || url === '#wa';
    var classes = 'gold-btn promo-modal-cta';
    var attrs = '';
    if (isAnchorBooking) {
      // Откроет встроенную форму брони номера — script.js делегирует .booking-open
      classes += ' booking-open';
      url = 'javascript:void(0)';
    } else if (isAnchorVenue) {
      // Откроет виджет Restoplace — script.js делегирует .restoplace-click-open
      classes += ' restoplace-click-open';
      url = 'javascript:void(0)';
    } else if (isWhatsapp) {
      // Соберёт ссылку на WhatsApp из waNumber + waMessage
      url = buildWaUrl(cfg) || 'javascript:void(0)';
      attrs = ' target="_blank" rel="noopener noreferrer"';
    } else if (/^https?:|^wa\.me|^tel:|^mailto:/.test(url)) {
      attrs = ' target="_blank" rel="noopener noreferrer"';
    } else if (!url) {
      url = 'javascript:void(0)';
    }
    return '<a href="' + esc(url) + '" class="' + classes + '"' + attrs + '>' +
             '<span class="gold-btn__bg"></span>' +
             '<span class="gold-btn__label">' + esc(loc.cta) + '</span>' +
           '</a>';
  }

  function wrapAsLink(html, url, alt, cfg) {
    var attrs = '';
    var cls = 'promo-modal-image-link';
    if (url === '#booking' || url === '#book') {
      cls += ' booking-open';
      url = 'javascript:void(0)';
    } else if (url === '#booking-venue' || url === '#venue') {
      cls += ' restoplace-click-open';
      url = 'javascript:void(0)';
    } else if (url === '#whatsapp' || url === '#wa') {
      url = (cfg && buildWaUrl(cfg)) || 'javascript:void(0)';
      attrs = ' target="_blank" rel="noopener noreferrer"';
    } else if (/^https?:|^wa\.me|^tel:|^mailto:/.test(url)) {
      attrs = ' target="_blank" rel="noopener noreferrer"';
    }
    return '<a href="' + esc(url) + '" class="' + cls + '" aria-label="' + esc(alt) + '"' + attrs + '>' + html + '</a>';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Простой HTML-escape (защита от XSS, если кто-то напишет < > в полях)
  // ─────────────────────────────────────────────────────────────────────────
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Показ + закрытие
  // ─────────────────────────────────────────────────────────────────────────
  function open(modal, cfg) {
    document.body.appendChild(modal);
    requestAnimationFrame(function () {
      modal.classList.add('modal--open');
    });
    document.body.style.overflow = 'hidden';

    // Аналитика — показ окна
    if (window.MedeuAnalytics) {
      window.MedeuAnalytics.track('promo_modal_view', {
        version: String(cfg.version || '1')
      });
    }

    function close() {
      modal.classList.remove('modal--open');
      document.body.style.overflow = '';
      rememberClosed(cfg);
      setTimeout(function () {
        if (modal.parentNode) modal.parentNode.removeChild(modal);
      }, 300);
      if (window.MedeuAnalytics) {
        window.MedeuAnalytics.track('promo_modal_close', {
          version: String(cfg.version || '1')
        });
      }
    }

    modal.addEventListener('click', function (e) {
      // Клик по CTA — считаем конверсию и закрываем
      var cta = e.target.closest('.promo-modal-cta, .promo-modal-image-link');
      if (cta) {
        if (window.MedeuAnalytics) {
          window.MedeuAnalytics.track('promo_modal_click', {
            version: String(cfg.version || '1'),
            cta_url: cfg.ctaUrl || ''
          });
        }
        rememberClosed(cfg);
        // Если CTA это якорь на бронь (.booking-open / .restoplace-click-open) —
        // даём другим обработчикам отработать (capture-фаза в analytics.js
        // и делегирование в script.js), а потом убираем наше окно.
        setTimeout(function () {
          modal.classList.remove('modal--open');
          document.body.style.overflow = '';
          setTimeout(function () {
            if (modal.parentNode) modal.parentNode.removeChild(modal);
          }, 300);
        }, 50);
        return;
      }
      // Клик на оверлей / на крестик
      if (e.target.closest('[data-close]') || e.target.classList.contains('modal-overlay')) {
        close();
      }
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
        document.removeEventListener('keydown', onKey);
        close();
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Перерисовка при смене языка (если окно открыто в этот момент)
  // ─────────────────────────────────────────────────────────────────────────
  var originalApplyLang = null;
  function hookLanguageChange() {
    if (typeof window.applyLang !== 'function') return;
    if (originalApplyLang) return;
    originalApplyLang = window.applyLang;
    window.applyLang = function (lang) {
      var result = originalApplyLang.apply(this, arguments);
      var existing = document.getElementById('promo-modal');
      if (existing && existing.classList.contains('modal--open')) {
        var cfg = getCfg();
        if (!cfg) return result;
        var loc = getLocale(cfg);
        var fresh = build(cfg, loc);
        existing.replaceWith(fresh);
        fresh.classList.add('modal--open');
        // Перенавешиваем обработчики
        attachHandlers(fresh, cfg);
      }
      return result;
    };
  }
  function attachHandlers(modal, cfg) {
    // Логика close/click — та же, что в open(). Вынесена для перерисовки.
    modal.addEventListener('click', function (e) {
      var cta = e.target.closest('.promo-modal-cta, .promo-modal-image-link');
      if (cta) {
        rememberClosed(cfg);
        setTimeout(function () {
          modal.classList.remove('modal--open');
          document.body.style.overflow = '';
          setTimeout(function () {
            if (modal.parentNode) modal.parentNode.removeChild(modal);
          }, 300);
        }, 50);
        return;
      }
      if (e.target.closest('[data-close]') || e.target.classList.contains('modal-overlay')) {
        modal.classList.remove('modal--open');
        document.body.style.overflow = '';
        rememberClosed(cfg);
        setTimeout(function () {
          if (modal.parentNode) modal.parentNode.removeChild(modal);
        }, 300);
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Точка входа
  // ─────────────────────────────────────────────────────────────────────────
  function init() {
    var cfg = getCfg();
    if (!cfg) return;
    if (!shouldShow(cfg)) return;

    // Не показываем поверх уже открытого окна брони
    if (document.querySelector('#booking-modal.modal--open')) return;

    var delay = Number(cfg.showDelayMs);
    if (!isFinite(delay) || delay < 0) delay = 1500;

    setTimeout(function () {
      // Повторная проверка — за это время мог открыться #booking-modal
      if (document.querySelector('#booking-modal.modal--open')) return;
      var loc = getLocale(cfg);
      var modal = build(cfg, loc);
      open(modal, cfg);
      hookLanguageChange();
    }, delay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Хелперы для отладки/превью: вручную можно вызвать
  // MedeuPromo.show()  → показать прямо сейчас, игнорируя «закрывал недавно»
  // MedeuPromo.reset() → забыть, что закрывал, чтобы окно появилось снова
  window.MedeuPromo = {
    show: function () {
      var existing = document.getElementById('promo-modal');
      if (existing) existing.remove();
      var cfg = getCfg();
      if (!cfg) { console.warn('[promo-modal] нет данных в DATA.promoModal'); return; }
      var modal = build(cfg, getLocale(cfg));
      open(modal, cfg);
      hookLanguageChange();
    },
    reset: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      console.log('[promo-modal] метка о закрытии сброшена');
    }
  };
})();
