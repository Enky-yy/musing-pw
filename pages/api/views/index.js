import prisma from 'lib/prisma'

export default async function handler(req, res) {
  try {
    const totalViews = await prisma.views.aggregate({
      _sum: {
        count: true,
      },
    })

    const count = totalViews?._sum?.count ?? 0
    return res.status(200).json({ total: count.toString() })
  } catch (e) {
    console.error('Views API error:', e.message)
    return res.status(200).json({ total: '0' })
  }
}
