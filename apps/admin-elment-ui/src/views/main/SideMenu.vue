<template>
  <ElSubmenu v-if="config.children.length" :index="config.path">
    <template slot="title">
      <SvgIcon v-if="config.meta.name" :name="config.meta.icon"></SvgIcon>
      <span slot="title">{{ config.meta.title }}</span>
    </template>
    <SideMenu v-for="item in config.children" :config="item" :key="item.path"></SideMenu>
  </ElSubmenu>
  <ElMenuItem v-else :index="config.path">
    <SvgIcon v-if="config.meta.name" :name="config.meta.icon"></SvgIcon>
    <span>{{ config.meta.title }}</span>
  </ElMenuItem>
</template>
<script lang="ts" setup>
export type MenuConfig = {
  path: string
  meta: Record<string | number | symbol, any>
  children: MenuConfig[]
  name?: string
  hash?: string
  query?: Record<string, string | (string | null)[] | null | undefined>
  params?: Record<string, string>
}

defineProps<{
  config: MenuConfig
}>()
</script>
