<template>
  <ElContainer class="main">
    <ElAside :class="['aside', { collapse: isCollapse }]" :width="null">
      <div :class="['aside__head', { collapse: isCollapse }]">
        <SvgIcon class="aside__logo" name="logo"></SvgIcon>
        <span v-show="!isCollapse">ElementUI Admin</span>
      </div>
      <ElMenu
        class="aside__menu"
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
      <ElHeader class="header" :height="null">
        <SvgIcon class="header__icon" :name="isCollapse ? 'indent-left' : 'indent'" @click.native="onIndent"></SvgIcon>
        <div class="header__action-bar">
          <SvgIcon class="header__icon" title="全屏" name="fullscreen" @click.native="onFullscreen"></SvgIcon>
          <ElDropdown class="header__lang" @command="onLangChange">
            <span><SvgIcon class="header__icon" name="lang"></SvgIcon>{{ curLang.text }}</span>
            <ElDropdownMenu slot="dropdown">
              <ElDropdownItem v-for="lang in langs" :key="lang.id" :command="lang">{{ lang.text }}</ElDropdownItem>
            </ElDropdownMenu>
          </ElDropdown>
        </div>
      </ElHeader>
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
import screenfull from 'screenfull'

let langs = [
  { id: 'zh', text: '中文' },
  { id: 'en', text: 'English' },
]

type Lang = (typeof langs)[0]

const isCollapse = ref(false)
const curLang = ref<Lang>(langs[0])

function handleOpen(key: string, keyPath: string) {
  console.log(key, keyPath)
}

function handleClose(key: string, keyPath: string) {
  console.log(key, keyPath)
}

function onIndent(e: EventTarget) {
  isCollapse.value = !isCollapse.value
}

function onLangChange(cmd: Lang) {
  curLang.value = cmd
}

function onFullscreen() {
  screenfull.toggle()
}
</script>
<style lang="scss">
$header-height: 48px;

.main {
  height: 100%;
}
.aside {
  width: 200px;
  background: #545c64;
  color: mix($--color-white, $--color-black, 80%);
  transition:
    width,
    0.3s ease-in;
  &.collapse {
    width: 64px;
  }
  &__head {
    height: $header-height;
    line-height: $header-height;
    position: sticky;
    padding: 0 20px;
    &.collapse {
      width: 64px;
      padding: 0;
      text-align: center;
    }
  }
  &__logo {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.2em;
    margin-right: 2px;
  }
  &__menu {
    border: 0;
  }
}
.header {
  height: $header-height;
  display: flex;
  align-items: center;
  &__icon {
    width: 1.5em;
    height: 1.5em;
    margin-right: 12px;
    vertical-align: middle;
    &:hover {
      cursor: pointer;
    }
  }
  &__action-bar {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  &__lang {
    cursor: pointer;
  }
}
</style>
