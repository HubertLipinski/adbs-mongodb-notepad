import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import type { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'

interface Options {
  amount: number
  clean?: boolean
}

export async function seedUsers({ amount = 10, clean = false }: Options): Promise<ObjectId[]> {
  const PASSWORD = 'zaq1@WSX'
  const db = getDb()

  if (clean) {
    console.log(`Cleaning users collection...`)
    await db.collection('users').deleteMany({})
  }

  await db.collection('users').createIndex({ email: 1 }, { unique: true }) // unique index na email

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(PASSWORD, salt)

  const usersData = Array.from({ length: amount }).map(() => ({
    name: faker.person.fullName(),
    username: faker.internet.username().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password: hashedPassword,
    consent: [
      { key: 'agreement', value: true },
      { key: 'marketing', value: faker.datatype.boolean() },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  const result = await db.collection('users').insertMany(usersData)

  console.log(`Created ${result.insertedCount} new users`)

  return Object.values(result.insertedIds)
}
