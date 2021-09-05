<template>
  <div
    class="
      flex flex-col
      justify-center
      items-center
      bg-gradient-to-b
      from-indigo-800
      h-screen
      text-white
    "
  >
    <div
      class="
        bg-indigo-900 bg-opacity-50
        p-8
        border border-indigo-900
        rounded
        w-96
      "
    >
      <slot></slot>
    </div>
  </div>
</template>
