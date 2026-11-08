# Nocturne — static build

A calm, private journaling workspace: journal entries, a seven-track planner, search,
calendar, memory graph, focus sessions, ambient sound, Sanctuary, and browser-local
backup/import — plus **The Unlisted Wing**, a hidden set of rooms behind a passphrase.

## Run locally

```bash
python3 -m http.server 8000
```

Open <http://127.0.0.1:8000>. Use a local server rather than opening `index.html`
directly — install and offline features need `localhost` or HTTPS.

## Deploying

Upload the **entire folder**. `index.html` depends on `assets/`, `manifest.webmanifest`
and `service-worker.js`. Keep their relative locations. Do not upload `index.html` alone.

## Accent colours

Choosing an accent in Settings → Appearance now recolours **the whole surface** — page
background, cards, sidebar, borders and muted fills — not just the buttons. Pick
Rosewood and the room goes warm pink; pick Sky and it goes cold blue.

(Previously the accent only set `--primary`, which is why the page behind it never moved.)

## No install prompt

Nocturne is a website you open, not an app you install. The in-page "Install Nocturne"
button has been removed.

## The opening

The first screen is a full-bleed, mouse-reactive scene: depth-layered motes that lean
away from your cursor, a light that follows it, and a slow drift so nothing is ever
quite still. The wordmark rises letter by letter and the tagline rotates.

**Choose your night** — four scenes (Ember, Aurora, Ocean, Forest) recolour the entire
opening live. The sign-in panel sits on the right as a glass card, and a short curtain
lifts once per session on first load.

## Plan — the seven-track planner

**Plan** in the sidebar, or **Ctrl + 4**.

Tracks: 🎓 Academics · 💻 Builder · 🚀 Founder · 🤝 People & Network · 🗣️ Communication ·
🧘 Inner Foundation · 💰 Money

| Tab | What it shows |
|---|---|
| **Today** | That day's tasks grouped by track. Browse days with ← / →, plus a **Plan tomorrow** panel. |
| **This Week** | Everything scoped to the week, grouped by track. |
| **This Month** | Everything scoped to the month, grouped by track. |
| **Tracks** | A progress ring per track, with the next few open items in each. |

Choose a **track** and a **horizon** (Today / This week / This month) when adding a task.
Unfinished items from earlier days surface in a red "unfinished from earlier days" block
with a one-click **Move all here**.

## The Unlisted Wing

- **Tap the Nocturne logo five times** in quick succession — no visible feedback.
- Passphrase: **`lantern`**
- Or **Ctrl + Shift + W** once unlocked.
- A discreet **"The Wing"** door then appears in the sidebar under Settings; the lock
  icon inside locks it again and hides the door.

Six rooms, each with its own animated scene and its own ambient sound:
Foyer · Observatory · Library · Cellar · Greenhouse · Clocktower.

To change the passphrase: edit `SECRET_PASSCODE` in `src/components/SecretLayer.tsx`.

## Other things worth knowing

- **Press `?`** for the keyboard shortcuts sheet.
- Writing helpers, memory-graph link suggestions and the companion run on **local
  deterministic rules**, not a language model.
- Static PWA shell: manifest, service worker (app shell only — never journal content),
  192/512/maskable icons, installable on supported browsers.
- Accessibility: skip link, main landmark, visible keyboard focus, reduced motion,
  safe-area spacing, icon-button labelling.

## Data and privacy

Accounts and journal content live in **this browser only**. No server database, no
cross-device sync, no app-level encryption at rest. The local password flow is not
production authentication — do not reuse an important password.

Export a backup from Settings before clearing site data or changing browser profiles.

## Validation

```bash
node --check assets/nocturne-app.js
node --check assets/nocturne-enhancements.js
node --check service-worker.js
```
