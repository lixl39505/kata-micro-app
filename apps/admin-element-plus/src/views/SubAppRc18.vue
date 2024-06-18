<template>
  <WujieVue width="100%" height="100%" :name="name" :url="url" alive></WujieVue>
</template>
<script lang="ts" setup>
import Wujie from 'wujie-vue3'

const route = useRoute()
const { bus } = Wujie

let name = 'rc18' // 子应用名称
let path = route.path.replace(`${name}/`, '')
let url = ref(`${import.meta.env.VITE_RC18_URL}${path}`)

bus.$emit(`${name}:routeChange`, path)
</script>
