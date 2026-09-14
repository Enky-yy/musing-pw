import siteMetadata from '@/data/siteMetadata'

// Canonical brand token value — must match theme.colors.brand[500] in tailwind.config.js (#DE1D8D).
const BRAND_500 = '#DE1D8D'

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Dependency-free dynamic OG image (SVG) using the brand color + site name.
// Usage: /api/og?title=Hello
export default function handler(req, res) {
  const rawTitle = Array.isArray(req.query.title)
    ? req.query.title[0]
    : req.query.title || siteMetadata.title
  const title = escapeXml(rawTitle.slice(0, 140))
  const siteName = escapeXml(siteMetadata.headerTitle || siteMetadata.title)

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
  <rect width="1200" height="630" fill="#000000"/>
  <rect x="0" y="0" width="16" height="630" fill="${BRAND_500}"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="${BRAND_500}" stroke-width="4" opacity="0.35"/>
  <circle cx="1080" cy="120" r="180" fill="${BRAND_500}" opacity="0.18"/>
  <circle cx="1120" cy="560" r="120" fill="${BRAND_500}" opacity="0.12"/>
  <text x="90" y="130" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="600" fill="${BRAND_500}">${siteName}</text>
  <foreignObject x="90" y="170" width="980" height="330">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Inter, Arial, sans-serif; font-size: 72px; font-weight: 800; line-height: 1.15; color: #ffffff;">${title}</div>
  </foreignObject>
  <rect x="90" y="520" width="160" height="10" fill="${BRAND_500}"/>
</svg>`

  res.setHeader('Content-Type', 'image/svg+xml')
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  res.status(200).send(svg)
}
