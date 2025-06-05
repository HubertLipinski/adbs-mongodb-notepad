import { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const session = await getServerSession(event)
  const db = getDb()

  const user = await db.collection('users').findOne(
    { _id: new ObjectId(session?.user.id) },
    { projection: { password: 0 } },
  )

  return user
})
