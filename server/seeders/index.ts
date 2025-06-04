import dotenv from 'dotenv'
import { seedUsers } from './users.seeder'
import { seedNotes } from './notes.seeder'
import { connectMongoose } from '~/lib/mongodb'

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
const connection = await connectMongoose(process.env.MONGODB_URI || '')

// users
await seedUsers({ amount: 50, clean })

// notes per user
await seedNotes({ notesPerUser: 15, clean })

await connection?.disconnect()
console.log(`Done`)
process.exit(0)
