<template>
  <div
    id="group"
    class="flex flex-col h-full overflow-hidden bg-black bg-opacity-60"
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

        <NoteAdd :group-id="$route.params.groupId" />
      </div>

      <div class="flex items-center">
        Sort By
        <button
          type="button"
          class="btn btn-link ml-2 px-2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ mapSortToString() }}
        </button>
        <ul class="dropdown-menu">
          <li
            class="dropdown-item text-white"
            @click="onSortTypeChange('updatedAt')"
          >
            Date Modified
          </li>
          <li
            class="dropdown-item text-white"
            @click="onSortTypeChange('createdAt')"
          >
            Date Created
          </li>
          <li
            class="dropdown-item text-white"
            @click="onSortTypeChange('name')"
          >
            Name
          </li>
        </ul>

        <button
          class="px-2"
          :class="{ 'text-pink-500': sortDirection === 'asc' }"
          @click="onSortChange"
        >
          <FontAwesomeIcon icon="arrow-up" />
        </button>

        <button
          class="px-2"
          :class="{ 'text-pink-500': sortDirection === 'desc' }"
          @click="onSortChange"
        >
          <FontAwesomeIcon icon="arrow-down" />
        </button>
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
import { ref, computed } from 'vue';
import Fuse from 'fuse.js';

const ALL_NOTES = 'all';

const route = useRoute();

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
  variables: { groupId: route.params.groupId },
});

const searchTerm = ref(false);
const sortDirection = ref('desc');
const sortBy = ref('updatedAt');
const filteredNotes = computed(() => {
  const nextNotes = data.value.listNotes.items
    .filter(
      note =>
        route.params.groupId === ALL_NOTES ||
        route.params.groupId === note.group?.id
    )
    .sort((a, b) => {
      if (sortBy.value === 'updatedAt' || sortBy.value === 'createdAt') {
        return new Date(a[sortBy.value]) - new Date(b[sortBy.value]);
      }

      return a[sortBy.value].localeCompare(b[sortBy.value]);
    });

  if (sortDirection.value === 'desc') {
    nextNotes.reverse();
  }

  const fuse = new Fuse(nextNotes, {
    keys: ['name', 'body'],
  });

  if (searchTerm.value) {
    return fuse.search(searchTerm.value).map(({ item }) => item);
  }

  return nextNotes;
});

const mapSortToString = () => {
  switch (sortBy.value) {
    case 'createdAt':
      return 'Date Created';
    case 'name':
      return 'Name';
    case 'updatedAt':
    default:
      return 'Date Modified';
  }
};

const onSortTypeChange = type => {
  sortBy.value = type;
};

const onSortChange = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
};

const onSearch = term => {
  if (term) {
    searchTerm.value = term;
  } else {
    searchTerm.value = false;
  }
};
</script>
