<template>
  <div class="col-span-3 bg-gray-200">
    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="data" class="h-full">
      <div class="p-4">
        <el-input
          v-model="data.getNote.name"
          placeholder="Note title"
          aria-label="Note Title"
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
import { ElInput, ElFormItem } from 'element-plus';
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

const debounceUpdateNoteName = debounce((name) => {
  console.log(noteId.value, name);
  updateNoteName({ id: noteId.value, name });
}, 1000);
</script>
