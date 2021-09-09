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
        grid grid-cols-4
        xl:grid-cols-6
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
import Modal from 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';

window.bsmodal = Modal;

import { getAuth, addAuthToOperation } from '../urql/authExchange';

const client = createClient({
  url:
    process.env.NODE_ENV !== 'production'
      ? 'http://192.168.1.185:20002/graphql'
      : 'https://qfzdtvzgdje3tbvnk63mwi5dta.appsync-api.us-east-1.amazonaws.com/graphql',
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
