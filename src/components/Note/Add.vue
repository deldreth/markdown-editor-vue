<template>
  <button
    aria-label="Add New Note"
    class="btn btn-link p-0"
    type="button"
    @click="createNoteAndEmit({ groupId: props.groupId })"
  >
    Add Note <FontAwesomeIcon icon="plus" class="ml-2" />
  </button>
</template>

<script setup>
import { useMutation } from '@urql/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
  const { data } = await createNote(opts);

  emit('noteCreated');

  router.push({ name: 'note', params: { noteId: data.createNote.id } });
}
</script>
