<script setup lang="ts">
// TODO: get user note content from api

const data = {
  time: new Date().getTime(),
  blocks: [
    { type: 'header', data: { text: null, level: 1 } },
    { type: 'paragraph', data: { text: 'Edit this content! Tip: Press / to see all available commands adn select text to see toolbox' } },
  ],
}

const defaultData = ref(data)
</script>

<template>
  <ClientOnly>
    <section class="w-full max-w-full">
      <!-- TODO: TAGS and GEOLOCATION -->
      <!-- TODO: capture ctrl+s to save and add controls on top of the page to save -->
      <Editor
        :autofocus="true"
        :model-value="defaultData"
        @update:model-value="($event) => defaultData = $event"
      />
    </section>
  </ClientOnly>
</template>
