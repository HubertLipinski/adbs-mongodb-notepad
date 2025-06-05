import { connectMongoDB } from '~/lib/mongodb'

export default defineEventHandler(async () => {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables.')
  }

  await connectMongoDB(uri)
})
