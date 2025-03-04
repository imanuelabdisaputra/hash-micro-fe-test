<script setup lang="ts">
  import { SidebarProvider } from '@/components/ui/sidebar';
  import AppSidebar from '~/components/AppSidebar.vue';
  import Toaster from '~/components/ui/toast/Toaster.vue';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="relative flex-1">
      <slot />
    </main>
  </SidebarProvider>

  <Toaster />
</template>
