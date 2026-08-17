import { getNowPlaying } from '@/lib/spotify'

export default async function handler(req, res) {
  try {
    const response = await getNowPlaying()

    if (!response || response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false })
    }

    const song = await response.json()

    if (!song || !song.item) {
      return res.status(200).json({ isPlaying: false })
    }

    const isPlaying = song.is_playing ?? false
    const title = song.item.name ?? ''
    const artist = song.item.artists
      ? song.item.artists.map((_artist) => _artist.name).join(', ')
      : ''
    const album = song.item.album?.name ?? ''
    const albumImageUrl = song.item.album?.images?.[0]?.url ?? ''
    const songUrl = song.item.external_urls?.spotify ?? ''

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

    return res.status(200).json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    })
  } catch (error) {
    console.error('Now Playing API Error:', error.message)
    return res.status(200).json({ isPlaying: false })
  }
}
