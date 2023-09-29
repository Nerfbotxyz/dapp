<template>
  <v-menu v-if="auth.isLoggedIn">
    <template #activator="{ props }">
      <code v-if="auth.label" style="cursor: pointer;" v-bind="props">
        <strong>{{ auth.label }}</strong> |
      </code>
      <code style="cursor: pointer;" v-bind="props">{{ auth.apiKey }}</code>
    </template>
    <v-list>
      <v-list-item @click="onDisconnectClicked">
        <v-list-item-title>Disconnect</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <v-btn
    v-else
    color="white"
    variant="tonal"
    @click="onConnectClicked"
  >
    Connect
  </v-btn>

  <v-dialog v-model="isDialogOpen" persistent>
    <template #default>
      <v-card>
        <v-card-title>Connect</v-card-title>
        <v-form v-model="isFormValid" @submit.prevent="onDialogConfirmed">
          <v-card-text>
            <v-text-field v-model="apiKey" label="API Key" :rules="rules" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" variant="text" @click="onDialogCancelled">
              Cancel
            </v-btn>
            <v-spacer />
            <v-btn color="primary" variant="text" type="submit">
              Connect
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>

  <v-snackbar v-model="isErrorSnackbarOpen" color="error">
    API Key not found!

    <template #actions>
      <v-btn
        color="black"
        variant="text"
        @click="isErrorSnackbarOpen = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const apiKey = ref('')
const isFormValid = ref(false)
const isDialogOpen = ref(false)
const isErrorSnackbarOpen = ref(false)
const rules = [ (value: string) => !!value || 'Required' ]
const auth = useAuthStore()
const onConnectClicked = debounce(() => isDialogOpen.value = true)
const onDialogConfirmed = debounce(async () => {
  try {
    if (!isFormValid.value) { return }
    const success = await auth.connect(apiKey.value)
    if (success) {
      isDialogOpen.value = false
    } else {
      isErrorSnackbarOpen.value = true
    }
  } catch (error) {
    console.error(error)
  }
})
const onDialogCancelled = debounce(() => isDialogOpen.value = false)
const onDisconnectClicked = debounce(() => auth.disconnect())
</script>
