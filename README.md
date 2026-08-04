# Re House — Website

Marketing site for **Re House**, a Toronto pre-sale design and renovation studio.
Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies.
Edit a file, push it, and it's live in about 30 seconds.

Built from the `ReHouse_Homepage_V1_3` mockup.

---

## Folder structure

```
rehouse-website/
├── index.html          ← the homepage (all the words live here)
├── privacy.html        ← privacy policy
├── 404.html            ← shown when a page doesn't exist
│
├── css/
│   ├── style.css       ← all the styling, organised into numbered sections
│   └── responsive.css  ← everything that changes on tablet & phone
│
├── js/
│   ├── config.js       ← ⚙️ SETTINGS — the only file you need to edit
│   └── main.js         ← Tally embed, booking link, scroll animations
│
├── assets/
│   ├── images/         ← photos and the logo
│   ├── icons/          ← favicon
│   └── fonts/          ← self-hosted fonts (currently loaded from Google)
│
├── CNAME               ← the custom domain (rehouseto.ca)
├── robots.txt          ← tells search engines they may index the site
├── sitemap.xml         ← lists the pages for Google
├── .nojekyll           ← tells GitHub Pages to serve files as-is
└── .gitignore          ← files git should never upload
```

---

## Two things to fill in

Open **`js/config.js`**. There are only three settings and two of them are blank:

**1. The Tally form**

```js
tallyFormId: 'mZ1a4B',
```

Build the enquiry form at [tally.so](https://tally.so), hit **Share**, copy the link
(e.g. `https://tally.so/r/mZ1a4B`) — the bit after `/r/` is the ID.

Until this is set, the contact panel shows an **Email Andrew** button instead,
pre-filled with the property questions. Nothing is broken in the meantime.

**2. The booking link**

```js
bookingUrl: 'https://calendly.com/andrew-rehouse/discovery-call',
```

Until this is set, the "Pick a time directly" line is hidden, so nobody clicks
through to a dead link.

That's it. No other file needs touching to make the site functional.

---

## Where to change things

| I want to change…              | Open this file                            |
| ------------------------------ | ----------------------------------------- |
| Any words on the homepage      | `index.html`                              |
| Brand colours                  | `css/style.css` — section 01, at the top   |
| Spacing, fonts, layout         | `css/style.css`                           |
| How it looks on a phone        | `css/responsive.css`                      |
| Tally form / booking link      | `js/config.js`                            |
| Service tiers and pricing      | `index.html` — search for `SERVICES`       |
| The 5-step process             | `index.html` — search for `PROCESS`        |
| Phone numbers and email        | `index.html` footer **and** `js/config.js` |

Every section in the HTML and CSS has a big comment header, so use
`Ctrl+F` and search for the section name in capitals.

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

---

## Hosting

Hosted free on **GitHub Pages**, deploying from the `main` branch.

- Live at: `https://YOUR-USERNAME.github.io/rehouse-website/`
- Custom domain: `rehouseto.ca` (set in the `CNAME` file)

### Pointing rehouseto.ca at the site

At your domain registrar, add these DNS records:

| Type  | Name  | Value                     |
| ----- | ----- | ------------------------- |
| A     | `@`   | `185.199.108.153`         |
| A     | `@`   | `185.199.109.153`         |
| A     | `@`   | `185.199.110.153`         |
| A     | `@`   | `185.199.111.153`         |
| CNAME | `www` | `YOUR-USERNAME.github.io` |

Then in the repo: **Settings → Pages → Custom domain**, enter `rehouseto.ca`,
save, and tick **Enforce HTTPS** once the certificate is issued (can take up
to an hour).

**Not using the custom domain yet?** Delete the `CNAME` file — the site will
just run on the `github.io` address.

---

## Still to do

- [ ] Paste the Tally form ID into `js/config.js`
- [ ] Paste Andrew's booking link into `js/config.js`
- [ ] Point the `rehouseto.ca` DNS records at GitHub Pages
- [ ] Add real project photography (there is no gallery section yet — worth
      adding once there are before/after shots worth showing)
- [ ] Confirm the brokerage's required disclosure wording for the footer

---

## Note on the footer

The footer carries `Andrew Long, Realtor®.` and `Powered by Origin Collective
Realty`. Brokerages usually have specific rules about how an agent's name and
the brokerage name must appear on marketing material — worth a quick check with
Origin Collective before the site is promoted publicly.
