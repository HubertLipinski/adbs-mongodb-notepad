import { model, Schema, type Document, type Types } from 'mongoose'

export interface NoteDocument extends Document {
  _id: Types.ObjectId | string
  user_id: Types.ObjectId | string
  title: string
  tags: string[]
  content: NoteContent
  location: GeoJSON
  createdAt: Date
  updatedAt: Date
}

interface NoteContent {
  time: Date
  blocks: object[]
}

export interface GeoJSON {
  type: 'Point'
  coordinates: [] | [number, number] // [longitude, latitude]
}

const noteContentSchema = new Schema({
  time: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  blocks: {
    type: [Object],
    required: true,
  },
}, { _id: false })

const GeoJSONSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
}, { _id: false })

const NoteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, trim: true, unique: false },
  tags: { type: [String], required: false, unique: false },
  content: { type: noteContentSchema, required: true, _id: false, unique: false },
  location: { type: GeoJSONSchema, required: false, _id: false, unique: false, default: null },
}, { timestamps: true, versionKey: false })

NoteSchema.index({ tags: 1 })
NoteSchema.index({ location: '2dsphere' })

export const Note = model<NoteDocument>('Note', NoteSchema)
