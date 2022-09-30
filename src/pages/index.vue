<template>
  <div
    class="
      h-full
      text-zinc-900 dark:text-white
      bg-gradient-to-t from-pink-300 via-purple-400 to-indigo-700
    "
  >
    <div class="flex h-full">
      <Groups />

      <Group :key="$route.params.groupId" v-if="$route.params.groupId" />

      <Note
        v-if="$route.params.noteId"
        :key="`${$route.params.groupId}-${$route.params.noteId}`"
      />
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
