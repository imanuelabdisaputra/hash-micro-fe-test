<script setup lang="ts">
  import { FormControl, FormField, FormItem } from '@/components/ui/form';
  import { toTypedSchema } from '@vee-validate/zod';
  import { useForm } from 'vee-validate';
  import { string, z } from 'zod';

  interface FormValues {
    name?: string;
    email?: string;
  }

  const props = defineProps<{
    initialValues?: Partial<FormValues>;
    viewMode?: boolean;
  }>();

  const emit = defineEmits(['submit']);
  const router = useRouter();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(1).optional(),
      email: z.string().min(1).email().optional(),
    })
  );

  const form = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: props.initialValues?.name || '',
      email: props.initialValues?.email || '',
    },
  });

  const onSubmit = form.handleSubmit((values: FormValues) => {
    emit('submit', values);
  });
</script>

<template>
  <div class="container px-6 pt-5">
    <form
      @submit.prevent="onSubmit"
      class="space-y-4"
    >
      <FormField
        v-slot="{ componentField, errorMessage }"
        name="name"
      >
        <FormItem>
          <FormControl>
            <Input
              label="Name"
              type="text"
              placeholder="Enter name"
              :errorMessage="errorMessage"
              v-bind="componentField"
              :disabled="props.viewMode"
            />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField, errorMessage }"
        name="email"
      >
        <FormItem>
          <FormControl>
            <Input
              label="Email"
              type="text"
              placeholder="Enter email"
              :errorMessage="errorMessage"
              v-bind="componentField"
              :disabled="props.viewMode"
            />
          </FormControl>
        </FormItem>
      </FormField>
    </form>
    <span class="flex gap-4">
      <Button
        variant="outline"
        class="mt-8"
        @click="router.back()"
        >Back</Button
      >
      <Button
        v-if="!props.viewMode"
        type="submit"
        class="mt-8"
        @click="onSubmit"
      >
        Submit
      </Button>
    </span>
  </div>
</template>
