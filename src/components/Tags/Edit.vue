<template>
  <Multiselect
    v-model="currentTags"
    mode="tags"
    placeholder="Add Tags"
    :append-new-tag="true"
    :close-on-select="false"
    :create-tag="true"
    :filter-results="true"
    :loading="fetchingTags || creatingTag || creatingTagNote || deletingTagNote"
    :options="tags"
    :searchable="true"
    @deselect="removeTag"
    @select="selectTag"
    @tag="newTag"
    @clear="clearTags"
  />
</template>

<script setup>
import { inject, computed } from 'vue';
import Multiselect from '@vueform/multiselect';
import { useMutation, useQuery } from '@urql/vue';

import {
  createTag as createTagMutation,
  createTagNote as createTagNoteMutation,
  deleteTagNote as deleteTagNoteMutation,
} from '../../graphql/mutations';
import { listTags as listTagsQuery } from '../../graphql/queries';

const note = inject('note');

const { fetching: fetchingTags, data: dataTags } = useQuery({
  query: listTagsQuery,
});

const { fetching: creatingTag, executeMutation: createTag } = useMutation(
  createTagMutation
);
const {
  fetching: creatingTagNote,
  executeMutation: createTagNote,
} = useMutation(createTagNoteMutation);
const {
  fetching: deletingTagNote,
  executeMutation: deleteTagNote,
} = useMutation(deleteTagNoteMutation);

const currentTags = computed({
  get() {
    return note?.value.tags.items
      .slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(({ tag }) => tag.id);
  },
  set(value) {},
});

const tags = computed(() => {
  return dataTags?.value.listTags.items.reduce((acc, tag) => {
    acc[tag.id] = tag.tag;

    return acc;
  }, {});
});

async function newTag(tag) {
  console.log('new', tag, currentTags.value);

  const { data: tagData } = await createTag({
    input: { tag },
  });
  const { data: tagNoteData } = await createTagNote({
    input: { tagId: tagData.createTag.id, noteId: note?.value.id },
  });
}

async function removeTag(tagId) {
  console.log('removing', tagId);

  const tagNoteId = note?.value.tags.items.find(
    tagNote => tagNote.tag.id === tagId
  ).tagNoteId;

  const { data: tagNoteData } = await deleteTagNote({
    input: { id: tagNoteId },
  });
}

async function selectTag(tagId) {
  const guidRegexp = new RegExp(
    /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/
  );

  if (guidRegexp.test(tagId)) {
    const { data: tagNoteData } = await createTagNote({
      input: { tagId, noteId: note?.value.id },
    });
  }
}

async function clearTags() {}
</script>
