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
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';

import Groups from '../components/Groups.vue';

import { getAuth, addAuthToOperation } from '../urql/authExchange';

const client = createClient({
  url: 'https://qfzdtvzgdje3tbvnk63mwi5dta.appsync-api.us-east-1.amazonaws.com/graphql',
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
