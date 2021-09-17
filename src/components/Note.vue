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

    <div v-else-if="data">
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
              data.getNote.name
            }}
          </FormButton>

          <NoteActions />
        </div>

        <div class="flex flex-row flex-wrap items-center">
          <div>
            <div
              v-for="{ tag } in data.getNote.tags.items"
              :key="tag.id"
              class="
                rounded-full
                bg-purple-300
                text-black
                leading-none
                p-1.5
                px-3.5
                text-sm
                inline-block
                mr-4
                mb-3
              "
            >
              {{ tag.tag }}
            </div>

            <button
              class="btn btn-link px-4 py-0 -ml-4 mr-4"
              type="button"
              @click="toggleTagInput"
            >
              <FontAwesomeIcon icon="plus" />
            </button>
          </div>

          <div>
            <input
              v-if="showInput"
              v-focus
              type="text"
              class="form-control py-1 w-full"
              style="min-width: 232px"
              @keydown="addTag"
              @blur="toggleTagInput"
            />
          </div>
        </div>

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
import { useMutation, useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';

import {
  createTag as createTagMutation,
  createTagNote as createTagNoteMutation,
} from '../graphql/mutations';

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
        tags {
          items {
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
  computed(() => data?.value.getNote)
);

const { fetching: creatingTag, executeMutation: createTag } =
  useMutation(createTagMutation);
const { fetching: creatingTagNote, executeMutation: createTagNote } =
  useMutation(createTagNoteMutation);

const showInput = ref(false);
function toggleTagInput() {
  showInput.value = !showInput.value;
}

async function addTag(event) {
  if (event.key === 'Enter') {
    const { data: tagData } = await createTag({
      input: { tag: event.target.value },
    });

    const { data: tagNoteData } = await createTagNote({
      input: { tagId: tagData.createTag.id, noteId: data.value.getNote.id },
    });
  }
}
</script>
