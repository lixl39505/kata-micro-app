<template functional>
  <ElSubmenu v-if="props.config.children.length" :index="props.config.path" :popperClass="props.popperClass">
    <template slot="title">
      <SvgIcon v-if="props.config.meta.icon" :name="props.config.meta.icon" class="side-menu__icon"></SvgIcon>
      <span>{{ props.config.meta.title }}</span>
    </template>
    <SideMenu
      v-for="item in props.config.children"
      :config="item"
      :key="item.path"
      :popperClass="props.popperClass"
    ></SideMenu>
  </ElSubmenu>
  <ElMenuItem v-else :index="props.config.path">
    <SvgIcon v-if="props.config.meta.icon" class="side-menu__icon" :name="props.config.meta.icon"></SvgIcon>
    <span slot="title">{{ props.config.meta.title }}</span>
  </ElMenuItem>
</template>
<script lang="ts">
import Vue from 'vue'
import { type MenuConfig } from '~/stores/user'

const SideMenu = Vue.extend<{
  props: {
    config: MenuConfig
    popperClass: string
  }
}>({
  functional: true,
})

Vue.component('SideMenu', SideMenu)

export default SideMenu
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
