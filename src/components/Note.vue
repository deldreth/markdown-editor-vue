<template>
  <!-- <div class="col-span-3 bg-gray-800"> -->
  <div
    class="
      md:col-span-2
      2xl:col-span-4
      xl:border-l-2
      border-indigo-400
      overflow-hidden overflow-y-auto
      h-screen
      p-4 pl-8 pr-8
    "
    :class="fullscreen && 'xl:col-span-full 2xl:col-span-full'"
  >
    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="data" class="h-full">
      <div class="">
        <div class="flex justify-between items-center">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#note-edit-modal"
            class="btn btn-link -ml-4 pl-4 truncate w-full text-left"
          >
            <FontAwesomeIcon icon="file-alt" class="mr-4" />{{
              data.getNote.name
            }}
          </button>

          <button
            type="button"
            class="btn btn-link pr-4 pl-4 text-right"
            :class="fullscreen && 'text-blue-400'"
            @click="toggleFullscreen"
          >
            <FontAwesomeIcon :icon="fullscreen ? 'compress' : 'expand'" />
          </button>

          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#note-delete-modal"
            class="btn btn-link -mr-4 pr-4 pl-4 text-right"
          >
            <FontAwesomeIcon icon="trash" />
          </button>

          <NoteEditModal
            id="note-edit-modal"
            :title="`Edit ${data.getNote.name}`"
          />

          <NoteDeleteModal id="note-delete-modal" />
        </div>
      </div>

      <Editor :note-id="$route.params.noteId" :content="data.getNote.body" />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue';
import { useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const noteId = ref(route.params.noteId);
const fullscreen = ref(false);

const { fetching, data, error } = useQuery({
  query: `
    query GetNote($noteId: ID!) {
      getNote(id: $noteId) {
        id
        body
        createdAt
        groupID
        name
        updatedAt
        group {
          id
          name
        }
      }
    }
  `,
  variables: { noteId },
});

provide(
  'note',
  computed(() => data?.value.getNote)
);

function toggleFullscreen() {
  fullscreen.value = !fullscreen.value;
}
</script>
