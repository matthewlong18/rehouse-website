/* ==========================================================================
   RE HOUSE — Site Configuration
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO GET THE SITE FULLY WORKING.
   Three values. Fill them in and everything else takes care of itself.
   ========================================================================== */

const RE_HOUSE_CONFIG = {

  /* ------------------------------------------------------------------
     1. TALLY FORM ID
     ------------------------------------------------------------------
     How to get it:
       1. Build the enquiry form at tally.so
       2. Hit "Share" and copy the link, e.g.  https://tally.so/r/mZ1a4B
       3. The bit after /r/ is the ID — paste it below.

     While this is empty, the contact panel shows the "Email Andrew"
     button instead (pre-filled with the property questions), so the
     page always has a working contact path.
     ------------------------------------------------------------------ */
  tallyFormId: 'Me27XM',

  /* Starting height of the embedded form in pixels. It auto-resizes to
     fit once Tally's script loads, so this is just the initial value. */
  tallyHeight: 620,


  /* ------------------------------------------------------------------
     2. BOOKING LINK  (Calendly, Cal.com, whatever Andrew uses)
     ------------------------------------------------------------------
     Example: 'https://calendly.com/andrew-rehouse/discovery-call'

     While this is empty, the "Pick a time directly" line is hidden so
     visitors never hit a dead link.
     ------------------------------------------------------------------ */
  bookingUrl: '',


  /* ------------------------------------------------------------------
     3. CONTACT DETAILS
     ------------------------------------------------------------------
     Used for the email fallback button. If any of these change, update
     them here AND in the footer of index.html.
     ------------------------------------------------------------------ */
  email: 'andrew@rehouseto.ca',
  mobile: '647-309-4770',
  office: '416-535-8859'
};
