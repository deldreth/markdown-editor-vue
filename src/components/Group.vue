<template>
  <div class="group border-r">
    <div class="flex p-4">
      <div class="flex-1">Search</div>
      <NoteAdd :group-id="groupId" />
    </div>

    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <section
        v-for="note in data?.listNotes.items"
        :key="note.id"
        class="border-b p-4 cursor-pointer hover:bg-gray-100"
        @click="$router.push(`/group/${route.params.groupId}/note/${note.id}`)"
      >
        <h2 class="text-xl">{{ note.name }}</h2>
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

const { fetching, data, error } = useQuery({
  query: `
    query ListNotesQuery ($groupId:ID!) {
      listNotes(filter: {groupID: {eq: $groupId}}) {
        items {
          id
          name
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
