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

     The booking section shows real fields either way. This only decides
     where the answers go when someone submits:

       filled in -> the Tally form opens pre-filled
       empty     -> a pre-written email to the address below opens instead

     Pre-fill is not automatic. In Tally you must add a HIDDEN FIELD for
     each answer, named exactly: name, email, phone, address, timeline —
     then bind each visible question to its hidden field under "Default
     answer". The names are case-sensitive. Miss this and the form opens
     blank and people retype everything.
     ------------------------------------------------------------------ */
  tallyFormId: 'Me27XM',


  /* ------------------------------------------------------------------
     2. HERO VIDEO  (optional)
     ------------------------------------------------------------------
     Leave this empty and the hero shows the still photo.

     When you have a loop, drop the file in assets/video/ and put its
     path here, e.g. 'assets/video/hero-loop.mp4'. The still stays as
     the poster frame, so nothing flashes while the video loads.

     The video only plays on larger screens — phones keep the still, to
     spare people's data and battery — and anyone who has asked their
     system to reduce motion keeps it too.

     What to shoot: 6-10 seconds, silent, a slow steady push toward the
     front of a finished house. Export it under about 4 MB.
     ------------------------------------------------------------------ */
  heroVideo: '',


  /* ------------------------------------------------------------------
     3. BOOKING LINK  (Calendly, Cal.com, whatever Andrew uses)
     ------------------------------------------------------------------
     Example: 'https://calendly.com/andrew-rehouse/discovery-call'

     While this is empty, the "Pick a time directly" line is hidden so
     visitors never hit a dead link.
     ------------------------------------------------------------------ */
  bookingUrl: '',


  /* ------------------------------------------------------------------
     4. CONTACT DETAILS
     ------------------------------------------------------------------
     Used for the email fallback button. If any of these change, update
     them here AND in the footer of index.html.
     ------------------------------------------------------------------ */
  email: 'andrew@rehouseto.ca',
  mobile: '647-309-4770',
  office: '416-535-8859'
};
