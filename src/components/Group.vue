<template>
  <div
    id="group"
    class="col-span-2 flex flex-col h-full overflow-hidden bg-gray-900"
  >
    <div class="p-4">
      <NoteSearch @on-search="onSearch" />

      <div class="flex justify-end">
        <NoteAdd
          :group-id="groupId"
          @note-created="listNotes({ requestPolicy: 'network-only' })"
        />
      </div>
    </div>

    <div v-if="fetching">
      <Loader />
    </div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else class="overflow-y-auto flex-1">
      <h1 class="text-2xl p-4 border-b sticky top-0 bg-gray-900 border-pink">
        <FontAwesomeIcon icon="layer-group" />&nbsp;{{ data.getGroup.name }}
      </h1>
      <section
        v-for="note in searchedNotes.length
          ? searchedNotes
          : data?.listNotes.items"
        :key="note.id"
        class="p-4 cursor-pointer hover:bg-indigo-500"
        :class="`${
          $route.params.noteId === note.id && 'bg-gradient-to-l from-indigo-900'
        }`"
        @click="$router.push(`/group/${route.params.groupId}/note/${note.id}`)"
      >
        <h2 class="text-lg truncate" :title="note.name">
          {{ note.name }}
        </h2>

        <p class="truncate text-sm mt-1">
          <span class="font-semibold">{{
            $filters.formatDate(note.updatedAt)
          }}</span>
          <span v-if="note.body"
            >&nbsp;{{
              // eslint-disable-next-line vue/no-parsing-error
              note.body.replace(/<[^>]*>?/gm, '').substring(0, 60)
            }}</span
          >
        </p>

        <p
          v-if="!!(tasks = $filters.countTasks(note.body))"
          class="text-xs mt-1"
        >
          <FontAwesomeIcon icon="tasks" />&nbsp;{{ tasks }}
        </p>
      </section>
    </div>
  </div>

  <router-view :key="$route.params.noteId" />
</template>

<script setup>
import { watch, ref } from 'vue';
import { useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const groupId = ref(route.params.groupId);

const {
  fetching,
  data,
  error,
  executeQuery: listNotes,
} = useQuery({
  query: `
    query ListNotesQuery ($groupId:ID!) {
      getGroup(id: $groupId) {
        name
      }
      listNotes(filter: {groupID: {eq: $groupId}}) {
        items {
          id
          name
          body
          updatedAt
          group {
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

const searchedNotes = ref([]);
const onSearch = (term) => {
  searchedNotes.value = data.value.listNotes.items.filter(({ name }) =>
    name.includes(term)
  );
};
</script>
