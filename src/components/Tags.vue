<template>
  <Loader v-if="fetching" />

  <div v-else-if="error">{{ error }}</div>

  <div v-else class="px-8">
    <div
      v-for="tag in tags?.listTags.items"
      :key="tag.id"
      class="rounded-full bg-indigo-900 leading-none p-1.5 px-3.5 text-sm inline-block mr-2"
    >
      {{ tag.tag }}
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@urql/vue';

import { listTags as listTagsQuery } from '../graphql/queries';

const { fetching, data: tags, error } = useQuery({ query: listTagsQuery });
</script>
