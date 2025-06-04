<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  name: z.string()
    .min(5, 'Name should be at least 5 characters long')
    .max(20, 'Name should be no more than 20 characters'),
  username: z.string()
    .min(4, 'Username should be at least 4 characters long')
    .max(20, 'Username should be no more than 20 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  password_confirmed: z.string().min(8, 'Must be at least 8 characters'),
  agreement: z.boolean().transform(value => value === true),
}).refine(data => data.password === data.password_confirmed, {
  message: 'Password must be identical',
  path: ['password_confirmed'],
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  username: undefined,
  email: undefined,
  password: undefined,
  password_confirmed: undefined,
  agreement: undefined,
})

const toast = useToast()
const { signIn } = useAuth()
const isLoading = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  const res = await $fetch('/api/auth/register', {
    method: 'POST',
    body: {
      name: event.data.name,
      username: event.data.username,
      email: event.data.email,
      password: event.data.password,
    },
  }).catch((err) => {
    toast.add({
      title: 'Registration failed',
      description: err?.data?.statusMessage || 'Unknown error',
      color: 'error',
    })
  })

  isLoading.value = false

  if (res?.username) {
    toast.add({
      title: 'Registration successful',
      description: 'You can now log in',
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
      label="Name"
      name="name"
      required
    >
      <UInput
        v-model="state.name"
        class="w-full"
        placeholder="John Doe"
      />
    </UFormField>

    <UFormField
      label="Username"
      name="username"
      required
    >
      <UInput
        v-model="state.username"
        class="w-full"
        placeholder="jdoe"
      />
    </UFormField>

    <UFormField
      label="Email"
      name="email"
      required
    >
      <UInput
        v-model="state.email"
        class="w-full"
        placeholder="email@example.com"
      />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
      help="At least 8 characters"
      required
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
      required
    >
      <UInput
        v-model="state.password_confirmed"
        type="password"
        class="w-full"
      />
    </UFormField>

    <UFormField
      name="agreement"
      required
    >
      <UCheckbox
        v-model="state.agreement"
        required
        color="primary"
        label="I accept the terms of service"
        :value="1"
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
      <p>
        Already have account? <ULink to="/login">Login here</ULink>
      </p>
    </div>
  </UForm>
</template>
