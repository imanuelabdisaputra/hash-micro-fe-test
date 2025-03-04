<script setup lang="ts">
  import Form from '../_form.vue';

  interface FormValues {
    id: string;
    name: string;
    email: string;
  }

  const route = useRoute();
  const id = route.params.id;

  const userData = ref<Partial<FormValues> | undefined>(undefined);

  const getData = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((user: FormValues) => user.id === id);
      userData.value = user;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  onMounted(() => {
    getData();
  });
</script>

<template>
  <section class="flex flex-col flex-1 gap-6 p-6">
    <span class="flex items-center justify-between flex-1">
      <h1 class="text-2xl font-semibold">User Details</h1>
    </span>

    <div v-if="userData" class="flex gap-4 p-6 mt-5 border border-gray-200 rounded-lg shadow">
      <div class="flex flex-col flex-1">
        <p class="font-semibold ">Name</p>
        <p class="text-slate-500">{{ userData?.name || "-" }}</p>
      </div>
      <div class="flex flex-col flex-1">
        <p class="font-semibold ">Email</p>
        <p class="text-slate-500">{{ userData?.email || "-" }}</p>
      </div>
    </div>

    <Button variant="outline" class="self-start" @click="navigateTo('/user')">
      Back
    </Button>
  </section>
</template>
