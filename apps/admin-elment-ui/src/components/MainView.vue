<template>
  <ElContainer class="main">
    <ElAside class="aside" width="200px">
      <div class="aside__head" :style="{ height: hdH + 'px' }">Logo</div>
      <ElMenu
        default-active="1-4-1"
        background-color="#545c64"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <ElSubmenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <ElMenuItemGroup>
            <span slot="title">分组一</span>
            <ElMenuItem index="1-1">选项1</ElMenuItem>
            <ElMenuItem index="1-2">选项2</ElMenuItem>
          </ElMenuItemGroup>
          <ElMenuItemGroup title="分组2">
            <ElMenuItem index="1-3">选项3</ElMenuItem>
          </ElMenuItemGroup>
          <ElSubmenu index="1-4">
            <span slot="title">选项4</span>
            <ElMenuItem index="1-4-1">选项1</ElMenuItem>
          </ElSubmenu>
        </ElSubmenu>
        <ElMenuItem index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </ElMenuItem>
        <ElMenuItem index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </ElMenuItem>
        <ElMenuItem index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </ElMenuItem>
      </ElMenu>
    </ElAside>
    <ElContainer direction="vertical">
      <ElHeader :height="hdH + 'px'">Header</ElHeader>
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts">
export default {
  name: 'MainView',
}
</script>
<script lang="ts" setup>
const hdH = ref(48)
const isCollapse = ref(false)

function handleOpen(key: string, keyPath: string) {
  console.log(key, keyPath)
}

function handleClose(key: string, keyPath: string) {
  console.log(key, keyPath)
}
</script>
<style lang="scss">
.main {
  height: 100%;
}
.aside {
  background: #545c64;
  color: mix($--color-white, $--color-black, 80%);
  &__head {
    position: sticky;
    padding: 0 20px;
  }
}
</style>
