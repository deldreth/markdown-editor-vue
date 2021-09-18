<template>
  <div
    class="
      flex justify-between items-center
      border-t-2 border-indigo-500
    "
  >
    <h1 class="text-lg py-4 px-8">
      <FontAwesomeIcon icon="tags" class="mr-4" />Tags
    </h1>
  </div>

  <div class="overflow-y-auto flex-1">
    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else>
      <div
        v-for="tag in tags?.listTags.items"
        :key="tag.id"
        class="
        py-3
        px-6
        mx-2
        cursor-pointer
        hover:bg-pink-800
        flex
        justify-between
        items-center
        rounded-sm
      "
        :class="`${$route.params.groupId === tag.id && 'bg-indigo-900'}`"
      >
        {{ tag.tag }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@urql/vue';

import { listTags as listTagsQuery } from '../graphql/queries';

const { fetching, data: tags, error } = useQuery({ query: listTagsQuery });
</script>
