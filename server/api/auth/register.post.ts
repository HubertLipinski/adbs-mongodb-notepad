import bcrypt from 'bcrypt'
import { getDb } from '~/lib/mongodb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password || !body.username || !body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Missing required fields',
    })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(body.password, salt)

  const db = getDb()

  const newUser = {
    name: body.name,
    username: body.username,
    email: body.email,
    password: hashedPassword,
    consent: [
      { key: 'agreement', value: true },
      { key: 'marketing', value: false },
    ],
  }

  const result = await db.collection('users').insertOne(newUser)

  const createdUser = await db.collection('users').findOne(
    { _id: result.insertedId },
    { projection: { password: 0 } },
  )

  return createdUser
})
