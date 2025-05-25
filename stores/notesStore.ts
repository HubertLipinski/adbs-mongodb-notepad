import type { NoteDocument } from '~/server/models/Note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<NoteDocument[]>([])

  async function fetchNotes() {
    const { data } = await useFetch('/api/notes')
    notes.value = data.value
  }

  async function createNewNote() {
    const data: NoteDocument = await $fetch(`/api/notes/create`)

    notes.value.push(data)
    await nextTick()
    await navigateTo(`/notes/${data._id}/edit`)
  }

  return {
    notes,
    fetchNotes,
    createNewNote,
  }
}, {
  persist: {
    storage: localStorage,
    paths: ['notes'],
    key: 'notes',
  },
})
