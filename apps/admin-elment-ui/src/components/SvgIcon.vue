<template>
  <svg class="svgicon" aria-hidden="true">
    <title>{{ title }}</title>
    <use :xlink:href="symbolId" :fill="fill"></use>
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  },
})
</script>
<style lang="scss">
.svgicon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>
