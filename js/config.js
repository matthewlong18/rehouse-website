/* ==========================================================================
   RE HOUSE — Site Configuration
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CONNECT THE CONTACT FORM.
   Everything else works out of the box.
   ========================================================================== */

const RE_HOUSE_CONFIG = {

  /* ------------------------------------------------------------------
     1. TALLY FORM  (recommended — you already use Tally)
     ------------------------------------------------------------------
     How to fill this in:
       1. Build the enquiry form at tally.so
       2. Hit "Share" → copy the link, e.g.  https://tally.so/r/wAbC12
       3. The bit after /r/ is your form ID — paste it below.

     Once tallyFormId has a value, the styled placeholder form on the
     homepage is automatically swapped for your live Tally form.
     Leave it as an empty string ('') to keep the placeholder.
     ------------------------------------------------------------------ */
  tallyFormId: '',

  /* Height of the embedded Tally form in pixels. Bump it if the form
     gets cut off at the bottom. */
  tallyHeight: 560,


  /* ------------------------------------------------------------------
     2. FALLBACK ENDPOINT  (optional)
     ------------------------------------------------------------------
     If you'd rather keep the custom-styled form and send submissions
     somewhere else (Formspree, Make, Zapier, a webhook), paste the URL
     here and leave tallyFormId empty. The form will POST JSON to it.

     Example (Formspree):  'https://formspree.io/f/xyzabcde'
     ------------------------------------------------------------------ */
  formEndpoint: '',


  /* ------------------------------------------------------------------
     3. WHERE TO SEND PEOPLE AFTER A SUCCESSFUL SUBMIT
     ------------------------------------------------------------------ */
  successRedirect: 'thank-you.html',


  /* ------------------------------------------------------------------
     4. CONTACT DETAILS  (used in the footer and mailto fallback)
     ------------------------------------------------------------------ */
  email: 'hello@rehouse.ca',
  instagram: 'https://instagram.com/rehouse.toronto',


  /* ------------------------------------------------------------------
     5. BOOKING LINK  (Calendly / Cal.com — optional)
     ------------------------------------------------------------------
     If set, the "Book a consult" nav button opens this link in a new
     tab instead of scrolling to the contact form.
     ------------------------------------------------------------------ */
  bookingUrl: ''
};
