<template>
  <div class="col-span-3 p-4">
    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="h-full">
      <el-input
        v-model="nameInput"
        placeholder="Note title"
        aria-label="Note Title"
        class="mb-4"
      />

      <Editor :note-id="$route.params.noteId" :content="data.body" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';
import { ElInput, ElFormItem } from 'element-plus';

const nameInput = ref('');

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
</script>
