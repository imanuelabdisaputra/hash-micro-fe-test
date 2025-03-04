<script lang="ts" setup>
  import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
  } from '@/components/ui/alert-dialog';
  import { Button } from '@/components/ui/button';
  import { useToast } from '@/components/ui/toast/use-toast';
  import type { Payment } from './columns';

  defineProps<{
    id: string;
  }>();

  const router = useRouter();
  const { toast } = useToast();

  const onDelete = async (id: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter((user: Payment) => user.id !== id);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    toast({
      title: 'User deleted',
      description: 'User has been deleted successfully',
      variant: 'destructive',
    });
  };
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="destructive"> Delete </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> You want to delete this account? </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this
          account.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>No</AlertDialogCancel>
        <AlertDialogAction
          as="button"
          @click="onDelete(id)"
          >Yes</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
