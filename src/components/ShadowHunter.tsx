import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Gamepad2,
  Swords,
  Star,
  Trophy,
  Users,
  Map,
  Volume2,
} from 'lucide-react';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SocialGlyph } from './icons';

const GITHUB = 'https://github.com/toms1010';

const BADGES = ['Featured Project', 'Desktop Game', '2D Action'];

const STATS: { value: string; label: string }[] = [
  { value: '10', label: 'Themed levels + Shadow King finale' },
  { value: '4', label: 'Playable hunters' },
  { value: '8', label: 'Upgradeable weapons · 4 rarities' },
  { value: '13', label: 'Runtime screenshots · 1280×720' },
];

const GALLERY: { src: string; alt: string; caption: string; body: string }[] = [
  {
    src: 'images/shadow-hunter/shadow-hunter-main-menu.png',
    alt: 'Shadow Hunter main menu at 1280 by 720 landscape with Continue, Play, World Map, Settings, Controls, Credits and Quit buttons',
    caption: '01 — Main Menu',
    body: 'Entry point. Continue, Play, World Map, Settings, Controls, Credits, Quit — all real buttons with real callbacks.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-character-select.png',
    alt: 'Shadow Hunter character select screen showing all four hunters in landscape 16 by 9',
    caption: '02 — Character Select',
    body: 'Pick 1 of 4 hunters from data/characters.json. Detail panel shows the focused hunter.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-customization.png',
    alt: 'Shadow Hunter character customization screen in landscape',
    caption: '03 — Customization',
    body: 'Tune appearance and starting loadout before entering the campaign.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-world-map.png',
    alt: 'Shadow Hunter world map with level 1 to 10 progression in landscape',
    caption: '04 — World Map',
    body: 'Campaign progression across 10 themed levels leading to the Shadow King.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-level-1.png',
    alt: 'Shadow Hunter level 1 Shadow Forest guided tutorial in landscape',
    caption: '05 — Level 1 · Shadow Forest',
    body: 'Guided tutorial: move → attack → weapon pickup → dodge → abilities → pickups → Wave 1 → upgrade → Ruined Shrine ambush → Forest Guardian.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-combat.png',
    alt: 'Shadow Hunter real-time combat gameplay in landscape 16 by 9',
    caption: '06 — Combat',
    body: 'Hack-and-slash survival: WASD move, mouse aim, LMB basic, RMB heavy, SPACE dodge with i-frames.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-weapon-found.png',
    alt: 'Shadow Hunter weapon found loot popup in landscape',
    caption: '07 — Weapon Found',
    body: 'Loot system: 8 weapons with levels, Common / Rare / Epic / Legendary rarities and special effects.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-inventory.png',
    alt: 'Shadow Hunter inventory screen in landscape',
    caption: '08 — Inventory',
    body: 'Press I anytime. Manage weapons, abilities and pickups without pausing the run logic.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-weapon-upgrade.png',
    alt: 'Shadow Hunter weapon upgrade screen in landscape',
    caption: '09 — Weapon Upgrade',
    body: 'Spend rewards between waves. Levels + rarity + special effects stack into builds.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-boss-fight.png',
    alt: 'Shadow Hunter boss fight with Forest Guardian in landscape',
    caption: '10 — Boss Fight',
    body: 'Unique bosses per level with phases (data/bosses.json). Music crossfades to the boss assault track.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-level-complete.png',
    alt: 'Shadow Hunter level complete rewards screen in landscape',
    caption: '11 — Level Complete',
    body: 'Waves → boss → rewards loop. Clears unlock the next node on the world map.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-victory.png',
    alt: 'Shadow Hunter victory screen after defeating the Shadow King in landscape',
    caption: '12 — Victory',
    body: 'Defeat the Shadow King across Level 1–10 to reach Victory → Credits.',
  },
  {
    src: 'images/shadow-hunter/shadow-hunter-settings.png',
    alt: 'Shadow Hunter settings screen with master music and SFX volumes in landscape',
    caption: '13 — Settings',
    body: 'Master / music / SFX volumes persist to save/settings.json. SFX use cooldown + priority anti-spam.',
  },
];

