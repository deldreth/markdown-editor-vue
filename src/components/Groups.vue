<template>
  <div id="groups" class="h-full relative bg-purple-50">
    <GroupsAdd />

    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <section
        v-for="group in data?.listGroups.items"
        :key="group.id"
        class="p-4 cursor-pointer hover:bg-purple-200"
        :class="`${$route.params.groupId === group.id && 'bg-purple-100'}`"
        @click="$router.push(`/group/${group.id}`)"
      >
        <h2 class="text-xl">{{ group.name }}</h2>

        <p v-if="group.notes.items.length" class="text-sm">
          <FontAwesomeIcon icon="layer-group" />&nbsp;{{
            group.notes.items.length
          }}
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
