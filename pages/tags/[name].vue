<script setup lang="ts">
import type { NoteDocument } from '~/server/models/Note'

const route = useRoute()
const store = useNotesStore()
const toast = useToast()

const { data, status, refresh } = await useFetch<NoteDocument[]>('/api/notes', {
  query: {
    tags: route.params.name,
  },
})

function editNote(id: string) {
  navigateTo(`/notes/${id}/edit`)
}

async function deleteNote(id: string) {
  await store.deleteNote(id, false)

  toast.add({
    title: 'Success!',
    description: 'Note deleted successfully.',
    icon: 'i-lucide-check',
  })

  store.$patch({})
  await refresh()
}

watchEffect(async () => {
  if (status.value === 'success' && data && data.value?.length === 0) {
    await navigateTo(`/`)
  }
})
</script>

<template>
  <div
    v-if="data && data.length > 0"
    class="flex flex-col gap-y-4 pb-6 pt-2"
  >
    <UCard
      v-for="note in data"
      :key="note._id as string"
    >
      <div class="flex w-full items-center justify-between">
        <div>
          <p>{{ note.title }}</p>
          <p class="text-xs text-muted">
            Updated: <span>{{ new Date(note.updatedAt).toLocaleDateString() }}
              {{ new Date(note.updatedAt).toLocaleTimeString() }}</span>
          </p>
        </div>

        <div class="inline-flex gap-x-4">
          <UButton
            trailing-icon="i-lucide-trash"
            size="md"
            color="error"
            @click="deleteNote(note._id as string)"
          />
          <UButton
            trailing-icon="i-lucide-arrow-right"
            size="md"
            @click="editNote(note._id as string)"
          >
            Edit
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
