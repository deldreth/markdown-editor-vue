<template>
  <div class="groups border-r p-4">
    Groups.vue <br />

    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul v-if="data">
        <li v-for="group in data?.listGroups.items" :key="group.id">
          <router-link :to="`/group/${group.id}`">{{ group.name }}</router-link>
        </li>
      </ul>
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
        }
      }
    }
  `,
});
</script>
