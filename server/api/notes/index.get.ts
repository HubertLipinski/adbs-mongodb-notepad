import { ObjectId } from 'mongodb'
import { getServerSession } from '#auth'
import { getDb } from '~/lib/mongodb'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const session = await getServerSession(event)

  const db = getDb()

  const { tags, title } = getQuery(event)

  const query: Record<string, unknown> = {
    userId: new ObjectId(session?.user.id),
  }

  if (tags) {
    const tagList = Array.isArray(tags)
      ? tags
      : String(tags).split(',').map(t => t.trim()).filter(Boolean)

    if (tagList.length > 0) {
      query.tags = { $in: tagList }
    }
  }

  if (title) {
    query.title = { $regex: title, $options: 'i' }
  }

  const notes = await db
    .collection('notes')
    .find(query)
    .sort({ createdAt: -1 })
    .toArray()

  return notes
})
