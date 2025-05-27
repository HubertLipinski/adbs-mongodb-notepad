import type { NoteDocument } from '~/server/models/Note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<NoteDocument[]>([])

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
  }

  async function deleteNote(id: string): Promise<void> {
    console.log(`${id} deleted`)
    await $fetch(`/api/notes/${id}`, { method: 'DELETE' })
    notes.value = notes.value.filter((el: NoteDocument) => el._id !== id)

    if (notes.value.length > 0) {
      await navigateTo(`/notes/${notes.value[0]._id}/edit`)
      return
    }

    await navigateTo(`/`)
  }

  return {
    notes,
    fetchNotes,
    createNewNote,
    updateNote,
    deleteNote,
  }
}, {
  persist: {
    storage: localStorage,
    key: 'notes',
  },
})
