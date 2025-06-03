import type { NoteDocument } from '~/server/models/Note'
import type { TagRecord } from '~/types'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<NoteDocument[]>([])
  const tags = ref<TagRecord[]>([])

  async function fetchNotes() {
    const data = await $fetch<NoteDocument[]>('/api/notes')
    notes.value = data
  }

  async function createNewNote() {
    const data = await $fetch<NoteDocument>('/api/notes/create')

    notes.value.unshift(data)
    await nextTick()
    await navigateTo(`/notes/${data._id}/edit`)
  }

  async function updateNote(note: NoteDocument) {
    await $fetch<NoteDocument>(`/api/notes/${note._id}`, { body: note, method: 'PATCH' })
    await fetchNotes()
    await fetchTags()
  }

  async function deleteNote(id: string, redirect: boolean = true): Promise<void> {
    console.log(`${id} deleted`)
    await $fetch(`/api/notes/${id}`, { method: 'DELETE' })
    notes.value = notes.value.filter((el: NoteDocument) => el._id !== id)

    await fetchTags()

    if (redirect === false) {
      return
    }

    if (notes.value.length > 0) {
      await navigateTo(`/notes/${notes.value[0]._id}/edit`)
      return
    }

    await navigateTo(`/`)
  }

  async function fetchTags() {
    const data = await $fetch<TagRecord[]>('/api/tags')
    tags.value = data
  }

  return {
    notes,
    tags,
    fetchNotes,
    fetchTags,
    createNewNote,
    updateNote,
    deleteNote,
  }
}, {
  persist: {
    storage: localStorage,
  },
})
