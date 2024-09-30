export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: ''
  }),
  actions: {
    async login(String: username, password) {
      const { data } = await useFetch('http://localhost:5000/api/v1/users/login', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })

      console.log(data)
    }
  }
})
