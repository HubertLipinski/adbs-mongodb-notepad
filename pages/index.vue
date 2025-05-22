<script setup lang="ts">
const { data, status, signOut } = useAuth()
</script>

<template>
  <section class="flex flex-col justify-center grow-1 items-center gap-16">
    <h1 class="text-3xl">
      Welcome back, {{ data }}
    </h1>

    <UButton
      label="Wyloguj"
      @click="async () => await signOut()"
    />

    <UButton
      label="Button"
      class="w-48 h-48 justify-center"
      variant="outline"
      icon="i-lucide-plus"
    >
      Create new note
    </UButton>
  </section>
</template>

<style scoped>

</style>
