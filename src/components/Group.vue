<template>
  <div
    id="group"
    class="
      flex flex-col
      h-full
      overflow-hidden
      bg-black bg-opacity-60
    "
    :class="{
      hidden: $route.params.noteId,
      'lg:flex': $route.params.noteId,
    }"
  >
    <div class="pt-4 pl-8 pr-8">
      <div v-if="$isElectron" class="flex justify-between items-center mb-4">
        <FormButton
          class="btn-link"
          @click="$router.replace({ name: 'groups' })"
        >
          <FontAwesomeIcon icon="chevron-left" class="mr-3" />Groups
        </FormButton>
      </div>

      <NoteSearch @on-search="onSearch" />

      <div class="flex justify-between items-center">
        <div v-if="$route.params.groupId === 'all'" class="flex-1 mr-8">
          <FontAwesomeIcon icon="layer-group" class="mr-4" />All Notes
        </div>

        <GroupName v-else-if="data?.getGroup" class="flex-1 mr-8">{{
          data.getGroup.name
        }}</GroupName>

        <NoteAdd :group-id="groupId" />
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

const { fetching, data, error } = useQuery({
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
