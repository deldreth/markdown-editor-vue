<template>
  <section
    :id="props.id"
    class="
      py-3 px-6
      mx-2
      cursor-pointer
      hover:bg-indigo-800
      flex
      justify-between
      items-center
      rounded-sm
    "
    :class="`${$route.params.groupId === props.id && 'bg-indigo-900'}`"
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
