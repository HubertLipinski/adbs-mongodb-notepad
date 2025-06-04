import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { User } from '../models/User'

interface Options {
  amount: number
  clean?: boolean
}

export async function seedUsers({ amount = 10, clean = false }: Options) {
  const PASSWORD = 'zaq1@WSX'

  if (clean) {
    console.log(`Cleaning users collection...`)
    await User.deleteMany({})
  }

  const hashedPassword = await bcrypt.hash(PASSWORD, await bcrypt.genSalt(10))

  const usersData = Array.from({ length: amount }).map(() => ({
    name: faker.person.fullName(),
    username: faker.internet.username().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password: hashedPassword,
    consent: [
      { key: 'agreement', value: true },
      { key: 'marketing', value: faker.datatype.boolean() },
    ],
  }))

  const users = await User.insertMany(usersData)

  console.log(`Created ${users.length} new users`)

  return users
}
