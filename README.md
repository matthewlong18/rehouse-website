# Re House — Website

Marketing site for **Re House**, a Toronto pre-sale design and renovation studio.
Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies.
Edit a file, push it, and it's live in about 30 seconds.

---

## Folder structure

```
rehouse-website/
├── index.html          ← the homepage (all the words live here)
├── thank-you.html      ← shown after someone submits the form
├── privacy.html        ← privacy policy
├── 404.html            ← shown when a page doesn't exist
│
├── css/
│   ├── style.css       ← all the styling, organised into numbered sections
│   └── responsive.css  ← everything that changes on tablet & phone
│
├── js/
│   ├── config.js       ← ⚙️ SETTINGS — the only file you need to edit to
│   │                      connect the contact form
│   └── main.js         ← menu, animations, form handling
│
├── assets/
│   ├── images/         ← photos and the logo
│   ├── icons/          ← favicon
│   └── fonts/          ← self-hosted fonts (currently loaded from Google)
│
├── CNAME               ← the custom domain (rehouse.ca)
├── robots.txt          ← tells search engines they may index the site
├── sitemap.xml         ← lists the pages for Google
├── .nojekyll           ← tells GitHub Pages to serve files as-is
└── .gitignore          ← files git should never upload
```

---

## Where to change things

| I want to change…              | Open this file                              |
| ------------------------------ | ------------------------------------------- |
| Any words on the homepage      | `index.html`                                |
| Brand colours                  | `css/style.css` — section 01, at the top     |
| Spacing, fonts, layout         | `css/style.css`                             |
| How it looks on a phone        | `css/responsive.css`                        |
| Where the contact form goes    | `js/config.js`                              |
| Service tiers and pricing      | `index.html` — search for `SERVICES`         |
| The scrolling results bar      | `index.html` — search for `RESULTS TICKER`   |
| Project case studies           | `index.html` — search for `PROJECTS`         |

Every section in the HTML and CSS has a big comment header, so use
`Ctrl+F` / `Cmd+F` and search for the section name in capitals.

---

## Connecting the contact form

Open `js/config.js` and fill in **one** of these:

**Option A — Tally (recommended)**

1. Build the enquiry form at [tally.so](https://tally.so)
2. Click **Share** and copy the link, e.g. `https://tally.so/r/wAbC12`
3. The bit after `/r/` is the form ID. Paste it:

```js
tallyFormId: 'wAbC12',
```

The styled placeholder form on the homepage is swapped for the live
Tally form automatically. Done.

**Option B — any other endpoint** (Formspree, Make, Zapier, a webhook)

```js
formEndpoint: 'https://formspree.io/f/xyzabcde',
```

The custom-styled form stays and POSTs JSON to that URL.

**Until either is set**, the form opens the visitor's email app pre-filled
with their details — so nothing is lost while it's being wired up.

---

## Editing and deploying

### The easy way (in the browser, no software needed)

1. Go to the repo on GitHub
2. Click the file you want to change
3. Click the pencil ✏️ icon
4. Make your edit
5. Scroll down, click **Commit changes**
6. Wait ~30 seconds — the live site updates itself

### The proper way (on your computer)

```bash
git clone https://github.com/YOUR-USERNAME/rehouse-website.git
cd rehouse-website

# make your edits, then:
git add .
git commit -m "Update the services pricing"
git push
```

To preview locally before pushing:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` by double-clicking works too, but the local server
is closer to how the live site behaves.)

---

## Hosting

Hosted free on **GitHub Pages**, deploying from the `main` branch.

- Live at: `https://YOUR-USERNAME.github.io/rehouse-website/`
- Custom domain: `rehouse.ca` (set in the `CNAME` file)

### Pointing rehouse.ca at the site

At your domain registrar, add these DNS records:

| Type  | Name  | Value                     |
| ----- | ----- | ------------------------- |
| A     | `@`   | `185.199.108.153`         |
| A     | `@`   | `185.199.109.153`         |
| A     | `@`   | `185.199.110.153`         |
| A     | `@`   | `185.199.111.153`         |
| CNAME | `www` | `YOUR-USERNAME.github.io` |

Then in the repo: **Settings → Pages → Custom domain**, enter `rehouse.ca`,
save, and tick **Enforce HTTPS** once the certificate is issued (can take
up to an hour).

**Not using the custom domain yet?** Delete the `CNAME` file — the site
will just run on the `github.io` address.

---

## Still to do

- [ ] Connect the contact form (`js/config.js`)
- [ ] Swap the placeholder before/after gradients for real project photos
- [ ] Replace the sample ROI figures with Re House's actual numbers
- [ ] Add a real client testimonial with permission to use it
- [ ] Point the `rehouse.ca` DNS records at GitHub Pages
- [ ] Confirm the disclaimer needs on ROI claims (marketing copy vs. real results)

---

## A note on the numbers

The ROI figures, sale prices and days-on-market in the ticker, stats block
and project cards are **placeholders from the design mockup**. Swap them for
Re House's real results before the site goes public — advertised performance
claims need to be substantiable.
