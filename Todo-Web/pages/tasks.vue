<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8fafc]">
    <div class="w-full sm:max-w-screen-lg overflow-hidden">
      <div class="grid md:grid-cols-2 lg:grid-cols-3">
        <!-- Column 1 - Profile and Stats -->
        <div class="space-y-4">
          <h1 class="text-xl font-medium">Hi, Febryan Sambuari</h1>

          <div class="flex flex-col gap-2">
            <Card class="w-2/3">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-base font-medium">
                  Tasks Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="text-4xl font-bold">
                  10
                </div>
              </CardContent>
            </Card>
            <Card class="w-2/3">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-base font-medium">
                  Tasks Canceled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="text-4xl font-bold">
                  3
                </div>
              </CardContent>
            </Card>
            <Card class="w-2/3">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-base font-medium">
                  Tasks Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="text-4xl font-bold">
                  20
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Column 2 - Form Task -->
        <div class="space-y-4 col-span-2 flex flex-col">
          <h2 class="text-5xl font-semibold">What are you going to do?</h2>

          <div class="flex w-full gap-4">
            <form class="w-2/3 space-y-6" @submit="onSubmit">
              <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input class="bg-white" type="text" placeholder="Your task name" v-bind="componentField"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              </FormField>

              <FormField v-slot="{ value }" name="subjects" :validate-on-blur="!isFieldDirty">
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <TagsInput :model-value="value">
                      <TagsInputItem v-for="item in value" :key="item" :value="item">
                        <TagsInputItemText/>
                        <TagsInputItemDelete/>
                      </TagsInputItem>

                      <TagsInputInput placeholder="Home, Job, etc"/>
                    </TagsInput>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="taskDescription" :validate-on-blur="!isFieldDirty">
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe little bit about your task"
                      class="resize-none bg-white"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              </FormField>

              <Button type="submit">
                Add Task
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, h} from 'vue';
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'

import {toast} from '@/components/ui/toast/use-toast'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
    TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'
import {FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage} from '@/components/ui/form'

import {useTaskStore} from '@/stores/task';

const taskStore = useTaskStore();
const newTask = ref('');

const formSchema = toTypedSchema(z.object({
  username: z
    .string()
    .min(2)
    .max(50),
  subjects: z
    .array(z.string())
    .min(1)
    .max(3),
  taskDescription: z
    .string()
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
}))

const {isFieldDirty, handleSubmit} = useForm({
  validationSchema: formSchema,
  initialValues: {
    subjects: [],
  }
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', {class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4'}, h('code', {class: 'text-white'}, JSON.stringify(values, null, 2))),
  })
})

const createTask = async () => {
  await taskStore.createTask(newTask.value);
  newTask.value = '';
};

const markDone = async (task) => {
  await taskStore.updateTask(task.id, 'done');
};

const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
};

onMounted(async () => {
  await taskStore.fetchTasks();
});

const tasks = taskStore.tasks;
</script>
