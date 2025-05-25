<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const { signOut } = useAuth()

const store = useNotesStore()
const { notes } = storeToRefs(store)

await store.fetchNotes()

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'My Notes',
      icon: 'i-lucide-book-open',
      active: route.path.includes('/notes'),
      to: '/notes',
      defaultOpen: true,
      children: userMenu,
    },
    {
      label: 'Tags',
      icon: 'i-lucide-tags',
      slot: 'tags' as const,
      active: route.path.includes('/tags'),
      children: [
        {
          label: 'New tag',
          icon: 'i-lucide-plus',
        },
        {
          label: 'Custom tag',
          icon: 'i-lucide-tag',
        },
      ],
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
    orientation="vertical"
    :items="items"
    class="data-[orientation=vertical]:w-full"
  />
</template>
