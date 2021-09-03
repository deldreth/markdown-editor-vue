<template>
  <div class="flex p-4">
    <input
      v-model="groupNameInput"
      placeholder="Group Name"
      class="form-control flex-1 mr-4"
    />

    <button
      aria-label="Add New Group"
      type="button"
      class="btn btn-success rounded-full"
      @click="createGroup({ name: groupNameInput })"
    >
      <FontAwesomeIcon icon="plus" />
    </button>
  </div>
</template>

<script setup>
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
