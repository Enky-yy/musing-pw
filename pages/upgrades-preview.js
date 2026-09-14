import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter('blog')
  const tagCount = await getAllTags('blog')
  const tags = Object.keys(tagCount).sort()
  return {
    props: {
      postCount: allPosts.length,
      samplePosts: allPosts.slice(0, 3).map((post) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.summary || '',
      })),
      tagCount: tags.length,
      sampleTags: tags.slice(0, 5),
    },
  }
}

const rows = [
  {
    area: 'Brand token (brand scale)',
    status: 'done',
    note: 'brand-* added in tailwind.config.js, all #DE1D8D/pink-600 refs migrated',
  },
  {
    area: 'Sitemap (next-sitemap v3)',
    status: 'done',
    note: 'next-sitemap.config.js added; custom script unwired from build',
  },
  {
    area: 'RSS feed',
    status: 'done',
    note: 'generateRss zero-post safe; feed rewrites every build via /blog with canonical domain',
  },
  {
    area: 'Dynamic OG image (/api/og)',
    status: 'done',
    note: 'dependency-free SVG endpoint; SEO.js falls back to it',
  },
  {
    area: 'MDX pipeline',
    status: 'already-existed',
    note: 'remark/rehype plugins + reading-time already wired; no changes',
  },
  {
    area: 'Command palette posts+tags',
    status: 'done',
    note: '/api/palette index; select navigates to /blog/[slug] or /tags/[tag]',
  },
  {
    area: 'Analytics / comments / newsletter / views',
    status: 'needs-keys',
    note: 'all code wired; only IDs/keys to fill (see checklist)',
  },
  {
    area: 'DropMenu avatar (next/image)',
    status: 'done',
    note: 'raw <img> migrated to next/image (unoptimized remote)',
  },
]

const checklist = [
  { key: 'Google Analytics ID (G-F6V2QTJ628 in siteMetadata)', state: 'set' },
  { key: 'siteMetadata.analytics.plausibleDataDomain', state: 'empty' },
  { key: 'siteMetadata.analytics.umamiWebsiteId (+ placeholder umami src)', state: 'empty' },
  { key: 'NEXT_PUBLIC_GISCUS_REPO / REPOSITORY_ID / CATEGORY / CATEGORY_ID', state: 'set locally' },
  {
    key: 'EMAILOCTOPUS_API_URL / API_KEY / LIST_ID (provider: emailOctopus)',
    state: 'set locally',
  },
  { key: 'NEXTAUTH_SECRET (or SECRET) + OAuth client keys', state: 'set locally' },
  { key: 'NEXT_PUBLIC_LYKET_API_KEY + DATABASE_URL (views)', state: 'set locally' },
]

