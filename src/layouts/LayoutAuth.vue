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
      p-8
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
      <h1 class="text-2xl text-center mb-8">WonderNotes</h1>

      <slot></slot>
    </div>
  </div>
</template>
