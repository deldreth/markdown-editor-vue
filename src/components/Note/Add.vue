<template>
  <button
    aria-label="Add New Note"
    class="btn btn-success btn-sm rounded-full"
    type="button"
    @click="createNoteAndEmit({ groupId: props.groupId })"
  >
    Add Note&nbsp;<FontAwesomeIcon icon="plus" />
  </button>
</template>

<script setup>
import { useMutation } from '@urql/vue';

const emit = defineEmits(['noteCreated']);

const props = defineProps({
  groupId: {
    type: String,
    required: true,
  },
});

const { executeMutation: createNote } = useMutation(
  `
  mutation CreateNewNote ($groupId: ID!) {
    createNote(
      input: {name: "New Note", groupID: $groupId, body: ""}
    ) {
      id
      name
    }
  }
`
);

async function createNoteAndEmit(opts) {
  await createNote(opts);
  emit('noteCreated');
}
</script>
