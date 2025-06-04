import { getQuery } from 'h3'
import { Note } from '~/server/models/Note'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const { q } = getQuery(event)
  const userId = event.context.user_id

  const query: Record<string, unknown> = { user_id: userId }

  if (q && typeof q === 'string') {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { tags: { $elemMatch: { $regex: q, $options: 'i' } } },
    ]
  }

  const notes = await Note.find(query).sort({ createdAt: -1 })

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
