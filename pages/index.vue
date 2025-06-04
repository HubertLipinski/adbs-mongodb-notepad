<script setup lang="ts">
import type { UserDocument } from '~/server/models/User'

const store = useNotesStore()

const { data: userData } = await useFetch<UserDocument>('/api/profile')

onMounted(() => store.$patch({}))
</script>

<template>
  <section class="flex flex-col justify-center grow-1 items-center gap-16">
    <h1 class="text-3xl">
      Welcome back, {{ userData?.name }}!
    </h1>

    <div class="inline-flex gap-7">
      <UButton
        label="Button"
        class="w-48 h-48 justify-center"
        variant="outline"
        icon="i-lucide-plus"
        @click="async () => await store.createNewNote()"
      >
        Create new note
      </UButton>

      <UButton
        label="Button"
        class="w-48 h-48 justify-center"
        variant="outline"
        color="secondary"
        icon="i-lucide-user-round-cog"
        @click="navigateTo('/profile')"
      >
        Edit profile
      </UButton>
    </div>
  </section>
</template>

<style scoped></style>
