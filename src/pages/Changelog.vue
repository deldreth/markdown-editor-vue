<template>
  <div
    class="
      h-full
      text-white
      bg-gradient-to-r
      from-pink-600
      via-blue-900
      to-purple-700
    "
  >
    <div
      class="
        h-full
        bg-gradient-to-b from-gray-900 via-purple-900 to-transparent
        overflow-y-auto
      "
    >
      <VueShowdown
        class="p-12 mx-auto prose text-white bg-gray-900 bg-opacity-25 border-l-2 border-r-2 border-indigo-500"
        :markdown="Changelog"
      />
    </div>
  </div>
</template>

<script setup>
import Changelog from '../../CHANGELOG.md';
</script>
