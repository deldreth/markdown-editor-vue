<template>
  <button @click="createNote({ groupId: props.groupId })">Add</button>
</template>

<script setup>
import { useMutation } from '@urql/vue';

const props = defineProps({
  groupId: {
    type: String,
    required: true,
  },
});

const { executeMutation: createNote } = useMutation(
  `
  mutation CreateNewNote ($groupId: ID!) {
    createNote(
      input: {name: "New Note", groupID: $groupId}
    ) {
      id
    }
  }
`
);
</script>
