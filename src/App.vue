<template>
  <TitleBar v-if="$isElectron" platform="win32" theme="dark" />
  <router-view :class="{ 'electron-app': $isElectron }" />
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
