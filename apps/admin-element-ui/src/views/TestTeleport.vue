<template>
  <div v-if="isAlive">
    <div v-for="i in list" :key="i">
      <button>{{ i }}</button>
    </div>
    <div id="cc"></div>
    <Teleport :to="target" :disabled="disabled">
      <template v-if="!empty">
        <ElButton v-if="swap">A</ElButton>
        <ElButton v-else>B</ElButton>
      </template>
    </Teleport>
    <div class="b">
      <button @click="onAdd">Add</button>
      <button @click="onPop">Pop</button>
      <button @click="onMove">Move</button>
      <button @click="onToggle">{{ disabled ? 'Enable' : 'Disable' }}</button>
      <button @click="onSwap">Swap</button>
      <button @click="onShow">{{ empty ? 'Show' : 'Hide' }}</button>
      <button @click="onClosePage">ClosePage</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const list = ref(['button1'])
let count = 1

function onAdd() {
  list.value.push(`button${++count}`)
}
function onPop() {
  list.value.pop()
}

const isAlive = ref(true)
function onClosePage() {
  isAlive.value = false
}

const disabled = ref(false)
function onToggle() {
  disabled.value = !disabled.value
}

const target = ref('body')
function onMove() {
  target.value = target.value === 'body' ? '#cc' : 'body'
}

const swap = ref(true)
function onSwap() {
  swap.value = !swap.value
}

const empty = ref(false)
function onShow() {
  empty.value = !empty.value
}
</script>
<style>
html,
body {
  width: auto;
  height: auto;
}
.b {
  position: fixed;
  top: 100px;
  left: 100px;
}
</style>
