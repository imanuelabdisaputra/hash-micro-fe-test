<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/lib/utils';
  import { useVModel } from '@vueuse/core';

  const props = defineProps<{
    label?: string;
    errorMessage?: string;
    defaultValue?: string | number;
    modelValue?: string | number;
    disabled?: boolean;
    class?: HTMLAttributes['class'];
  }>();

  const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <div :class="props.class">
    <Label
      v-if="props.label"
      class="mb-2"
      >{{ props.label }}</Label
    >
    <input
      v-model="modelValue"
      :disabled="props.disabled"
      :class="
        cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          props.errorMessage && 'border-red-700 bg-red-700/10'
        )
      "
    />
    <p
      v-if="props.errorMessage"
      class="text-xs text-red-700"
    >
      {{ props.errorMessage }}
    </p>
  </div>
</template>
