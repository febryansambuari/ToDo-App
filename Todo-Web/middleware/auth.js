export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user') // Get the user from state or authentication token

  if (!user.value && to.path !== '/login') {
    // Redirect to login if not authenticated
    return navigateTo('/login')
  }
})
