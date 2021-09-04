<template>
  <div id="groups" class="flex flex-col h-full overflow-hidden bg-gray-800">
    <GroupsAdd />

    <div v-if="fetching"><Loader /></div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else class="overflow-y-auto flex-1">
      <section
        v-for="group in data?.listGroups.items"
        :key="group.id"
        class="
          p-2
          pr-4
          pl-4
          cursor-pointer
          hover:bg-indigo-500
          flex
          justify-between
          items-center
        "
        :class="`${
          $route.params.groupId === group.id &&
          'bg-gradient-to-l from-indigo-900'
        }`"
        @click="$router.push(`/group/${group.id}`)"
      >
        <h2 class="truncate text-sm">{{ group.name }}</h2>

        <div>
          <span v-if="group.notes.items.length" class="text-sm">
            {{ group.notes.items.length }}&nbsp;<FontAwesomeIcon
              icon="layer-group"
            />
          </span>
        </div>
      </section>
    </div>

    <div
      v-if="!userInfoLoading && userInfo"
      class="
        border-t border-purple
        flex flex
        items-center
        justify-between
        pb-8
        pl-4
        pr-4
        pt-8
      "
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
  </div>

  <router-view />
</template>

<script setup>
import { useQuery, useClientHandle } from '@urql/vue';
import { useAsyncState } from '@vueuse/core';
import { Auth } from 'aws-amplify';

const client = useClientHandle();
console.log(client);

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
