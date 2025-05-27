import { Note } from '~/server/models/Note'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const id = event.context.params?.id
  const user_id = event.context.user_id

  const deleted = await Note.deleteOne({ _id: id, user_id })

  return {
    id,
    deleted,
  }
})
