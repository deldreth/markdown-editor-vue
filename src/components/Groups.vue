<template>
  <div
    id="groups"
    class="
      flex flex-col
      h-full
      overflow-hidden    
      bg-gray-900 bg-opacity-75
      lg:border-r-2 border-indigo-500
    "
    :class="{
      hidden: $route.params.groupId,
      'lg:flex': $route.params.groupId,
    }"
  >
    <div class="flex justify-between items-center p-2 pl-8 pr-8">
      <h1 class="text-lg">Groups</h1>
      <GroupsAdd />
    </div>

    <div class="overflow-y-auto flex-1">
      <Loader v-if="fetching" />

      <div v-else-if="error">{{ error }}</div>

      <div v-else class="text-sm">
        <GroupsItem id="all" name="All Notes" class="text-blue-200" />

        <GroupsItem
          v-for="group in data?.listGroups.items
            .slice(0)
            .sort(({ name: nameA }, { name: nameB }) =>
              nameA.localeCompare(nameB)
            )"
          :id="group.id"
          :key="group.id"
          :name="group.name"
          :count="group.notes.items.length"
        />
      </div>
    </div>

    <div
      v-if="!userInfoLoading && userInfo"
      class="
        border-t-2 border-indigo-500
        pb-8
        pl-4
        pr-4
        pt-8
      "
    >
      <div
        class="flex
        items-center
        justify-between
        mb-4"
      >
        {{ userInfo.username }}

        <button
          type="button"
          class="btn btn-outline-warning btn-sm"
          @click="onSignOut"
        >
          <FontAwesomeIcon icon="sign-out-alt" />&nbsp;Sign Out
        </button>
      </div>

      <div class="flex justify-between text-xs">
        <router-link to="/changelog">Changelog</router-link>
        <a href="https://github.com/deldreth/wondernotes.app" target="_blank"
          >Github</a
        >
      </div>
    </div>
  </div>

  <router-view :key="$route.params.groupId" />
</template>

<script setup>
import { useQuery } from '@urql/vue';
import { useAsyncState } from '@vueuse/core';
import { Auth } from 'aws-amplify';

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

const { state: userInfo, ready: userInfoLoading } = useAsyncState(
  Auth.currentUserInfo()
);

async function onSignOut(event) {
  event.preventDefault();

  await Auth.signOut();

  window.location.href = '/';
}
</script>
