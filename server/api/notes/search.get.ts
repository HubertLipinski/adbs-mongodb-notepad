import { getQuery } from 'h3'
import { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const session = await getServerSession(event)
  const db = getDb()

  const { q } = getQuery(event)

  const query: Record<string, unknown> = {
    userId: new ObjectId(session?.user.id),
  }

  if (q && typeof q === 'string') {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { tags: { $elemMatch: { $regex: q, $options: 'i' } } },
    ]
  }

  const notes = await db
    .collection('notes')
    .find(query)
    .sort({ createdAt: -1 })
    .toArray()

  const tagSet = new Set<string>()
  for (const note of notes) {
    for (const tag of note.tags || []) {
      tagSet.add(tag)
    }
  }

  return {
    notes,
    tags: Array.from(tagSet),
  }
})
