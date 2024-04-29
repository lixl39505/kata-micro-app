<template>
  <div class="visited-bar" ref="$bar" @mouseleave="onBarLeave">
    <div
      v-for="(item, i) in user.visited"
      :key="item.fullPath"
      :class="['visited-bar__item', { active: route.fullPath === item.fullPath }]"
      @click="onItemClick(item)"
      @mouseenter="onItemEnter($event, item, i)"
      @mouseleave="onItemLeave"
      @contextmenu.prevent="onItemContextmenu($event, item, i)"
    >
      <span class="visited-bar__item-title">{{ item.meta?.title }}</span>
      <ElIcon class="visited-bar__item-close" @click.native.stop="onItemClose(item, i)"><IconEpCircleClose /></ElIcon>
    </div>
    <!-- Route Card -->
    <Teleport to="body">
      <div
        v-show="overCard.show"
        class="visited-over"
        :style="{
          top: overCard.top,
          left: overCard.left,
          right: overCard.right,
        }"
      >
        <div class="visited-over__title">{{ overCard.title }}</div>
        <div class="visited-over__title">{{ overCard.fullpath }}</div>
      </div>
    </Teleport>
    <Teleport to="body">
      <!-- 右键菜单 -->
      <div
        v-show="ctxMenu.show"
        class="visited-ctx"
        :style="{ left: ctxMenu.left, top: ctxMenu.top }"
        @click="onCtxMenuClick"
      >
        <div class="visited-ctx__item" data-action="closeRight">关闭右侧</div>
        <div class="visited-ctx__item" data-action="closeOther">关闭其它</div>
        <div class="visited-ctx__item" data-action="closeLeft">关闭左侧</div>
        <div class="visited-ctx__item" data-action="closeAll">关闭全部</div>
      </div>
    </Teleport>
  </div>
</template>
<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const overCard = reactive({
  show: false,
  top: 'auto',
  left: 'auto',
  right: 'auto',
  title: '',
  fullpath: '',
  disabled: false,
})
const ctxMenu = reactive({
  show: false,
  left: '0',
  top: '0',
  route: null as unknown as RouteLocationNormalizedLoaded,
})

// item 点击导航
function onItemClick(item: RouteLocationNormalizedLoaded) {
  router.push(item.fullPath)
}
function onItemClose(item: RouteLocationNormalizedLoaded, index: number) {
  overTimer && clearTimeout(overTimer)
  overTimer = 0
  overCard.show = false

  user.close(item)
}

// item 浮层提示
let overTimer: number
let $bar = ref<HTMLElement>()

function onBarLeave() {
  overCard.show = false
}
function onItemLeave() {
  overTimer && clearTimeout(overTimer)
  overTimer = 0
}
function onItemEnter(e: Event, item: RouteLocationNormalizedLoaded, index: number) {
  let rect = $bar.value?.getBoundingClientRect() as DOMRect,
    barWidth = rect.width,
    itemWidth = (e.currentTarget as HTMLElement).offsetWidth,
    remain = barWidth - index * itemWidth,
    popWidth = 100 * 1.5

  // 延迟提示路由信息
  if (overCard.show === false && overCard.disabled === false) {
    overTimer = setTimeout(() => {
      overCard.show = true
    }, 800)
  }
  // 右侧空间不足
  if (remain < popWidth) {
    overCard.left = 'auto'
    overCard.right = '4px'
  } else {
    overCard.left = rect.left + index * itemWidth + 6 + 'px'
    overCard.right = 'auto'
  }
  overCard.top = rect.top + rect.height + 6 + 'px'
  overCard.title = item.meta?.title || ''
  overCard.fullpath = item.fullPath
}
// itme 右键上下文菜单
function onItemContextmenu(e: MouseEvent, item: RouteLocationNormalizedLoaded, index: number) {
  overTimer && clearTimeout(overTimer)
  // 禁用悬浮Card
  overCard.show = false
  overCard.disabled = true
  // 设置菜单的位置
  ctxMenu.route = item
  ctxMenu.left = e.clientX + 'px'
  ctxMenu.top = e.clientY + 'px'
  // 显示自定义菜单
  ctxMenu.show = true
  // 点击其他地方时隐藏菜单
  document.addEventListener('click', hideContextMenu)
}
function hideContextMenu() {
  ctxMenu.show = false
  overCard.disabled = false
  document.removeEventListener('click', hideContextMenu)
}
function onCtxMenuClick(e: Event) {
  let target = e.target as HTMLElement,
    action = target.dataset.action

  if (action === 'closeRight') user.closeRight(ctxMenu.route)
  if (action === 'closeOther') user.closeOther(ctxMenu.route)
  if (action === 'closeLeft') user.closeLeft(ctxMenu.route)
  if (action === 'closeAll') user.closeAll()
}
// clear
onBeforeUnmount(() => {
  if (overTimer) clearTimeout(overTimer)
})
</script>
<style lang="scss">
$bar-line-height: 32px;
$bar-item-width: 100px;

.visited-bar {
  position: relative;
  padding: 0 12px;
  display: flex;
  flex-wrap: nowrap;
  line-height: $bar-line-height;
  border-bottom: 1px solid $border-color-light;
  font-size: 12px;
  &__item {
    display: flex;
    flex: 0 1 $bar-item-width;
    align-items: center;
    box-sizing: border-box;
    min-width: 24px + 1px;
    border-right: 1px solid $border-color-light;
    fill: $color-text-primary;
    cursor: pointer;
    &:hover {
      color: mix($color-primary, #fff, 85%);
    }
    &.active {
      color: #fff;
      background: $color-primary;
    }
    &-title {
      flex: 1 1 0;
      text-indent: 6px;
      white-space: nowrap;
      overflow: hidden;
    }
    &-close {
      flex: 0 0 24px;
      font-size: 12px;
      text-align: center;
      &:hover {
        transform: scale(1.4);
      }
    }
  }
}

.visited-over {
  position: fixed;
  box-sizing: border-box;
  font-size: 12px;
  padding: 6px 16px;
  line-height: 24px;
  background-color: #fff;
  width: $bar-item-width * 1.5;
  border: 1px solid $border-color-light;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.visited-ctx {
  position: fixed;
  box-sizing: border-box;
  display: inline-block;
  padding: 8px 0;
  border: 1px solid $border-color-light;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  &__item {
    padding: 0 16px;
    line-height: 28px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background: mix($color-primary, #fff, 50%);
    }
  }
}
</style>
