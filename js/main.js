/* ==========================================================================
   RE HOUSE — Main JavaScript
   --------------------------------------------------------------------------
   MODULES
   01. Mobile navigation
   02. Active link highlighting on scroll
   03. Scroll reveal animations
   04. Ticker (pause on hover)
   05. Contact form — Tally embed swap, validation, submission
   06. Footer year
   --------------------------------------------------------------------------
   Settings live in js/config.js — you shouldn't need to edit this file.
   ========================================================================== */

(function () {
  'use strict';

  // Fall back to an empty config so the site never breaks if config.js
  // fails to load.
  const config = typeof RE_HOUSE_CONFIG !== 'undefined' ? RE_HOUSE_CONFIG : {};


  /* ======================================================================
     01. MOBILE NAVIGATION
     Toggles the slide-down menu on phones and closes it after a tap.
     ====================================================================== */
  function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const links  = document.querySelector('.nav__links');
    if (!toggle || !links) return;

    function closeMenu() {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a link is tapped
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // Close if the window is resized back up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }


  /* ======================================================================
     02. ACTIVE LINK HIGHLIGHTING
     Underlines whichever nav item matches the section you're looking at.
     ====================================================================== */
  function initActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { observer.observe(section); });
  }


  /* ======================================================================
     03. SCROLL REVEAL
     Fades elements in as they enter the viewport.
     Add class="reveal" to any element in the HTML to opt it in.
     ====================================================================== */
  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // If the browser is old or the user prefers reduced motion, just show them.
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
     04. TICKER
     Pauses the scrolling results bar when the pointer is over it.
     ====================================================================== */
  function initTicker() {
    const track = document.querySelector('.ticker__track');
    if (!track) return;

    track.parentElement.addEventListener('mouseenter', function () {
      track.style.animationPlayState = 'paused';
    });
    track.parentElement.addEventListener('mouseleave', function () {
      track.style.animationPlayState = 'running';
    });
  }


  /* ======================================================================
     05. CONTACT FORM
     ====================================================================== */

  /* If a Tally form ID is configured, replace the styled placeholder form
     with the real embedded Tally form. */
  function initTallyEmbed() {
    const wrapper = document.querySelector('[data-form-wrapper]');
    if (!wrapper || !config.tallyFormId) return false;

    const height = config.tallyHeight || 560;
    const src = 'https://tally.so/embed/' + encodeURIComponent(config.tallyFormId) +
                '?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

    wrapper.innerHTML =
      '<iframe src="' + src + '" width="100%" height="' + height + '" ' +
      'frameborder="0" marginheight="0" marginwidth="0" ' +
      'title="Re House enquiry form" loading="lazy" ' +
      'style="border:none;background:transparent;"></iframe>';

    // Tally's script auto-resizes the iframe to fit its content.
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return true;
  }

  /* Basic client-side validation + submission for the built-in form. */
  function initContactForm() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('.form__button');
    const buttonLabel = button ? button.textContent : '';

    function setStatus(message, type) {
      if (!status) return;
      status.textContent = message;
      status.className = 'form__status' + (type ? ' form__status--' + type : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setStatus('', '');

      // Honeypot — if this hidden field is filled, it's a bot. Fail silently.
      const honeypot = form.querySelector('[name="company_website"]');
      if (honeypot && honeypot.value) return;

      // Validate required fields
      let valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        const empty = !field.value.trim();
        const badEmail = field.type === 'email' && field.value &&
                         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        const bad = empty || badEmail;
        field.classList.toggle('is-invalid', bad);
        if (bad) valid = false;
      });

      if (!valid) {
        setStatus('Please fill in every field with a valid email address.', 'error');
        return;
      }

      // Gather the data
      const data = {};
      new FormData(form).forEach(function (value, key) {
        if (key !== 'company_website') data[key] = value;
      });

      // No endpoint configured yet — open the visitor's email client instead
      // so no enquiry is ever lost while the form is being wired up.
      if (!config.formEndpoint) {
        const subject = encodeURIComponent('Re House enquiry — ' + (data.name || 'New enquiry'));
        const body = encodeURIComponent(
          Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n')
        );
        window.location.href = 'mailto:' + (config.email || 'hello@rehouse.ca') +
                               '?subject=' + subject + '&body=' + body;
        setStatus('Opening your email app to send this enquiry…', 'success');
        return;
      }

      // Send it
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      setStatus('Sending your enquiry…', '');

      fetch(config.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Request failed');
          if (config.successRedirect) {
            window.location.href = config.successRedirect;
          } else {
            form.reset();
            setStatus('Thank you — we\'ll be in touch within 24 hours.', 'success');
          }
        })
        .catch(function () {
          setStatus('Something went wrong. Please email ' +
                    (config.email || 'hello@rehouse.ca') + ' directly.', 'error');
        })
        .finally(function () {
          if (button) { button.disabled = false; button.textContent = buttonLabel; }
        });
    });

    // Clear the invalid state as soon as the visitor starts fixing it
    form.querySelectorAll('input, select').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('is-invalid');
      });
    });
  }


  /* ======================================================================
     06. BOOKING LINK + FOOTER YEAR
     ====================================================================== */
  function initBookingLink() {
    if (!config.bookingUrl) return;
    document.querySelectorAll('[data-booking-link]').forEach(function (link) {
      link.setAttribute('href', config.bookingUrl);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    });
  }

  function initFooterYear() {
    const el = document.querySelector('[data-year]');
    if (el) el.textContent = new Date().getFullYear();
  }


  /* ======================================================================
     BOOT
     ====================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initActiveLinks();
    initScrollReveal();
    initTicker();
    initBookingLink();
    initFooterYear();

    // Only wire up the custom form if we haven't swapped in a Tally embed.
    if (!initTallyEmbed()) {
      initContactForm();
    }
  });

})();
