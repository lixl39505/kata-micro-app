<template>
  <div class="visited-bar">
    <div v-for="item in user.visited" :key="item.fullPath" class="visited-bar__item">
      <SvgIcon v-if="item.meta?.icon" class="visited-bar__item-fav" :name="item.meta?.icon"></SvgIcon>
      <span>{{ item.meta?.title }}</span>
      <i class="visited-bar__item-close el-icon-close"></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~/stores/user'

const router = useRouter()
const user = useUserStore()
</script>
<style lang="scss">
.visited-bar {
  display: flex;

  &__item {
    flex: 0 1 100px;
    min-width: 20px;
    padding-right: 20px;
    text-overflow: clip;
    &-fav {
      fill: #333;
      margin-right: 2px;
    }
    &-close {
      position: absolute;
      top: 50%;
      right: 2px;
      margin-top: -6px;
    }
  }
}
</style>
