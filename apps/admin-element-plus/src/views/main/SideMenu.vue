<template>
  <ElSubMenu v-if="config.children.length" :index="config.path" :popperClass="popperClass">
    <template #title>
      <SvgIcon v-if="config.meta.icon" :name="config.meta.icon" class="side-menu__icon"></SvgIcon>
      <span>{{ config.meta.title }}</span>
    </template>
    <SideMenu v-for="item in config.children" :config="item" :key="item.path" :popperClass="popperClass"></SideMenu>
  </ElSubMenu>
  <ElMenuItem v-else :index="config.path">
    <SvgIcon v-if="config.meta.icon" class="side-menu__icon" :name="config.meta.icon"></SvgIcon>
    <template #title>
      <span>{{ config.meta.title }}</span>
    </template>
  </ElMenuItem>
</template>
<script lang="ts">
export default {
  name: 'SideMenu',
}
</script>
<script lang="ts" setup>
import { type MenuConfig } from '~/stores/user'

defineProps<{
  config: MenuConfig
  popperClass?: string
}>()
</script>
<style lang="scss">
.side-menu {
  &__icon {
    width: 1.5em;
    height: 1.5em;
    margin-right: 4px;
  }
}
</style>
