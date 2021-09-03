<template>
  <el-button
    aria-label="Add New Note"
    round
    @click="createNoteAndEmit({ groupId: props.groupId })"
    ><FontAwesomeIcon icon="plus"
  /></el-button>
</template>

<script setup>
import { ElButton } from 'element-plus';
import { useMutation } from '@urql/vue';

const emit = defineEmits(['noteCreated']);

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
      input: {name: "New Note", groupID: $groupId, body: ""}
    ) {
      id
      name
    }
  }
`
);

async function createNoteAndEmit(opts) {
  await createNote(opts);
  emit('noteCreated');
}
</script>
