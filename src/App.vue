<template>
  <TitleBar v-if="$isElectron" platform="win32" theme="dark" />
  <router-view :class="$isElectron && 'pt-6'" />
</template>

<style>
#app {
  height: 100vh;
}
html,
body {
  height: 100%;
  font-family: 'Roboto', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
