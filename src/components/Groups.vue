<template>
  <div
    id="groups"
    class="
      flex flex-col
      h-full
      overflow-hidden
      col-span-4
      md:col-span-1
      bg-gray-900
      bg-opacity-75
    "
    :class="$route.params.groupId && 'hidden md:flex'"
  >
    <GroupsAdd @added="getListGroups({ requestPolicy: 'network-only' })" />

    <div class="overflow-y-auto flex-1">
      <Loader v-if="fetching" />

      <div v-else-if="error">{{ error }}</div>

      <div v-else>
        <section
          class="
            p-2
            pr-8
            pl-8
            cursor-pointer
            hover:bg-indigo-800
            flex
            justify-between
            items-center
          "
          :class="
            `${$route.params.groupId === 'all' &&
              'bg-gradient-to-l from-indigo-900'}`
          "
          @click="$router.push(`/group/all`)"
        >
          <h2 class="text-lg">All Notes</h2>
        </section>

        <section
          v-for="group in data?.listGroups.items
            .slice(0)
            .sort(({ name: nameA }, { name: nameB }) =>
              nameA.localeCompare(nameB)
            )"
          :key="group.id"
          class="
            p-2
            pr-8
            pl-8
            cursor-pointer
            hover:bg-indigo-800
            flex
            justify-between
            items-center
            text-sm
          "
          :class="`${$route.params.groupId === group.id && 'bg-indigo-900'}`"
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
    </div>

    <div
      v-if="!userInfoLoading && userInfo"
      class="
        border-t-2 border-indigo-400
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

  <router-view :key="$route.params.groupId" />
</template>

<script setup>
import { useQuery } from '@urql/vue';
import { useAsyncState } from '@vueuse/core';
import { Auth } from 'aws-amplify';

const { fetching, data, error, executeQuery: getListGroups } = useQuery({
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
