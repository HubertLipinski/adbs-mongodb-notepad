import { Types } from 'mongoose'
import { Note } from '~/server/models/Note'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const session = await getServerSession(event)

  const userTagsWithCount = await Note.aggregate([
    { $match: { user_id: new Types.ObjectId(session?.user.id) } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { name: '$_id', count: 1, _id: 0 } },
  ])

  return userTagsWithCount
})
