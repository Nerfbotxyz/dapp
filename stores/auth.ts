import { defineStore } from 'pinia'

interface AuthState {
  _isBootstrapped: boolean
  apiKey: string | null
  label?: string
}

interface ApiKey {
  apiKey: string
  apiKeyId: number
  created_at: string
  update_at: string
  label?: string
  userId: number
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return { _isBootstrapped: false, apiKey: null }
  },
  getters: {
    isLoggedIn: ({ apiKey }) => !!apiKey
  },
  actions: {
    /* eslint-disable-next-line @typescript-eslint/require-await */
    async bootstrap() {
      if (!this._isBootstrapped) {
        // TODO -> get apiKey from localstorage :)
        // this.apiKey = apiKeyFromLocalstorage
        this._isBootstrapped = true
      }
    },
    async connect(apiKey: string) {
      const { public: { apiBaseUrl } } = useRuntimeConfig()
      let success = false
      try {
        const response = await fetch(
          `${apiBaseUrl}/auth/api-keys?token=${apiKey}`
        )
        success = response.ok

        const { apiKeys } = await response.json() as { apiKeys: ApiKey[] }
        console.log('apiKeys', apiKeys)
        const thisApiKey = apiKeys.find(a => a.apiKey === apiKey)
        if (thisApiKey) {
          this.label = thisApiKey.label
          this.apiKey = thisApiKey.apiKey
        } else {
          success = false
        }
        
        if (success) {
          this.apiKey = apiKey
        }
      } catch (error) {
        console.error('Error on auth connect', error)
      }

      return success
    },
    disconnect() {
      this.apiKey = null
      this.label = undefined
    }
  }
})
