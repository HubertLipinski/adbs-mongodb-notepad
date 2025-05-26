import { Note } from '~/server/models/Note'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const body = await readBody(event).catch(() => {})

  const updatedNote = Note.updateOne({ _id: body._id }, body)

  return updatedNote
})
