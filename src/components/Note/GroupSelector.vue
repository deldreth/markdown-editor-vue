<template>
  <div class="dropdown">
    <button
      id="dropdownMenuButton1"
      class="btn btn-primary dropdown-toggle mb-4"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <slot></slot>
    </button>
    <ul
      v-if="data?.listGroups"
      class="dropdown-menu bg-indigo-900 bg-opacity-50"
      aria-labelledby="dropdownMenuButton1"
    >
      <li v-for="group in data?.listGroups.items" :key="group.id">
        <button
          class="dropdown-item text-white"
          @click="
            updateNoteGroup({ id: $route.params.noteId, groupId: group.id })
          "
        >
          {{ group.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useQuery, useMutation } from '@urql/vue';
import { useRouter } from 'vue-router';

import { updateNote as updateNoteMutation } from '../../graphql/mutations';

import { listGroups } from '../../graphql/queries';

const router = useRouter();

const { fetching, data, error } = useQuery({ query: listGroups });
watch(data, (next) => {
  next.listGroups.items.sort((a, b) => a.name.localeCompare(b.name));
});

const { executeMutation: updateNote } = useMutation(updateNoteMutation);

async function updateNoteGroup({ id, groupId }) {
  await updateNote({ input: { id, groupID: groupId } });

  router.replace(`/group/${groupId}/note/${id}`);
}
</script>
