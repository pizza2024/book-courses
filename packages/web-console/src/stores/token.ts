import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  function setToken(_token: string) {
    token.value = _token
  }

  return { token, setToken }
})
