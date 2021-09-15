<template>
  <div class="form-floating">
    <select
      id="groupSelect"
      class="form-select"
      aria-label="Floating label select example"
      aria-placeholder="Select a group"
      placeholder="Select a group"
      :disabled="updatingNote"
      @change="updateNoteGroup"
    >
      <option value="">Select a group</option>
      <option
        v-for="group in data?.listGroups.items"
        :key="group.id"
        :value="group.id"
        :selected="group.id === note.group?.id"
        >{{ group.name }}</option
      >
    </select>
    <label for="groupSelect">Group</label>
    <div class="form-text">Move this note to a different group.</div>
  </div>
</template>

<script setup>
import { watch, inject } from 'vue';
import { useQuery, useMutation } from '@urql/vue';
import { useRouter } from 'vue-router';

import { updateNote as updateNoteMutation } from '../../graphql/mutations';

import { listGroups } from '../../graphql/queries';

const note = inject('note');
const router = useRouter();

const emit = defineEmits(['updateNoteGroup']);

const { fetching, data, error } = useQuery({ query: listGroups });
watch(data, next => {
  next.listGroups.items.sort((a, b) => a.name.localeCompare(b.name));
});

const { fetching: updatingNote, executeMutation: updateNote } = useMutation(
  updateNoteMutation
);

async function updateNoteGroup(event) {
  await updateNote({
    input: { id: note.value.id, groupID: event.target.value },
  });

  router.push(`/group/${event.target.value}/note/${note.value.id}`);

  emit('updateNoteGroup');
}
</script>
