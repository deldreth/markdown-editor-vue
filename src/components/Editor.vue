<template>
  <div class="ck-content text-xl roboto-slab">
    <ckeditor v-model="modelContent" :editor="editor" :config="config" />
  </div>

  <div class="fixed bottom-8 right-8">
    <div
      id="editor-save-toast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-body">{{ note.name }} saved.</div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useMutation } from '@urql/vue';
import { Storage } from 'aws-amplify';

import Toast from 'bootstrap/js/dist/toast';

const editor = window.BalloonBlockEditor;

const note = inject('note');

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
      'insertImage',
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

      const toast = Toast.getOrCreateInstance(
        document.getElementById('editor-save-toast')
      );
      if (!toast._element.classList.contains('show')) {
        toast.show();
      }
    },
  },
  AmplifyUpload: {
    storage: Storage,
  },
};
</script>

<style scoped>
.roboto-slab {
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
}
</style>
