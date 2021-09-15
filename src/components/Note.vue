<template>
  <div
    class="
      col-auto xl:col-span-2 2xl:col-span-3
      overflow-hidden overflow-y-auto
      p-4 pl-8 pr-8
    "
  >
    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="data" class="">
      <div class="flex justify-between items-center">
        <div>
          <FormButton
            v-if="$isElectron"
            class="btn-link mr-8"
            @click="$router.go(-1)"
          >
            <FontAwesomeIcon icon="chevron-left" class="mr-3" />Notes
          </FormButton>

          <FormButton
            data-bs-toggle="modal"
            data-bs-target="#note-edit-modal"
            class="btn-link truncate"
          >
            <FontAwesomeIcon icon="file-alt" class="mr-3" />{{
              data.getNote.name
            }}
          </FormButton>
        </div>

        <NoteActions />

        <NoteEditModal
          id="note-edit-modal"
          :title="`Edit ${data.getNote.name}`"
        />
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
</script>
