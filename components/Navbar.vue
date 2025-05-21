<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'My Notes',
      icon: 'i-lucide-book-open',
      defaultOpen: true,
      slot: 'notes' as const,
      children: [
        {
          label: 'New note',
          icon: 'i-lucide-plus',
        },
        {
          label: 'My note 1',
          icon: 'i-lucide-file-text',
        },
      ],
    },
    {
      label: 'Tags',
      icon: 'i-lucide-tags',
      slot: 'tags' as const,
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
      label: 'Components',
      icon: 'i-lucide-box',
      to: '/components',
      slot: 'components' as const,
      children: [
        {
          label: 'Link',
          icon: 'i-lucide-file-text',
          description: 'Use NuxtLink with superpowers.',
          to: '/components/link',
        },
        {
          label: 'Modal',
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          to: '/components/modal',
        },
        {
          label: 'NavigationMenu',
          icon: 'i-lucide-file-text',
          description: 'Display a list of links.',
          to: '/components/navigation-menu',
        },
        {
          label: 'Pagination',
          icon: 'i-lucide-file-text',
          description: 'Display a list of pages.',
          to: '/components/pagination',
        },
        {
          label: 'Popover',
          icon: 'i-lucide-file-text',
          description: 'Display a non-modal dialog that floats around a trigger element.',
          to: '/components/popover',
        },
        {
          label: 'Progress',
          icon: 'i-lucide-file-text',
          description: 'Show a horizontal bar to indicate task progression.',
          to: '/components/progress',
        },
      ],
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/HubertLipinski/adbs-mongodb-notepad',
      target: '_blank',
    },
  ],
])
</script>

<template>
  <UNavigationMenu
    orientation="vertical"
    :items="items"
    class="data-[orientation=vertical]:w-full"
  >
    <!-- <template #notes-leading>
      <UBadge variant="outline">20</UBadge>
    </template> -->
  </UNavigationMenu>
</template>
