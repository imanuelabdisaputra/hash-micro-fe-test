<script setup lang="ts">
  import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenuButton,
  } from '@/components/ui/sidebar';

  const route = useRoute();
  const router = useRouter();

  const menus = [
    {
      title: 'User',
      href: '/user',
    },
  ];
</script>

<template>
  <Sidebar>
    <SidebarHeader class="px-6 py-5 bg-primary">
      <img
        src="../assets//images/logo-hashmicro-white.webp"
        class="object-contain w-40"
        alt="logo"
      />
    </SidebarHeader>
    <SidebarContent>
      <div class="flex-1 py-8 space-y-2">
        <SidebarMenuButton
          v-for="menu in menus"
          :key="menu.title"
          asChild
          class="p-6 rounded-none"
          :class="
            route.path.includes(menu.href)
              ? 'bg-[#3f3f3f] hover:bg-black/80 text-white hover:text-white font-bold'
              : 'text-black'
          "
          @click="router.push(menu.href)"
        >
          <p class="font-semibold">{{ menu.title }}</p>
        </SidebarMenuButton>
      </div>
    </SidebarContent>
  </Sidebar>
</template>
