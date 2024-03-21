<template>
  <ElMenu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <ElSubMenu index="1">
      <template #title>
        <ElIcon><location /></ElIcon>
        <span>Navigator One</span>
      </template>
      <ElMenuItemGroup>
        <template #title><span>Group One</span></template>
        <ElMenuItem index="1-1">item one</ElMenuItem>
        <ElMenuItem index="1-2">item two</ElMenuItem>
      </ElMenuItemGroup>
      <ElMenuItemGroup title="Group Two">
        <ElMenuItem index="1-3">item three</ElMenuItem>
      </ElMenuItemGroup>
      <ElSubMenu index="1-4">
        <template #title><span>item four</span></template>
        <ElMenuItem index="1-4-1">item one</ElMenuItem>
      </ElSubMenu>
    </ElSubMenu>
    <ElMenuItem index="2">
      <ElIcon><icon-menu /></ElIcon>
      <template #title>Navigator Two</template>
    </ElMenuItem>
    <ElMenuItem index="3" disabled>
      <ElIcon><document /></ElIcon>
      <template #title>Navigator Three</template>
    </ElMenuItem>
    <ElMenuItem index="4">
      <ElIcon><setting /></ElIcon>
      <template #title>Navigator Four</template>
    </ElMenuItem>
  </ElMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
