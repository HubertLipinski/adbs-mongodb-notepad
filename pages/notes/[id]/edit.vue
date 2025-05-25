<script setup lang="ts">
// TODO: get user note content from api

const route = useRoute()

const store = useNotesStore()
const { notes } = storeToRefs(store)

const userNote = notes.value.find(el => el._id === route.params.id)
</script>

<template>
  <ClientOnly>
    <section class="w-full max-w-full">
      <!-- TODO: TAGS and GEOLOCATION -->
      <!-- TODO: capture ctrl+s to save and add controls on top of the page to save -->
      {{ userNote }}
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
              label="Save"
              size="lg"
              trailing-icon="i-lucide-save"
            />
            <UButton
              trailing-icon="i-lucide-trash"
              size="lg"
              color="error"
            />
          </div>
        </div>
        <Editor
          :model-value="userNote.content"
          @update:model-value="($event) => userNote.content = $event"
        />
      </UContainer>
    </section>
  </ClientOnly>
</template>
