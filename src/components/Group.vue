<template>
  <div
    id="group"
    class="
      col-span-4
      md:col-span-2
      xl:col-span-2
      flex flex-col
      h-full
      overflow-hidden
      md:border-l-2
      border-indigo-400
      bg-gray-800
      bg-opacity-75
      shadow-sm
    "
    :class="$route.params.noteId && 'hidden md:flex'"
  >
    <div class="shadow">
      <NoteSearch class="p-4 pl-8 pr-8" @on-search="onSearch" />

      <div
        class="flex justify-between p-4 pl-8 pr-8 sticky top-0 border-b-2 border-indigo-400"
      >
        <GroupName v-if="data?.getGroup" class="flex-1 mr-8">{{
          data.getGroup.name
        }}</GroupName>

        <NoteAdd
          :group-id="groupId"
          @note-created="listNotes({ requestPolicy: 'network-only' })"
        />
      </div>
    </div>

    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else class="overflow-y-auto flex-1">
      <GroupNotes :notes="filteredNotes" />

      <GroupEditModal
        v-if="data.getGroup"
        id="group-edit-modal"
        :group="data.getGroup"
      />
    </div>
  </div>

  <router-view :key="`${$route.params.noteId}${$route.params.noteId}`" />
</template>

<script setup>
import { useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';
import { watch, ref, computed } from 'vue';

const ALL_NOTES = 'all';

const route = useRoute();
const groupId = ref(route.params.groupId);

const { fetching, data, error, executeQuery: listNotes } = useQuery({
  query: /* GraphQL */ `
    query ListNotesQuery($groupId: ID!) {
      getGroup(id: $groupId) {
        id
        name
      }
      listNotes {
        items {
          id
          name
          body
          updatedAt
          group {
            id
            name
          }
        }
      }
    }
  `,
  variables: { groupId },
});

watch(
  () => route.params.groupId,
  nextGroupId => {
    groupId.value = nextGroupId;
  }
);

const searchTerm = ref(false);
const filteredNotes = computed(() => {
  const nextNotes = data.value.listNotes.items.filter(
    note =>
      route.params.groupId === ALL_NOTES ||
      route.params.groupId === note.group?.id
  );

  if (searchTerm.value) {
    return nextNotes.filter(({ name }) => name.includes(searchTerm.value));
  }

  return nextNotes;
});

const onSearch = term => {
  if (term) {
    searchTerm.value = term;
  } else {
    searchTerm.value = false;
  }
};
</script>
