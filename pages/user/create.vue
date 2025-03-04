<script setup lang="ts">
  import Form from './_form.vue';
  import { useToast } from '~/components/ui/toast/use-toast';

  interface FormValues {
    name: string;
    email: string;
  }

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (values: FormValues) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ ...values, id: crypto.randomUUID() });
    localStorage.setItem('users', JSON.stringify(users));
    toast({
      title: 'User created',
      description: 'User has been created successfully',
    });
    router.replace('/user');
  };
</script>

<template>
  <section class="flex flex-col flex-1">
    <span class="flex items-center justify-between flex-1 p-6">
      <h1 class="text-2xl font-semibold">Create User</h1>
    </span>
    <Form @submit="onSubmit" />
  </section>
</template>
