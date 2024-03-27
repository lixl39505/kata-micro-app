<template>
  <div class="visited-bar" ref="$bar" @mouseleave="onBarLeave">
    <div
      v-for="(item, i) in user.visited"
      :key="item.fullPath"
      :class="['visited-bar__item', { active: route.fullPath === item.fullPath }]"
      @click="onItemClick(item)"
      @mouseenter="onItemEnter($event, item, i)"
      @mouseleave="onItemLeave"
    >
      <span class="visited-bar__item-title">{{ item.meta?.title }}</span>
      <i class="visited-bar__item-close el-icon-close"></i>
    </div>
    <div
      v-show="overStats.show"
      class="visited-over"
      :style="{
        left: overStats.left,
        right: overStats.right,
      }"
    >
      <div class="visited-over__bridge"></div>
      <div class="visited-over__title">{{ overStats.title }}</div>
      <div class="visited-over__title">{{ overStats.fullpath }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Route } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const overStats = reactive({
  show: false,
  left: 'auto',
  right: 'auto',
  title: '',
  fullpath: '',
})

function onItemClick(item: Route) {
  router.push(item.fullPath)
}
let overTimer: number
let $bar = ref<HTMLElement>()

function onBarLeave() {
  overStats.show = false
}
function onItemLeave() {
  overTimer && clearTimeout(overTimer)
  overTimer = 0
}
function onItemEnter(e: Event, item: Route, index: number) {
  let barWidth = $bar.value?.offsetWidth || 0,
    itemWidth = (e.currentTarget as HTMLElement).offsetWidth,
    remain = barWidth - index * itemWidth,
    popWidth = 100 * 1.5

  // 延迟提示路由信息
  if (!overTimer) {
    overTimer = setTimeout(() => {
      overStats.show = true
    }, 800)
  }
  // 右侧空间不足
  if (remain < popWidth) {
    overStats.left = 'auto'
    overStats.right = '4px'
  } else {
    overStats.left = index * itemWidth + 'px'
    overStats.right = 'auto'
  }
  overStats.title = item.meta?.title || ''
  overStats.fullpath = item.fullPath
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
  display: flex;
  flex-wrap: nowrap;
  line-height: $bar-line-height;
  border-bottom: 1px solid $--border-color-base;
  font-size: 12px;
  &__item {
    display: flex;
    flex: 0 1 $bar-item-width;
    align-items: center;
    box-sizing: border-box;
    min-width: 24px + 1px;
    border-right: 1px solid $--border-color-base;
    fill: $--color-text-primary;
    cursor: pointer;
    &:hover {
      color: mix($--color-primary, #fff, 85%);
    }
    &.active {
      color: $--color-primary;
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
  box-sizing: border-box;
  position: absolute;
  padding: 6px 16px;
  line-height: 24px;
  top: $bar-line-height + 6px;
  background-color: #fff;
  width: $bar-item-width * 1.5;
  border: 1px solid $--border-color-base;
  border-radius: 4px;
  box-shadow:
    $--border-color-base 1px 1px 1px,
    $--border-color-base -0.5px 0.5px 0.5px;
  &__bridge {
    position: absolute;
    height: 10px;
    left: 0;
    top: -10px;
    width: 100%;
  }
  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
