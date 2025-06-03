<script setup lang="ts">
const { data } = useAuth()
const store = useNotesStore()

onMounted(() => store.$patch({}))
</script>

<template>
  <section class="flex flex-col justify-center grow-1 items-center gap-16">
    <h1 class="text-3xl">
      Welcome back, {{ data?.user?.name }}
    </h1>

    <UButton
      label="Button"
      class="w-48 h-48 justify-center"
      variant="outline"
      icon="i-lucide-plus"
      @click="async () => await store.createNewNote()"
    >
      Create new note
    </UButton>
  </section>
</template>

<style scoped></style>
