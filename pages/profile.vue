<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { z } from 'zod'
import type { UserDocument } from '~/server/models/User'

const toast = useToast()

const { data } = await useFetch<UserDocument>('/api/profile')

const items = [
  {
    label: 'Account',
    description: 'Make changes to your account here. Click save when you\'re done.',
    icon: 'i-lucide-user',
    slot: 'account' as const,
  },
  {
    label: 'Password',
    description: 'Change your password here. After saving, you\'ll be logged out.',
    icon: 'i-lucide-lock',
    slot: 'password' as const,
  },
] satisfies TabsItem[]

const passwordSchema = z.object({
  currentPassword: z.string().min(8, 'Must be at least 8 characters'),
  newPassword: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Password must be identical',
  path: ['confirmPassword'],
})

const userState = reactive({
  name: '',
  username: '',
  consent: [],
})

const passwordState = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

watch(() => data.value, (userData) => {
  if (userData) {
    userState.name = userData.name
    userState.username = userData.username
    userState.consent = userData.consent
  }
}, { immediate: true })

const loadingStatus = reactive({
  userForm: false,
  passwordForm: false,
})

async function updateUserDetails() {
  try {
    loadingStatus.userForm = true
    await $fetch('/api/profile', {
      method: 'PATCH',
      body: {
        name: userState.name,
        username: userState.username,
        consent: userState.consent,
      },
    })

    toast.add({ title: 'Profile has been updated!' })
    loadingStatus.userForm = false
  }
  catch (err) {
    console.error('Failed to update user:', err)
    loadingStatus.userForm = false
  }
}

const { signOut } = useAuth()
const passwordError = ref('')
async function updateUserPassword() {
  passwordError.value = ''

  try {
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      passwordError.value = 'Passwords do not match'
      return
    }

    loadingStatus.passwordForm = true

    await $fetch('/api/profile/password', {
      method: 'PUT',
      body: {
        currentPassword: passwordState.currentPassword,
        newPassword: passwordState.newPassword,
      },
    })

    passwordState.currentPassword = ''
    passwordState.newPassword = ''
    passwordState.confirmPassword = ''

    loadingStatus.passwordForm = false

    toast.add({ title: 'Password has been changed!', description: 'You will be automatically loged out in 3 seconds...' })

    setTimeout(async () => await signOut(), 3000)
  }
  catch (err: unknown) {
    passwordError.value = err?.data?.statusMessage || 'Something went wrong'
    loadingStatus.passwordForm = false
  }
}

const consentMap = {
  agreement: 'I accept the terms of service',
  marketing: 'I accept email contact for marketing purposes',
}
</script>

<template>
  <UContainer class="py-4">
    <UTabs
      :items="items"
      variant="pill"
      class="gap-4 w-full"
      :ui="{ trigger: 'grow' }"
    >
      <template #account="{ item }">
        <p class="text-muted mb-4">
          {{ item.description }}
        </p>

        <UForm
          :state="userState"
          class="flex flex-col gap-4"
          @submit.prevent="updateUserDetails"
        >
          <UFormField
            label="Name"
            name="name"
          >
            <UInput
              v-model="userState.name"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Username"
            name="username"
          >
            <UInput
              v-model="userState.username"
              class="w-full"
            />
          </UFormField>

          <UFormField
            v-for="consent in userState.consent"
            :key="consent.key"
            :name="consent.key"
          >
            <UCheckbox
              v-model="consent.value"
              color="primary"
              :label="consentMap[consent.key]"
              :value="1"
            />
          </UFormField>

          <UButton
            label="Update"
            type="submit"
            class="self-end"
            :disabled="loadingStatus.userForm"
            :loading="loadingStatus.userForm"
          />
        </UForm>
      </template>

      <template #password="{ item }">
        <p class="text-muted mb-4">
          {{ item.description }}
        </p>

        <UForm
          :schema="passwordSchema"
          :state="passwordState"
          class="flex flex-col gap-4"
          @submit.prevent="updateUserPassword"
        >
          <UFormField
            label="Current Password"
            name="currentPassword"
            required
          >
            <UInput
              v-model="passwordState.currentPassword"
              type="password"
              required
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="New Password"
            name="newPassword"
            required
          >
            <UInput
              v-model="passwordState.newPassword"
              type="password"
              required
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Confirm Password"
            name="confirmPassword"
            required
          >
            <UInput
              v-model="passwordState.confirmPassword"
              type="password"
              required
              class="w-full"
            />
          </UFormField>

          <UButton
            label="Change password"
            type="submit"
            class="self-end"
            :disabled="loadingStatus.passwordForm"
            :loading="loadingStatus.passwordForm"
          />
        </UForm>
      </template>
    </UTabs>
  </UContainer>
</template>
