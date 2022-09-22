<template>
  <FormButton @click="onCreateGroup">
    Add Group <FontAwesomeIcon icon="plus" class="ml-2" />
  </FormButton>
</template>

<script setup>
import { useMutation } from '@urql/vue';
import { useRouter } from 'vue-router';

import { createGroup } from '../../graphql/mutations';

const emit = defineEmits(['groupCreated']);
const router = useRouter();

const { executeMutation: createGroupMutation } = useMutation(createGroup);

async function onCreateGroup() {
  const { data } = await createGroupMutation({ input: { name: 'New Group' } });

  emit('groupCreated');

  router.push({ name: 'group', params: { groupId: data.createGroup.id } });
}
</script>
