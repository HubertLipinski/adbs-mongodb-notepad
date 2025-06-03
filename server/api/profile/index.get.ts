import { User } from '~/server/models/User'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const user = await User.findOne({ _id: session?.user.id }).select({ password: 0 })

  return user
})
