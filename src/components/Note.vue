<template>
  <!-- <div class="col-span-3 bg-gray-800"> -->
  <div
    class="
      col-span-5
      border-l-2 border-indigo-400
      overflow-hidden overflow-y-auto
      h-screen
    "
  >
    <div v-if="fetching" class="h-screen flex">
      <Loader />
    </div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="data" class="h-full">
      <div class="p-4 bg-gradient-to-b from-indigo-900">
        <div class="flex">
          <h1 class="text-xl mb-2 flex-1">{{ data.getNote.group.name }}</h1>
          <div>
            <!-- <button type="button" class="btn btn-sm btn-danger">Delete</button> -->
          </div>
        </div>
        <input
          v-model="data.getNote.name"
          aria-label="Note Title"
          class="form-control"
          placeholder="Note title"
          type="text"
          @input="debounceUpdateNoteName"
        />
      </div>

      <div class="p-4">
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
