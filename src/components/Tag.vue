<template>
  <div
    id="tag"
    class="flex flex-col h-full overflow-hidden bg-black bg-opacity-60"
    :class="{
      hidden: $route.params.noteId,
      'lg:flex': $route.params.noteId,
    }"
  >
    <div class="py-6 px-8">
      <FontAwesomeIcon icon="tag" class="mr-4" />{{ data?.getTag.tag }}
    </div>

    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="data" class="overflow-y-auto flex-1">
      <GroupNotes
        :notes="data.getTag.notes.items.map(({ note }) => ({ ...note }))"
      />
    </div>
  </div>

  <router-view :key="`${$route.params.tagId}${$route.params.noteId}`" />
</template>

<script setup>
import { useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const ALL_NOTES = 'all';

const route = useRoute();
const tagId = ref(route.params.tagId);

const { fetching, data, error } = useQuery({
  query: /* GraphQL */ `
    query ListTagNoteQuery($tagId: ID!) {
      getTag(id: $tagId) {
        id
        tag
        notes {
          items {
            note {
              id
              name
              body
              updatedAt
            }
          }
        }
      }
    }
  `,
  variables: { tagId },
});
</script>
