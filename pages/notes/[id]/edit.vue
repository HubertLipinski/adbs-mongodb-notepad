<script setup lang="ts">
import type { NoteDocument } from '~/server/models/Note'

const route = useRoute()
const store = useNotesStore()
const { notes } = storeToRefs(store)

const noteId = ref<string>(route.params.id as string)
const userNote: NoteDocument = notes.value.find((el: NoteDocument) => el._id === noteId.value)!
const content = toRaw(userNote?.content)

const mapPoint = ref({
  type: 'Point',
  coordinates: [],
})

const toast = useToast()
const isSaving = ref(false)
async function saveNote() {
  if (isSaving.value) return

  isSaving.value = true
  await store.updateNote(userNote as NoteDocument)
  store.$patch({})
  setTimeout(() => {
    isSaving.value = false
    toast.add({
      title: 'Success!',
      description: 'Note updated successfully.',
      icon: 'i-lucide-check',
    })
  }, 250)
}

onKeyStroke('s', async (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    await saveNote()
  }
})

const items = ref<string[]>([...userNote.tags])

function onCreate(item: string) {
  items.value.push(item)
  userNote.tags.push(item)
}

const isDeleting = ref(false)
async function deleteThisNote() {
  isDeleting.value = true
  await store.deleteNote(noteId.value)
  isDeleting.value = false
  toast.add({
    title: 'Success!',
    description: 'Note deleted successfully.',
    icon: 'i-lucide-check',
  })
  store.$patch({})
}

watch(mapPoint.value, (val) => {
  userNote.location = val
})
</script>

<template>
  <ClientOnly>
    <section class="w-full max-w-full">
      <!-- TODO: GEOLOCATION -->

      <UContainer class="min-h-full gap-8">
        <div class="w-full pt-4 pb-8 flex flex-row justify-between">
          <div class="flex gap-6">
            <UInput
              v-model="userNote.title"
              color="neutral"
              size="xl"
              placeholder="Untitled Note"
              :autofocus="true"
              class="w-md"
              variant="ghost"
              icon="i-lucide-file-text"
            />
          </div>
          <div class="flex gap-4">
            <UButton
              label="Save (CRTL + S)"
              size="lg"
              trailing-icon="i-lucide-save"
              :loading="isSaving"
              @click="saveNote"
            />
            <UButton
              trailing-icon="i-lucide-trash"
              size="lg"
              color="error"
              :disabled="isDeleting"
              :loading="isDeleting"
              @click="deleteThisNote"
            />
          </div>
        </div>
        <div class="pb-4 pl-4">
          <UFormField label="Tags">
            <UInputMenu
              v-model="userNote.tags"
              size="xl"
              multiple
              :items="items"
              create-item
              placeholder="Select tags"
              class="max-w-md"
              @create="onCreate"
            />
          </UFormField>
          <div class="py-2 mt-4">
            <p class="pb-1">
              Selected location coordinates: {{ userNote.location?.coordinates.length > 0 ? userNote.location?.coordinates : ' - ' }}
            </p>
            <LeafletMap
              v-if="userNote.location === null"
              v-model:coordinates="mapPoint.coordinates"
            />
            <LeafletMap
              v-else
              v-model:coordinates="userNote.location.coordinates"
            />
          </div>
        </div>
        <Editor
          :model-value="content"
          @update:model-value="($event) => userNote.content = $event"
        />
      </UContainer>
    </section>
  </ClientOnly>
</template>
