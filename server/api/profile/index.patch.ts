import { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)
  const session = await getServerSession(event)

  const body = await readBody(event)

  if (!body.name || !body.username || !Array.isArray(body.consent)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid data' })
  }

  const db = getDb()
  const userId = new ObjectId(session?.user.id)

  const updateResult = await db.collection('users').updateOne(
    { _id: userId },
    {
      $set: {
        name: body.name,
        username: body.username,
        consent: body.consent,
        updatedAt: new Date(),
      },
    },
  )

  if (updateResult.matchedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return {
    status: 200,
  }
})
