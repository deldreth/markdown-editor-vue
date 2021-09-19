<template>
  <div
    id="group"
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
import { watch, ref, computed } from 'vue';

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

// watch(
//   () => route.params.groupId,
//   nextGroupId => {
//     groupId.value = nextGroupId;
//   }
// );

const searchTerm = ref(false);
// const filteredNotes = computed(() => {
//   const nextNotes = data.value.getTag.notes.items.filter(
//     note =>
//       route.params.groupId === ALL_NOTES ||
//       route.params.groupId === note.group?.id
//   );

//   if (searchTerm.value) {
//     return nextNotes.filter(({ name }) => name.includes(searchTerm.value));
//   }

//   return nextNotes;
// });

// const onSearch = term => {
//   if (term) {
//     searchTerm.value = term;
//   } else {
//     searchTerm.value = false;
//   }
// };
</script>
