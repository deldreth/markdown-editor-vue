<template>
  <div :id="props.id" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div
        class="
          modal-content
          border border-indigo-300
          bg-indigo-900 bg-opacity-75
        "
      >
        <div class="modal-header">
          <h5 class="modal-title text-xl">Edit {{ unwrappedName }} Group</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>

        <div class="modal-body">
          <div class="flex flex-col">
            <FormInput v-model="unwrappedName" label="Group Name" />

            <button
              type="button"
              class="btn btn-success mb-8 self-end"
              @click="
                updateGroup({
                  input: { id: props.group.id, name: unwrappedName },
                })
              "
            >
              Save Changes
            </button>
          </div>

          <hr />

          <div
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

            <p class="mb-4">
              Deleting a group will delete <b>only the group</b>.
            </p>

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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@urql/vue';

import { updateGroup as updateGroupMutation } from '../../../graphql/mutations';
import FormInput from '../../Form/Input';

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

const { executeMutation: updateGroup } = useMutation(updateGroupMutation);
</script>
