<template>
  <div id="group" class="flex flex-col h-full overflow-hidden bg-gray-900">
    <div class="relative flex p-4">
      <el-input
        aria-label="Search Notes"
        class="flex-1 mr-4"
        aria-placeholder="Search Notes"
        placeholder="Search"
      />
      <NoteAdd
        :group-id="groupId"
        @note-created="listNotes({ requestPolicy: 'network-only' })"
      />
    </div>

    <div v-if="fetching">Loading...</div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else class="overflow-y-auto flex-1">
      <section
        v-for="note in data?.listNotes.items"
        :key="note.id"
        class="p-4 cursor-pointer hover:bg-purple-300"
        :class="`${$route.params.noteId === note.id && 'bg-indigo-800'}`"
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
import { ElInput } from 'element-plus';
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
      listNotes(filter: {groupID: {eq: $groupId}}) {
        items {
          id
          name
          body
          updatedAt
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
</script>
