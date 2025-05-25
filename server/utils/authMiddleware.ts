import type { H3Event, EventHandlerRequest } from 'h3'
import { getServerSession } from '#auth'

export default async function authMiddleware(event: H3Event<EventHandlerRequest>) {
  const session = await getServerSession(event)

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  event.context.user_id = session.user.id
}
