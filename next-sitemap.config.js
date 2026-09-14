const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const siteMetadata = require('./data/siteMetadata')

const root = __dirname

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, out)
    } else if (entry.isFile() && (full.endsWith('.md') || full.endsWith('.mdx'))) {
      out.push(full)
    }
  }
  return out
}

function getBlogEntries() {
  const blogDir = path.join(root, 'data', 'blog')
  if (!fs.existsSync(blogDir)) {
    return { posts: [], tags: [] }
  }
  const posts = []
  const tags = new Set()
  for (const file of walk(blogDir)) {
    const source = fs.readFileSync(file, 'utf8')
    const { data } = matter(source)
    // Mirror scripts/generate-sitemap.js: skip drafts and canonical URLs.
    if (data.draft || data.canonicalUrl) {
      continue
    }
    const slug = path
      .relative(blogDir, file)
      .replace(/\\/g, '/')
      .replace(/\.(mdx|md)$/, '')
    posts.push({
      loc: `/blog/${slug}`,
      lastmod: data.date ? new Date(data.date).toISOString() : undefined,
    })
    ;(data.tags || []).forEach((tag) => tags.add(String(tag).toLowerCase().replace(/\s+/g, '-')))
  }
  return { posts, tags: [...tags] }
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: false,
  // Canonical domain is https://harsh-shah.is-a.dev (per siteMetadata.siteUrl);
  // public/robots.txt sitemap URL is kept in sync with it.
  exclude: ['/api/*', '/404', '/blog/[...slug]'],
  additionalPaths: async () => {
    const { posts, tags } = getBlogEntries()
    return [
      ...posts.map((post) => ({
        loc: post.loc,
        lastmod: post.lastmod,
        changefreq: 'weekly',
        priority: 0.7,
      })),
      ...tags.map((tag) => ({
        loc: `/tags/${tag}`,
        changefreq: 'weekly',
        priority: 0.5,
      })),
    ]
  },
}
