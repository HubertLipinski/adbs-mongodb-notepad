import mongoose, {Schema} from 'mongoose';
import type {User} from "~/types";

const userSchema = new Schema<User>({
  name: {type: String},
  email: {type: String},
  password: {type: String},
}, {timestamps: true})

const UserSchema = mongoose.model<User>('User', userSchema);

export default UserSchema;