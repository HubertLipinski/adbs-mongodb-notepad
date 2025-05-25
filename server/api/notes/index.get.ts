import { Note } from '~/server/models/Note'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const notes = await Note.find({
    user_id: event.context.user_id,
  })

  return notes
})
