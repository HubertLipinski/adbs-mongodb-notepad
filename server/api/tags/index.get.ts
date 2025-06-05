import { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const session = await getServerSession(event)
  const db = getDb()

  const userTagsWithCount = await db.collection('notes').aggregate([
    { $match: { userId: new ObjectId(session?.user.id) } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { name: '$_id', count: 1, _id: 0 } },
  ])
    .toArray()

  return userTagsWithCount
})
