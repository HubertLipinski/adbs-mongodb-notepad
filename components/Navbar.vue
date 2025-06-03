<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const { signOut } = useAuth()

const store = useNotesStore()
const { notes, tags } = storeToRefs(store)

await store.fetchNotes()
await store.fetchTags()

const userMenu = computed(() => {
  const menu = [{
    label: 'New note',
    icon: 'i-lucide-plus',
    onClick: async () => store.createNewNote(),
  }]
  notes.value.forEach(note => menu.push({
    label: note.title,
    icon: 'i-lucide-file-text',
    to: `/notes/${note._id}/edit`,
  }))
  return menu
})

const tagsMenu = computed(() => {
  const menu = []

  tags.value.forEach(tag => menu.push({
    label: tag.name,
    icon: 'i-lucide-tag',
    badge: {
      color: 'primary',
      label: tag.count || 0,
    },
    to: `/tags/${tag.name}`,
  }))

  return menu
})

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'My Notes',
      icon: 'i-lucide-book-open',
      active: computed<boolean>(() => route.fullPath.includes('notes')),
      to: '/notes',
      defaultOpen: true,
      children: userMenu,
    },
    {
      label: 'Tags',
      icon: 'i-lucide-tags',
      slot: 'tags' as const,
      active: computed<boolean>(() => route.fullPath.includes('tags')),
      class: 'mt-4',
      defaultOpen: true,
      children: tagsMenu,
    },
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      class: 'mt-4',
      onClick: () => signOut(),
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/HubertLipinski/adbs-mongodb-notepad',
      target: '_blank',
      class: 'mt-4',
    },
  ],
])
</script>

<template>
  <UNavigationMenu
    :key="route.path"
    orientation="vertical"
    :items="items"
    class="data-[orientation=vertical]:w-full"
  />
</template>
