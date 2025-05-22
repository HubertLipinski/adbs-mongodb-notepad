<script setup lang="ts">
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' },
  layout: 'auth',

})
</script>

<template>
  <AuthLoginForm />
</template>

<style scoped>

</style>
