<template>
  <LayoutAuth>
    <p class="mb-4">
      This is a small note taking project from
      <a href="http://deldreth.me" target="_blank" class="underline"
        >Devin Eldreth</a
      >.
    </p>

    <p class="mb-4">
      It was created, largely, to satisfy some curiousity in understanding Vue 3
      and its reactivity model. As well as provide a few features that I felt
      some of the more popular note taking applications were missing. This is
      the first larger project I've written in Vue. The backend is provided by
      AWS Amplify.
    </p>

    <p class="mb-4">
      The
      <a
        href="https://github.com/deldreth/wondernotes.app"
        target="_blank"
        class="underline"
        >source code</a
      >
      is freely available.
    </p>
  </LayoutAuth>
</template>

<script setup>
import LayoutAuth from '../layouts/LayoutAuth.vue';
</script>
