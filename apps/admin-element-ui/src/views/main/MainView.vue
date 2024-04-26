<template>
  <ElContainer class="main">
    <ElAside v-if="!isSubApp" :class="['aside', { collapse: isCollapse }]" :width="null">
      <!-- 顶部Logo -->
      <div :class="['aside__head', { collapse: isCollapse }]">
        <SvgIcon class="aside__logo" name="logo"></SvgIcon>
        <span v-show="!isCollapse">ElementUI Admin</span>
      </div>
      <!-- 路由菜单 -->
      <ElMenu router class="aside__menu" :default-active="route.path" :collapse="isCollapse">
        <SideMenu
          v-for="config in menuItems"
          :key="config.path"
          :config="config"
          popperClass="aside__menu-popper"
        ></SideMenu>
      </ElMenu>
    </ElAside>
    <ElContainer direction="vertical">
      <template v-if="!isSubApp">
        <!-- 顶部功能栏 -->
        <ElHeader class="header" :height="null">
          <!-- 菜单缩进 -->
          <SvgIcon
            class="header__icon"
            :name="isCollapse ? 'indent-left' : 'indent'"
            @click.native="onIndent"
          ></SvgIcon>
          <!-- 右侧功能区 -->
          <div v-if="userInfo.id" class="header__action-bar">
            <!-- 全屏 -->
            <SvgIcon class="header__icon" title="全屏" name="fullscreen" @click.native="onFullscreen"></SvgIcon>
            <!-- 多语言 -->
            <ElDropdown class="header__lang" @command="onLangChange">
              <span><SvgIcon class="header__icon" name="lang"></SvgIcon>{{ curLang.text }}</span>
              <ElDropdownMenu slot="dropdown">
                <ElDropdownItem v-for="lang in app.langs" :key="lang.id" :command="lang">{{
                  lang.text
                }}</ElDropdownItem>
              </ElDropdownMenu>
            </ElDropdown>
            <!-- 当前用户 -->
            <ElDropdown class="header__user" @command="onUserAction">
              <span
                ><ElAvatar size="small" class="header__user-avatar" :src="userInfo.avatar"
                  ><SvgIcon class="header__user-icon" name="noimg"></SvgIcon></ElAvatar
                >{{ userInfo.nickname
                }}<SvgIcon
                  class="header__user-icon"
                  style="padding-left: 2px; vertical-align: -2px"
                  name="arrowdown"
                ></SvgIcon
              ></span>
              <ElDropdownMenu slot="dropdown">
                <ElDropdownItem v-for="act in app.userActions" :key="act.id" :command="act" :divided="act.divided">{{
                  act.text
                }}</ElDropdownItem>
              </ElDropdownMenu>
            </ElDropdown>
          </div>
        </ElHeader>
        <div class="header__bottom"></div>
        <!-- 访问栏 -->
        <VisitedBar></VisitedBar>
      </template>
      <!-- 内容区 -->
      <ElMain :class="{ 'no-wrap': isSubApp }">
        <RouterView :key="route.fullPath" />
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
import SideMenu from './SideMenu.vue'
import { useUserStore, type MenuConfig } from '~/stores/user'
import { useAppStore, type Cmd } from '~/stores/app'
import type { RouteRecord } from 'vue-router'

// states
const user = useUserStore()
const { userInfo } = storeToRefs(user)
const app = useAppStore()
const isCollapse = ref(false)
const curLang = ref<Lang>(app.langs[0])
const router = useRouter()
const route = useRoute()
const menuItems = shallowRef<MenuConfig[]>([])
const isSubApp = ref(!!window?.__POWERED_BY_WUJIE__)

type Lang = Cmd<typeof app.langs>
type UserAction = Cmd<typeof app.userActions>

// 显示当前语言
watchEffect(() => {
  let i = app.langs.findIndex((v) => v.id === userInfo.value.lang)

  if (i >= 0) curLang.value = app.langs[i]
})
// 根据路由构造菜单
watchEffect(() => {
  let routes = router.getRoutes() as RouteRecord[],
    routesMap: Record<string, MenuConfig> = {}

  routes.forEach((v) => {
    let c = routesMap[v.path],
      parent: MenuConfig
    if (!c) {
      c = routesMap[v.path] = {
        path: v.path,
        name: v.name,
        meta: { ...v.meta }, // meta 需要复制
        children: [],
      }
    }
    if (v.parent) {
      parent = routesMap[v.parent.path]
      if (!parent) {
        parent = routesMap[v.parent.path] = {
          path: v.parent.path,
          name: v.parent.name,
          meta: { ...v.parent.meta },
          children: [],
        }
      }
      c.meta.parent = parent
      parent.children.push(routesMap[v.path])
    }
  })
  // 筛选
  menuItems.value = Object.values(routesMap)
    .filter((v) => v.name === 'main' || v.name === 'v3')
    .reduce((acc: MenuConfig[], v) => acc.concat(v.children), [])
})

function onIndent(e: EventTarget) {
  isCollapse.value = !isCollapse.value
}

function onFullscreen() {
  screenfull.toggle()
}

function onLangChange(cmd: Lang) {
  userInfo.value.lang = cmd.id
}

function onUserAction(cmd: UserAction) {
  if (cmd.id === 'profile') {
    return
  }
  if (cmd.id === 'pwd') {
    return
  }
  if (cmd.id === 'exit') {
    return user.logout()
  }

  exhaustiveCheck(cmd.id)
}
</script>

<style lang="scss">
$header-height: 48px;
$color-menu: #e6e4e4;
$color-menu-bg: #545c64;

@mixin menu-color-override {
  .el-menu,
  .el-menu-item,
  .el-submenu__title,
  .el-submenu {
    color: $color-menu;
    background-color: $color-menu-bg;
  }
  .el-menu--popup {
    padding: 0;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover {
    background-color: mix($--color-primary, #fff, 85%);
  }
  .el-menu-item.is-active {
    background-color: $--color-primary;
  }
}

.main {
  height: 100%;
}
.aside {
  width: 200px;
  color: $color-menu;
  background: $color-menu-bg;
  transition:
    width,
    0.3s ease-in;

  // menu color overrides
  .svgicon {
    fill: $color-menu;
  }
  @include menu-color-override;
  &__menu-popper {
    @include menu-color-override;
  }
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
.no-wrap {
  padding: 0;
}
</style>