export default function UpgradesPreview({ postCount, samplePosts, tagCount, sampleTags }) {
  return (
    <>
      <PageSEO title="Upgrades Preview" description="Short-term upgrades preview" />
      <div className="mx-auto max-w-[880px] px-4 py-10">
        <p className="banner mb-6 rounded-lg px-4 py-3 text-center text-sm font-semibold">
          Preview only — nothing committed
        </p>
        <h1 className="text-3xl font-extrabold">Short-term upgrades — preview</h1>
        <p className="mt-2 text-sm opacity-70">
          Scoped page: Tailwind arbitrary values + <code>&lt;style jsx&gt;</code> only. No global
          CSS touched.
        </p>

        <h2 className="mt-10 text-xl font-bold">Brand token swatches (must resolve to #DE1D8D)</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="swatch bg-brand-500">bg-brand-500</div>
          <div className="swatch bg-[#DE1D8D]">bg-[#DE1D8D]</div>
          <div className="swatch text-brand-500">text-brand-500</div>
          <div className="swatch border-brand-500">border-brand-500</div>
        </div>
        <p className="mt-2 text-sm opacity-70">
          First, third and fourth boxes use the canonical <code>brand</code> token; the second is
          the raw hex reference. They must look identical.
        </p>

        <h2 className="mt-10 text-xl font-bold">Status per area</h2>
        <ul className="mt-4 space-y-2">
          {rows.map((row) => (
            <li key={row.area} className="status-row">
              <span className={`pill pill-${row.status}`}>{row.status}</span>
              <span>
                <strong>{row.area}</strong> — {row.note}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-bold">Live endpoints</h2>
        <ul className="mt-4 list-disc space-y-1 pl-6 text-sm">
          <li>
            <a className="text-brand-500 underline" href="/sitemap.xml">
              /sitemap.xml
            </a>{' '}
            (next-sitemap; posts + tags via additionalPaths)
          </li>
          <li>
            <a className="text-brand-500 underline" href="/feed.xml">
              /feed.xml
            </a>{' '}
            (RSS 200 even with zero posts — valid empty channel, canonical self-link; regenerates
            every build)
          </li>
          <li>
            <Link className="text-brand-500 underline" href="/api/og?title=Hello">
              /api/og?title=Hello
            </Link>{' '}
            (dynamic OG SVG, brand color + “{siteMetadata.headerTitle}”)
          </li>
          <li>
            <Link className="text-brand-500 underline" href="/api/palette">
              /api/palette
            </Link>{' '}
            (command-palette index: {postCount} posts, {tagCount} tags)
          </li>
        </ul>
        <p className="mt-2 text-sm opacity-70">
          Domain note: canonical domain is {siteMetadata.siteUrl} everywhere, including project
          subdomains (syntrak/short) — point DNS at *.harsh-shah.is-a.dev or revert those two links
          if they don't resolve.
        </p>

        <h2 className="mt-10 text-xl font-bold">Palette posts + tags demo</h2>
        <p className="mt-2 text-sm">
          Press <code>Ctrl/⌘ + K</code>, then type a post title or tag. Keyboard select navigates to{' '}
          <code>/blog/[slug]</code> or <code>/tags/[tag]</code>. Sample index entries:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
          {samplePosts.map((post) => (
            <li key={post.slug}>
              Post:{' '}
              <a className="text-brand-500 underline" href={`/blog/${post.slug}`}>
                {post.title}
              </a>
            </li>
          ))}
          {sampleTags.map((tag) => (
            <li key={tag}>
              Tag:{' '}
              <a className="text-brand-500 underline" href={`/tags/${tag}`}>
                {tag}
              </a>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-bold">DropMenu avatar before / after</h2>
        <p className="mt-2 text-sm">
          Before: raw <code>&lt;img src=&#123;session.user.image&#125; … /&gt;</code> with an
          eslint-disable comment. After:{' '}
          <code>&lt;Image … width=&#123;24&#125; height=&#123;24&#125; unoptimized /&gt;</code> —
          same 24px rounded-full look, remote avatars (GitHub/Google) bypass the domain allowlist
          via <code>unoptimized</code>, eslint clean with no disable comment.
        </p>

        <h2 className="mt-10 text-xl font-bold">
          Analytics / comments / newsletter env-key checklist
        </h2>
        <ul className="mt-4 space-y-2">
          {checklist.map((item) => (
            <li key={item.key} className="status-row">
              <span
                className={`pill pill-${
                  item.state === 'set' || item.state === 'set locally' ? 'done' : 'needs-keys'
                }`}
              >
                {item.state}
              </span>
              <code className="text-sm">{item.key}</code>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .banner {
          background: #de1d8d;
          color: #fff;
        }
        .swatch {
          border-radius: 0.5rem;
          padding: 1.5rem 0.5rem;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 700;
          border-width: 4px;
          border-color: transparent;
          color: #fff;
        }
        .swatch:nth-child(3) {
          background: #111;
        }
        .swatch:nth-child(4) {
          background: #111;
        }
        .status-row {
          display: flex;
          gap: 0.75rem;
          align-items: baseline;
          font-size: 0.9rem;
        }
        .pill {
          flex-shrink: 0;
          border-radius: 9999px;
          padding: 0.1rem 0.6rem;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .pill-done {
          background: #de1d8d;
          color: #fff;
        }
        .pill-already-existed {
          background: #e5e7eb;
          color: #111;
        }
        .pill-needs-keys {
          background: #f59e0b;
          color: #111;
        }
      `}</style>
    </>
  )
}
