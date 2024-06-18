<template>
  <WujieVue width="100%" height="100%" :name="name" :url="url" alive :plugins="[{ patchElementHook }]"></WujieVue>
</template>
<script lang="ts" setup>
import Wujie from 'wujie-vue2'

const route = useRoute()
const { bus } = Wujie

let name = 'rc18' // 子应用名称
let path = route.path.replace(`${name}/`, '')
let url = ref(`${import.meta.env.VITE_RC18_URL}${path}`)

function patchElementHook(element: HTMLElement, iframeWindow: Window) {
  if (element.nodeName === 'STYLE') {
    // 修复 :root 样式失效问题，见 https://github.com/Tencent/wujie/issues/434#issuecomment-1614089196
    element.insertAdjacentElement = function (_position, ele) {
      return iframeWindow.document.head.appendChild(ele)
    }
  }
}

bus.$emit(`${name}:routeChange`, path)
</script>
