import { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const body = await readBody(event).catch(() => ({}))

  if (!body._id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing note _id' })
  }

  const db = getDb()
  const noteId = new ObjectId(body._id)
  const { _id, userId, createdAt, ...updateData } = body

  delete updateData['_id']
  delete updateData['userId']

  updateData.updatedAt = new Date()

  const result = await db.collection('notes').updateOne(
    { _id: noteId },
    { $set: updateData },
  )

  if (result.matchedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Note not found' })
  }

  const updatedNote = await db.collection('notes').findOne({ _id: noteId })

  return updatedNote
})
