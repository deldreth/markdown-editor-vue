<template>
  <div
    class="
      h-full
      text-zinc-900 dark:text-white
      bg-gradient-to-t from-pink-700 via-purple-700 to-indigo-700
    "
  >
    <div class="flex h-full">
      <Groups />

      <Group v-if="$route.params.groupId" :key="$route.params.groupId" />

      <Note
        v-if="$route.params.noteId"
        :key="`${$route.params.groupId}-${$route.params.noteId}`"
      />

      <div
        v-else
        class="
          hidden md:flex flex-1 justify-center items-center
          m-4
          border-2 border-dashed border-white-400 
          rounded-lg 
          bg-zinc-900 bg-opacity-10 
          text-4xl
        "
      ></div>
    </div>
  </div>
</template>

<script setup>
import {
  createClient,
  provideClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from '@urql/vue';
import { authExchange } from '@urql/exchange-auth';
import 'bootstrap/js/dist/dropdown';

import {
  getAuth,
  addAuthToOperation,
  didAuthError,
} from '../urql/authExchange';

const client = createClient({
  url:
    process.env.NODE_ENV !== 'production'
      ? process.env.VUE_APP_AMPLIFY_MOCK_ENDPOINT
      : 'https://qfzdtvzgdje3tbvnk63mwi5dta.appsync-api.us-east-1.amazonaws.com/graphql',
  exchanges: [
    authExchange({
      getAuth,
      addAuthToOperation,
      didAuthError,
    }),
    dedupExchange,
    cacheExchange,
    fetchExchange,
  ],
});

provideClient(client);
</script>
