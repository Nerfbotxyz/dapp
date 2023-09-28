<template>
  <v-menu v-if="auth.isLoggedIn">
    <template #activator="{ props }">
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

  <v-dialog v-model="isDialogOpen">
    <template #default>
      <v-card title="Connect">
        <v-form v-model="isFormValid" @submit.prevent="onDialogConfirmed">
          <v-card-text>
            <v-text-field label="API Key" v-model="apiKey" :rules="rules" />
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
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const apiKey = ref('')
const isFormValid = ref(false)
const isDialogOpen = ref(false)
const rules = [ (value: string) => !!value || 'Required' ]
const auth = useAuthStore()
const onConnectClicked = debounce(async () => isDialogOpen.value = true)
const onDialogConfirmed = debounce(async () => {
  try {
    if (!isFormValid.value) { return }
    await auth.connect(apiKey.value)
    isDialogOpen.value = false
  } catch (error) {
    console.error(error)
  }
})
const onDialogCancelled = debounce(() => isDialogOpen.value = false)
const onDisconnectClicked = debounce(async () => await auth.disconnect())
</script>
