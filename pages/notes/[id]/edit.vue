<script setup lang="ts">
import type { NoteDocument } from '~/server/models/Note'

const route = useRoute()
const store = useNotesStore()
const { notes } = storeToRefs(store)

const userNote = notes.value.find((el: NoteDocument) => el._id === route.params.id)!
const content = toRaw(userNote?.content)

const keys = useMagicKeys()
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

const items = ref<string[]>(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref<string[]>(['Backlog'])

function onCreate(item: string) {
  items.value.push(item)
  value.value.push(item)
}
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
            />
          </div>
        </div>
        <div class="pb-4">
          <UFormField label="Tag">
            <UInputMenu
              v-model="value"
              create-item
              :items="items"
              class="w-48"
              multiple
              @create.prevent="onCreate"
            />
          </UFormField>
        </div>
        <Editor
          :model-value="content"
          @update:model-value="($event) => userNote.content = $event"
        />
      </UContainer>
    </section>
  </ClientOnly>
</template>
