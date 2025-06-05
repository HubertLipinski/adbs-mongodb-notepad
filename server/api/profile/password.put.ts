import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)
  const session = await getServerSession(event)

  if (!session?.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' })
  }

  const db = getDb()
  const userId = new ObjectId(session.user.id)

  const user = await db.collection('users').findOne({ _id: userId }, { projection: { password: 1 } })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid current password' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(newPassword, salt)

  const result = await db.collection('users').updateOne(
    { _id: userId },
    {
      $set: {
        password: hashed,
        updatedAt: new Date(),
      },
    },
  )

  if (result.matchedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'User not found during update' })
  }

  return { message: 'Password changed' }
})
