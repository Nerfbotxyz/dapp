<template>
  <v-container fluid class="pa-0 mt-12">
    <v-row justify="center">
      <v-col cols="auto">
        <p v-if="auth.isLoggedIn">
          hello, <strong>{{ auth.label || auth.apiKey }}</strong>!
          welcome to the index page
        </p>
        <p v-else>
          hello! this is this index page, click connect to log in
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
</script>
