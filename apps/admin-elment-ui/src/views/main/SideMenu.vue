<template>
  <ElSubmenu v-if="config.children.length" :index="config.path">
    <template slot="title">
      <SvgIcon
        v-if="config.meta.icon"
        :name="config.meta.icon"
        :class="['side-menu__icon', { active: activePath === config.path }]"
      ></SvgIcon>
      <span>{{ config.meta.title }}</span>
    </template>
    <SideMenu v-for="item in config.children" :config="item" :key="item.path" :activePath="activePath"></SideMenu>
  </ElSubmenu>
  <ElMenuItem v-else :index="config.path">
    <SvgIcon
      v-if="config.meta.icon"
      :class="['side-menu__icon', { active: activePath === config.path }]"
      :name="config.meta.icon"
    ></SvgIcon>
    <span>{{ config.meta.title }}</span>
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
  activePath?: string
}>()
</script>
<style lang="scss">
.side-menu {
  &__icon {
    fill: #fff;
    width: 1.5em;
    height: 1.5em;
    margin-right: 4px;

    &.active {
      fill: $--color-primary;
    }
  }
}
</style>
