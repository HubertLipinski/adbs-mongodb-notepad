<script setup lang="ts">
const searchTerm = ref('')
const isOpen = ref(false)

const coordinates = ref([])
const radiusModel = ref(10000)

const queryParams = computed(() => ({ q: searchTerm.value, coordinates: coordinates.value, radius: radiusModel.value }))
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
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      items: notes.map((note: any) => ({
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

const actionLabel = computed(() => {
  if (coordinates.value.length === 2) {
    return `Selected: ${radiusModel.value / 1000}km radius from (${coordinates.value[1]}, ${coordinates.value[0]})`
  }

  return 'Select location and radius'
})

watch(isOpen, (val) => {
  if (val === false) {
    setTimeout(() => {
      coordinates.value = []
      radiusModel.value = 10000
    }, 500)
  }
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
      <LeafletMap
        v-model:coordinates="coordinates"
        v-model:radius-model.lazy="radiusModel"
        label="Search"
        :action-label="actionLabel"
        :radius="10000"
        button-class="py-4"
      />
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
