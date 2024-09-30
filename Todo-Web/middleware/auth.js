export default defineNuxtRouteMiddleware((to, from) => {
  const token = import.meta.client ? localStorage.getItem('token') : null

  // If the user is not logged in, redirect to the login page
  if (!token && to.name !== 'login') {
    return navigateTo('/login')
  }
})
