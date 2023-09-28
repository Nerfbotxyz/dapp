<template>
  <v-app class="background-bg">
    <TopNavBar />
    <v-main>
      <slot />
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
@import "@/assets/styles/main.css";
</style>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

await useAsyncData('auth-bootstrap', async () => {
  await useAuthStore().bootstrap()
})
</script>
