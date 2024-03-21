<script lang="ts" setup>
import { toggleDark } from '~/composables'
</script>

<template>
  <ElMenu class="el-menu-demo" mode="horizontal">
    <ElMenuItem index="1">Element Plus</ElMenuItem>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <ElMenuItem index="2-1">item one</ElMenuItem>
      <ElMenuItem index="2-2">item two</ElMenuItem>
      <ElMenuItem index="2-3">item three</ElMenuItem>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <ElMenuItem index="2-4-1">item one</ElMenuItem>
        <ElMenuItem index="2-4-2">item two</ElMenuItem>
        <ElMenuItem index="2-4-3">item three</ElMenuItem>
      </el-sub-menu>
    </el-sub-menu>
    <ElMenuItem index="3" disabled>Info</ElMenuItem>
    <ElMenuItem index="4">Orders</ElMenuItem>
    <ElMenuItem h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height)">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </ElMenuItem>
  </ElMenu>
</template>
