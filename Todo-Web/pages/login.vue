<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Eye, EyeOff} from "lucide-vue-next";

import {ref} from 'vue';
import {toast} from "~/components/ui/toast";

useHead({
  title: 'Login - ToDo App',
})

const username = ref('')
const password = ref('')
const loginError = ref('')
const showPassword = ref(false)

const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'))

const config = useRuntimeConfig()

const login = async () => {
  const {data, error} = await useAsyncData(
      'login',
      () => $fetch(`${config.public.apiBase}/api/v1/users/login`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: 'POST',
        body: {
          username: username.value,
          password: password.value
        }
      })
  )

  if (error.value) {
    loginError.value = error.value.data.message || 'Login failed'

    toast(({
      title: 'Login failed',
      description: error.value.data.message,
      variant: 'destructive',
    }))
  } else {
    const token = data.value?.token || ''
    const user = data.value?.username || ''

    if (import.meta.client) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', user)
    }

    await useRouter().push('/tasks')
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div class="w-full sm:max-w-md overflow-hidden">
      <form @submit.prevent="login">
        <span v-if="loginError">{{ loginError.value }}</span>
        <Card class="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle class="text-2xl">
              Login
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4">
              <div class="grid gap-2">
                <Label for="username">Username</Label>
                <Input
                    v-model="username"
                    id="username"
                    type="text"
                    placeholder="your username"
                    required
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                  <a href="#" class="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </a>
                </div>
                <div class="relative">
                  <Input
                      v-model="password"
                      id="password"
                      :type="passwordInputType"
                      placeholder="*********"
                      required
                      class="pr-10"
                  />

                  <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <template v-if="showPassword">
                      <EyeOff class="w-4 h-4" />
                    </template>
                    <template v-else>
                      <Eye class="w-4 h-4" />
                    </template>
                  </button>
                </div>
              </div>
              <Button type="submit" class="w-full">
                Login
              </Button>
              <Button variant="outline" class="w-full">
                Login with Google
              </Button>
            </div>
            <div class="mt-4 text-center text-sm">
              Don't have an account?
              <NuxtLink to="/register" class="underline">Sign up</NuxtLink>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  </div>
</template>