const CONTROLS: { input: string; action: string }[] = [
  { input: 'WASD / Arrows', action: 'Move' },
  { input: 'Mouse', action: 'Aim' },
  { input: 'LMB', action: 'Basic attack' },
  { input: 'RMB', action: 'Heavy attack' },
  { input: 'SPACE', action: 'Dodge (i-frames)' },
  { input: 'Q / E / R', action: 'Shadow Dash / Burst / Storm' },
  { input: 'ESC · TAB · I · M', action: 'Pause · Stats · Inventory · Map' },
];

const FLOW = [
  'MAIN MENU',
  'CHARACTER SELECT (4 hunters)',
  'CUSTOMIZE',
  'WORLD MAP',
  'LEVEL 1–10 (waves → boss → rewards)',
  'SHADOW KING',
  'VICTORY → CREDITS',
];

function Card({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}): React.JSX.Element {
  return (
    <div
      aria-label={label}
      className="rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:border-accent hover:shadow-xl sm:p-8"
    >
      {children}
    </div>
  );
}

export function ShadowHunter(): React.JSX.Element {
  return (
    <section
      id="project-shadow-hunter"
      aria-labelledby="shadow-hunter-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <p className="mb-3 text-center text-xs font-bold tracking-[0.25em] text-muted">
          CASE STUDY / FEATURED PROJECT
        </p>
        <SectionHeading id="shadow-hunter-heading" accent="Hunter">
          Shadow
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          2D action / hack-and-slash survival game built with Python 3 + Pygame — offline, no
          backend.
        </p>

        <ul
          aria-label="Project badges"
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <li className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            <Star className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
            Featured Project
          </li>
          {BADGES.slice(1).map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
            >
              {badge}
            </li>
          ))}
          <li className="rounded-full border border-line bg-card px-3 py-1 text-xs font-bold text-muted">
            Computer Engineering
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Shadow Hunter source code on GitHub (opens in a new tab)"
            className="btn-primary min-h-11 px-6 py-2.5 text-sm"
          >
            <SocialGlyph icon="github" className="h-4 w-4" /> GitHub{' '}
            <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 px-6 py-2.5 text-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
        </div>

        {/* About this game — before screenshots */}
        <div className="mt-10">
          <Card label="About this game">
            <h3 className="flex items-center justify-center gap-2 text-center text-2xl font-extrabold">
              <Gamepad2 className="h-6 w-6 text-accent" aria-hidden="true" focusable="false" />
              About This Game
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-center text-muted">
              <strong className="text-ink">Shadow Hunter</strong> is a complete 2D action game: pick
              a hunter, fight through <strong className="text-ink">10 themed levels</strong> full of
              waves, traps, poison, locked doors, destructibles and ambushes, beat each unique boss,
              loot and upgrade <strong className="text-ink">8 weapons</strong> across 4 rarities, and
              take down the <strong className="text-ink">Shadow King</strong>.
            </p>
            <div className="mx-auto mt-6 grid max-w-4xl gap-4 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-black/5 p-4 dark:bg-black/25">
                <p className="flex items-center gap-2 font-bold">
                  <Users className="h-4 w-4 text-accent" aria-hidden="true" /> Hunters & abilities
                </p>
                <p className="mt-2 text-sm text-muted">
                  4 hunters, dodge with i-frames, plus Shadow Dash (Q), Burst (E) and Storm (R).
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-black/5 p-4 dark:bg-black/25">
                <p className="flex items-center gap-2 font-bold">
                  <Swords className="h-4 w-4 text-accent" aria-hidden="true" /> Weapons & loot
                </p>
                <p className="mt-2 text-sm text-muted">
                  8 weapons, levels, Common → Legendary rarities, special effects and upgrades.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-black/5 p-4 dark:bg-black/25">
                <p className="flex items-center gap-2 font-bold">
                  <Map className="h-4 w-4 text-accent" aria-hidden="true" /> World & bosses
                </p>
                <p className="mt-2 text-sm text-muted">
                  10 levels with unique bosses, crossfading explore / combat / boss music.
                </p>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted">
              All art is generated offline by <code>tools/gen_assets.py</code> (133 PNGs with
              Pygame-primitive fallback) and all sound by <code>tools/gen_audio.py</code> (17 SFX +
              3 music loops with fallback synthesis) — so the game never crashes over a missing
              file. Verified with <code>python -m pytest tests/ -q</code>.
            </p>
          </Card>
        </div>

        {/* Landscape hero preview — fixed 16:9, never portrait */}
        <figure className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-line bg-card shadow-xl">
          <div className="flex items-center gap-2 border-b border-line bg-black/5 px-4 py-3 dark:bg-black/25">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </span>
            <span className="ml-2 min-w-0 flex-1 truncate rounded-lg bg-page px-3 py-1 font-mono text-xs text-muted">
              1280 × 720 · landscape 16:9 · Pygame runtime capture
            </span>
          </div>
          <img
            src={asset('images/shadow-hunter/shadow-hunter-combat.png')}
            alt="Landscape 16 by 9 Shadow Hunter combat gameplay captured from the Pygame runtime at 1280 by 720"
            loading="lazy"
            width={1280}
            height={720}
            className="aspect-video w-full object-cover object-center"
          />
          <figcaption className="border-t border-line px-4 py-3 text-center text-xs text-muted">
            Real screenshot from the Pygame runtime — always landscape 1280×720, never portrait.
          </figcaption>
        </figure>

        {/* Stats */}
        <dl
          aria-label="Project statistics"
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-line bg-card p-5 text-center transition-colors hover:border-accent"
            >
              <dt className="order-2 mt-1 text-xs font-semibold text-muted">{stat.label}</dt>
              <dd className="gradient-text order-1 text-3xl font-extrabold">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* Screenshot gallery — all landscape */}
        <h3 className="mt-14 text-center text-2xl font-extrabold">Project Screenshots</h3>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
          All 13 screenshots are captured from the actual Pygame runtime via{' '}
          <code>tools/capture_screenshots.py</code> — fixed landscape 1280×720 (16:9).
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((shot) => (
            <figure
              key={shot.src}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <div className="block overflow-hidden bg-black">
                <img
                  src={asset(shot.src)}
                  alt={shot.alt}
                  loading="lazy"
                  width={640}
                  height={360}
                  className="aspect-video w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="flex flex-1 flex-col gap-1.5 p-4 text-sm">
                <span className="font-bold">{shot.caption}</span>
                <span className="text-muted">{shot.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Controls + flow + run */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card label="Controls">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <Gamepad2 className="h-5 w-5 text-accent" aria-hidden="true" /> Controls
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {CONTROLS.map((c) => (
                <li
                  key={c.input}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-black/5 px-3 py-2 dark:bg-black/25"
                >
                  <span className="font-bold">{c.input}</span>
                  <span className="text-right text-muted">{c.action}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card label="Game flow and run">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <Trophy className="h-5 w-5 text-accent" aria-hidden="true" /> Game flow
            </h3>
            <ol className="mt-4 space-y-1.5 text-sm text-muted">
              {FLOW.map((step, i) => (
                <li key={step} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-accent"
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <h4 className="mt-5 flex items-center gap-2 font-bold">
              <Volume2 className="h-4 w-4 text-accent" aria-hidden="true" /> Run it
            </h4>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-black/80 p-3 font-mono text-xs text-green-300">
              pip install -r requirements.txt{'\n'}python main.py
            </pre>
            <p className="mt-2 text-xs text-muted">
              Level 1 (Shadow Forest) is a guided tutorial: move → attack → weapon pickup → dodge →
              abilities → pickups → Wave 1 → upgrade → Ruined Shrine ambush → Forest Guardian.
            </p>
          </Card>
        </div>

        {/* CTA + navigation */}
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-accent to-highlight p-6 text-center text-white sm:p-10">
          <h3 className="text-2xl font-extrabold">A Real Playable Pygame Game</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/85">
            Offline Python + Pygame, JSON-driven hunters / weapons / levels / bosses, synthesized
            art + audio pipelines, and headless logic tests.
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile (opens in a new tab)"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition-transform hover:-translate-y-0.5"
          >
            View Code on GitHub{' '}
            <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 w-full px-5 py-2.5 text-sm sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#project-transport-system"
              aria-label="Next project: Student Transport Management System"
              className="btn-outline min-h-11 px-5 py-2.5 text-sm"
            >
              Next Project <ArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
            </a>
          </div>
        </nav>
      </Reveal>
    </section>
  );
}
