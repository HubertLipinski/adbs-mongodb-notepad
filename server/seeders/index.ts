import dotenv from 'dotenv'
import { seedUsers } from './users.seeder'
import { seedNotes } from './notes.seeder'
import { connectMongoDB, closeDb } from '~/lib/mongodb'

dotenv.config()

const clean = process.argv.includes('--clean')

if (!process.env.MONGODB_URI) {
  console.warn(
    'Mongodb URI not found in runtime config, skipping mongodb connection',
  )

  process.exit(1)
}

console.log(`Running database seeders ${clean ? '(with --clean option)' : ''}`)

console.log(`Connecting to DB...`)
await connectMongoDB(process.env.MONGODB_URI || '')
console.log(`Mongodb connected!`)

// users
const userIds = await seedUsers({ amount: 50, clean })

// notes per user
await seedNotes({ notesPerUser: 20, clean, userIds })

await closeDb()

console.log(`Done`)
process.exit(0)
