<script setup lang="ts">
const {
  status,
  data,
  signOut
} = useAuth()

function logout() {
  signOut({ callbackUrl: '/login' })
}
</script>

<template>
  <div>
    <h1>Hello index: {{status}}</h1>
    <p>Zalogowany jako {{ data?.user?.email }}</p>
    <button @click="logout">Wyloguj się</button>
  </div>
</template>

<style scoped>

</style>