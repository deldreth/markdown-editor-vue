<template>
  <el-button
    aria-label="Add New Note"
    round
    @click="createNote({ groupId: props.groupId })"
    ><FontAwesomeIcon icon="plus"
  /></el-button>
</template>

<script setup>
import { ElButton } from 'element-plus';
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
