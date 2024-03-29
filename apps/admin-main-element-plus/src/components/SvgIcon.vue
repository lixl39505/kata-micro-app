<template>
  <svg class="svgicon" aria-hidden="true" :fill="fill" :width="size" :height="size">
    <title>{{ title }}</title>
    <use :xlink:href="symbolId"></use>
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
    size: {
      type: String,
      default: '1.2em',
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
  vertical-align: middle;
}
</style>
