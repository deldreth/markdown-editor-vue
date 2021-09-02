<template>
  <div class="ck-content">
    <ckeditor v-model="modelContent" :editor="editor" :config="config" />
  </div>
</template>

<script setup>
import { useMutation } from '@urql/vue';

const editor = window.BalloonBlockEditor;

const props = defineProps({
  noteId: {
    type: String,
    required: true,
  },
  content: {
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

// eslint-disable-next-line vue/no-setup-props-destructure
const modelContent = props.content;
const config = {
  language: 'en',
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      'blockQuote',
      'fontColor',
      'fontSize',
      '|',
      'indent',
      'outdent',
      'alignment',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'insertTable',
      'codeBlock',
      'horizontalLine',
      'undo',
      'redo',
    ],
  },
  language: 'en',
  autosave: {
    save(editorInstance) {
      updateNote({ id: props.noteId, content: editorInstance.getData() });
    },
  },
};
</script>
