<template>
  <FormModal :id="props.id" title="Edit Note">
    <div class="flex flex-col">
      <FormInput
        v-model="unwrappedName"
        label="Title"
        class="flex-1"
        :disabled="updatingNoteName"
      />

      <FormButton
        class="btn-secondary pl-4 pr-4 self-end"
        :disabled="updatingNoteName"
        @click="onUpdateNote"
        >Save</FormButton
      >

      <hr class="mt-8 mb-8 -ml-8 -mr-8 opacity-30" />

      <NoteGroupSelector @update-note-group="dismissModal()" />
    </div>
  </FormModal>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useMutation } from '@urql/vue';
import debounce from 'lodash/debounce';
import Modal from 'bootstrap/js/dist/modal';

import { updateNote as updateNoteMutation } from '../../../graphql/mutations';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const note = inject('note');

const unwrappedName = ref(note.value.name);

const { fetching: updatingNoteName, executeMutation: updateNote } = useMutation(
  updateNoteMutation
);

function onUpdateNote() {
  updateNote({ input: { id: note.value.id, name: unwrappedName.value } });
}

function dismissModal() {
  Modal.getOrCreateInstance(document.getElementById(props.id)).hide();
}
</script>
