<template>
  <div class="curd">
    <h1>用户管理</h1>
  </div>
</template>

<script lang="ts" setup>
onActivated(() => console.log('AdminUser activated'))
onDeactivated(() => console.log('AdminUser deactivated'))
onMounted(() => console.log('AdminUser mounted'))
onBeforeUnmount(() => console.log('AdminUser unmounted'))
</script>

<style lang="scss"></style>
