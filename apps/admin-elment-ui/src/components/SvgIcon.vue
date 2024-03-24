<template>
  <svg class="svgicon" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="fill" />
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
}
</style>
