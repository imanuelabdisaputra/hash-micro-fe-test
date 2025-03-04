<script setup lang="ts">
  import { useToast } from '~/components/ui/toast';
  import Form from '../_form.vue';
  import Toaster from '~/components/ui/toast/Toaster.vue';

  interface FormValues {
    id: string;
    name: string;
    email: string;
  }

  const route = useRoute();
  const id = route.params.id;
  const { toast } = useToast();

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

  const onSubmit = (values: FormValues) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((user: FormValues) =>
        user.id === id ? { ...values, id } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      toast({
        title: 'User updated',
        description: 'User has been updated successfully',
      });
      navigateTo('/user');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  onMounted(() => {
    getData();
  });
</script>

<template>
  <section class="flex flex-col flex-1">
    <span class="flex items-center justify-between flex-1 p-6">
      <h1 class="text-2xl font-semibold">Edit User</h1>
    </span>
    <Form
      v-if="userData"
      :initial-values="{
        name: userData.name,
        email: userData.email,
      }"
      @submit="onSubmit"
    />
  </section>
</template>
