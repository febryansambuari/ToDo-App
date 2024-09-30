<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {ref} from "vue";

useHead({
  title: 'Register - ToDo App'
})

const username = ref('')
const password = ref('')
</script>

<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div class="w-full sm:max-w-md overflow-hidden">
      <Card class="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle class="text-xl">
            Sign Up
          </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your username"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" class="w-full">
              Create an account
            </Button>
            <Button variant="outline" class="w-full">
              Sign up with GitHub
            </Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <NuxtLink to="/login" class="underline">Sign in</NuxtLink>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
