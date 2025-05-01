import type {Types} from 'mongoose';

export interface User {
  _id: Types.ObjectId,
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}

export interface Note {
  _id: Types.ObjectId,
  title: string,
  tags: string[]
  content: object[], // TODO
  location: GeoJSON
  createdAt: Date,
  updatedAt: Date
}

interface GeoJSON {
  type: 'Point',
  coordinates: [number, number], // [longitude, latitude]
}