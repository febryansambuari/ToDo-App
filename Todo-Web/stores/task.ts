export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Array<{ id: string; subject: string; status: string }>,
  }),
  actions: {
    async fetchTasks() {
      const { data } = await $fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      this.tasks = data.value;
    },
    async createTask(subject: string) {
      await $fetch('/api/tasks', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: { subject },
      });
      this.fetchTasks();
    },
    async updateTask(id: string, status: string) {
      await $fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: { status },
      });
      this.fetchTasks();
    },
    async deleteTask(id: string) {
      await $fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      this.fetchTasks();
    },
  },
});
