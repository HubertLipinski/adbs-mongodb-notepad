import type {NitroApp} from "nitropack";
import mongoose from "mongoose";

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  const config = useRuntimeConfig()

  try {
    await mongoose.connect(config.MONGODB_URL)
    console.log('MongoDB Connected!');
  } catch (e) {
    console.error(e)
  }
})