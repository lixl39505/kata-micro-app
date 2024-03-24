<template>
  <ElContainer class="main">
    <ElAside class="aside" width="200px">
      <div class="aside__head" :style="{ height: hdH + 'px' }">Logo</div>
      <div>Aside</div>
    </ElAside>
    <ElContainer direction="vertical">
      <ElHeader :height="hdH + 'px'">Header</ElHeader>
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts">
export default {
  name: 'MainView',
}
</script>
<script lang="ts" setup>
const hdH = ref(48)
</script>
<style lang="scss">
.main {
  height: 100%;
}
.aside {
  background: #020f1d;
  color: $--color-text-regular;
  &__head {
    padding: 0 20px;
  }
}
</style>
