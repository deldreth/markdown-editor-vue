<template>
  <FormModal :id="props.id" :title="props.title">
    <FormInput
      v-model="unwrappedName"
      label="Title"
      class="flex-1"
      :disabled="updatingNoteName"
      @input="debounceUpdateNoteName"
    />

    <hr class="mt-8 mb-8" />

    <NoteGroupSelector @update-note-group="dismissModal()" />
  </FormModal>
</template>

<script setup>
import { inject } from 'vue';
import { useMutation } from '@urql/vue';
import debounce from 'lodash/debounce';
import Modal from 'bootstrap/js/dist/modal';

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

const unwrappedName = note.value.name;

const {
  fetching: updatingNoteName,
  executeMutation: updateNoteName,
} = useMutation(`
  mutation UpdateNote($id: ID!, $name: String!) {
    updateNote(input: {id: $id, name: $name}) {
      id
      name
    }
  }
`);

const debounceUpdateNoteName = debounce(event => {
  updateNoteName({ id: note.value.id, name: event.target.value });
}, 1000);

function dismissModal() {
  Modal.getOrCreateInstance(document.getElementById(props.id)).hide();
}
</script>
