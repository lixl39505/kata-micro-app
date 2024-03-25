<template>
  <ElContainer class="main">
    <ElAside :class="['aside', { collapse: isCollapse }]" :width="null">
      <!-- 顶部Logo -->
      <div :class="['aside__head', { collapse: isCollapse }]">
        <SvgIcon class="aside__logo" name="logo"></SvgIcon>
        <span v-show="!isCollapse">ElementUI Admin</span>
      </div>
      <!-- 路由菜单 -->
      <ElMenu
        router
        class="aside__menu"
        default-active="1-4-1"
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
      >
        <SideMenu v-for="config in menuItems" :key="config.path" :config="config"></SideMenu>
      </ElMenu>
    </ElAside>
    <ElContainer direction="vertical">
      <!-- 顶部功能栏 -->
      <ElHeader class="header" :height="null">
        <!-- 菜单缩进 -->
        <SvgIcon class="header__icon" :name="isCollapse ? 'indent-left' : 'indent'" @click.native="onIndent"></SvgIcon>
        <!-- 右侧功能区 -->
        <div v-if="user && user.id" class="header__action-bar">
          <!-- 全屏 -->
          <SvgIcon class="header__icon" title="全屏" name="fullscreen" @click.native="onFullscreen"></SvgIcon>
          <!-- 多语言 -->
          <ElDropdown class="header__lang" @command="onLangChange">
            <span><SvgIcon class="header__icon" name="lang"></SvgIcon>{{ curLang.text }}</span>
            <ElDropdownMenu slot="dropdown">
              <ElDropdownItem v-for="lang in langs" :key="lang.id" :command="lang">{{ lang.text }}</ElDropdownItem>
            </ElDropdownMenu>
          </ElDropdown>
          <!-- 当前用户 -->
          <ElDropdown class="header__user" @command="onUserAction">
            <span
              ><ElAvatar size="small" class="header__user-avatar" :src="user.avatar"
                ><SvgIcon class="header__user-icon" name="noimg"></SvgIcon></ElAvatar
              >{{ user.nickname
              }}<SvgIcon
                class="header__user-icon"
                style="padding-left: 2px; vertical-align: -2px"
                name="arrowdown"
              ></SvgIcon
            ></span>
            <ElDropdownMenu slot="dropdown">
              <ElDropdownItem v-for="act in userActions" :key="act.id" :command="act" :divided="act.divided">{{
                act.text
              }}</ElDropdownItem>
            </ElDropdownMenu>
          </ElDropdown>
        </div>
      </ElHeader>
      <div class="header__bottom"></div>
      <!-- 访问栏 -->
      <VisitedBar></VisitedBar>
      <!-- 内容区 -->
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
import VisitedBar from './VisitedBar.vue'
import SideMenu, { MenuConfig } from './SideMenu.vue'
import { useUserStore } from '~/stores/user'
import type { RouteRecord } from 'vue-router'

let langs = [
  { id: 'zh' as const, text: '中文' },
  { id: 'en' as const, text: 'English' },
]
let userActions = [
  { id: 'profile' as const, text: '修改资料' },
  { id: 'pwd' as const, text: '修改密码' },
  { id: 'exit' as const, text: '退出', divided: true },
]

type Cmd<T> = {
  id: T
  text: string
  divided?: boolean
}
type Lang = Cmd<(typeof langs)[number]['id']>
type UserAction = Cmd<(typeof userActions)[number]['id']>

// states
const user = useUserStore()
const isCollapse = ref(false)
const curLang = ref<Lang>(langs[0])
const router = useRouter()
const menuItems = shallowRef<MenuConfig[]>([])

watchEffect(() => {
  let i = langs.findIndex((v) => v.id === user.lang)

  if (i >= 0) curLang.value = langs[i]
})

watchEffect(() => {
  let routes = router.getRoutes() as RouteRecord[],
    routesMap: Record<string, MenuConfig> = {}

  routes.forEach((v) => {
    if (!routesMap[v.path]) {
      routesMap[v.path] = {
        path: v.path,
        name: v.name,
        meta: v.meta,
        children: [],
      }
    }
    if (v.parent) {
      if (!routesMap[v.parent.path]) {
        routesMap[v.parent.path] = {
          path: v.parent.path,
          name: v.parent.name,
          meta: v.parent.meta,
          children: [],
        }
      }
      v.meta.parent = routesMap[v.parent.path]
      routesMap[v.parent.path].children?.push(routesMap[v.path])
    }
  })
  // 只需挂在 main 组件下的路由
  menuItems.value = Object.values(routesMap).find((v) => v.name === 'main')?.children ?? []
})

function onIndent(e: EventTarget) {
  isCollapse.value = !isCollapse.value
}

function onFullscreen() {
  screenfull.toggle()
}

function onLangChange(cmd: Lang) {
  user.lang = cmd.id
}

function onUserAction(cmd: UserAction) {
  if (cmd.id === 'profile') {
    return
  }
  if (cmd.id === 'pwd') {
    return
  }
  if (cmd.id === 'exit') {
    return
  }

  exhaustiveCheck(cmd.id)
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
    margin-right: 12px;
  }
  &__user {
    position: relative;
    padding-left: 36px;
    cursor: pointer;
    &-icon {
      width: 0.9em;
      height: 0.9em;
    }
    &-avatar {
      position: absolute;
      left: 2px;
      margin-top: -4px;
    }
  }
  &__bottom {
    height: 1px;
    width: 100%;
    background-color: $--border-color-base;
  }
}
</style>
