<template>
  <ElConfigProvider namespace="ep" size="small">
    <router-view />
  </ElConfigProvider>
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
}
</style>
