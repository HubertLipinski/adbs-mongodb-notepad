import { faker } from '@faker-js/faker'
import { generateEditorJsContent } from './helpers/notesContent'
import { getDb } from '~/lib/mongodb'

interface Options {
  notesPerUser: number
  clean?: boolean
}

export async function seedNotes({ notesPerUser = 5, clean = false }: Options) {
  const db = getDb()

  if (clean) {
    console.log('Cleaning notes collection...')
    await db.collection('notes').deleteMany({})
  }

  await db.collection('notes').createIndex({ tags: 1 }) // index na tablicę tagów
  await db.collection('notes').createIndex({ location: '2dsphere' }) // GeoLocation index

  const users = await db.collection('users').find().toArray()
  const notes = users.flatMap((user) => {
    const tags = getRandomTags()

    return Array.from({ length: notesPerUser }).map(() => ({
      userId: user._id,
      title: faker.lorem.sentence(5),
      tags: faker.helpers.arrayElements(tags, faker.number.int({ min: 2, max: 5 })),
      content: generateEditorJsContent(),
      location: {
        type: 'Point',
        coordinates: [faker.location.longitude(), faker.location.latitude()],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
  })

  const result = await db.collection('notes').insertMany(notes)

  console.log(`Inserted ${result.insertedCount} notes`)
  return result
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
