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
      bg-gray-900
    "
    :class="$route.params.noteId && 'hidden md:flex'"
  >
    <div class="p-4">
      <NoteSearch @on-search="onSearch" />

      <NoteAdd
        :group-id="groupId"
        @note-created="listNotes({ requestPolicy: 'network-only' })"
      />
    </div>

    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else class="overflow-y-auto flex-1">
      <GroupName v-if="data.getGroup">{{ data.getGroup.name }}</GroupName>

      <GroupNotes
        :notes="
          searchedNotes
            ? searchedNotes.filter(
                (note) =>
                  $route.params.groupId === ALL_NOTES ||
                  note.group?.id === $route.params.groupId
              )
            : data?.listNotes.items.filter(
                (note) =>
                  $route.params.groupId === ALL_NOTES ||
                  note.group?.id === $route.params.groupId
              )
        "
      />

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
import { watch, ref } from 'vue';

import GroupEditModal from './Group/Edit/Modal.vue';
import GroupName from './Group/Name.vue';
import GroupNotes from './Group/Notes.vue';
import Loader from './Loader.vue';
import NoteAdd from './Note/Add.vue';
import NoteSearch from './Note/Search.vue';

const ALL_NOTES = 'all';

const route = useRoute();
const groupId = ref(route.params.groupId);

const {
  fetching,
  data,
  error,
  executeQuery: listNotes,
} = useQuery({
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
  (nextGroupId) => {
    groupId.value = nextGroupId;
  }
);

const searchedNotes = ref(false);
const onSearch = (term) => {
  if (term) {
    searchedNotes.value = data.value.listNotes.items.filter(({ name }) =>
      name.includes(term)
    );
  } else {
    searchedNotes.value = false;
  }
};
</script>
