<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const username = ref('');
const password = ref('');

const login = async () => {
  // await userStore.login(username.value, password.value);
  // await useRouter().push('/tasks');
};
</script>

<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div class="w-full sm:max-w-md overflow-hidden">
      <form @submit="login">
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
                <Label for="email">Username</Label>
                <Input
                    v-model="username"
                    id="username"
                    type="text"
                    placeholder="your.email@example.com"
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
                <Input
                    v-model="password"
                    id="password"
                    type="password"
                    placeholder="*********"
                    required
                />
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
