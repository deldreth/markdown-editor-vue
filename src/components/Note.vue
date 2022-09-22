<template>
  <div
    class="
      flex-1
      text-slate-900 dark:text-slate-100
      bg-slate-100 dark:bg-zinc-700
      overflow-hidden
    "
  >
    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="dataNote" class="h-full flex flex-col">
      <div
        class="
          p-4  
          flex justify-between
          dark:bg-indigo-700
        "
      >
        <FormButton
          class="block md:hidden mr-4"
          @click="$router.replace({ path: `/group/${route.params.groupId}` })"
        >
          <FontAwesomeIcon icon="chevron-left" />
        </FormButton>

        <FormButton
          data-bs-toggle="modal"
          data-bs-target="#note-edit-modal"
          class="truncate mr-4"
        >
          <FontAwesomeIcon icon="file-alt" class="mr-2" />{{
            dataNote.getNote.name
          }}
        </FormButton>

        <NoteActions />
      </div>

      <NoteEditModal
        id="note-edit-modal"
        :title="`Edit ${dataNote.getNote.name}`"
      />

      <div class="overflow-y-auto">
        <Editor
          :note-id="$route.params.noteId"
          :content="dataNote.getNote.body"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue';
import { useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const noteId = ref(route.params.noteId);

const { fetching, data: dataNote, error } = useQuery({
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
        tags {
          items {
            tagNoteId: id
            createdAt
            tag {
              id
              tag
            }
          }
        }
      }
    }
  `,
  variables: { noteId },
});

provide(
  'note',
  computed(() => dataNote?.value.getNote)
);
</script>
