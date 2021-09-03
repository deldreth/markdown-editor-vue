<template>
  <div class="flex p-4">
    <el-input
      v-model="groupNameInput"
      placeholder="Group Name"
      class="flex-1 mr-4"
    />

    <el-button
      aria-label="Add New Group"
      round
      @click="createGroup({ name: groupNameInput })"
      ><FontAwesomeIcon icon="plus"
    /></el-button>
  </div>
</template>

<script setup>
import { ElButton, ElInput } from 'element-plus';
import { useMutation } from '@urql/vue';
import { ref } from 'vue';

const groupNameInput = ref('');

const { executeMutation: createGroup } = useMutation(
  `
  mutation CreateNewNote ($name: String!) {
    createGroup(
      input: {name: $name}
    ) {
      id
    }
  }
`
);
</script>
