<template>
  <section
    :id="props.id"
    class="
      px-2 py-1
      mb-1 -mr-2 -ml-2
      flex justify-between items-center
      rounded-md
      hover:cursor-pointer
      hover:dark:bg-zinc-700
      border dark:border-zinc-800
    "
    :class="`${$route.params.groupId === props.id && 'dark:border-zinc-700'}`"
    @click="$router.push(`/group/${props.id}`)"
  >
    <h2 class="truncate">{{ props.name }}</h2>

    <div>
      <span v-if="props.count">
        {{ props.count }}&nbsp;<FontAwesomeIcon icon="layer-group" />
      </span>
    </div>
  </section>
</template>

<script setup>
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
</script>
