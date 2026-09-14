import { useState } from 'react'
import Head from 'next/head'
import Link from '@/components/Link'

/**
 * /light-preview — scoped proposal only. Not applied globally.
 * Tailwind arbitrary values + <style jsx> below. No global CSS/config edits.
 * Light-mode proposal only; dark mode untouched.
 */

const THEMES = {
  1: {
    id: 1,
    name: 'Light Theme 1',
    tagline: 'Pink White — the original proposal, barely-pink calm',
    page: '#FDF2F7',
    card: '#FFF7FA',
    well: '#FDEEF4',
    border: '#F9D5E3',
    ink: '#33202B',
    body: '#4E3A45',
    muted: '#6B5B64',
  },
  2: {
    id: 2,
    name: 'Light Theme 2',
    tagline: 'Rose Cream — deeper rose wash, coziest of the three',
    page: '#FBE4EC',
    card: '#FDF0F5',
    well: '#F7D3E2',
    border: '#F2B8D0',
    ink: '#3A1F2C',
    body: '#573A47',
    muted: '#7A626C',
  },
  3: {
    id: 3,
    name: 'Light Theme 3',
    tagline: 'Blush Sand — warm neutral with a kiss of pink, subtlest of the three',
    page: '#FAF4EE',
    card: '#FFF9F4',
    well: '#F4E8DE',
    border: '#ECDACD',
    ink: '#3B2E28',
    body: '#55453C',
    muted: '#7A6C62',
  },
}

const BRAND = [
  { name: 'brand-100', hex: '#FDD1D9', note: 'soft tint' },
  { name: 'brand-200', hex: '#FBA4BC', note: 'tint' },
  { name: 'brand-300', hex: '#F575A5', note: 'tint' },
  { name: 'brand-400', hex: '#EB519B', note: 'hover' },
  { name: 'brand-500', hex: '#DE1D8D', note: 'primary' },
]

function Swatch({ hex, name, note, frame, ink, muted }) {
  return (
    <div
      className="overflow-hidden rounded-xl border text-left"
      style={{ borderColor: frame, backgroundColor: '#FFFFFF' }}
    >
      <span className="block h-16 w-full" style={{ backgroundColor: hex }} />
      <span className="block px-3 py-2">
        <span className="block text-[13px] font-bold" style={{ color: ink }}>
          {name}
        </span>
        <span className="block text-[12px]" style={{ color: muted }}>
          {hex} · {note}
        </span>
      </span>
    </div>
  )
}

function SectionLabel({ index, title, blurb }) {
  return (
    <div className="mb-5">
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#DE1D8D]">{index}</p>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#33202B] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#6B5B64]">{blurb}</p>
    </div>
  )
}

