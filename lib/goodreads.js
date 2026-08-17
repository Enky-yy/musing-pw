import { default as Parser } from 'rss-parser'

const baseRss =
  'https://www.goodreads.com/review/list_rss/203579102?key=ze5c_AdiiZlFqYQ48r-4qwb3JYFK6Zn-wRlxTbNNWVqq8q2c&shelf=%23ALL%23'
const getHtmlContentField = (html, field) => {
  if (!html) {
    return null
  }

  const res = html.match(new RegExp(`  ${field}:(?<field>[^<]*)<br`))
  return res ? res[1].trim() : null
}

const asNumber = (str) => (str ? Number.parseInt(str.trim()) : null)

const parseFeed = async (shelf, limit = 10) => {
  try {
    const parser = new Parser()
    const feed = await parser.parseURL(`${baseRss}&shelf=${shelf}&per_page=${limit}`)

    if (!feed || !feed.items || feed.items.length === 0) {
      return []
    }

    return feed.items
      .filter((i) => Boolean(i && i.title))
      .map((i) => ({
        title: i.title ?? '',
        url: i.link ?? '',
        finishedOn: i.pubDate ? new Date(i.pubDate).toISOString() : null,
        rating: asNumber(getHtmlContentField(i.content, 'rating')) ?? 0,
        author: getHtmlContentField(i.content, 'author') ?? '<unknown>',
      }))
  } catch (error) {
    console.error(`Goodreads RSS error for shelf "${shelf}":`, error.message)
    return []
  }
}

export const getReviews = async ({ limit }) => {
  return parseFeed('read', limit)
}

export const getCurrentlyReading = async ({ limit }) => {
  return parseFeed('currently-reading', limit)
}
