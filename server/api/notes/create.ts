import { Note } from '~/server/models/Note'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)

  const existingNotes = await Note.countDocuments({
    user_id: event.context.user_id,
  })

  const newTitle = existingNotes === 0
    ? 'Untitled note'
    : `Untitled note (${existingNotes})`

  const note = await Note.create({
    user_id: event.context.user_id,
    title: newTitle,
    tags: [],
    content: {
      time: new Date().getTime(),
      blocks: [
        { type: 'header', data: { text: '', level: 1 } },
        {
          type: 'paragraph',
          data: { text: 'Edit this content! Tip: Press / to see all available commands adn select text to see toolbox' },
        },
      ],
    },
  })

  return note.toObject()
})
