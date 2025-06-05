import { ObjectId } from 'mongodb'
import { getDb } from '~/lib/mongodb'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const db = getDb()
  const userId = new ObjectId(event.context.userId)

  const existingNotes = await db.collection('notes').countDocuments({
    userId: userId,
  })

  const newTitle = existingNotes === 0
    ? 'Untitled note'
    : `Untitled note (${existingNotes})`

  const now = new Date()

  const noteData = {
    userId: userId,
    title: newTitle,
    tags: [],
    content: {
      time: now.getTime(),
      blocks: [
        { type: 'header', data: { text: '', level: 1 } },
        {
          type: 'paragraph',
          data: { text: 'Edit this content! Tip: Press / to see all available commands and select text to see toolbox' },
        },
      ],
    },
    location: null,
    createdAt: now,
    updatedAt: now,
  }

  const insertResult = await db.collection('notes').insertOne(noteData)
  const insertedNote = await db.collection('notes').findOne({ _id: insertResult.insertedId })

  return insertedNote
})
