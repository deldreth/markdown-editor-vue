<template>
  <FormModal :id="props.id" title="Edit Group">
    <div class="flex flex-col">
      <FormInput
        v-model="unwrappedName"
        label="Group Name"
        :disabled="updatingGroup"
      />

      <FormButton
        class="btn-secondary px-4 self-end"
        :disabled="updatingGroup"
        @click="onUpdateGroup"
        >Save</FormButton
      >
    </div>

    <!-- <hr /> -->

    <!-- <div
      class="
          mt-8
          pr-4
          pl-4
          pt-4
          bg-red-900 bg-opacity-25
          border border-red-500
          rounded
          flex flex-col
        "
    >
      <h2 class="text-lg mb-4 text-red-50">Danger Zone</h2>

      <p class="mb-4">Deleting a group will delete <b>only the group</b>.</p>

      <FormInput
        v-model="deleteGroupName"
        :label="`Confirm Delete by Typing '${unwrappedName}'`"
      />

      <button
        type="button"
        class="btn btn-danger mb-8 self-end"
        data-bs-dismiss="modal"
        :disabled="deleteGroupName !== unwrappedName"
      >
        Delete {{ unwrappedName }} Group
      </button>
    </div> -->
  </FormModal>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@urql/vue';

import { updateGroup as updateGroupMutation } from '../../../graphql/mutations';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  group: {
    type: Object,
    default: () => {},
  },
});

const unwrappedName = ref(props.group.name);

const { executeMutation: updateGroup, fetching: updatingGroup } = useMutation(
  updateGroupMutation
);

function onUpdateGroup() {
  updateGroup({ input: { id: props.group.id, name: unwrappedName.value } });
}
</script>
