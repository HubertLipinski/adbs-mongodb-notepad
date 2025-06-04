import { connectMongoose } from '~/lib/mongodb'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()

  if (!config.mongodbUri) {
    console.warn(
      'Mongodb URI not found in runtime config, skipping mongodb connection',
    )
    return
  }
  try {
    await connectMongoose(config.mongodbUri)
  }
  catch (e) {
    console.error('Mongodb connection error: ', e)
  }
})
