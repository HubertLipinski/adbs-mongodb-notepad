import { model, Schema, type Document } from 'mongoose'

export interface UserDocument extends Document {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true, length: [8, 'Password must be at least 8 characters'] },
}, { timestamps: true })

export const User = model<UserDocument>('User', UserSchema)
