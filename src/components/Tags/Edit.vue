<template>
  <div class="flex justify-start">
    <FontAwesomeIcon icon="tags" class="mt-3 mr-2" />
    <div class="min-w-1/2">
      <Multiselect
        v-model="currentTags"
        placeholder="Add Tags"
        label="tag"
        track-by="id"
        :loading="
          fetchingTags || creatingTag || creatingTagNote || deletingTagNote
        "
        :options="tags"
        :taggable="true"
        :multiple="true"
        :close-on-select="false"
        @remove="onRemove"
        @select="onSelect"
        @tag="onTag"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import Multiselect from 'vue-multiselect';
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
      .slice(0)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(({ tag }) => tag);
  },
  set() {},
});

const tags = computed(() => {
  return dataTags?.value?.listTags.items;
});

async function onTag(tag) {
  const { data: tagData } = await createTag({
    input: { tag: tag.toLowerCase() },
  });

  await createTagNote({
    input: { tagId: tagData.createTag.id, noteId: note?.value.id },
  });
}

async function onRemove(tag) {
  const tagNoteId = note?.value.tags.items.find(
    tagNote => tagNote.tag.id === tag.id
  ).tagNoteId;

  await deleteTagNote({
    input: { id: tagNoteId },
  });
}

const guidRegexp = new RegExp(
  /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/
);
async function onSelect(tag) {
  if (guidRegexp.test(tag.id)) {
    await createTagNote({
      input: { tagId: tag.id, noteId: note?.value.id },
    });
  }
}

async function clearTags() {}
</script>
