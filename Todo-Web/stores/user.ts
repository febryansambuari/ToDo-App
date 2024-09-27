import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    user: null,
  }),
  actions: {
    async login(username: string, password: string) {
      const { data } = await $fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      this.token = data.value.token
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.value.token)
      }
    },
    logout() {
      this.token = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
    }
  }
})
