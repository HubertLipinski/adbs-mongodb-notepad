<script setup lang="ts">
const data = { time: new Date().getTime(), blocks: [{ type: 'header', data: { text: 'Untitled note', level: 1 } }, { type: 'paragraph', data: { text: 'Edit content here' } }], version: '2.31.0-rc.7' }

const defaultData = ref(data)
</script>

<template>
  <ClientOnly>
    <section class="w-full max-w-full">
      <Editor
        placeholder="Type here..."
        :autofocus="true"
        :model-value="defaultData"
        @update:model-value="($event) => defaultData = $event"
      />
    </section>
  </ClientOnly>
</template>
