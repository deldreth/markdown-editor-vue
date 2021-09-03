<template>
  <div id="groups" class="flex flex-col h-full overflow-hidden bg-gray-800">
    <GroupsAdd />

    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="overflow-y-auto flex-1">
      <section
        v-for="group in data?.listGroups.items"
        :key="group.id"
        class="p-4 cursor-pointer hover:bg-gray-800 flex justify-between"
        :class="`${
          $route.params.groupId === group.id && 'bg-indigo-900 hover:text-white'
        }`"
        @click="$router.push(`/group/${group.id}`)"
      >
        <h2 class="">{{ group.name }}</h2>

        <p v-if="group.notes.items.length" class="text-sm">
          {{ group.notes.items.length }}&nbsp;<FontAwesomeIcon
            icon="layer-group"
          />
        </p>
      </section>
    </div>
  </div>

  <router-view />
</template>

<script setup>
import { useQuery } from '@urql/vue';

const { fetching, data, error } = useQuery({
  query: `
    {
      listGroups {
        items {
          id
          name
          notes {
            items {
              id
            }
          }
        }
      }
    }
  `,
});
</script>
