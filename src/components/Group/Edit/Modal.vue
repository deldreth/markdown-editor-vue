<template>
  <FormModal :id="props.id" :title="`Edit ${unwrappedName}`">
    <FormInput
      v-model="unwrappedName"
      label="Group Name"
      :disabled="updatingGroup"
      @input="debounceUpdateGroup"
    />

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
import debounce from 'lodash/debounce';

import { updateGroup as updateGroupMutation } from '../../../graphql/mutations';

const deleteGroupName = ref('');

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

// eslint-disable-next-line vue/no-setup-props-destructure
const unwrappedName = props.group.name;

const { executeMutation: updateGroup, fetching: updatingGroup } = useMutation(
  updateGroupMutation
);

const debounceUpdateGroup = debounce(event => {
  console.log(unwrappedName, event.target.value);
  updateGroup({ input: { id: props.group.id, name: event.target.value } });
}, 1000);
</script>
