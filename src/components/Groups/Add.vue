<template>
  <form
    class="add-group-form p-4 needs-validated"
    novalidate
    @submit="validateCreateGroup"
  >
    <div class="input-group">
      <input
        v-model="groupNameInput"
        aria-label="Add New Group"
        aria-placeholder="New Group Name"
        class="form-control rounded-full"
        placeholder="New Group Name"
        required
        title="Add New Group"
        type="text"
      />
      <button class="btn btn-primary rounded-full" type="submit">
        <FontAwesomeIcon icon="layer-group" />
      </button>
    </div>
  </form>
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

const validateCreateGroup = async (event) => {
  event.preventDefault();
  console.log('attempted');
  const form = document.querySelector('.add-group-form');

  if (form.checkValidity()) {
    await createGroup({ name: groupNameInput.value });

    groupNameInput.value = '';
  } else {
    form.classList.add('was-validated');
  }
};
</script>