function SampleComponents({ t }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: t.muted }}>
          Hero heading
        </p>
        <h3 className="mt-2 text-4xl font-extrabold tracking-tight" style={{ color: t.ink }}>
          Hi, I am <span className="text-[#DE1D8D]">Harsh</span>
        </h3>
      </div>

      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: t.muted }}>
          Nav link
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Blog', 'Projects', 'About'].map((n) => (
            <span
              key={n}
              className="lp-nav rounded px-3 py-2 text-[14px] font-semibold"
              style={{ color: t.ink, ['--lp-well']: t.well }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: t.muted }}>
          Card + button
        </p>
        <div
          className="mt-2 rounded-xl border p-4"
          style={{ borderColor: t.border, backgroundColor: t.card }}
        >
          <p className="text-[14px] font-bold" style={{ color: t.ink }}>
            What I built
          </p>
          <p className="mt-1 text-[13px] leading-relaxed" style={{ color: t.body }}>
            Side projects and experiments, with notes on what each one taught me.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-lg bg-[#DE1D8D] px-3.5 py-2 text-[13px] font-bold text-white">
              View projects →
            </span>
            <span
              className="rounded-lg border px-3.5 py-2 text-[13px] font-bold"
              style={{ borderColor: t.border, backgroundColor: t.page, color: t.ink }}
            >
              Resume
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: t.muted }}>
          Code block
        </p>
        <pre
          className="mt-2 overflow-x-auto rounded-xl p-4 text-[12.5px] leading-relaxed"
          style={{ backgroundColor: t.ink, color: t.well }}
        >
          <code>{`// ${t.name.toLowerCase()} sample\nconst light = {\n  page: "${
            t.page
          }",\n  card: "${t.card}",\n  border: "${
            t.border
          }",\n  brand: "#DE1D8D", // unchanged\n}`}</code>
        </pre>
      </div>

      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: t.muted }}>
          Blockquote + link underline
        </p>
        <blockquote
          className="mt-2 rounded-r-xl border-l-4 px-4 py-3 text-[14px] leading-relaxed"
          style={{ borderColor: '#DE1D8D', backgroundColor: t.well, color: t.body }}
        >
          “Make the background quiet so the words and the pink can be loud.”
        </blockquote>
        <p className="mt-3 text-[14px]" style={{ color: t.body }}>
          Read more in <span className="lp-underline font-semibold text-[#DE1D8D]">the blog</span>{' '}
          or browse <span className="lp-underline font-semibold text-[#DE1D8D]">projects</span>.
        </p>
      </div>
    </div>
  )
}

