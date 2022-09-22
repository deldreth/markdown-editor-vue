<template>
  <TitleBar v-if="$isElectron" platform="win32" />
  <router-view :class="$isElectron && 'electron-app'" />
</template>

<style>
#app {
  height: 100vh;
}

.electron-app {
  padding-top: 28px;
}
html,
body {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
