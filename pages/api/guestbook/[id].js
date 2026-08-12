import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'

export default async function handler(req, res) {
  try {
    const session = await getSession({ req })
    const { id } = req.query

    const entry = await prisma.guestbook.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (req.method === 'GET') {
      if (!entry) return res.status(404).json({ error: 'Entry not found' })
      return res.json({
        id: entry.id.toString(),
        body: entry.body,
        created_by: entry.created_by,
        updated_at: entry.updated_at,
      })
    }

    if (!session || !session.user || session.user.email !== entry?.email) {
      return res.status(403).send('Unauthorized')
    }

    if (req.method === 'DELETE') {
      await prisma.guestbook.delete({
        where: {
          id: Number(id),
        },
      })

      return res.status(204).json({})
    }

    if (req.method === 'PUT') {
      const body = (req.body.body || '').slice(0, 500)

      await prisma.guestbook.update({
        where: {
          id: Number(id),
        },
        data: {
          body,
          updated_at: new Date().toISOString(),
        },
      })

      return res.status(201).json({
        ...entry,
        body,
      })
    }

    return res.send('Method not allowed.')
  } catch (error) {
    console.error('Guestbook ID API Error:', error.message)
    return res
      .status(500)
      .json({ error: 'Database connection failed. Please configure DATABASE_URL in .env.local' })
  }
}
