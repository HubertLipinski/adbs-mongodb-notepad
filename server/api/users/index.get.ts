import {User} from "~/server/models/User";

export default defineEventHandler(async () => {
  const users = await User.find();
  return users;
});