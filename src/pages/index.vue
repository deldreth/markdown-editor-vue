<template>
  <div
    class="
      h-full
      text-white
      bg-gradient-to-t
      from-pink-600
      via-purple-700
      to-indigo-700
    "
  >
    <div
      class="
        grid grid-cols-1
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        h-full
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

console.log(process.env);

const client = createClient({
  url:
    process.env.NODE_ENV !== 'production'
      ? 'http://10.95.199.85:20002/graphql'
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