export default function LightPreview() {
  const [active, setActive] = useState(1)
  const t = THEMES[active]

  return (
    <>
      <Head>
        <title>Light preview — three pink light themes (not live)</title>
        <meta
          name="description"
          content="Scoped proposals for pink-softened light modes. Not applied globally."
        />
      </Head>

      <div className="lp-root mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6">
        {/* Notice */}
        <div
          className="mb-6 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
          style={{ backgroundColor: '#FFF7FA', borderColor: '#F9D5E3', color: '#33202B' }}
        >
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
              style={{ backgroundColor: '#DE1D8D', color: '#FFF7FA' }}
              aria-hidden
            >
              ✦
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[15px] font-extrabold leading-tight">
                  Preview only — not applied globally.
                </p>
                <span className="rounded-full bg-[#DE1D8D] px-2.5 py-0.5 text-[11px] font-bold text-white">
                  Light Theme 1 · 2 · 3
                </span>
              </div>
              <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-[#6B5B64]">
                Light mode right now is a lot of plain white. This page proposes three ways to
                soften it with pink — <span className="font-bold">Light Theme 1</span> is the
                original proposal, plus two new combinations in the same brand family. Accents stay{' '}
                <span className="font-bold text-[#DE1D8D]">#DE1D8D</span>. Nothing outside{' '}
                <span className="font-bold">/light-preview</span> changes.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex shrink-0 items-center justify-center rounded-xl px-4 py-2.5 text-[13px] font-bold"
            style={{ backgroundColor: '#33202B', color: '#FFF7FA' }}
          >
            ← back home
          </Link>
        </div>

        {/* 01 Current vs Theme 1 */}
        <section className="mb-12">
          <SectionLabel
            index="01 — the problem"
            title="Less glare, same site"
            blurb="Left is today's stark white. Right is Light Theme 1, the original pink-softened version of the same block. Same text, same pink — just an easier background."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white">
              <div className="border-b border-[#E5E5E5] bg-[#F5F5F5] px-4 py-2.5">
                <span className="text-[12px] font-bold text-[#737373]">current · bg-white</span>
              </div>
              <div className="p-5 sm:p-7">
                <h3 className="text-3xl font-extrabold tracking-tight text-black">
                  Hi, I am <span className="text-[#DE1D8D]">Harsh</span>
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#525252]">
                  This is my place for thoughts, reflections and everything in between. Have a good
                  read!
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-xl bg-[#DE1D8D] px-4 py-2.5 text-[13px] font-bold text-white">
                    Read the blog →
                  </span>
                  <span className="rounded-xl border border-[#E5E5E5] bg-white px-4 py-2.5 text-[13px] font-bold text-black">
                    Projects
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#F9D5E3] bg-[#FDF2F7]">
              <div className="border-b border-[#F9D5E3] bg-[#FDEEF4] px-4 py-2.5">
                <span className="text-[12px] font-bold text-[#6B5B64]">
                  Light Theme 1 · bg #FDF2F7
                </span>
              </div>
              <div className="p-5 sm:p-7">
                <h3 className="text-3xl font-extrabold tracking-tight text-[#33202B]">
                  Hi, I am <span className="text-[#DE1D8D]">Harsh</span>
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#4E3A45]">
                  This is my place for thoughts, reflections and everything in between. Have a good
                  read!
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-xl bg-[#DE1D8D] px-4 py-2.5 text-[13px] font-bold text-white">
                    Read the blog →
                  </span>
                  <span className="rounded-xl border border-[#F9D5E3] bg-[#FFF7FA] px-4 py-2.5 text-[13px] font-bold text-[#33202B]">
                    Projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 Palettes per theme */}
        <section className="mb-12">
          <SectionLabel
            index="02 — palettes"
            title="Three themes, one brand"
            blurb="Light Theme 1 keeps its exact values. Themes 2 and 3 stay in the pink family with the same #DE1D8D accents, but each has its own mood."
          />
          <div className="grid gap-6">
            {[1, 2, 3].map((id) => {
              const th = THEMES[id]
              return (
                <div key={id}>
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[15px] font-extrabold text-[#33202B]">
                      {th.name} <span className="font-normal text-[#6B5B64]">— {th.tagline}</span>
                    </h3>
                    <p className="text-[12px] text-[#6B5B64]">
                      page {th.page} · card {th.card}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                    {[
                      { name: 'page', hex: th.page, note: 'page bg' },
                      { name: 'card', hex: th.card, note: 'card bg' },
                      { name: 'well', hex: th.well, note: 'well' },
                      { name: 'border', hex: th.border, note: 'border' },
                      { name: 'ink', hex: th.ink, note: 'headings' },
                      { name: 'body', hex: th.body, note: 'body' },
                      { name: 'muted', hex: th.muted, note: 'secondary' },
                    ].map((c) => (
                      <Swatch
                        key={c.hex + c.name}
                        {...c}
                        frame={th.border}
                        ink={th.ink}
                        muted={th.muted}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
            <div>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[15px] font-extrabold text-[#33202B]">
                  Brand accents (shared by all three)
                </h3>
                <p className="text-[12px] text-[#6B5B64]">unchanged hexes</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {BRAND.map((c) => (
                  <Swatch
                    key={c.hex + c.name}
                    {...c}
                    frame="#F9D5E3"
                    ink="#33202B"
                    muted="#6B5B64"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 Try them: switcher */}
        <section className="mb-12">
          <SectionLabel
            index="03 — try them"
            title="One sample, three skins"
            blurb="Pick a tab to re-skin the full component set below — hero, nav, card, buttons, code, quote, links."
          />
          <div
            className="inline-flex rounded-xl border border-[#F9D5E3] bg-white p-1"
            role="tablist"
            aria-label="Light theme"
          >
            {[1, 2, 3].map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={active === id}
                onClick={() => setActive(id)}
                className={`rounded-lg px-3.5 py-2 text-[13px] font-bold transition-all ${
                  active === id ? 'shadow-sm' : ''
                }`}
                style={{
                  backgroundColor: active === id ? '#DE1D8D' : 'transparent',
                  color: active === id ? '#FFFFFF' : '#6B5B64',
                }}
              >
                {THEMES[id].name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[13px] text-[#6B5B64]">
            Showing <span className="font-bold text-[#33202B]">{t.name}</span> — {t.tagline}. Page{' '}
            {t.page} · card {t.card} · border {t.border}.
          </p>

          <div
            className="mt-4 overflow-hidden rounded-2xl border"
            style={{ borderColor: t.border, backgroundColor: t.page }}
          >
            <div
              className="border-b px-4 py-2.5"
              style={{ borderColor: t.border, backgroundColor: t.well }}
            >
              <span className="text-[12px] font-bold" style={{ color: t.muted }}>
                ~/{t.name.toLowerCase().replace(/ /g, '-')} · light
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <SampleComponents t={t} />
            </div>
          </div>
        </section>

        {/* 04 Side-by-side strip */}
        <section className="mb-6">
          <SectionLabel
            index="04 — compare"
            title="Same card, three themes"
            blurb="The identical sample card rendered in each theme, side by side — the fastest way to feel the difference."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((id) => {
              const th = THEMES[id]
              return (
                <div
                  key={id}
                  className="overflow-hidden rounded-2xl border"
                  style={{ borderColor: th.border, backgroundColor: th.page }}
                >
                  <div
                    className="border-b px-4 py-2.5"
                    style={{ borderColor: th.border, backgroundColor: th.well }}
                  >
                    <span className="text-[12px] font-bold" style={{ color: th.muted }}>
                      {th.name} · {th.page}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3
                      className="text-2xl font-extrabold tracking-tight"
                      style={{ color: th.ink }}
                    >
                      Hi, I am <span className="text-[#DE1D8D]">Harsh</span>
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed" style={{ color: th.body }}>
                      Thoughts, reflections and everything in between.
                    </p>
                    <div
                      className="mt-3 rounded-xl border p-3"
                      style={{ borderColor: th.border, backgroundColor: th.card }}
                    >
                      <p className="text-[13px] font-bold" style={{ color: th.ink }}>
                        What I built
                      </p>
                      <span className="mt-2 inline-block rounded-lg bg-[#DE1D8D] px-3 py-1.5 text-[12px] font-bold text-white">
                        View projects →
                      </span>
                    </div>
                    <blockquote
                      className="mt-3 rounded-r-lg border-l-4 px-3 py-2 text-[12.5px] leading-relaxed"
                      style={{
                        borderColor: '#DE1D8D',
                        backgroundColor: th.well,
                        color: th.body,
                      }}
                    >
                      “Quiet background, loud pink.”
                    </blockquote>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-8 rounded-2xl border border-[#F9D5E3] bg-white p-5">
          <p className="text-[14px] font-bold text-[#33202B]">What to look at 👀</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[13.5px] leading-relaxed text-[#4E3A45]">
            <li>
              <span className="font-bold">Theme 1 vs 2:</span> is Rose Cream (#FBE4EC) cozy or too
              rosy for long reads?
            </li>
            <li>
              <span className="font-bold">Theme 3:</span> does Blush Sand (#FAF4EE) still feel pink
              enough, or does it read plain beige?
            </li>
            <li>Which card lifts best from its page: #FFF7FA, #FDF0F5, or #FFF9F4?</li>
            <li>Which border feels right: soft #F9D5E3, stronger #F2B8D0, or neutral #ECDACD?</li>
            <li>Is body text readable in all three? Any muted text too faint?</li>
          </ul>
          <p className="mt-3 text-[12px] text-[#6B5B64]">
            File: <span className="font-bold">pages/light-preview.js</span> · route{' '}
            <span className="font-bold">/light-preview</span> · delete the file to remove it. Dark
            mode is untouched by this proposal.
          </p>
        </div>
      </div>

      <style jsx>{`
        .lp-root :global(a) {
          text-decoration: none;
        }
        .lp-nav {
          transition: background-color 0.15s ease;
        }
        .lp-nav:hover {
          background-color: var(--lp-well, #fdeef4);
        }
        .lp-underline {
          text-decoration: underline;
          text-decoration-color: #f575a5;
          text-decoration-thickness: 2px;
          text-underline-offset: 4px;
        }
      `}</style>
    </>
  )
}
