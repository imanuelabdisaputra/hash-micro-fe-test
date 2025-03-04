<script setup lang="ts">
  import type { Payment } from './columns';
  import { columns } from './columns';
  import DataTable from '~/components/ui/data-table/DataTable.vue';

  const router = useRouter();
  const data = ref<Payment[]>([]);
  const isLoading = ref(false);

  const getData = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      data.value = users;
    } catch (error) {
      console.error('Error fetching data:', error);
      data.value = [];
    }
  };

  onMounted(() => {
    const checkStorage = setInterval(() => {
      const currentUsers = localStorage.getItem('users');
      if (currentUsers !== JSON.stringify(data.value)) {
        getData();
      }
    }, 1000);

    onUnmounted(() => {
      clearInterval(checkStorage);
    });
  });

  onMounted(() => {
    getData();
  });
</script>

<template>
  <section class="flex flex-col flex-1">
    <span class="flex items-center justify-between flex-1 p-6">
      <h1 class="text-2xl font-semibold">User</h1>
      <Button
        variant="default"
        @click="() => router.push('/user/create')"
        >Create</Button
      >
    </span>

    <div class="container px-6 pt-5">
      <p v-if="isLoading">Loading...</p>
      <DataTable
        :columns="columns"
        :data="data"
      />
    </div>
  </section>
</template>
