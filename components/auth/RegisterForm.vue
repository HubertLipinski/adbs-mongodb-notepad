<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  username: z.string()
    .min(5, 'Username should be at least 5 characters long')
    .max(20, 'Username should be no more than 20 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  password_confirmed: z.string().min(8, 'Must be at least 8 characters'),
}).refine(data => data.password === data.password_confirmed, {
  message: 'Password must be identical',
  path: ['password_confirmed'],
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  email: undefined,
  password: undefined,
  password_confirmed: undefined,
})

const toast = useToast()
const { signIn } = useAuth()
const isLoading = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  const res = await $fetch('/api/auth/register', {
    method: 'POST',
    body: {
      username: event.data.username,
      email: event.data.email,
      password: event.data.password,
    },
  }).catch((err) => {
    toast.add({
      title: 'Registration failed',
      description: err?.data?.statusMessage || 'Unknown error',
      color: 'red',
    })
  })

  isLoading.value = false

  if (res?.success) {
    toast.add({
      title: 'Registration successful',
      description: 'You can now log in',
      color: 'green',
    })

    await signIn('credentials', {
      redirect: true,
      email: event.data.email,
      password: event.data.password,
      callbackUrl: '/',
    })
  }
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 w-sm"
    @submit="onSubmit"
  >
    <h1 class="text-2xl font-semibold py-4">
      Register
    </h1>

    <UFormField
      label="Username"
      name="username"
    >
      <UInput
        v-model="state.username"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Email"
      name="email"
    >
      <UInput
        v-model="state.email"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
    >
      <UInput
        v-model="state.password"
        type="password"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Confirm password"
      name="password_confirmed"
    >
      <UInput
        v-model="state.password_confirmed"
        type="password"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      :disabled="isLoading"
      :loading="isLoading"
    >
      Register
    </UButton>

    <div class="py-4">
      <p>Already have account? <ULink to="/login">Login here</ULink></p>
    </div>
  </UForm>
</template>
