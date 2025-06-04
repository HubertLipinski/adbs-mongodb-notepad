import { User } from '~/server/models/User'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)
  const session = await getServerSession(event)

  const body = await readBody(event)

  if (!body.name || !body.username || !Array.isArray(body.consent)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid data' })
  }

  await User.findByIdAndUpdate(
    session?.user.id,
    {
      name: body.name,
      username: body.username,
      consent: body.consent,
    },
    { new: true },
  )

  return {
    status: 200,
  }
})
