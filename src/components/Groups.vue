<template>
  <div
    id="groups"
    class="
      md:flex flex flex-col flex-1
      bg-zinc-200 dark:bg-zinc-800 bg-opacity-90
      md:max-w-xs
    "
    :class="{
      hidden: $route.params.groupId,
    }"
  >
    <div class="p-4 flex justify-between items-center bg-indigo-700">
      <h1 class="text-lg">
        <FontAwesomeIcon icon="layer-group" class="mr-2" /> Groups
      </h1>
      <GroupsAdd />
    </div>

    <Loader v-if="fetching" />

    <div v-else-if="error">{{ error }}</div>

    <div v-else class="overflow-y-auto flex-1 p-4">
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

    <!--<Tags />-->

    <div v-if="!userInfoLoading && userInfo" class="p-4">
      <div class="flex items-center justify-between mb-2">
        {{ userInfo.username }}

        <button type="button" class="btn btn-link py-1 px-0" @click="onSignOut">
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
