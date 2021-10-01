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

    <div v-else class="text-sm">
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
        :class="`${$route.params.tagId === tag.id && 'bg-pink-900'}`"
        @click="$router.push(`/tag/${tag.id}`)"
      >
        <span>{{ tag.tag }}</span>
        <button
          class="hover:bg-pink-600 py-0 px-1.5 rounded-full"
          @click="onDeleteTag($event, tag.id)"
        >
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery, useMutation, useClientHandle } from '@urql/vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const clientHandle = useClientHandle();

import {
  listTags as listTagsQuery,
  getTag as getTagQuery,
} from '../graphql/queries';

import {
  deleteTagNote as deleteTagNoteMutation,
  deleteTag as deleteTagMutation,
} from '../graphql/mutations';

const { fetching, data: tags, error } = useQuery({ query: listTagsQuery });
const { executeMutation: deleteTagNote } = useMutation(deleteTagNoteMutation);
const { executeMutation: deleteTag } = useMutation(deleteTagMutation);

async function onDeleteTag(event, tagId) {
  event.stopPropagation();

  const {
    data: { getTag },
  } = await clientHandle.client
    .query(getTagQuery, {
      id: tagId,
    })
    .toPromise();

  if (route.params.tagId === tagId) {
    await router.replace({ name: 'groups' });
  }

  for (const tagNote of getTag.notes.items) {
    deleteTagNote({ input: { id: tagNote.id } });
  }

  deleteTag({ input: { id: tagId } });
}
</script>
