<template>
  <WujieVue width="100%" height="100%" name="v2" :url="url" alive></WujieVue>
</template>
<script lang="ts" setup>
const route = useRoute()
const url = ref(`${import.meta.env.VITE_V2_URL}${route.path.replace('v2/', '')}`)
</script>
