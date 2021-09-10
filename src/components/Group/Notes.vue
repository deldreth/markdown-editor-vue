<template>
  <section
    v-for="note in sortedNotes"
    :key="note.id"
    class="pt-4 pb-4 pl-8 pr-8 cursor-pointer hover:bg hover:bg-indigo-800"
    :class="`${$route.params.noteId === note.id && 'bg-indigo-900'}`"
    @click="$router.push(`/group/${$route.params.groupId}/note/${note.id}`)"
  >
    <h2 :title="note.name">
      {{ note.name }}
    </h2>

    <p class="text-sm leading-normal">
      <span class="font-semibold mr-0.5 text-blue-200">{{
        $filters.formatDate(note.updatedAt)
      }}</span>
      <span v-if="note.body">&ndash;{{ note.excerpt }}</span>
    </p>

    <p
      v-if="!!(tasks = $filters.countTasks(note.body))"
      class="text-sm text-green-200 mt-1"
    >
      <FontAwesomeIcon icon="tasks" />&nbsp;{{ tasks }}
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  notes: {
    type: Array,
    default: () => {},
  },
});

const sortedNotes = computed({
  get() {
    return props.notes
      .map(note => {
        note.excerpt = note.body.replace(/<[^>]*>?/gm, ' ').substring(0, 200);
        return note;
      })
      .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
      .reverse();
  },
});
</script>
