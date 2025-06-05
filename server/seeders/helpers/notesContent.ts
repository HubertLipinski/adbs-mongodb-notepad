import { faker } from '@faker-js/faker'
import type { Block, NoteContent } from '~/server/models/Note'

const editorBlocks = [
  () => ({
    id: faker.string.nanoid(),
    type: 'header',
    data: {
      text: faker.lorem.sentence(),
      level: faker.helpers.arrayElement([2, 3, 4, 5]),
    },
  }),
  () => ({
    id: faker.string.nanoid(),
    type: 'paragraph',
    data: {
      text: faker.lorem.paragraph({ min: 2, max: 4 }),
    },
  }),
  () => ({
    id: faker.string.nanoid(),
    type: 'paragraph',
    data: {
      text: faker.lorem.paragraph({ min: 5, max: 25 }),
    },
  }),
  () => ({
    id: faker.string.nanoid(),
    type: 'list',
    data: {
      style: faker.helpers.arrayElement(['ordered', 'unordered']),
      items: [
        faker.lorem.words(3),
        faker.lorem.words(4),
        faker.lorem.words(2),
        faker.lorem.words(2),
        faker.lorem.words(2),
        faker.lorem.words(2),
      ],
    },
  }),
  () => ({
    type: 'paragraph',
    data: {
      text: faker.lorem.words(20) + ' <mark class="cdx-marker">' + faker.lorem.paragraph() + '</mark> ' + faker.lorem.words(20),
    },
  }),
  () => ({
    id: faker.string.nanoid(),
    type: 'table',
    data: {
      withHeadings: true,
      content: [
        ['Name', 'Value'],
        [faker.commerce.productName(), faker.commerce.price()],
        [faker.commerce.productName(), faker.commerce.price()],
      ],
    },
  }),
  () => ({
    id: faker.string.nanoid(),
    type: 'list',
    data: {
      style: 'checklist',
      items: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
        content: faker.lorem.words(faker.number.int({ min: 1, max: 5 })),
        meta: {
          checked: faker.datatype.boolean(),
        },
        items: [],
      })),
    },
  }),
  () => ({
    id: faker.string.nanoid(),
    type: 'linkTool',
    data: {
      link: faker.internet.url(),
      meta: {
        title: faker.company.name(),
        description: faker.lorem.sentence(),
        image: {
          url: faker.image.url(),
        },
      },
    },
  }),
]

export function generateEditorJsContent(): NoteContent {
  const blocks: Block[] = [
    {
      type: 'header',
      data: {
        text: faker.lorem.words(3),
        level: 1,
      },
    },
    {
      type: 'paragraph',
      data: {
        text: faker.lorem.paragraph(),
      },
    },
  ]

  const additionalCount = faker.number.int({ min: 5, max: 20 })
  for (let i = 0; i < additionalCount; i++) {
    const block = faker.helpers.arrayElement(editorBlocks)()
    blocks.push(block)
  }

  return {
    time: new Date(),
    blocks,
  }
}
