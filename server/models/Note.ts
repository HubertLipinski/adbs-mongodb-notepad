import type { ObjectId } from 'mongodb'

export interface NoteDocument {
  _id: ObjectId
  userId: ObjectId
  title: string
  tags?: string[]
  content: NoteContent
  location?: GeoJSON | null
  createdAt: Date
  updatedAt: Date
}

export interface NoteContent {
  time: Date
  blocks: Block[]
}

export interface Block {
  type: string
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  data: Record<string, any>
}

export interface GeoJSON {
  type: 'Point'
  coordinates: [number, number] // [longitude, latitude]
}
