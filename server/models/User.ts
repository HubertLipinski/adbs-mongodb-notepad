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
