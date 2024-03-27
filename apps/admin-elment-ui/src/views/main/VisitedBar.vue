<template>
  <div class="visited-bar">
    <div v-for="(item, i) in user.visited" :key="item.fullPath" class="visited-bar__item" @click="onItemClick(item, i)">
      <span class="visited-bar__item-title">{{ item.meta?.title }}</span>
      <i class="visited-bar__item-close el-icon-close"></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Route } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
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
    align-items: center;
    overflow: hidden;
    flex: 0 1 100px;
    fill: $--color-text-primary;
    cursor: pointer;
    &-title {
      flex: 1 1 0;
      white-space: nowrap;
      overflow: hidden;
    }
    &-close {
      flex: 0 0 20px;
    }
  }
}
</style>
