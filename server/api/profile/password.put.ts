import bcrypt from 'bcrypt'
import { getServerSession } from '#auth'
import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)
  const session = await getServerSession(event)

  const body = await readBody(event)

  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' })
  }

  const user = await User.findById(session?.user.id).select('+password')

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid current password' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(newPassword, salt)

  user.password = hashed

  await user.save()

  return { message: 'Password changed' }
})
