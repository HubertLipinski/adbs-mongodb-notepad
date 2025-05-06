import mongoose from "mongoose";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();

  if (!config.mongodbUri) {
    console.warn(
      "Mongodb URI not found in runtime config, skipping mongodb connection"
    );
    return;
  }
  try {
    await mongoose.connect(config.mongodbUri);
    console.info("Mongodb connected");
  } catch (e) {
    console.error("Mongodb connection error: ", e);
  }
});