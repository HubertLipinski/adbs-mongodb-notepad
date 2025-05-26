import type { NoteDocument } from '~/server/models/Note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<NoteDocument[]>([])

  async function fetchNotes() {
    const data = await $fetch<NoteDocument[]>('/api/notes')
    notes.value = data
  }

  async function createNewNote() {
    const data = await $fetch<NoteDocument>('/api/notes/create')

    notes.value.push(data)
    await nextTick()
    await navigateTo(`/notes/${data._id}/edit`)
  }

  async function updateNote(note: NoteDocument) {
    const data: NoteDocument = await $fetch(`/api/notes/${note._id}`, { body: note, method: 'PATCH' })
    await fetchNotes()
  }

  return {
    notes,
    fetchNotes,
    createNewNote,
    updateNote,
  }
}, {
  persist: {
    storage: localStorage,
    key: 'notes',
  },
})
