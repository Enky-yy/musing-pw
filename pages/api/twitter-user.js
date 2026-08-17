/* eslint-disable import/no-anonymous-default-export */
import { getUser } from '@/lib/twitter'

export default async (_, res) => {
  try {
    const response = await getUser('HarshShah1510')

    if (!response || !response.data) {
      return res.status(200).json({ user: null })
    }

    const user = {
      ...response.data,
    }

    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

    return res.status(200).json({ user })
  } catch (error) {
    console.error('Twitter User API Error:', error.message)
    return res.status(200).json({ user: null })
  }
}
