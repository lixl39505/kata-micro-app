<template>
  <ElSubmenu v-if="config.children?.length" :index="config.path">
    <template slot="title">
      <SvgIcon :name="config.meta?.icon"></SvgIcon>
      <span slot="title">{{ config.meta?.title }}</span>
    </template>
    <SideMenu v-for="item in config.children" :config="item" :key="item.path"></SideMenu>
  </ElSubmenu>
  <ElMenuItem v-else :index="config.path">
    <SvgIcon :name="config.meta?.icon"></SvgIcon>
    <span>{{ config.meta?.title }}</span>
  </ElMenuItem>
</template>
<script lang="ts" setup>
import type { RouteConfig } from 'vue-router'
defineProps<{
  config: RouteConfig
}>()
</script>
