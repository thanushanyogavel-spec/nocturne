# Change log

## This build — accent, install prompt, consistency

### Fixed

- **Accent colour now recolours the entire page.** It used to set only `--primary`, so
  buttons and icons changed while the background, cards and sidebar stayed put. The accent
  is now mixed into `--background`, `--card`, `--popover`, `--sidebar`, `--sidebar-accent`,
  `--muted`, `--border` and `--input`, so the whole room takes the colour.
- **Removed the in-page "Install Nocturne" prompt.** The `beforeinstallprompt` handler and
  its button are gone — it's a website, not an app to install.
- **Dead code wired up:** `heatmapWeeks()` existed in `lib/insights.ts` but was never used
  by anything. It now drives a real heatmap.

### Added

- **Consistency card on the home screen** — a 16-week heatmap built from your actual
  entries, with current and longest streaks, hover tooltips showing words per day, and a
  less/more legend.

## Previous builds

### The cinematic opening
- Full-bleed mouse-reactive scene with depth-parallax motes and a cursor light.
- **Choose your night** — Ember / Aurora / Ocean / Forest recolour the opening live.
- Animated wordmark, rotating tagline, intro curtain once per session, glass sign-in panel.
- Fixed: the old landing page was dead code that was never rendered.

### The seven-track planner
- Plan view with Today / This Week / This Month / Tracks; seven tracks with progress rings;
  task horizons; Plan tomorrow; overdue carry-over.

### The Unlisted Wing
- Hidden six-room area behind a passphrase (`lantern`); five taps on the logo; Ctrl+Shift+W
  once unlocked; per-room ambience on a separate audio engine; shortcuts sheet on `?`.

### Fixes carried in
- Import: a 50-entry markdown backup produced 198; now 50 in, 50 out. Archived / trashed /
  favourite / pinned / created-date state preserved on restore.
- Sanctuary sound: gain was divided by 100 twice (everything played at ~0.003). All seven
  audible; per-sound timers; LFO stop no longer recursed.
- Reading: transparent writing surface → solid panel with blur + Reading clarity control.
- Rain: 5–12 px streaks → ~1–2 px with wind gusts.
- Persistence: guest sessions no longer vanish on refresh or sign-out.
- Mobile: sidebar drawer with hamburger, backdrop and auto-close.
