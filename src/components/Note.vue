<template>
  <div
    class="
      col-auto
      xl:col-span-2
      2xl:col-span-3
      overflow-hidden overflow-y-auto
      p-4
      xl:py-8
    "
  >
    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="dataNote">
      <div class="mb-4">
        <div class="flex justify-between flex-1">
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
            class="btn-link"
          >
            <FontAwesomeIcon icon="file-alt" class="mr-3" />{{
              dataNote.getNote.name
            }}
          </FormButton>

          <NoteActions />
        </div>

        <TagsEdit />

        <NoteEditModal
          id="note-edit-modal"
          :title="`Edit ${dataNote.getNote.name}`"
        />
      </div>

      <Editor
        :note-id="$route.params.noteId"
        :content="dataNote.getNote.body"
      />
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
