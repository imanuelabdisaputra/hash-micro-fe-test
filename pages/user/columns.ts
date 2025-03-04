import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

import { Button } from '~/components/ui/button';
import Delete from './_delete.vue';

export interface Payment {
  id: string;
  name: string;
  email: string;
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      return id;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return h('div', { class: '' }, name);
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const email = row.getValue('email') as string;
      return h('div', { class: '' }, email);
    },
  },
  {
    accessorKey: 'action',
    header: () => h('div', { class: 'text-center' }, 'Action'),
    cell: ({ row }) => {
      return h('div', { class: 'flex gap-2 justify-center' }, [
        h(
          Button,
          {
            variant: 'blue',
            onClick: () => {
              navigateTo(`/user/${row.original.id}`);
            },
          },
          () => 'View'
        ),
        h(
          Button,
          {
            variant: 'secondary',
            onClick: () => navigateTo(`/user/${row.original.id}/edit`),
          },
          () => 'Edit'
        ),
        h(Delete, {
          id: row.original.id,
        }),
      ]);
    },
  },
];
