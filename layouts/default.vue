<script setup lang="ts">
const store = useNotesStore()
</script>

<template>
  <main class="flex flex-row min-h-screen">
    <div class="flex flex-col min-w-sm max-w-sm bg-slate-100 max-h-screen overflow-y-auto">
      <div class="inline-flex justify-between items-center pb-4 sticky top-0 z-10 backdrop-blur-sm p-6">
        <h1 class="text-xl pl-2">
          <NuxtLink to="/">Notepad App</NuxtLink>
        </h1>
        <UButton
          variant="outline"
          icon="i-lucide-plus"
          size="sm"
          @click="async () => await store.createNewNote()"
        />
      </div>
      <div class="px-6 py-4">
        <SearchBar />
      </div>
      <Navbar class="p-6 pt-2" />
    </div>
    <div class="grow-1 max-h-screen overflow-y-auto">
      <!-- <div class="w-full bg-slate-100 p-4">
        <UInput class="w-md" icon="i-lucide-search" size="md" variant="outline" placeholder="Search..." />
      </div> -->
      <div class="flex flex-col grow-1 h-full p-6">
        <slot />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
