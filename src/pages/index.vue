<template>
  <div
    class="
      grid grid-cols-4
      xl:grid-cols-6
      2xl:grid-cols-8
      bg-gradient-to-b
      from-indigo-800
      h-full
      text-white
    "
  >
    <Groups />
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

import { getAuth, addAuthToOperation } from '../authExchange';

const client = createClient({
  url: 'http://192.168.1.185:20002/graphql',
  exchanges: [
    authExchange({
      getAuth,
      addAuthToOperation,
    }),
    dedupExchange,
    cacheExchange,
    fetchExchange,
  ],
});

provideClient(client);
</script>
