<template>
  <div
    class="bg-gradient-to-r
      from-pink-600
      via-blue-900
      to-purple-700"
  >
    <div
      class="
      flex flex-col
      justify-center
      items-center
      h-screen
      text-white
      p-8
      bg-gradient-to-b from-gray-900 via-purple-900 to-transparent
    "
    >
      <div
        class="
        bg-indigo-900 bg-opacity-75
        border border-indigo-400
        rounded
        w-full
        md:w-96
        p-8
      "
      >
        <div
          v-if="$isElectron && $route.path !== '/auth/login'"
          class="flex justify-between -ml-6"
          @click="$router.go(-1)"
        >
          <button class="btn btn-link">
            Back
          </button>
        </div>

        <h1 class="text-2xl text-center mb-8">WonderNotes</h1>

        <slot></slot>
      </div>
    </div>
  </div>
</template>
