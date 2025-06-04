<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { signIn } = useAuth()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const toast = useToast()

const isLoading = ref(false)
const errorMessage = ref<null | string>(null)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  errorMessage.value = null
  const result = await signIn('credentials', {
    redirect: false,
    email: event.data.email,
    password: event.data.password,
  })

  if (result?.error) {
    errorMessage.value = result?.error
  }
  else {
    toast.add({ title: 'Success', description: 'You are logged in!', color: 'success' })
    navigateTo('/')
  }

  isLoading.value = false
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 w-sm"
    @submit.prevent="onSubmit"
  >
    <h1 class="text-2xl font-semibold py-4">
      Login
    </h1>

    <UFormField
      label="Email"
      name="email"
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
    >
      <UInput
        v-model="state.password"
        type="password"
        class="w-full"
      />
    </UFormField>

    <UAlert
      v-if="errorMessage"
      color="error"
      :title="errorMessage"
    />

    <UButton
      type="submit"
      :disabled="isLoading"
      :loading="isLoading"
    >
      Login
    </UButton>

    <div class="py-4">
      <p>
        No account? <ULink to="/register">Register here</ULink>
      </p>
    </div>
  </UForm>
</template>
