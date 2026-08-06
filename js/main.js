/* ==========================================================================
   RE HOUSE — Main JavaScript
   --------------------------------------------------------------------------
   MODULES
   01. Tally form   — opens the enquiry form in a modal
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
     01. TALLY FORM (modal)
     The panel button opens the form as an overlay instead of embedding it
     inline. Tally's free plan locks its own type scale and 700px page
     width, which reads as oversized inside this narrow column — a modal
     gives the form the width it was designed for and leaves the panel's
     own typography untouched.

     With no form ID configured the button stays a pre-filled mailto, so
     the page still has a working contact path.
     ====================================================================== */
  function initTallyForm() {
    const button = document.querySelector('[data-contact-button]');
    if (!button) return;

    const formId = (config.tallyFormId || '').trim();
    if (!formId) return;   // leave the email fallback in place

    button.textContent = 'Book a discovery call';
    button.removeAttribute('href');
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.style.cursor = 'pointer';

    // Tally reads these attributes and handles the overlay itself
    button.setAttribute('data-tally-open', formId);
    button.setAttribute('data-tally-layout', 'modal');
    button.setAttribute('data-tally-width', '700');
    button.setAttribute('data-tally-overlay', '1');
    button.setAttribute('data-tally-hide-title', '1');

    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    // If Tally can't load, send people to the hosted form rather than nowhere
    script.onerror = function () {
      button.setAttribute('href', 'https://tally.so/r/' + encodeURIComponent(formId));
      button.setAttribute('target', '_blank');
      button.setAttribute('rel', 'noopener');
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
    initTallyForm();
    initBookingLink();
    initScrollReveal();
    initFooterYear();
  });

})();
