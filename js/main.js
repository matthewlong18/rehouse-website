/* ==========================================================================
   RE HOUSE — Main JavaScript
   --------------------------------------------------------------------------
   MODULES
   01. Hero video   — swaps the still for a loop when one is configured
   02. Nav          — transparent over the hero, bone once past it
   03. Enquiry form — carries the answers to Tally, or to email
   04. Booking link — wires up (or hides) the "book directly" line
   05. Sticky CTA   — the phone-only bar that slides up past the hero
   06. Before/after tiles — tap to peek on touch screens
   07. Scroll reveal
   08. Stat counts  — the project figures tick up as they arrive
   09. Footer year
   --------------------------------------------------------------------------
   Settings live in js/config.js — you shouldn't need to edit this file.
   ========================================================================== */

(function () {
  'use strict';

  // Fall back to an empty config so the site never breaks if config.js
  // fails to load for any reason.
  const config = typeof RE_HOUSE_CONFIG !== 'undefined' ? RE_HOUSE_CONFIG : {};


  /* ======================================================================
     01. HERO VIDEO
     The hero ships as a still. If js/config.js names a video, we swap it
     in — but only where it earns its cost: not on phones (data, battery)
     and not for anyone who has asked for reduced motion. The still stays
     underneath as the poster frame, so nothing flashes while it loads.
     ====================================================================== */
  function initHeroVideo() {
    const media = document.querySelector('[data-hero-media]');
    if (!media) return;

    const src = (config.heroVideo || '').trim();
    if (!src) return;                                    // still it is

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;              // required for autoplay to be allowed
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-hidden', 'true');
    video.src = src;

    // Only reveal it once it actually has frames — otherwise a slow
    // connection shows a black rectangle where the house should be.
    video.style.opacity = '0';
    video.style.transition = 'opacity 0.6s ease';
    video.addEventListener('canplay', function () { video.style.opacity = '1'; });
    video.addEventListener('error', function () { video.remove(); });

    media.appendChild(video);
  }


  /* ======================================================================
     02. NAV OVER THE HERO
     The bar sits transparent over the hero photo with light type, then
     turns bone once the hero has scrolled away. CSS does the colours;
     this only decides when to add .is-solid.
     ====================================================================== */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const hero = document.querySelector('.hero');

    // No hero to sit over (privacy.html, 404.html), or no observer support:
    // the bar is solid from the start. Without this the light nav type
    // would render invisibly on those pages' bone background.
    if (!hero || !('IntersectionObserver' in window)) {
      nav.classList.add('is-solid');
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-solid', !entries[0].isIntersecting);
    }, { rootMargin: '-70px 0px 0px 0px', threshold: 0 });

    observer.observe(hero);
  }


  /* ======================================================================
     03. ENQUIRY FORM
     There is no server behind a GitHub Pages site, so the form cannot POST
     anywhere. Instead it collects the answers and hands them off:

       · a Tally form ID configured  -> open Tally with the fields pre-filled
       · otherwise                   -> a pre-written email to Andrew

     Either way the visitor never types the same thing twice.

     NOTE on the Tally route: pre-fill needs HIDDEN FIELDS in the Tally form
     named exactly as the keys sent below (name, email, phone, address,
     timeline), each bound to its question as the "Default answer". Labels
     alone do nothing. Leave tallyFormId empty and the email route is used
     instead — that one always works.
     ====================================================================== */
  function initEnquiryForm() {
    const form = document.querySelector('[data-enquiry-form]');
    if (!form) return;

    const errorLine = form.querySelector('[data-enquiry-error]');
    const required  = ['name', 'email', 'address'];

    function value(field) {
      const el = form.elements[field];
      return el ? el.value.trim() : '';
    }

    function markInvalid() {
      let firstBad = null;
      required.forEach(function (field) {
        const el = form.elements[field];
        if (!el) return;
        const bad = !el.value.trim();
        el.closest('.field').classList.toggle('is-invalid', bad);
        if (bad && !firstBad) firstBad = el;
      });

      // An email that is filled in but obviously not an email
      const email = form.elements.email;
      if (email && email.value.trim() && email.value.indexOf('@') === -1) {
        email.closest('.field').classList.add('is-invalid');
        if (!firstBad) firstBad = email;
      }
      return firstBad;
    }

    // Clear a field's error state as soon as they start fixing it
    form.addEventListener('input', function (e) {
      const field = e.target.closest('.field');
      if (field) field.classList.remove('is-invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstBad = markInvalid();
      if (firstBad) {
        if (errorLine) errorLine.hidden = false;
        firstBad.focus();
        return;
      }
      if (errorLine) errorLine.hidden = true;

      const answers = {
        name:     value('name'),
        email:    value('email'),
        phone:    value('phone'),
        address:  value('address'),
        timeline: value('timeline')
      };

      const formId = (config.tallyFormId || '').trim();

      if (formId) {
        // Tally pre-fills from query parameters whose names match its fields
        const params = Object.keys(answers)
          .filter(function (k) { return answers[k]; })
          .map(function (k) { return k + '=' + encodeURIComponent(answers[k]); })
          .join('&');
        window.open('https://tally.so/r/' + encodeURIComponent(formId) + '?' + params,
                    '_blank', 'noopener');
        return;
      }

      // No form configured: hand it to the mail client, fully written out
      const body =
        'Name: ' + answers.name + '\r\n' +
        'Email: ' + answers.email + '\r\n' +
        'Phone: ' + (answers.phone || '—') + '\r\n' +
        'Property address: ' + answers.address + '\r\n' +
        'Timeline to sell: ' + (answers.timeline || '—') + '\r\n';

      window.location.href =
        'mailto:' + (config.email || 'andrew@rehouseto.ca') +
        '?subject=' + encodeURIComponent('Re House — walkthrough request') +
        '&body=' + encodeURIComponent(body);
    });
  }


  /* ======================================================================
     04. BOOKING LINK
     Fills in the Calendly (or Cal.com) URL, or hides the whole line so a
     visitor never clicks through to nothing.
     ====================================================================== */
  function initBookingLink() {
    const links = document.querySelectorAll('[data-booking-link]');
    const wraps = document.querySelectorAll('[data-booking-link-wrap]');
    if (!links.length) return;

    const url = (config.bookingUrl || '').trim();

    wraps.forEach(function (wrap) { wrap.hidden = !url; });

    if (!url) return;

    links.forEach(function (link) {
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    });
  }


  /* ======================================================================
     05. STICKY CTA
     On phones, a "Book a walkthrough" bar slides up from the bottom once
     the hero has scrolled out of view. CSS hides it entirely on desktop,
     so this runs harmlessly there.
     ====================================================================== */
  function initStickyCta() {
    const bar = document.querySelector('[data-sticky-cta]');
    const hero = document.querySelector('.hero');
    if (!bar || !hero) return;

    // Older browsers: just show it rather than never showing it.
    if (!('IntersectionObserver' in window)) {
      bar.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0 });

    observer.observe(hero);
  }


  /* ======================================================================
     06. BEFORE / AFTER TILES
     On a laptop, CSS :hover does all the work. Touch screens have no
     hover, so a tap toggles .is-peeking instead — wired to Enter/Space
     as well, so a keyboard can reach it.

     Touch screens also get the reveal: the tile arrives showing the
     before and transforms as it scrolls into view, which demonstrates
     the effect rather than hoping somebody guesses a photo is tappable.
     ====================================================================== */
  function initRevealGrid() {
    const tiles = document.querySelectorAll('.reveal-tile');
    if (!tiles.length) return;

    const canHover = window.matchMedia('(hover: hover)').matches;

    tiles.forEach(function (tile) {
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('role', 'button');
      tile.setAttribute('aria-label', 'Switch between the before and after photo');

      // Mouse/trackpad: :hover already handles it, so don't double up.
      if (!canHover) {
        tile.addEventListener('click', function () {
          tile.classList.toggle('is-peeking');
        });
      }

      tile.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        tile.classList.toggle('is-peeking');
      });
    });

    // ---- Touch only: the tile transforms itself as you scroll to it ----
    // The CSS starts the finished photo hidden on a touch screen. This adds
    // .is-revealed when the tile is properly on screen, which fades it in.
    // Every early exit below ends the same way — the finished photo shown —
    // so a phone that cannot run this is never stuck on the before.
    if (canHover) return;

    function revealAll() {
      tiles.forEach(function (tile) { tile.classList.add('is-revealed'); });
    }

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);              // it only transforms once
      });
    }, { threshold: 0.6 });

    tiles.forEach(function (tile) { observer.observe(tile); });
  }


  /* ======================================================================
     07. SCROLL REVEAL
     Fades elements in as they enter the viewport.
     Add class="reveal" to any element in the HTML to opt it in.
     ====================================================================== */
  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // Older browsers, or anyone who prefers reduced motion: just show them.
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (item) { observer.observe(item); });
  }


  /* ======================================================================
     08. STAT COUNTS
     The four project figures count up from zero the first time they scroll
     into view. The finished number is already written into the HTML, so if
     this never runs — old browser, reduced motion, JavaScript off — the
     figures are simply there, correct and static.
     ====================================================================== */
  function initStatCounts() {
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const DURATION = 950;   // long enough to read as motion, short enough not to stall

    function countUp(el) {
      const target = Number(el.dataset.count);
      if (!isFinite(target)) return;
      const started = performance.now();

      (function frame(now) {
        const t = Math.min((now - started) / DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3);          // ease out, so it settles
        el.textContent = Math.round(target * eased).toLocaleString('en-CA');
        if (t < 1) requestAnimationFrame(frame);
        else el.textContent = target.toLocaleString('en-CA');
      })(started);
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        obs.unobserve(entry.target);                   // once only
      });
    }, { threshold: 0.5 });

    nums.forEach(function (el) { observer.observe(el); });
  }


  /* ======================================================================
     09. FOOTER YEAR
     Keeps the copyright current without anyone editing it.
     ====================================================================== */
  function initFooterYear() {
    const el = document.querySelector('[data-year]');
    if (el) el.textContent = new Date().getFullYear();
  }


  /* ======================================================================
     BOOT
     ====================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    initEnquiryForm();
    initHeroVideo();
    initNavScroll();
    initBookingLink();
    initStickyCta();
    initRevealGrid();
    initScrollReveal();
    initStatCounts();
    initFooterYear();
  });

})();
