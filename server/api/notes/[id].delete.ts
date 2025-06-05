import { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const db = getDb()

  const id = event.context.params?.id
  const userId: string = event.context.userId

  const deleted = await db.collection('notes').deleteOne({
    _id: new ObjectId(id),
    userId: new ObjectId(userId),
  })

  return {
    id,
    deleted,
  }
})
