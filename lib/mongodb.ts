import mongoose from 'mongoose'

export async function connectMongoose(uri: string) {
  if (mongoose.connection.readyState >= 1) {
    console.info('Mongodb already connected!')
    return
  }

  await mongoose.connect(uri)
  console.info('Mongodb connected!')

  return {
    disconnect: async () => {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect()
        console.info('Mongodb disconnected')
      }
    },
  }
}
