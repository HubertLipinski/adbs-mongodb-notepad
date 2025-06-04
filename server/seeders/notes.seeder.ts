import { faker } from '@faker-js/faker'
import { Note } from '../models/Note'
import { User } from '../models/User'
import { generateEditorJsContent } from './helpers/notesContent'

interface Options {
  notesPerUser: number
  clean?: boolean
}

function getRandomTags({ min = 5, max = 10 } = {}): string[] {
  const count = faker.number.int({ min, max })
  const tags: string[] = []

  while (tags.length < count) {
    const word = faker.word.sample()
    if (word.length >= 4 && word.length <= 10 && !tags.includes(word)) {
      tags.push(word)
    }
  }

  return tags
}

export async function seedNotes({ notesPerUser = 5, clean = false }: Options) {
  if (clean) {
    console.log(`Cleaning notes collection...`)
    await Note.deleteMany({})
  }

  const users = await User.find({})

  const notes = users.flatMap((user) => {
    const tags = getRandomTags()

    return Array.from({ length: notesPerUser }).map(() => ({
      user_id: user._id,
      title: faker.lorem.sentence(5),
      tags: faker.helpers.arrayElements(tags, faker.number.int({ min: 2, max: 5 })),
      content: generateEditorJsContent(),
      location: {
        type: 'Point',
        coordinates: [faker.location.longitude(), faker.location.latitude()],
      },
    }))
  })

  await Note.insertMany(notes)
  console.log(`Added ${users.length * notesPerUser} notes`)
}
