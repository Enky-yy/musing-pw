import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'

let cache = null

// Lightweight search index for the command palette: posts (title/excerpt/slug) + tags.
export default async function handler(req, res) {
  if (!cache) {
    const posts = await getAllFilesFrontMatter('blog')
    const tagCount = await getAllTags('blog')
    cache = {
      posts: posts.map((post) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.summary || '',
      })),
      tags: Object.keys(tagCount).sort(),
    }
  }
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).json(cache)
}
