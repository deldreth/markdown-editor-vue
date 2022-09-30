<template>
  <section
    :id="props.id"
    class="
      flex justify-between items-center
      px-2 py-1
      mb-1 -mr-2 -ml-2
      rounded-md
      hover:cursor-pointer
      hover:bg-zinc-300 hover:dark:bg-zinc-700 hover:dark:border-zinc-700
      border border-zinc-300 
    "
    tabindex="0"
    :class="{
      'dark:border-zinc-700': $route.params.groupId === props.id,
      'dark:border-zinc-800': $route.params.groupId !== props.id,
    }"
    @click="handleSelectGroup"
    @keyup.enter="handleSelectGroup"
    @keyup.space="handleSelectGroup"
  >
    <h2 class="">{{ props.name }}</h2>

    <div v-if="props.count" class="flex flex-row items-center">
      <span class="px-2">{{ props.count }}</span>

      <FontAwesomeIcon icon="file-alt" />
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  id: { type: [Number, String], required: true },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

function handleSelectGroup() {
  router.push(`/group/${props.id}`);
}
</script>
