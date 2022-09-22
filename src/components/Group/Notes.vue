<template>
  <section
    v-for="note in sortedNotes"
    :key="note.id"
    class="
      px-2 py-1
      -mx-2 mb-1 rounded-md
      hover:cursor-pointer
      hover:dark:bg-zinc-800
      border dark:border-zinc-900
    "
    :class="`${$route.params.noteId === note.id && 'dark:border-zinc-800'}`"
    @click="$router.push(`${routePath}/note/${note.id}`)"
  >
    <h2 :title="note.name">
      {{ note.name }}
    </h2>

    <p class="text-sm leading-normal">
      <span class="mr-0.5 text-blue-200">{{
        $filters.formatDate(note.updatedAt)
      }}</span>
      <span v-if="note.body">&ndash;{{ note.excerpt }}</span>
    </p>

    <p
      v-if="!!(tasks = $filters.countTasks(note.body))"
      class="text-sm mt-1"
      :class="tasks[0] === tasks[1] ? 'text-green-300' : 'text-red-400'"
    >
      <FontAwesomeIcon icon="tasks" />&nbsp;{{ tasks[0] }}/{{ tasks[1] }}
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routePath = route.params.groupId
  ? `/group/${route.params.groupId}`
  : `/tag/${route.params.tagId}`;

const props = defineProps({
  notes: {
    type: Array,
    default: () => {},
  },
});

const sortedNotes = computed({
  get() {
    return props.notes.map(note => {
      note.excerpt = note.body.replace(/<[^>]*>?/gm, ' ').substring(0, 200);
      return note;
    });
  },
});
</script>
