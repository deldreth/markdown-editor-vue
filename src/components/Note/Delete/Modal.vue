<template>
  <FormModal :id="props.id" title="Confirm Delete">
    Delete {{ note.name }}. This action cannot be undone.

    <template #footer>
      <button
        type="button"
        class="btn btn-danger"
        :disabled="fetching"
        @click="onDeleteNote({ input: { id: note.id } })"
      >
        Delete
      </button>
    </template>
  </FormModal>
</template>

<script setup>
import { inject } from 'vue';
import { useMutation } from '@urql/vue';
import { useRouter, useRoute } from 'vue-router';
import Modal from 'bootstrap/js/dist/modal';
import { deleteNote } from '../../../graphql/mutations';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const note = inject('note');
const route = useRoute();
const router = useRouter();

const { fetching, executeMutation: deleteNoteMutation } = useMutation(
  deleteNote
);

async function onDeleteNote({ input }) {
  await deleteNoteMutation({ input });

  Modal.getOrCreateInstance(document.getElementById(props.id)).hide();
  router.replace(`/group/${route.params.groupId}`);
}
</script>
