import type { Db } from 'mongodb'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

let client: MongoClient
let db: Db

const DEFAULT_COLLECTION_NAME = process.env.MONGODB_DEFAULT_COLLECTION || 'notepad_data'

export async function connectMongoDB(uri: string) {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db(DEFAULT_COLLECTION_NAME)
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Mongodb not connected!')
  }
  return db
}

export async function closeDb(): Promise<void> {
  if (!client) {
    throw new Error('Mongodb client does not exist!')
  }
  console.log('Closing DB connection...')
  await client.close()
}
