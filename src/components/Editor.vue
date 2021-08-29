<template>
  <textarea id="editor" />
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  new EasyMDE({
    element: document.getElementById('editor'),
    autosave: {
      callback: (value) => console.log(value),
      enabled: true,
      uniqueId: 'MyUniqueID',
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
