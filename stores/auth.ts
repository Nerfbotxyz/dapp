import { defineStore } from 'pinia'

interface AuthState {
  _isBootstrapped: boolean
  apiKey: string | null
  label: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return { _isBootstrapped: false, apiKey: null, label: null }
  },
  getters: {
    isLoggedIn: ({ apiKey }) => !!apiKey
  },
  actions: {
    async bootstrap() {
      if (!this._isBootstrapped) {
        // TODO -> get apiKey from localstorage :)
        // this.apiKey = apiKeyFromLocalstorage
        this._isBootstrapped = true
      }
    },
    async connect(apiKey: string) {
      // TODO -> test that this is a valid api key by trying to use it probably
      this.apiKey = apiKey
    },
    async disconnect() {
      this.apiKey = null
      this.label = null
    }
  }
})
