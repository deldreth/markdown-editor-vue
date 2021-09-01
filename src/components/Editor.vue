<template>
  <textarea id="editor" />
</template>

<script setup>
import { onMounted } from 'vue';
import { useMutation } from '@urql/vue';

const props = defineProps({
  noteId: {
    type: String,
    required: true,
  },
});

const { executeMutation: updateNote } = useMutation(
  `
  mutation UpdateNote($id: ID!, $content: String!) {
    updateNote(input: {id: $id, body: $content}) {
      id
    }
  }
  `
);

onMounted(() => {
  new EasyMDE({
    element: document.getElementById('editor'),
    autosave: {
      callback: (value) => {
        updateNote({ id: props.noteId, content: value });
      },
      enabled: true,
      uniqueId: props.noteId,
      delay: 500,
      submit_delay: 1000,
      timeFormat: {
        locale: 'en-US',
        format: {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        },
      },
      text: 'Autosaved: ',
    },
  });
});
</script>

<style>
.EasyMDEContainer {
  max-height: 92%;
  height: 100%;
}
.EasyMDEContainer .CodeMirror {
  height: 100%;
}
</style>
