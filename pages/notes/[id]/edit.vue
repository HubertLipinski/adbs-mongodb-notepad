<script setup lang="ts">
// TODO: get user note content from api

const data = {
  time: new Date().getTime(),
  blocks: [
    { type: 'header', data: { text: null, level: 1 } },
    {
      type: 'paragraph',
      data: { text: 'Edit this content! Tip: Press / to see all available commands adn select text to see toolbox' },
    },
  ],
}

const defaultData = ref(data)
</script>

<template>
  <ClientOnly>
    <section class="w-full max-w-full">
      <!-- TODO: TAGS and GEOLOCATION -->
      <!-- TODO: capture ctrl+s to save and add controls on top of the page to save -->

      <UContainer class="min-h-full gap-8">
        <div class="w-full pt-4 pb-8 flex flex-row justify-between">
          <div class="flex gap-6">
            <UInput
              color="neutral"
              size="lg"
              placeholder="Untitled Note"
              autofocus
              class="w-xl"
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
        <div>
          <p>Last modified: {{ new Date().toLocaleTimeString() }}</p>
        </div>
        <Editor
          :autofocus="true"
          :model-value="defaultData"
          @update:model-value="($event) => defaultData = $event"
        />
      </UContainer>
    </section>
  </ClientOnly>
</template>
