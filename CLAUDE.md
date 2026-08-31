# Re House — project context

The website for Re House, my brother Andrew's renovate-to-sell business in
Toronto and the GTA. Positioning is **Design · Renovate · List** — one team
handles the design, the renovation and the listing, so a house reaches the
market as the best version of itself.

I'm Matthew. I'm not a developer — explain what you're doing and why in plain
language, and favour the simple option over the clever one.

## Stack

Plain HTML, CSS and JavaScript. **No build step, no framework, no npm.** What
you see in the folder is what ships.

```
index.html      the whole homepage, one file
privacy.html    privacy page
404.html
css/style.css       everything
css/responsive.css  breakpoint overrides only
js/config.js    settings — the one file meant to be edited to change behaviour
js/main.js      9 small modules, documented at the top of the file
assets/         images, icons, fonts, video
_to_delete/     junk drawer, gitignored — never commit it
_*.zip          old transfer archives, gitignored
```

Page sections, in order: `#top` (hero) → `#scope` → `#process` → `#project`
(the 381 Westmoreland sold case study) → `#book` (enquiry form).

## Deployment

- GitHub Pages, from the **main** branch of `matthewlong18/rehouse-website`
- Live at **rehouseto.ca** (the `CNAME` file in the repo points it there)
- **Pushing to main deploys to production.** There is no staging environment
- Pages takes a minute or two, and browsers cache `css/` and `js/` for a while —
  after a push, remind me to hard-refresh with Ctrl+Shift+R

## The enquiry form — read this before touching it

The form in `#book` is a **Tally embed**, form ID `Me27XM`, set in
`js/config.js`. `js/main.js` builds the iframe and hides the hand-written
fallback fields underneath it.

It used to collect the details on the page and then dump people onto tally.so
in a new tab to type everything again. That was a bug. **It must never open
Tally in a new tab.**

Two things that look harmless and both break it:

1. **Never set `iframe.src` yourself.** Set only `data-tally-src` and let
   `Tally.loadEmbeds()` assign the src. Tally's widget skips any iframe that
   already has a src, and skipping it means `dynamicHeight` never wires up —
   the form gets stuck in a 520px scroll box instead of growing to fit.
2. **Never put a light background behind it.** The Tally form uses a dark theme
   with light label text. On a bone or white panel every question goes
   invisible. The panel is transparent so the form sits on the black band.

There's a 4-second fallback: if Tally's widget script never loads, the iframe
loads directly so the booking section is never an empty box.

If the form ID is ever blanked out in `js/config.js`, the hand-written fields
come back and submit as a pre-written email to Andrew instead.

## How I want you to work

- One logical change per commit, with a real commit message
- Show me the change before you push, and wait for me to say go — pushing is live
- Don't add dependencies, build tooling or frameworks without asking first
- Don't commit `_to_delete/` or the `_*.zip` files
- Test in a browser when the change is visual; don't just assume the CSS worked

## Contact details (also in the footer of index.html)

andrew@rehouseto.ca · mobile 647-309-4770 · office 416-535-8859
Instagram @rehouseto
