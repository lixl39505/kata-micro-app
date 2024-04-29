<template>
  <div v-if="isAlive">
    <div v-for="i in list" :key="i">
      <button>{{ i }}</button>
    </div>
    <div id="cc"></div>
    <Teleport :to="target" :disabled="disabled">
      <div class="b">
        <button @click="onAdd">Add</button>
        <button @click="onEnd">End</button>
        <button @click="onMove">Move</button>
        <button @click="onToggle">Toggle</button>
      </div>
    </Teleport>
  </div>
</template>
<script lang="ts" setup>
const list = ref(['button1'])
let count = 1

function onAdd() {
  list.value.push(`button${++count}`)
}

const isAlive = ref(true)
function onEnd() {
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
</script>
<style>
.b {
  position: fixed;
  top: 100px;
  left: 100px;
}
</style>
