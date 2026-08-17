/* eslint-disable import/no-anonymous-default-export */
import { getTopTracks } from '@/lib/spotify'

export default async (_, res) => {
  try {
    const response = await getTopTracks()

    if (!response.ok) {
      return res.status(200).json({ tracks: [] })
    }

    const data = await response.json()
    const items = Array.isArray(data?.items) ? data.items : []

    const tracks = items.slice(0, 10).map((track) => ({
      artist: track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      imageUrl: track.album?.images?.[1]?.url || track.album?.images?.[0]?.url || '',
      title: track.name,
    }))

    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

    return res.status(200).json({ tracks })
  } catch (error) {
    console.error('Top Tracks API Error:', error.message)
    return res.status(200).json({ tracks: [] })
  }
}
