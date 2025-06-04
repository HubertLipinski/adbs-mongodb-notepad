<script setup lang="ts">
const searchTerm = ref('')
const isOpen = ref(false)

const queryParams = computed(() => ({ q: searchTerm.value }))
const { data, status } = await useFetch('/api/notes/search', {
  params: queryParams,
  lazy: true,
})

const groups = computed(() => {
  const notes = data.value?.notes || []
  const tags = data.value?.tags || []

  return [
    {
      id: 'notes',
      label: searchTerm.value ? `Notes matching “${searchTerm.value}”...` : 'Notes',
      items: notes.map((note: unknown) => ({
        id: note._id,
        label: note.title || '(Untitled)',
        to: `/notes/${note._id}/edit`,
      })),
      ignoreFilter: false,
    },
    {
      id: 'tags',
      label: searchTerm.value ? `Tags matching “${searchTerm.value}”...` : 'Tags',
      items: tags.map((tag: string) => ({
        id: tag,
        label: tag,
        to: `/tags/${tag}`,
      })),
      ignoreFilter: false,
    },
  ]
})
</script>

<template>
  <UModal v-model:open="isOpen">
    <UButton
      label="Search content..."
      color="neutral"
      variant="subtle"
      icon="i-lucide-search"
      class="w-full p-3"
      @click="isOpen = true"
    />

    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        close
        placeholder="Search notes or tags..."
        class="h-80"
        @click="isOpen = false"
      />
    </template>
  </UModal>
</template>
