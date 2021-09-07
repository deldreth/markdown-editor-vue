<template>
  <!-- <div class="col-span-3 bg-gray-800"> -->
  <div
    class="
      col-span-full
      xl:col-span-3
      2xl:col-span-5
      md:border-l-2
      border-indigo-400
      overflow-hidden overflow-y-auto
      h-screen
    "
  >
    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="data" class="h-full">
      <div class="p-4 bg-gradient-to-b from-gray-900">
        <div v-if="data.getNote.group" class="flex -mb-6">
          <NoteGroupSelector class="mr-4">{{
            data.getNote.group.name
          }}</NoteGroupSelector>
          <FormInput
            v-model="data.getNote.name"
            label="Title"
            class="flex-1"
            @input="debounceUpdateNoteName"
          />
        </div>
      </div>

      <div class="pr-4 pl-4 pb-4">
        <Editor :note-id="$route.params.noteId" :content="data.getNote.body" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation, useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';
import debounce from 'lodash/debounce';

import Loader from './Loader.vue';
import Editor from './Editor.vue';
import FormInput from './Form/Input.vue';
import NoteGroupSelector from './Note/GroupSelector.vue';

const route = useRoute();
const noteId = ref(route.params.noteId);

const { fetching, data, error } = useQuery({
  query: `
    query GetNote($noteId: ID!) {
      getNote(id: $noteId) {
        body
        createdAt
        groupID
        name
        updatedAt
        group {
          name
        }
      }
    }
  `,
  variables: { noteId },
});

const { executeMutation: updateNoteName } = useMutation(`
  mutation UpdateNote($id: ID!, $name: String!) {
    updateNote(input: {id: $id, name: $name}) {
      id
      name
    }
  }
`);

const debounceUpdateNoteName = debounce((event) => {
  updateNoteName({ id: noteId.value, name: event.target.value });
}, 1000);
</script>
