<template>
  <div class="visited-bar">
    <div
      v-for="(item, i) in user.visited"
      :key="item.fullPath"
      :class="['visited-bar__item', { active: route.fullPath === item.fullPath }]"
      @click="onItemClick(item, i)"
    >
      <span class="visited-bar__item-title">{{ item.meta?.title }}</span>
      <i class="visited-bar__item-close el-icon-close"></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Route } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const route = useRoute()
const user = useUserStore()

function onItemClick(item: Route, i: number) {
  router.push(item.fullPath)
}
</script>
<style lang="scss">
.visited-bar {
  display: flex;
  flex-wrap: nowrap;
  line-height: 32px;
  border-bottom: 1px solid $--border-color-base;
  font-size: 12px;

  &__item {
    display: flex;
    flex: 0 1 100px;
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
</style>
