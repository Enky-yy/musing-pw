import querystring from 'querystring'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  try {
    if (!client_id || !client_secret || !refresh_token) {
      return null
    }

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error('Spotify getAccessToken error:', error.message)
    return null
  }
}

export const getNowPlaying = async () => {
  try {
    const tokenData = await getAccessToken()
    if (!tokenData || !tokenData.access_token) {
      return null
    }

    return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })
  } catch (error) {
    console.error('Spotify getNowPlaying error:', error.message)
    return null
  }
}

export const getTopTracks = async () => {
  try {
    const tokenData = await getAccessToken()
    if (!tokenData || !tokenData.access_token) {
      return null
    }

    return fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })
  } catch (error) {
    console.error('Spotify getTopTracks error:', error.message)
    return null
  }
}
