<template>
  <ElMenu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <ElSubMenu index="1">
      <template #title>
        <ElIcon><IconEpLocation /></ElIcon>
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
      <ElIcon><IconEpMenu /></ElIcon>
      <template #title>Navigator Two</template>
    </ElMenuItem>
    <ElMenuItem index="3" disabled>
      <ElIcon><IconEpDocument /></ElIcon>
      <template #title>Navigator Three</template>
    </ElMenuItem>
    <ElMenuItem index="4">
      <ElIcon><IconEpSetting /></ElIcon>
      <template #title>Navigator Four</template>
    </ElMenuItem>
    <ElMenuItem index="5">
      <ElIcon><IconMyHome></IconMyHome></ElIcon>
      <template #title>My Icon</template>
    </ElMenuItem>
  </ElMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
