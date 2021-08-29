<template>
  <router-view />
</template>

<script setup>
import { createClient, provideClient } from '@urql/vue';

const client = createClient({
  url: 'http://192.168.1.185:20002/graphql',
  fetchOptions: {
    headers: {
      'x-api-key': 'da2-fakeApiId123456',
    },
  },
});

provideClient(client);
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}

html {
  height: 100%;
}

html,
body {
  min-height: 100%;
}
</style>
