<template>
  <div class="curd">
    <h1>角色管理</h1>
  </div>
</template>

<script lang="ts" setup>
onActivated(() => console.log('AdminRole activated'))
onDeactivated(() => console.log('AdminRole deactivated'))
onMounted(() => console.log('AdminRole mounted'))
onBeforeUnmount(() => console.log('AdminRole unmounted'))
</script>

<style lang="scss"></style>
