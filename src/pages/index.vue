<template>
  <div
    class="
      h-full
      text-white
      bg-gradient-to-r
      from-pink-600
      via-blue-900
      to-purple-700
    "
  >
    <div
      class="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        2xl:grid-cols-8
        h-full
        bg-gradient-to-b from-gray-900 via-purple-900 to-transparent
      "
    >
      <Groups />
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
      ? 'http://192.168.1.185:20002/graphql'
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
