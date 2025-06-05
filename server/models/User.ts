import type { ObjectId } from 'mongodb'

export interface UserConsent {
  key: string
  value: boolean
}

export interface UserDocument {
  _id: ObjectId
  name: string
  username: string
  email: string
  password: string
  consent: UserConsent[]
  createdAt: Date
  updatedAt: Date
}

// const userConsentSchema = new Schema({
//   key: {
//     type: String,
//     required: true,
//   },
//   value: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
// }, { _id: false })

// const UserSchema = new Schema({
//   name: { type: String, required: true, unique: false, trim: true, lowercase: false },
//   username: { type: String, required: true, unique: false, trim: true, lowercase: true },
//   email: { type: String, unique: true, required: true, lowercase: true, trim: true },
//   password: { type: String, required: true, trim: true, length: [8, 'Password must be at least 8 characters'] },
//   consent: {
//     type: [userConsentSchema],
//     default: [
//       { key: 'agreement', value: true },
//       { key: 'marketing', value: false },
//     ],
//   },
// }, { timestamps: true, versionKey: false })

// export const User = model<UserDocument>('User', UserSchema)
