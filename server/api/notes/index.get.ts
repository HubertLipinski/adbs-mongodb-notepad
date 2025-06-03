import { Note } from '~/server/models/Note'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const { tags, title } = getQuery(event)

  const query: Record<string, unknown> = {
    user_id: event.context.user_id,
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

  const notes = await Note.find(query).sort({ createdAt: -1 })

  return notes
})
