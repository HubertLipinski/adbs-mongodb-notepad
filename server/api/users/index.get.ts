import { User } from '~/server/models/User'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  console.log(session?.user)

  const users = await User.find()
  return users
})
