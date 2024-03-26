<template>
  <div class="curd">
    <h1>CURD</h1>
  </div>
</template>

<script lang="ts" setup>
onActivated(() => console.log('CURD activated'))
onDeactivated(() => console.log('CURD deactivated'))
onMounted(() => console.log('CURD mounted'))
onBeforeUnmount(() => console.log('CURD unmounted'))
</script>

<style lang="scss"></style>
