<template>
  <div class="visited-bar">
    <div v-for="(item, i) in user.visited" :key="item.fullPath" class="visited-bar__item" @click="onItemClick(item, i)">
      <span>{{ item.meta?.title }}</span>
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
  line-height: 32px;
  border-bottom: 1px solid $--border-color-base;

  &__item {
    box-sizing: border-box;
    position: relative;
    flex: 0 1 150px;
    min-width: 20px;
    padding-right: 20px;
    text-overflow: clip;
    fill: $--color-text-primary;
    font-size: $--font-size-base;
    cursor: pointer;
    &-close {
      position: absolute;
      top: 50%;
      right: 2px;
      margin-top: -6px;
    }
  }
}
</style>
