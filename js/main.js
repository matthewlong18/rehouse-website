/* ==========================================================================
   RE HOUSE — Main JavaScript
   --------------------------------------------------------------------------
   MODULES
   01. Tally embed  — swaps the email fallback for the live form
   02. Booking link — wires up (or hides) the Calendly line
   03. Scroll reveal
   04. Footer year
   --------------------------------------------------------------------------
   Settings live in js/config.js — you shouldn't need to edit this file.
   ========================================================================== */

(function () {
  'use strict';

  // Fall back to an empty config so the site never breaks if config.js
  // fails to load for any reason.
  const config = typeof RE_HOUSE_CONFIG !== 'undefined' ? RE_HOUSE_CONFIG : {};


  /* ======================================================================
     01. TALLY EMBED
     The markup ships with the form slot hidden and the "Email Andrew"
     button visible. Once a real form ID is configured we point the iframe
     at it, add .is-tally-live to the panel (CSS flips which one shows),
     and load Tally's script so the iframe auto-resizes to its content.
     ====================================================================== */
  function initTallyEmbed() {
    const slot = document.querySelector('.tally-slot');
    if (!slot) return;

    const formId = (config.tallyFormId || '').trim();
    if (!formId) return;   // no ID yet — leave the email fallback showing

    const iframe = slot.querySelector('iframe');
    if (!iframe) return;

    iframe.src = 'https://tally.so/embed/' + encodeURIComponent(formId) +
                 '?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';
    if (config.tallyHeight) iframe.height = config.tallyHeight;

    const panel = slot.closest('.panel');
    if (panel) panel.classList.add('is-tally-live');

    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = function () {
      if (window.Tally) window.Tally.loadEmbeds();
    };
    document.body.appendChild(script);
  }


  /* ======================================================================
     02. BOOKING LINK
     Fills in the Calendly URL, or hides the line entirely so a visitor
     never clicks through to nothing.
     ====================================================================== */
  function initBookingLink() {
    const links = document.querySelectorAll('[data-booking-link]');
    if (!links.length) return;

    const url = (config.bookingUrl || '').trim();

    links.forEach(function (link) {
      if (!url) {
        link.hidden = true;
        return;
      }
      link.hidden = false;
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    });
  }


  /* ======================================================================
     03. SCROLL REVEAL
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
     04. FOOTER YEAR
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
    initTallyEmbed();
    initBookingLink();
    initScrollReveal();
    initFooterYear();
  });

})();
